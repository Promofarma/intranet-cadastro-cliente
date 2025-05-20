import { loadCitiesIntoSelect } from "../modules/city-select-handler.js";
import {
  getZipcodeRelatedFields,
  populateZipcodeFields,
  setZipcodeFieldsLoadingState,
} from "../modules/zipcode-handler.js";
import { fetchAddressByZipcode } from "./../services/zipcode-service.js";
import { clearFormErrors, displayErrors } from "./form-error-handler.js";

export const handleZipcodeInputInteraction = async (input) => {
  const { value } = input;

  if (value === "" || value === undefined || value === null) {
    return;
  }

  clearFormErrors();

  setZipcodeFieldsLoadingState(true);

  try {
    const address = await fetchAddressByZipcode(value);

    populateZipcodeFields({
      zipcode: address.cep,
      street: address.logradouro,
      neighborhood: address.bairro,
      city: address.localidade,
      state: address.uf,
    });

    const { number, city } = getZipcodeRelatedFields();

    number?.focus();

    loadCitiesIntoSelect(address.uf, city, address.localidade);
  } catch (error) {
    displayErrors({
      zipcode: "CEP inválido",
    });

    populateZipcodeFields();
  } finally {
    setZipcodeFieldsLoadingState(false);
  }
};
