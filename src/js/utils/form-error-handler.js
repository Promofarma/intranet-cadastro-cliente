import { scrollToElement } from "./../utils/scroll-to-element.js";

export const displayErrors = (errors) => {
  let firstErrorElement = null;

  Object.entries(errors).forEach(([field, message]) => {
    const inputElement = document.querySelector("#" + field);
    const errorElement = document.querySelector("#" + field + "-error-message");

    if (!inputElement || !errorElement) return;

    inputElement.classList.add("error");
    errorElement.innerHTML = message;

    if (!firstErrorElement) {
      firstErrorElement = inputElement;
    }
  });

  if (firstErrorElement) {
    scrollToElement(firstErrorElement.parentElement);
  }
};

export const clearFormErrors = () => {
  document
    .querySelectorAll(".error")
    .forEach((el) => el.classList.remove("error"));
  document
    .querySelectorAll("[id$='-error-message']")
    .forEach((el) => (el.textContent = ""));
};
