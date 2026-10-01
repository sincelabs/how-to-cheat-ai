# How to Cheat in This AI Era

Workshop slide deck for **"How to Cheat in This AI Era"** — AI Workshop, Boost Turku.

- **Speaker:** John Y.
- **When:** Tuesday 6 October 2026, 16:00–19:00
- **Where:** Hämeenkatu 9, Turku
- **Audience:** ~30 students/founders, non-technical beginners, following along on their own laptops/phones

A single-page, PPT-like static site. Pure HTML/CSS/JS — no build step, no dependencies. Deployable anywhere.

**Live:** https://sincelabs.github.io/how-to-cheat-ai/ (after Pages is enabled)

## Files

| File | Purpose |
|---|---|
| `index.html` | All 16 slides + the "Workshop materials" overlay (copy-paste prompts + tool links) |
| `style.css` | Dark modern theme, projection-sized typography |
| `app.js` | Navigation, progress bar, swipe, hash deep-links, clipboard |

## How to present

Open `index.html` in any browser and press **F11** (fullscreen). That's it.

**Keys:**

| Key | Action |
|---|---|
| `→` / `Space` / `Enter` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `Home` / `End` | First / last slide |
| `M` | Toggle Workshop materials (prompts + tool links) |
| `Esc` | Close materials |

**Also works:** clicking the left/right edges of the screen, swiping on touch devices (audience phones too), and direct links like `#12` (opens slide 12 — handy for resuming mid-workshop).

**Fallback plan (no laptop / no internet):**
1. The site is 3 static files — download the repo as a ZIP beforehand and open `index.html` locally; it needs zero network. (The QR code image is the only remote asset; it degrades gracefully offline.)
2. Borrow any machine with a browser — the deck is just HTML.
3. Worst case: open the repo on your phone, rotate landscape, and swipe through slides over the projector via HDMI/USB-C.
4. Prompts are in the "Workshop materials" overlay (press `M`) — audience can read them from their own phones at the live site.

## Deploy (GitHub Pages)

The repo is pre-configured to deploy from `main`. If it isn't yet:

1. **Settings → Pages → Build and deployment**
2. Under **Source**, pick **Deploy from a branch**
3. Branch: `main`, folder: `/ (root)` → **Save**
4. Live in ~1 minute at `https://sincelabs.github.io/how-to-cheat-ai/`

Any static host works identically (Netlify, Vercel, Cloudflare Pages — point them at the repo root).

## License

MIT.
