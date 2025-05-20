export const setupFormHandler = () => {
  const formElement = document.querySelector("#create_customer_form");

  if (!formElement) {
    throw new Error("Form element not found");
  }

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.target);

    console.log("form submitted");
  });
};
