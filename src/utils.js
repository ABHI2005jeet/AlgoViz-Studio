export const randomArray = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 95) + 5);