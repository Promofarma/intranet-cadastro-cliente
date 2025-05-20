import { fetchStates } from "./../services/zipcode-service.js";
import { loadCitiesIntoSelect } from "./../modules/city-select-handler.js";
import { ucwords } from "./../utils/stringable.js";

export const loadStatesIntoSelect = async (stateSelect) => {
  stateSelect.disabled = true;
  stateSelect.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Selecione o estado";

  try {
    const states = await fetchStates();

    const stateOptions = states
      .map(({ sigla, nome }) => {
        const option = document.createElement("option");
        option.value = sigla.toUpperCase();
        option.textContent = ucwords(nome);
        return option;
      })
      .sort((a, b) => a.textContent.localeCompare(b.textContent));

    stateSelect.append(placeholderOption, ...stateOptions);
  } finally {
    stateSelect.disabled = false;
  }
};

export const setupLocationSelectHandler = async () => {
  const stateSelect = document.querySelector("#state");
  const citySelect = document.querySelector("#city");

  if (!stateSelect || !citySelect) return;

  await loadStatesIntoSelect(stateSelect);

  stateSelect.addEventListener(
    "change",
    async ({ target: { value: selectedState } }) => {
      if (selectedState) {
        await loadCitiesIntoSelect(selectedState, citySelect);
      }
    }
  );
};
