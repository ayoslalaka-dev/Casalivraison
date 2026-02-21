// Ce fichier permet d'associer des artistes à des images locales.
// Remplis le mapping avec des require() vers tes fichiers dans assets/images/artists.
// Exemple:
// export const ArtistLocalImages = {
//   "hamid el kasri": require("@/assets/images/artists/el-kasri.jpg"),
//   "mustapha baqbou": require("@/assets/images/artists/baqbou.jpg"),
// };

export const ArtistLocalImages: Record<string, any> = {};

export function getArtistLocalImage(key?: string | number) {
  if (key === undefined || key === null) return null;
  const k = String(key).toLowerCase();
  return ArtistLocalImages[k] ?? null;
}

