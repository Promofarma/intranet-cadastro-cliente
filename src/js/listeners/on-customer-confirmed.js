export const onCustomerConfirmed = (callback) => {
  document.addEventListener("customer-confirmed", (event) => {
    callback(event.detail);
  });
};
