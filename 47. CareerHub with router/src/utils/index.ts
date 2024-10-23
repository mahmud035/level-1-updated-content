export function getImageURL(folderName: string, imageName: string) {
  return new URL(`../assets/${folderName}/${imageName}`, import.meta.url).href;
}
