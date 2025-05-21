import { onCustomerConfirmed } from "../listeners/on-customer-confirmed.js";
import {
  createCustomer,
  createCustomerAddress,
} from "../services/customer-service.js";
import { dispatch } from "../events/toggle.js";
import { displayErrors, clearFormErrors } from "../utils/form-error-handler.js";

const mapper = {
  nome: "name",
  celular: "phone",
  data_nascimento: "birth_date",
  genero: "gender",
  loja: "store",
};

const mapErrors = (errors) => {
  const mappedErrors = {};

  Object.entries(errors).forEach(([key, values]) => {
    const newKey = mapper[key] ?? key;
    const newValues = values.map((value) => `<p>${value}</p>`).join("");

    mappedErrors[newKey] = newValues;
  });

  displayErrors(mappedErrors);
};

onCustomerConfirmed(async ({ customerData, addressData }) => {
  const { status, data, errors } = await createCustomer(customerData);

  if (status === 422) {
    clearFormErrors();
    mapErrors(errors);
    dispatch.close({ id: "#confirm_create_customer" });

    setTimeout(() => {
      dispatch.open({ id: "#create_customer" });
    });

    return;
  }

  if (addressData) {
    await createCustomerAddress(data.uuid, addressData);
  }

  dispatch.open({ id: "#create_successful" });

  document.querySelector("#create_customer_form").reset();
});
