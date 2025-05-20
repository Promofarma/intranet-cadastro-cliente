import { closeIcon } from "../../assets/icons/close-icon.js";
import { BaseElement } from "./base-element.js";

export class Drawer extends BaseElement {
  getTemplate() {
    return `
      <style>
      .drawer {
        position: fixed;
        top: 1rem;
        right: 1rem;
        background-color: #f9fafb; 
        width: 100%;
        max-width: 25rem;
        height: calc(100% - 2rem);
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        transform: translateX(calc(100% + 1rem));
        transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
        z-index: 1000;
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.1); 
      }

      .drawer.open {
        transform: translateX(0);
      }

      .drawer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        flex-shrink: 0;
        border-bottom: 1px solid #e5e7eb; 
      }

      .drawer-header .title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
        font-variant: normal;
        color: #111827; 
      }

      .drawer-body {
        flex: 1 1 0;
        padding: 1rem;
        overflow-y: auto;
        color: #4b5563; 
      }

      .drawer-footer {
        padding: 1rem;
        flex-shrink: 0;
        border-top: 1px solid #e5e7eb; 
      }

      .drawer.open ~ .overlay {
        opacity: 1;
        pointer-events: all;
      }
      </style>

      <div class="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" data-target>
        <header class="drawer-header">
            <h2 id="drawer-title" class="title">
                <slot name="title">Título</slot>
            </h2>
            <button id="close-drawer" class="close-button" aria-label="Fechar" data-close>
                ${closeIcon()}
            </button>
        </header>
        <div class="drawer-body">
          <slot name="body"></slot>
        </div>
        <div class="drawer-footer">
          <slot name="footer"></slot>
        </div>
      </div>
       <div class="overlay" data-overlay data-close></div>
    `;
  }
}

customElements.define("drawer-component", Drawer);
