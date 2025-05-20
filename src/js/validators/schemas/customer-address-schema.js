export const customerAddressSchema = {
  zipcode: {
    rules: ["required", "max:9"],
    message: {
      required: "O campo cep é obrigatório",
      max: "CEP inválido",
    },
  },
  street: {
    rules: ["required", "max:255"],
    message: {
      required: "O campo endereço é obrigatório",
      max: "Endereço deve conter no máximo 255 caracteres",
    },
  },
  neighborhood: {
    rules: ["required", "max:255"],
    message: {
      required: "O campo bairro é obrigatório",
      max: "Bairro deve conter máximo 255 caracteres",
    },
  },
  city: {
    rules: ["required"],
    message: {
      required: "O campo cidade é obrigatório",
    },
  },
  state: {
    rules: ["required", "max:2"],
    message: {
      required: "O campo estado é obrigatório",
      max: "Estado deve conter máximo 2 caracteres",
    },
  },
};
