import { fetchCitiesByState } from "./../services/zipcode-service.js";
import { ucwords } from "./../utils/stringable.js";

export const loadCitiesIntoSelect = async (
  state,
  citySelect,
  selectedCity = ""
) => {
  if (!state || !citySelect) return;

  citySelect.disabled = true;
  citySelect.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Selecione a cidade";

  try {
    const cities = await fetchCitiesByState(state);

    const cityOptions = cities
      .map(({ nome }) => {
        const cityName = ucwords(nome);
        const option = document.createElement("option");
        option.value = cityName;
        option.textContent = cityName;
        return option;
      })
      .sort((a, b) => a.textContent.localeCompare(b.textContent));

    citySelect.append(placeholderOption, ...cityOptions);

    if (selectedCity) {
      citySelect.value = ucwords(selectedCity);
    }
  } finally {
    citySelect.disabled = false;
  }
};
