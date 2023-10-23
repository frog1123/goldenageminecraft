export const containsSpecialCharacters = (str: string) => {
  // Regular expression to match anything other than alphabet and digits
  const regex = /[^a-zA-Z0-9]/;
  return regex.test(str);
};
