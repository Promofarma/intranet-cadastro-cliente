export const createCustomer = async (payload) => {
  try {
    const response = await api("/customer", {
      method: "POST",
      body: JSON.stringify({
        nome: payload.name,
        email: payload.email,
        cpf: payload.cpf,
        celular: payload.phone,
        data_nascimento: payload.birth_date,
        genero: payload.gender,
        vendedor: payload.seller,
        loja: 1,
      }),
    });

    const status = response.status;

    const result = await response.json();

    return {
      status,
      data: result?.data ?? null,
      errors:
        status === 422 && typeof result.errors === "object"
          ? result.errors
          : null,
    };
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return {
      status: 500,
      data: null,
      errors: null,
    };
  }
};

export const createCustomerAddress = async (customerUuid, payload) => {
  try {
    const response = await api("/customer/address", {
      method: "POST",
      body: JSON.stringify({
        cliente_uuid: customerUuid,
        cep: payload.zipcode,
        endereco: payload.street,
        numero: payload.number,
        bairro: payload.neighborhood,
        complemento: payload.complement,
        referencia: payload.reference,
        cidade: payload.city,
        estado: payload.state,
      }),
    });

    const status = response.status;

    const data = await response.json();

    return {
      status,
      data: data?.data ?? null,
      errors:
        status === 422 && typeof data.errors === "object" ? data.errors : null,
    };
  } catch (error) {
    console.error("Erro ao criar endereço do cliente:", error);
    return {
      status: 500,
      data: null,
      errors: null,
    };
  }
};
