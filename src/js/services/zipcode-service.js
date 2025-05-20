import { get, put } from "../utils/local-storage.js";

const BASE_URL = "https://brasilapi.com.br/api";

export const fetchAddressByZipcode = async (zipcode) => {
  if (!zipcode) {
    throw new Error("CEP é obrigatório.");
  }

  const rawValue = zipcode.toString().replace(/\D/g, "");

  if (/^(\d)\1{7}$/.test(rawValue)) {
    throw new Error("CEP inválido.");
  }

  try {
    const response = await fetch(
      "https://viacep.com.br/ws/" + rawValue + "/json"
    );
    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado.");
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar endereço por CEP:", error);
    throw error;
  }
};

export const fetchCitiesByState = async (stateCode) => {
  const CACHE_KEY = `cities_${stateCode.toLowerCase()}`;
  const cached = get(CACHE_KEY);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/ibge/municipios/v1/${stateCode}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    put(CACHE_KEY, data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar cidades:", error);
    throw error;
  }
};

export const fetchStates = async () => {
  const CACHE_KEY = "states";
  const cached = get(CACHE_KEY);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(`${BASE_URL}/ibge/uf/v1`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar estados.");
    }

    const data = await response.json();
    put(CACHE_KEY, data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar estados:", error);
    throw error;
  }
};
