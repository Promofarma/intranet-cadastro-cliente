export const setupGenerateReferenceLink = () => {
  const modal = document.querySelector("#modal-create-reference-link");
  if (!modal) return;

  const input = modal.querySelector("#create-reference-link-seller");
  const result = modal.querySelector("#create-reference-link-result");
  const error = modal.querySelector("#create-reference-link-seller-error");
  const button = modal.querySelector("#create-reference-link-button");

  if (!input || !result || !error || !button) return;

  const reset = () => {
    input.value = "";
    error.textContent = "";
    input.classList.remove("error");
    result.classList.remove("show");
    result.textContent = "";
  };

  button.addEventListener("click", (event) => {
    event.preventDefault();

    reset();

    const value = input.value.trim();

    if (value.length < 4) {
      input.classList.add("error");
      error.textContent = "Vendedor inválido";
      return;
    }

    const baseUrl = "https://promoclube.promofarma.com.br/customer/register";
    const url = `${baseUrl}?utm_source=intranet&utm_medium=offline&utm_campaign=${encodeURIComponent(
      value
    )}&utm_content=modal-intranet`;

    result.classList.add("show");
    result.textContent = url;
  });

  document.addEventListener("open", ({ detail }) => {
    if (detail.id === "#modal-create-reference-link") {
      reset();
    }
  });
};
