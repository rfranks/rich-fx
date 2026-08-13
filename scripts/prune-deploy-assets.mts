import fs from "node:fs/promises";
import path from "node:path";
import { createCliOutput } from "./lib/cli-output.mts";

const rootDir = process.cwd();
const out = createCliOutput();
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");

const sourceRoots = ["src"] as const;
const richFxDataPath = "public/personal/data/richFx.json";
const sourceExtensions = new Set([
  ".css",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mjs",
  ".mts",
  ".ts",
  ".tsx",
]);
const ignoredDirs = new Set([
  ".git",
  ".next",
  "coverage",
  "dist",
  "node_modules",
  "out",
]);

type PruneTarget = {
  label: string;
  publicPathPrefix: string;
  root: string;
};

type AssetFile = {
  absolutePath: string;
  publicPath: string;
  relativePath: string;
  size: number;
  target: PruneTarget;
};

type PruneSummary = {
  removedFiles: number;
  removedBytes: number;
  removedDirs: number;
  keptFiles: number;
};

const pruneTargets = [
  {
    label: "portfolio",
    publicPathPrefix: "/assets/portfolio/",
    root: "public/assets/portfolio",
  },
  {
    label: "ai-lab",
    publicPathPrefix: "/personal/images/ai-lab/",
    root: "public/personal/images/ai-lab",
  },
] as const satisfies readonly PruneTarget[];

const quotedStringPattern =
  /(["'`])([^"'`\r\n]*(?:\/?public\/assets\/portfolio\/|\/?public\/personal\/images\/ai-lab\/|\/assets\/portfolio\/|\/personal\/images\/ai-lab\/)[^"'`\r\n]*)\1/g;
const cssUrlPattern =
  /url\(\s*(["']?)([^)"'\r\n]*(?:\/?public\/assets\/portfolio\/|\/?public\/personal\/images\/ai-lab\/|\/assets\/portfolio\/|\/personal\/images\/ai-lab\/)[^)"'\r\n]*)\1\s*\)/g;

function toPosixPath(value: string): string {
  return value.split(path.sep).join("/");
}

function formatBytes(value: number): string {
  const units = ["B", "KB", "MB", "GB"] as const;
  let unitIndex = 0;
  let nextValue = value;
  while (nextValue >= 1024 && unitIndex < units.length - 1) {
    nextValue /= 1024;
    unitIndex += 1;
  }
  return `${nextValue.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function stripUrlDecorators(value: string): string {
  return value.trim().replace(/^["'`]+|["'`]+$/g, "");
}

function decodePath(value: string): string {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
}

function normalizePublicPath(value: string): string | null {
  const cleaned = stripUrlDecorators(value);
  const [withoutHash] = cleaned.split("#");
  const [withoutQuery] = withoutHash.split("?");
  const decoded = decodePath(withoutQuery).replaceAll("\\", "/");

  if (decoded.includes("${")) {
    return null;
  }

  for (const target of pruneTargets) {
    const prefixes = [
      `/public${target.publicPathPrefix}`,
      `public${target.publicPathPrefix}`,
      target.publicPathPrefix,
      target.publicPathPrefix.slice(1),
    ];

    for (const prefix of prefixes) {
      const prefixIndex = decoded.indexOf(prefix);
      if (prefixIndex < 0) {
        continue;
      }

      const suffix = decoded.slice(prefixIndex + prefix.length);
      if (!suffix || suffix.endsWith("/")) {
        continue;
      }

      const normalized = path.posix.normalize(
        `${target.publicPathPrefix}${suffix}`,
      );
      if (normalized.startsWith(target.publicPathPrefix)) {
        return normalized;
      }
    }
  }

  return null;
}

function addReference(
  references: Map<string, Set<string>>,
  publicPath: string | null,
  source: string,
): void {
  if (!publicPath) {
    return;
  }

  const sources = references.get(publicPath) ?? new Set<string>();
  sources.add(source);
  references.set(publicPath, sources);
}

function collectStringsFromJson(value: unknown, collector: string[]): void {
  if (typeof value === "string") {
    collector.push(value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectStringsFromJson(item, collector));
    return;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) =>
      collectStringsFromJson(item, collector),
    );
  }
}

function collectReferencedPathsFromContent(
  content: string,
  source: string,
  references: Map<string, Set<string>>,
): void {
  for (const match of content.matchAll(quotedStringPattern)) {
    addReference(references, normalizePublicPath(match[2] ?? ""), source);
  }

  for (const match of content.matchAll(cssUrlPattern)) {
    addReference(references, normalizePublicPath(match[2] ?? ""), source);
  }
}

async function collectFiles(dir: string, files: string[]): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        await collectFiles(absolutePath, files);
      }
      continue;
    }

    if (sourceExtensions.has(path.extname(entry.name))) {
      files.push(absolutePath);
    }
  }
}

async function collectSourceReferences(): Promise<Map<string, Set<string>>> {
  const references = new Map<string, Set<string>>();
  const files: string[] = [];

  for (const sourceRoot of sourceRoots) {
    await collectFiles(path.join(rootDir, sourceRoot), files);
  }

  for (const absolutePath of files) {
    const relativePath = toPosixPath(path.relative(rootDir, absolutePath));
    const content = await fs.readFile(absolutePath, "utf8");
    collectReferencedPathsFromContent(content, relativePath, references);
  }

  const dataAbsolutePath = path.join(rootDir, richFxDataPath);
  const dataContent = await fs.readFile(dataAbsolutePath, "utf8");
  const richFxStrings: string[] = [];
  collectStringsFromJson(JSON.parse(dataContent), richFxStrings);
  richFxStrings.forEach((value) => {
    addReference(references, normalizePublicPath(value), richFxDataPath);
  });
  collectReferencedPathsFromContent(dataContent, richFxDataPath, references);

  return references;
}

async function collectTargetAssetFiles(
  target: PruneTarget,
): Promise<AssetFile[]> {
  const targetRoot = path.join(rootDir, target.root);
  const files: AssetFile[] = [];

  async function walk(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }

      const relativePath = toPosixPath(path.relative(targetRoot, absolutePath));
      const stat = await fs.stat(absolutePath);
      files.push({
        absolutePath,
        publicPath: path.posix.join(target.publicPathPrefix, relativePath),
        relativePath,
        size: stat.size,
        target,
      });
    }
  }

  try {
    await walk(targetRoot);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      out.warning(`Missing target root ${target.root}; skipping.`);
      return files;
    }
    throw error;
  }

  return files;
}

async function removeFile(file: AssetFile): Promise<void> {
  if (dryRun) {
    return;
  }
  await fs.rm(file.absolutePath, { force: true });
}

async function removeEmptyDirs(
  target: PruneTarget,
  pendingRemovedFilePaths: ReadonlySet<string>,
): Promise<number> {
  const targetRoot = path.join(rootDir, target.root);
  let removed = 0;

  async function walk(dir: string): Promise<boolean> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let hasContent = false;

    for (const entry of entries) {
      const absolutePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const childHasContent = await walk(absolutePath);
        hasContent = hasContent || childHasContent;
      } else {
        hasContent = hasContent || !pendingRemovedFilePaths.has(absolutePath);
      }
    }

    if (dir !== targetRoot && !hasContent) {
      if (!dryRun) {
        await fs.rmdir(dir);
      }
      removed += 1;
      return false;
    }

    return hasContent;
  }

  try {
    await walk(targetRoot);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return removed;
    }
    throw error;
  }

  return removed;
}

async function pruneAssets(
  references: Map<string, Set<string>>,
): Promise<PruneSummary> {
  const allFiles = (
    await Promise.all(
      pruneTargets.map((target) => collectTargetAssetFiles(target)),
    )
  ).flat();
  const staleFiles = allFiles
    .filter((file) => !references.has(file.publicPath))
    .sort((left, right) => right.size - left.size);
  const staleFilePaths = new Set(staleFiles.map((file) => file.absolutePath));
  const summary: PruneSummary = {
    keptFiles: allFiles.length - staleFiles.length,
    removedBytes: staleFiles.reduce((total, file) => total + file.size, 0),
    removedDirs: 0,
    removedFiles: staleFiles.length,
  };

  for (const file of staleFiles) {
    await removeFile(file);
  }

  for (const target of pruneTargets) {
    summary.removedDirs += await removeEmptyDirs(target, staleFilePaths);
  }

  if (staleFiles.length > 0) {
    out.info(
      `${dryRun ? "Would remove" : "Removed"} ${staleFiles.length} file(s). Largest stale assets:`,
    );
    staleFiles.slice(0, 12).forEach((file) => {
      out.listItem(
        `${formatBytes(file.size)} ${file.target.root}/${file.relativePath}`,
      );
    });
    if (staleFiles.length > 12) {
      out.listItem(`+${staleFiles.length - 12} more`);
    }
  }

  return summary;
}

async function reportMissingReferencedAssets(
  references: Map<string, Set<string>>,
): Promise<void> {
  const missing: string[] = [];

  for (const publicPath of references.keys()) {
    const target = pruneTargets.find((item) =>
      publicPath.startsWith(item.publicPathPrefix),
    );
    if (!target) {
      continue;
    }

    const relativeAssetPath = publicPath.slice(target.publicPathPrefix.length);
    const absolutePath = path.join(rootDir, target.root, relativeAssetPath);
    try {
      await fs.stat(absolutePath);
    } catch {
      missing.push(publicPath);
    }
  }

  if (missing.length === 0) {
    return;
  }

  out.warning(
    `${missing.length} referenced asset(s) were not found before pruning.`,
  );
  missing.slice(0, 12).forEach((publicPath) => {
    const sources = Array.from(references.get(publicPath) ?? []);
    out.listItem(`${publicPath} referenced by ${sources.join(", ")}`);
  });
  if (missing.length > 12) {
    out.listItem(`+${missing.length - 12} more`);
  }
}

async function main(): Promise<void> {
  out.section(`Deployment asset prune${dryRun ? " (dry run)" : ""}`);

  const references = await collectSourceReferences();
  await reportMissingReferencedAssets(references);
  const summary = await pruneAssets(references);

  out.metric(`${references.size} referenced asset path(s) collected.`);
  out.metric(`${summary.keptFiles} file(s) kept.`);
  out.metric(
    `${dryRun ? "Potential" : "Actual"} savings: ${formatBytes(
      summary.removedBytes,
    )}.`,
  );
  out.metric(
    `${dryRun ? "Would remove" : "Removed"} ${summary.removedDirs} empty director${summary.removedDirs === 1 ? "y" : "ies"}.`,
  );
  out.success(
    dryRun
      ? "Deployment asset prune dry run completed."
      : "Deployment asset prune completed.",
  );
}

main().catch((error) => {
  out.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
