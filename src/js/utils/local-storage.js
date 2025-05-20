export const get = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const put = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const forget = (key) => {
  localStorage.removeItem(key);
};

export const flush = () => {
  localStorage.clear();
};
