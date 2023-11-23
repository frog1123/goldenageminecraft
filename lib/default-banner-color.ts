// possible banner colors
const bannerColors: string[] = ["#3fc68e", "#289dba", "#a056ce", "#d16236", "#d3b51f"];

//  uuid -> banner color (user id doesn't chnage)
export const defaultBannerColor = (uuid: string) => {
  // convert uuid to a numeric value
  const hash = uuid.split("-").reduce((acc, segment) => {
    return acc + parseInt(segment, 16);
  }, 0);

  const index = hash % bannerColors.length;
  return bannerColors[index];
};
