# Simple QR Code Generator (Static)

This is a small static website that converts user-provided URLs into QR codes in the browser. It uses Qrious (via CDN) and requires no build steps.

Features:
- Validate URLs (will coerce scheme-less inputs to https://).
- Generate QR codes entirely client-side (canvas).
- Download the QR as a PNG.
- Built-in self-test that runs on page load and a Test button that uses:
  https://www.youtube.com/watch?v=dQw4w9WgXcQ

Files:
- index.html
- style.css
- script.js
- README.md

Local testing:
1. Open index.html in a modern browser.
2. Use the input + Generate, or click "Test with Rickroll" to auto-fill and run the built-in test.
3. Scan the generated QR with your phone to confirm it opens the expected URL.

Publish on GitHub Pages (default static workflow):
1. Create a GitHub repository (or use an existing one).
2. Commit these files to the repository root on the `main` branch.
3. In the repository Settings > Pages, choose "Deploy from a branch" and pick `main` and folder `/ (root)`. Save.
4. GitHub will use the default static Pages workflow to publish the site at:
   `https://<your-username>.github.io/<repo>/` (or `https://<your-username>.github.io/` for a user/organization site).

No extra build/deploy steps are required — the default GitHub Pages static workflow will host the page.

If you want, I can:
- Push these files into a repository (I'll need the repo owner/name and permission),
- Or add a tiny demo GitHub Actions Pages yaml (not necessary for default Pages),
- Or extend the page with customization options (size, error correction).
