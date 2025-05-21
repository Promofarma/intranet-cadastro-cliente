export const dispatchCustomerConfirmingEvent = (args) => {
  const event = new CustomEvent("customer-confirming", { detail: args });
  document.dispatchEvent(event);
};

export const dispatchCustomerConfirmedEvent = (args) => {
  const event = new CustomEvent("customer-confirmed", { detail: args });
  document.dispatchEvent(event);
};

export const dispatchCustomerCreatedEvent = (args) => {
  const event = new CustomEvent("customer-created", { detail: args });
  document.dispatchEvent(event);
};
