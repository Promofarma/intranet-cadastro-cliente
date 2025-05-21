export const onCustomerConfirming = (callback) => {
  document.addEventListener("customer-confirming", (event) => {
    callback(event.detail);
  });
};
