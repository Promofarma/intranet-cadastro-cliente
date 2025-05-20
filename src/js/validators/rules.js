import { cpf } from "./rules/cpf.js";
import { phone } from "./rules/phone.js";

export const rules = {
  required: (value) => !!value,
  cpf: (value) => cpf(value),
  phone: (value) => phone(value),
  min: (value, min) => value?.length >= parseInt(min, 10),
  max: (value, max) => value?.length <= parseInt(max, 10),
};
