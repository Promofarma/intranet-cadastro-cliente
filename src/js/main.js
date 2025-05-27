import { dispatch } from "./events/toggle.js";

import { setupMask } from "./utils/mask.js";
import { setupFormHandler } from "./modules/form-handler.js";
import { setupLocationSelectHandler } from "./modules/location-select-handler.js";

import { setToggleZipcodeSection } from "./modules/zipcode-handler.js";

import { handleCpfInputInteraction } from "./utils/handle-cpf-input-interaction.js";
import { handlePhoneInputInteraction } from "./utils/handle-phone-input-interaction.js";
import { handleZipcodeInputInteraction } from "./utils/handle-zipcode-input-interaction.js";

import { setupGenerateReferenceLink } from "./modules/generate-reference-link.js";

import "./components/drawer.js";
import "./components/modal.js";

import "./modules/customer-data-modal-handler.js";
import "./modules/submit-confirmed-customer.js";

window.addEventListener("DOMContentLoaded", () => {
  // register event
  setupMask();
  setupFormHandler();
  setupLocationSelectHandler();
  setToggleZipcodeSection();
  setupGenerateReferenceLink();

  // global functions
  window.dispatch = dispatch;
  window.handleCpfInputInteraction = handleCpfInputInteraction;
  window.handlePhoneInputInteraction = handlePhoneInputInteraction;
  window.handleZipcodeInputInteraction = handleZipcodeInputInteraction;
});
