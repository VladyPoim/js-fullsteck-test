export function roundToPrecision(amount: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.ceil(amount * factor) / factor;
}
