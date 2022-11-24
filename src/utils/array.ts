export function merge<T>(a: T[], b: T[]) {
  return Array.from(new Set([...a, ...b]));
}
