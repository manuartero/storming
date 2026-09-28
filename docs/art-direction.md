# Art direction

The visual reference is the style tile at **`/_style/`** (`_style/index.html`; `npm run dev`, then `localhost:3000/_style/`). It shows every token below on real assets. Keep it in sync with this page.

## Direction

- **The art is flat.** The commissioned pieces, buildings, card icons and avatars set the style: flat fills, chunky geometric shapes, front view, no outlines, no gradients, no shadows. New art matches them.
- **The frame is firm.** The weight lives in the UI around the art: 2.5 px ink borders, a 4 px hard offset shadow (no blur) and a 6 px radius on tiles, cards, buttons and dialogs. Pressing a button pushes it into its shadow.
- **Stone and colour.** Everything is stone grey, like an unpainted miniature. The player colours are the only strong colours on the board; water is the one exception.

## Type

| Role | Font |
|---|---|
| Wordmark, phase titles, card names, points | **Alfa Slab One** |
| Everything you read | **Figtree** (variable) |

## Palette

| Token | Hex | Use |
|---|---|---|
| paper | `#F8F9FA` | highlights, snow, wave lines |
| canvas | `#E9ECEF` | page and board background, terrain tile face |
| stone light | `#CED4DA` | art |
| stone | `#ADB5BD` | art |
| stone dark | `#6C757D` | art; text on white only |
| ink | `#212529` | text, borders, hard shadows, tiny dark details in the art |
| water | `#9EC9EA` | water, and nothing else |

| Player | Tint | Main | Shade |
|---|---|---|---|
| Yellow (`player`) | `#FFF4D6` | `#FFCA3A` | `#E0A500` |
| Red (`enemy1`) | `#FFE5E6` | `#FF595E` | `#E00007` |
| Purple (`enemy2`) | `#EBE5F3` | `#6A4C93` | `#44315E` |
| Green (`enemy3`) | `#EBF6DA` | `#8AC926` | `#76AB21` |

- Faces in the art keep their two skin tones, `#CF7A76` and `#7F4242`.
- Stone dark fails WCAG AA on canvas (about 4.0:1): on canvas, text is ink.
- Ink fails AA on purple: text on Purple main is white. Yellow, Red and Green take ink.
- This replaces today's slate UI greys and the three terrain tints in `src/styles/colors.css`.

## Terrain

- Forest and mountain use only the greys; the lake uses the water blue. Every terrain tile has a canvas face; open ground stays white.
- **Terrain stands out of its tile.** Its base sits low in the hex (about 16% up), and it may rise a little above the top edge and reach past the side corners. It never drops below the bottom edge. Buildings and pieces stay inside their hex.
- In the app, `.tile` clips everything with `clip-path`, and a clip-path also makes a stacking context. The art must sit outside the clipped layers: move the hexagon clip from `.tile` to its stroke and face layers, keep the hit area on the clipped layer, and give the art `pointer-events: none` and a z-index above the next tile.

## Making new art

1. **Generate** in the ChatGPT project. Its instructions are [`art-direction.chatgpt.txt`](art-direction.chatgpt.txt); attach `_style/refs/ref-{tower,castle,knight}.png`. Per-asset prompts live on the style tile. Make 3–4 versions and keep the one that sits best next to the tower.
2. **Trace** with `cmd/trace-art.py`: it snaps every pixel to the palette you pass, crops tight to the art, traces with vtracer and snaps the SVG fills again.
3. **Recolour** player art: draw it in Yellow, then swap its tint, main and shade for each player (table above).
4. **Save** it next to its component, named like the rest (`<name>--<player>.svg`). Aim for about 15 kB per SVG; the commissioned pieces are 20–28 kB, and that's fine.
5. **Never let the generator draw text.** Lettering is set in a font.

## Placeholders

| What | Where | Ticket |
|---|---|---|
| City reuses the castle art | `tiles/assets/index.ts` | #52 |
| No walls art | tile, build-walls silhouette | #52, #39 |
| No first-player marker, victory point token or rotating victory point | turn order | #52, #34, #35 |
| Vite favicon, no wordmark | `public/`, menu, game over | #52, #104 |
| White box card frame, no card back | `cards/` | #101 |
| One knight head recoloured four times | turn order avatars | #102 |
| Soldier and knight hard to tell apart on a phone | `pieces/` | #100 |
| App still on the slate greys and soft frames | `styles/`, every component | #99 |
| MARKETPLACE and Player Inventory panels, NEXT / FUTURE shown twice | `app.module.css` | #103 |
| ~~Line-art forest, lake and invisible mountain~~ | `tiles/assets/` | #52, done |
