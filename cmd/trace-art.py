"""Trace a generated PNG into a palette-exact SVG (docs/art-direction.md).

  python3 -m venv .venv && .venv/bin/pip install vtracer pillow
  .venv/bin/python cmd/trace-art.py art.png out.svg "#CED4DA" "#ADB5BD" ...

Pass every hex value the asset may use: each pixel snaps to the nearest one.
"""

import collections
import re
import sys

import vtracer
from PIL import Image, ImageFilter

src, out_svg, *palette = sys.argv[1:]
pal = [tuple(int(h[i : i + 2], 16) for i in (1, 3, 5)) for h in palette]


def nearest(r, g, b):
    return min(pal, key=lambda p: (p[0] - r) ** 2 + (p[1] - g) ** 2 + (p[2] - b) ** 2)


img = Image.open(src).convert("RGBA")
px = img.load()
counts = collections.Counter()
for y in range(img.height):
    for x in range(img.width):
        r, g, b, a = px[x, y]
        if a < 128:
            px[x, y] = (0, 0, 0, 0)
            continue
        c = nearest(r, g, b)
        counts["#%02X%02X%02X" % c] += 1
        px[x, y] = (*c, 255)
# a mode filter removes the one-pixel seams anti-aliasing leaves between fills
img = img.filter(ImageFilter.ModeFilter(5))

# cropped tight to the art: the CSS decides where it sits and how far it overflows
left, top, right, bottom = img.getbbox()
pad = 8
img = img.crop((left - pad, top - pad, right + pad, bottom + pad))
# tracing a smaller image gives fewer nodes; the splines smooth the steps
scale = 512 / max(img.size)
vw, vh = round(img.width * scale), round(img.height * scale)
img = img.resize((vw, vh), Image.NEAREST).filter(ImageFilter.ModeFilter(3))
flat = out_svg.removesuffix(".svg") + ".flat.png"
img.save(flat)

vtracer.convert_image_to_svg_py(
    flat,
    out_svg,
    colormode="color",
    hierarchical="stacked",
    mode="spline",
    filter_speckle=16,
    color_precision=8,
    layer_difference=8,
    corner_threshold=60,
    length_threshold=6.0,
    splice_threshold=45,
    path_precision=0,
)

svg = open(out_svg).read()


def snap_fill(m):
    return 'fill="#%02X%02X%02X"' % nearest(*(int(m[1][i : i + 2], 16) for i in (0, 2, 4)))


svg = re.sub(r'fill="#([0-9A-Fa-f]{6})"', snap_fill, svg)
svg = re.sub(r"<\?xml[^>]*>\s*|<!--.*?-->\s*", "", svg, flags=re.S)
svg = re.sub(r'<svg([^>]*?) width="\d+" height="\d+"', rf'<svg\1 viewBox="0 0 {vw} {vh}"', svg)
svg = re.sub(r">\s+<", "><", svg).strip() + "\n"
open(out_svg, "w").write(svg)

fills = collections.Counter(re.findall(r'fill="(#[0-9A-F]{6})"', svg))
print(f"pixels {dict(counts)}")
print(f"paths {dict(fills)}, {len(svg)} bytes, viewBox {vw}x{vh}, preview {flat}")
