export const getZipcodeRelatedFields = () => {
  const elements = document.querySelectorAll("[data-zipcode-field]");

  if (!elements.length) return {};

  return [...elements].reduce((accumulator, element) => {
    const { zipcodeField } = element.dataset;
    accumulator[zipcodeField] = element;
    return accumulator;
  }, {});
};

export const populateZipcodeFields = (addressData = {}) => {
  const fields = getZipcodeRelatedFields();

  Object.entries(fields).forEach(([fieldName, inputElement]) => {
    inputElement.value = addressData[fieldName] ?? "";
  });
};

export const setZipcodeFieldsLoadingState = (isDisabled = true) => {
  const fields = getZipcodeRelatedFields();

  Object.values(fields).forEach((inputElement) => {
    inputElement.disabled = isDisabled;
  });
};

export const setToggleZipcodeSection = () => {
  const zipCodeCheckbox = document.querySelector("#should_include_address");

  if (!zipCodeCheckbox) return;

  zipCodeCheckbox.addEventListener("change", ({ target: { checked } }) => {
    const addressSection = document.getElementById("address-data");

    if (!addressSection) return;

    addressSection.classList.toggle("hidden", !checked);
  });
};
