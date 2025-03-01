export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const reverse = (str: string): string => {
  return str.split('').reverse().join('');
};