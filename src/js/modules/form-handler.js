import { validate } from "./../validators/validator.js";
import { customerSchema } from "./../validators/schemas/customer-schama.js";
import { customerAddressSchema } from "./../validators/schemas/customer-address-schema.js";
import { displayErrors } from "./../utils/form-error-handler.js";
import { dispatch } from "../events/toggle.js";
import { dispatchCustomerConfirmingEvent } from "../events/customer-events.js";

export const setupFormHandler = () => {
  const formElement = document.querySelector("#create_customer_form");

  if (!formElement) {
    throw new Error("Formulário de cliente não encontrado.");
  }

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(formElement);
    const includeAddress = formData.get("should_include_address") === "on";

    let allErrors = {};

    const { validated: customerData, errors: customerErrors } = validate(
      formData,
      customerSchema
    );

    allErrors = { ...allErrors, ...customerErrors };

    let addressData = null;

    if (includeAddress) {
      const { validated, errors } = validate(formData, customerAddressSchema);
      addressData = validated;
      allErrors = { ...allErrors, ...errors };
    }

    if (Object.keys(allErrors).length > 0) {
      displayErrors(allErrors);
      return;
    }

    dispatch.close({ id: "#create_customer" });

    setTimeout(() => {
      dispatch.open({ id: "#confirm_create_customer" });

      dispatchCustomerConfirmingEvent({
        customerData,
        addressData,
      });
    }, 300);
  });
};
