import fs from "node:fs/promises";
import path from "node:path";
import { createCliOutput } from "./lib/cli-output.mts";

type StaticSearchIndexSnapshot = {
  generatedAt: string;
  actionCount: number;
  actions: Array<Record<string, unknown>>;
};

const out = createCliOutput();
const rootDir = process.cwd();
const staticSearchIndexPath = path.join(
  rootDir,
  "public",
  "personal",
  "data",
  "search",
  "static-search-index.json",
);

async function main(): Promise<void> {
  out.section("Static search index generation");
  const actions: StaticSearchIndexSnapshot["actions"] = [];

  const payload: StaticSearchIndexSnapshot = {
    generatedAt: new Date().toISOString(),
    actionCount: actions.length,
    actions,
  };

  await fs.mkdir(path.dirname(staticSearchIndexPath), { recursive: true });
  await fs.writeFile(staticSearchIndexPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  const relativeOutputPath = path.relative(rootDir, staticSearchIndexPath);
  out.success(`Wrote ${actions.length} static search actions to ${relativeOutputPath}.`);
}

main().catch((error) => {
  out.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
