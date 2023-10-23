export const hasDuplicates = (arr: any[]) => {
  return new Set(arr).size !== arr.length;
};
