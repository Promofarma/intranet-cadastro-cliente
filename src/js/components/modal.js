import { BaseElement } from "./base-element.js";

export class Modal extends BaseElement {
  getTemplate() {
    return `
      <style>
      .modal-wrapper {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity 300ms ease;
      }

      .modal-wrapper.open {
        opacity: 1;
        pointer-events: all;
      }

      .modal {
        position: relative;
        width: 100%;
        max-width: 32rem;
        margin: 0 auto;
        border: 1px solid #e5e7eb; /* paleta 200 */
        border-radius: 0.5rem;
        background-color: #f9fafb; /* paleta 50, mais suave que branco puro */
        opacity: 0;
        visibility: hidden;
        transform: scale(0.95) translateY(20px);
        transition: opacity 300ms ease, transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        overflow: auto;
        z-index: 1001;
      }

      .modal-wrapper.open .modal {
        opacity: 1;
        visibility: visible;
        transform: scale(1) translateY(0);
      }

      .modal-wrapper.open .overlay {
        pointer-events: all;
        opacity: 1;
      }

      .modal-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-align: center;
        padding: 1rem 1rem 0 1rem;
      }

      .modal-header .title {
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 600;
        color: #111827; /* paleta 900 - texto forte */
      }

      .modal-header .description {
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 500;
        color: #6b7280; /* paleta 500 - texto secundário */
      }

      .modal-icon-container {
        width: 4rem;
        height: 4rem;
        border-radius: 9999px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        background-color: #f3f4f6; /* paleta 100 */
        color: #4b5563; /* paleta 600 */
        margin: 0 auto;
      }

      .modal-icon-container svg {
        width: 1.5rem;
        height: 1.5rem;
        flex-shrink: 0;
        color: currentColor;
      }

      .modal-body {
        max-height: 24rem;
        overflow-y: auto;
        padding: 0rem 1rem 1rem 1rem;
        color: #374151; /* paleta 700 */
      }

      .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 1rem;
        gap: 1rem;
      }

      </style>

      <div class="modal-wrapper" data-target>
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
          <header class="modal-header">
            <div class="modal-icon-container warning">
              <slot name="icon"></slot>
            </div>
            <div>
              <h2 id="modal-title" class="title">
                <slot name="title"></slot>
              </h2>
              <p id="modal-description" class="description">
                <slot name="description"></slot>
              </p>
            </div>
          </header>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <footer class="modal-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
        <div class="overlay" data-overlay data-close></div>
      </div>
    `;
  }
}

customElements.define("modal-component", Modal);
