export const customerSchema = {
  name: {
    rules: ["required"],
    message: {
      required: "O campo nome é obrigatório",
    },
  },
  email: {
    rules: ["required"],
    message: {
      required: "O campo e-mail é obrigatório",
    },
  },
  cpf: {
    rules: ["required", "cpf", "max:14"],
    message: {
      required: "O campo celular é obrigatório",
      cpf: "CPF inválido",
    },
  },
  phone: {
    rules: ["required", "phone"],
    message: {
      required: "O campo celular é obrigatório",
      phone: "Numero de celular inválido",
    },
  },
  birth_date: {
    rules: [],
    message: {},
  },
  gender: {
    rules: [],
    message: {},
  },
  seller: {
    rules: ["required", "min:4", "max:5"],
    message: {
      required: "O campo vendedor é obrigatório",
      min: "Código de vendedor deve ter no mínimo 4 caracteres",
      max: "Código de vendedor deve ter no máximo 5 caracteres",
    },
  },
};
