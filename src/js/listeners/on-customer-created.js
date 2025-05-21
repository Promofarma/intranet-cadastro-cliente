export const onCustomerCreated = (callback) => {
  document.addEventListener("customer-created", (event) => {
    callback(event.detail);
  });
};
