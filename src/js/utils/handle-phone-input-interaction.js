import { phone as validatePhone } from "../validators/rules/phone.js";
import { displayErrors, clearFormErrors } from "./form-error-handler.js";

export const handlePhoneInputInteraction = (input) => {
  const { value } = input;

  if (value === "" || value === undefined || value === null) {
    return;
  }

  const isValid = validatePhone(value);

  if (!isValid) {
    displayErrors({
      phone: "Número de celular inválido",
    });
    return;
  }

  clearFormErrors();

  input.setCustomValidity(isValid ? "" : "Número de celular inválido");
};
