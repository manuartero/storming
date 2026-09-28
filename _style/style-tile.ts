import "@fontsource-variable/figtree";

type Player = "player" | "enemy1" | "enemy2" | "enemy3";

const urls = import.meta.glob<string>(
  [
    "/src/elements/tiles/assets/*.svg",
    "/src/elements/pieces/assets/*.svg",
    "/src/components/cards/assets/*.svg",
    "/src/components/round-summary/avatar/assets/*.svg",
  ],
  { eager: true, query: "?url", import: "default" }
);

const byName = Object.fromEntries(
  Object.entries(urls).map(([path, url]) => [
    path.includes("/avatar/") ? `avatar--${basename(path)}` : basename(path),
    url,
  ])
);

function basename(path: string) {
  return path.slice(path.lastIndexOf("/") + 1, -".svg".length);
}

/* per-player art is `<name>--<player>.svg`; the rest has one version */
function assetUrl({ name, player }: { name: string; player: Player }) {
  return byName[`${name}--${player}`] ?? byName[name];
}

function paint(player: Player) {
  document.documentElement.dataset.player = player;
  for (const img of document.querySelectorAll<HTMLImageElement>(
    "img[data-asset]"
  )) {
    img.src = assetUrl({ name: img.dataset.asset ?? "", player });
  }
  for (const el of document.querySelectorAll<HTMLElement>("[data-bg]")) {
    const url = assetUrl({ name: el.dataset.bg ?? "", player });
    el.style.backgroundImage = `url(${url})`;
  }
}

const sample = document.querySelector<HTMLTemplateElement>("#frame-sample");
for (const column of document.querySelectorAll<HTMLElement>(".strength")) {
  if (!sample) break;
  const content = sample.content.cloneNode(true) as DocumentFragment;
  const title = content.querySelector(".strength-title");
  if (title) {
    title.textContent = column.dataset.strength ?? "";
    if (column.dataset.chosen !== undefined) {
      title.insertAdjacentHTML(
        "beforeend",
        '<span class="chosen">Chosen</span>'
      );
    }
  }
  column.append(content);
}

document.addEventListener("change", (event) => {
  const input = event.target as HTMLInputElement;
  if (input.name === "font") {
    document.documentElement.dataset.font = input.value;
  }
  if (input.name === "player") {
    paint(input.value as Player);
  }
});

document.addEventListener("click", async (event) => {
  const button = (event.target as HTMLElement).closest("button.copy");
  const text = button?.closest(".prompt")?.querySelector("pre")?.textContent;
  if (!button || !text) return;
  await navigator.clipboard.writeText(text);
  button.textContent = "Copied";
  setTimeout(() => {
    button.textContent = "Copy prompt";
  }, 1500);
});

paint("player");
