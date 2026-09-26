// Must be idempotent: fullyParallel runs it once per worker.
let done = false;

export function globalSetup() {
  if (done) return;
  done = true;
  process.env.TZ ??= "Europe/Madrid";
}
