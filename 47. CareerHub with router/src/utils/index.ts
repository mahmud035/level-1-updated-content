export function getImageURL(name: string) {
  return new URL(`../assets/icons/${name}`, import.meta.url).href;
}
