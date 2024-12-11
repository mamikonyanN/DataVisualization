export const generateUniqueKey = () => Math.random().toString(36).slice(2, 9)
export const coeff = (maxValue: number, maxHeight: number) => (value: number) =>
  (value / maxValue) * maxHeight
