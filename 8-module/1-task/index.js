import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetHeight || !this.elem.offsetWidth) {
      // Если иконка не отображается (её нет или корзина пуста) — ничего не делаем
      return;
    }

    // Не перемещаем иконку на мобильных устройствах
    if (document.documentElement.clientWidth <= 767) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
      return;
    }

    if (!this.initialTopCoord) {
      // Запоминаем начальную координату один раз
      this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    if (window.pageYOffset > this.initialTopCoord) {
      // Вычисляем отступ слева
      const containerRight = document.querySelector('.container').getBoundingClientRect().right;
      const windowWidth = document.documentElement.clientWidth;

      let leftIndent = Math.min(
        containerRight + 20,
        windowWidth - this.elem.offsetWidth - 10
      ) + 'px';

      // Применяем фиксированное позиционирование
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        left: leftIndent,
        zIndex: 1000
      });
    } else {
      // Возвращаем стили как было
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        left: '',
        zIndex: ''
      });
    }
  }
}
