import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.render();
    this.onKeyDown = this.handleKeyDown.bind(this);
    this.initCloseHandlers();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('modal');

    wrapper.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    `;

    return wrapper;
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.onKeyDown);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.onKeyDown);
  }

  setTitle(title) {
    const titleElem = this.elem.querySelector('.modal__title');
    titleElem.textContent = title;
  }

  setBody(node) {
    const bodyElem = this.elem.querySelector('.modal__body');
    bodyElem.innerHTML = ''; // Очистить содержимое
    bodyElem.append(node);   // Вставить новый узел
  }

  initCloseHandlers() {
    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());
  }

  handleKeyDown(event) {
    if (event.code === 'Escape') {
      this.close();
    }
  }
}
