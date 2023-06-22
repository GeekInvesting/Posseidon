export function CopyProperty (source: any, target: any) {
  for (const key in source) {
    target[key] = source[key];
  }
}
