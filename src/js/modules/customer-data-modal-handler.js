import { onCustomerConfirming } from "../listeners/on-customer-confirming.js";
import { dispatchCustomerConfirmedEvent } from "../events/customer-events.js";
import { dispatch } from "../events/toggle.js";

const labels = {
  name: "Nome",
  email: "E-mail",
  cpf: "CPF",
  phone: "Celular",
  birth_date: "Data de Nascimento",
  gender: "Gênero",
  zipcode: "CEP",
  street: "Endereço",
  number: "Número",
  neighborhood: "Bairro",
  complement: "Complemento",
  reference: "Referência",
  city: "Cidade",
  state: "Estado",
  seller: "Vendedor",
};

const renderField = (key, value) => {
  const label = labels[key] ?? key;
  const displayValue = value === "" ? "Não informado" : value;

  return `
    <div class="field">
      <dt class="field-label">${label}:</dt>
      <dd class="field-value">${displayValue}</dd>
    </div>`;
};

const renderSection = (sectionTitle, sectionData) => {
  const fieldsHTML = Object.entries(sectionData)
    .map(([key, value]) => renderField(key, value))
    .join("");

  return `
    <section class="section">
      <header class="section-header">
        <h3 class="section-title">${sectionTitle}</h3>
        <p class="section-description">
          Confira os dados abaixo com total atenção
        </p>
      </header>
      <dl class="section-content">${fieldsHTML}</dl>
    </section>`;
};

const renderCustomerData = (data) => {
  const container = document.querySelector("#modal_customer_data");

  if (!container) return;

  const sectionsHTML = Object.entries(data)
    .filter(([, values]) => values)
    .map(([sectionTitle, sectionData]) =>
      renderSection(sectionTitle, sectionData)
    )
    .join("");

  container.innerHTML = sectionsHTML;
};

const handleConfirmCreateCustomer = ({ customerData, addressData }) => {
  if (!customerData) return;

  const store = document.querySelector("body").dataset.store;

  if (store) {
    customerData.store = parseInt(store);
  }

  const confirmButton = document.querySelector(
    "#confirm_create_customer_button"
  );

  if (!confirmButton) return;

  const handler = () => {
    dispatchCustomerConfirmedEvent({ customerData, addressData });
    dispatch.close({ id: "#confirm_create_customer" });
    confirmButton.removeEventListener("click", handler);
  };

  confirmButton.removeEventListener("click", handler);
  confirmButton.addEventListener("click", handler);
};

onCustomerConfirming(({ customerData, addressData }) => {
  renderCustomerData({
    "Informações pessoais": customerData,
    "Endereço de entrega": addressData,
  });

  handleConfirmCreateCustomer({ customerData, addressData });
});
