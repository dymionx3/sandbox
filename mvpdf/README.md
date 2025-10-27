# PDF Studio — Static (Client‑Side)

Single-file PDF tool by **M.V. Electronix LLC**. Vector-preserving for merge/split/rotate/watermark via `pdf-lib`. Raster tools (compress/edit-canvas) use `pdf.js` + `jsPDF`.

## Quick Start
Open `index.html` in a modern browser (Chrome, Edge, Firefox). No server required.

## Deploy to Cloudflare Pages
1. Go to **Pages** → **Create project** → **Upload assets**.
2. Upload this zip's contents (or drag the folder).
3. No build step; output dir is `/`.
4. Publish.

## Notes
- **Convert**: supports images (`.jpg/.jpeg/.png`) and `.txt`. Office formats would need a backend/service.
- **Compress**: rasterizes pages; text becomes images (smaller size, not selectable).
- **Fill & Sign**: simple signature stamp on every page; can be extended to true form fields.

© 2025 M.V. Electronix LLC
