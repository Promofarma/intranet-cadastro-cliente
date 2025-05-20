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
