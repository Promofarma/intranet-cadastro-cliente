const BASE_URL = "http://192.168.1.11:8184/api/v1";

export const httpClient = async (uri, options) => {
  return await fetch(BASE_URL + uri, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...options,
  });
};
