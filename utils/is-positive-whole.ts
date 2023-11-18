export const isPositiveWholeNumber = (str: string) => {
  const number: number = parseInt(str, 10);

  return !isNaN(number) && number > 0 && Number.isInteger(number);
};
