export const ucwords = (str) => {
  if (!str) {
    throw new Error("String is required.");
  }

  return str
    .toLowerCase()
    .split(" ")
    .filter((word) => word.trim())
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
