// Define an array of select colors
const bannerColors: string[] = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];

export const defaultBannerColor = (uuid: string) => {
  // convert uuid to a numeric value
  const hash = uuid.split("-").reduce((acc, segment) => {
    return acc + parseInt(segment, 16);
  }, 0);

  const index = hash % bannerColors.length;
  return bannerColors[index];
};
