export const containsSpecialCharacters = (str: string) => {
  // Regular expression to match anything other than alphabet, digits, period, and dash
  const regex = /[^a-zA-Z0-9.\-]/;
  return regex.test(str);
};
