const BASE_URL = "http://promoclube.promofarma.com.br/api/v1";

export const httpClient = async (uri, options) => {
  return await fetch(BASE_URL + uri, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...options,
  });
};
