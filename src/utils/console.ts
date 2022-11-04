const TAG_STYLE =
  "color: midnightblue; background-color: whitesmoke; font: bold; padding: 4px";

export function logRender(componentName: string) {
  console.debug(`%c[render]%c<${componentName} />`, TAG_STYLE);
}
