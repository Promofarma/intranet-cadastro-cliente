export const cpf = (cpf) => {
  if (!cpf) return false;

  const rawValue = cpf.toString().replace(/\D/g, "");

  if (rawValue.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(rawValue)) return false;

  const calculateVerifierDigit = (base, factor) => {
    const total = base
      .split("")
      .map((number, index) => parseInt(number) * (factor - index))
      .reduce((sum, accumulator) => sum + accumulator, 0);

    const mod = (total * 10) % 11;
    return mod === 10 ? 0 : mod;
  };

  const base = rawValue.substring(0, 9);
  const digitOne = calculateVerifierDigit(base, 10);
  const digitTwo = calculateVerifierDigit(base + digitOne, 11);

  return rawValue === base + digitOne + digitTwo;
};
