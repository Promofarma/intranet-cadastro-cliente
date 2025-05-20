import { cpf as validateCpf } from "../validators/rules/cpf.js";
import { displayErrors, clearFormErrors } from "./form-error-handler.js";

export const handleCpfInputInteraction = (input) => {
  const { value } = input;

  if (value === "" || value === undefined || value === null) {
    return;
  }

  const isValid = validateCpf(value);

  if (!isValid) {
    displayErrors({
      cpf: "CPF inválido",
    });
    return;
  }

  clearFormErrors();

  input.setCustomValidity(isValid ? "" : "CPF inválido");
};
