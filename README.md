# The Artful Dodger — Portfolio Site

Static GitHub Pages site for Seth's dark DnB / techno project.

## Files

| File | What |
|---|---|
| `index.html` | The whole site: hero, releases, timeline, about, links |
| `styles.css` | Dark/neon styling, responsive |
| `script.js` | Canvas spectrum visualizer, glitch bursts, scroll reveals, mobile nav |
| `assets/tuff-old-bird.jpg` | Real "Tuff Old Bird" single cover (resized from the 3000×3000 master) |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

No build step. Pure HTML/CSS/JS + Google Fonts CDN.

## Deploy to GitHub Pages

1. Create the repo (keep it **public** — GitHub Pages on free accounts needs a public repo for the free tier; or keep private if Pages is enabled for the org):
   - Suggested name: `kellner-dot/theartfuldodger` or `kellner-dot/theartfuldodger.github.io`
2. Push these files to `main`.
3. Repo → **Settings → Pages** → Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`.
4. Site goes live at `https://<user>.github.io/<repo>/`.

## Custom domain (CNAME-ready)

To use a custom domain later (e.g. `theartfuldodger.com`):

1. Create a file named `CNAME` in the repo root containing **only** the domain, e.g.:
   ```
   theartfuldodger.com
   ```
2. At your DNS provider, add:
   - `A` records pointing to GitHub Pages IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) for the apex domain, **or**
   - a `CNAME` record for `www` → `<user>.github.io`
3. In repo **Settings → Pages**, enter the domain and check **Enforce HTTPS** once DNS propagates.

(No CNAME file is committed yet on purpose — committing one with a placeholder domain would hijack the Pages URL.)

## Enabling the Bandcamp player embed

Bandcamp's oEmbed API is deprecated, so the playable widget needs the numeric
album ID from the Share dialog:

1. Open https://theartfuldodger1.bandcamp.com
2. Under the album, click **Share / Embed** → **Embed this album**
3. In the embed code, find `album=NNNNNN` — that's the ID
4. In `index.html`, find the commented-out `<iframe class="bc-embed" …>` block,
   replace `ALBUM_ID_HERE` with the number, and remove the surrounding `<!--` `-->`
5. Commit + push. The player appears above the "Stream / Buy" button.

## Updating for new releases

- **Tuff Old Bird (release date TBD):** after release, add Bandcamp/Spotify/Apple Music
  links to its card (currently "Upcoming"). Artwork is already in place.
- **George E. Ackerman single:** swap the placeholder cover for the final art and
  flip the tag to `Album`/`Single` when it's out.
- New entries go in the timeline under "Next".
