const PLACEHOLDER = "#";

export const mask = (pattern) => {
  if (!pattern) throw new Error("Pattern not defined.");

  return (input) => {
    if (input === undefined || input === null) {
      throw new Error("Input is required.");
    }

    const digits = input.toString().replace(/\D/g, "");
    let formatted = "";
    let digitIndex = 0;

    for (const char of pattern) {
      if (char === PLACEHOLDER) {
        if (digitIndex >= digits.length) break;
        formatted += digits[digitIndex++];
      } else {
        if (digitIndex < digits.length) {
          formatted += char;
        }
      }
    }

    return formatted;
  };
};

export const setupMask = () => {
  document.addEventListener("input", ({ target }) => {
    const { dataset, value } = target;

    if (!dataset.mask) return;

    const pattern = dataset.mask;

    if (!pattern) return;

    target.value = mask(pattern)(value);
  });
};
