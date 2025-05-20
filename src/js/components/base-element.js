export class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    requestAnimationFrame(() => this.removeAttribute("cloak"));

    document.addEventListener("open", this.handleOpen);
    document.addEventListener("close", this.handleClose);
    document.addEventListener("keydown", this.handleKeyDown);

    this.shadowRoot.addEventListener("click", (e) => {
      const target = e.target.closest("[data-close]");
      if (target) {
        document.dispatchEvent(
          new CustomEvent("close", { detail: { id: "#" + this.id } })
        );
      }
    });
  }

  disconnectedCallback() {
    document.removeEventListener("open", this.handleOpen);
    document.removeEventListener("close", this.handleClose);
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleOpen = ({ detail }) => {
    if (detail.id === "#" + this.id) {
      this.currentElement.classList.add("open");
      this.focusFirstElement();
    }
  };

  handleClose = ({ detail }) => {
    if (detail.id === "#" + this.id) {
      this.currentElement.classList.remove("open");
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Escape") {
      document.dispatchEvent(
        new CustomEvent("close", { detail: { id: "#" + this.id } })
      );
    }
  };

  focusFirstElement() {
    const focusable = this.shadowRoot.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) focusable.focus();
  }

  getCommonStyles() {
    return `
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(17, 24, 39, 0.5); 
        z-index: 999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 300ms ease;
      }

      .close-button {
        cursor: pointer;
        border: none;
        background-color: #f3f4f6; 
        width: 2rem;
        height: 2rem;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9ca3af; /* paleta 400 */
        transition: background-color 300ms ease, color 300ms ease;
      }

      .close-button:hover {
        background-color: #e5e7eb; 
        color: #4b5563; 
      }

      .close-button svg {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        color: currentColor;
      }

    `;
  }

  getTemplate() {
    return ``;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${this.getCommonStyles()}
      </style>
      ${this.getTemplate()}
    `;
    this.currentElement = this.shadowRoot.querySelector("[data-target]");
  }
}
