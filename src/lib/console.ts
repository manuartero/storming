const RENDER_TAG_STYLE =
  "color: midnightblue; background-color: whitesmoke; font: bold; padding: 4px";

export function logRender(componentName: string) {
  console.debug(`%c[render]%c<${componentName} />`, RENDER_TAG_STYLE);
}

const WARN_TAG_STYLE = "color: red; font: bold; padding: 4px";

export function warnInconsistentState(...args: unknown[]) {
  console.warn(`%cInconsistent State%c: `, WARN_TAG_STYLE, ...args);
}
