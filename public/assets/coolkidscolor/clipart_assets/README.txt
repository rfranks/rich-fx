Cool Kids Color contest page — extracted clip-art assets
Source: 90E805BC-484F-46B2-B351-BFF956380C2B.png (1103x1426)
Assets: 32 transparent PNG files

Extraction method:
- Hand-selected polygon clip paths in source-image coordinates to avoid neighboring text/panel borders.
- Local background estimated from each polygon edge.
- Only edge-connected background pixels are removed, preserving enclosed white details such as eyes/highlights.
- Alpha edges are lightly antialiased.
- Tiny stray connected components are filtered conservatively.

clip_path_manifest.json records every source polygon and output size for validation/reuse.
QA contact sheet is supplied separately next to the ZIP.

Scope note: ornamental confetti/swooshes and text were intentionally excluded. The globe in step 3 was not exported because it is physically overlapped by the grown-up character in the source, so a clean deterministic extraction would invent missing pixels.
