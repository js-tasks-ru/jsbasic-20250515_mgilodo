import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.initRibbonScroll();
    this.initCategorySelect();
  }

  render() {
    // Корневой элемент
    const ribbon = document.createElement('div');
    ribbon.classList.add('ribbon');

    // Левая стрелка
    const arrowLeft = document.createElement('button');
    arrowLeft.className = 'ribbon__arrow ribbon__arrow_left';
    arrowLeft.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    ribbon.append(arrowLeft);

    // Лента с категориями
    const ribbonInner = document.createElement('nav');
    ribbonInner.className = 'ribbon__inner';

    for (let category of this.categories) {
      const item = document.createElement('a');
      item.href = '#';
      item.className = 'ribbon__item';
      item.dataset.id = category.id;
      item.textContent = category.name;

      ribbonInner.append(item);
    }

    ribbon.append(ribbonInner);

    // Правая стрелка
    const arrowRight = document.createElement('button');
    arrowRight.className = 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';
    arrowRight.innerHTML = `<img src="/assets/images/icons/angle-icon.svg" alt="icon">`;
    ribbon.append(arrowRight);

    this.ribbon = ribbon;
    this.ribbonInner = ribbonInner;
    this.arrowLeft = arrowLeft;
    this.arrowRight = arrowRight;

    // Скрыть левую стрелку по умолчанию
    this.updateArrows();

    return ribbon;
  }

  initRibbonScroll() {
    // Прокрутка вправо
    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    // Прокрутка влево
    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

    // Обновление видимости стрелок при прокрутке
    this.ribbonInner.addEventListener('scroll', () => {
      this.updateArrows();
    });
  }

  updateArrows() {
    let scrollLeft = this.ribbonInner.scrollLeft;
    let scrollRight = this.ribbonInner.scrollWidth - scrollLeft - this.ribbonInner.clientWidth;

    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }
  }

  initCategorySelect() {
    this.ribbonInner.addEventListener('click', (event) => {
      if (!event.target.classList.contains('ribbon__item')) return;

      event.preventDefault();

      const activeItem = this.ribbonInner.querySelector('.ribbon__item_active');
      if (activeItem) {
        activeItem.classList.remove('ribbon__item_active');
      }

      event.target.classList.add('ribbon__item_active');

      const categoryId = event.target.dataset.id;
      const customEvent = new CustomEvent('ribbon-select', {
        detail: categoryId,
        bubbles: true
      });

      this.elem.dispatchEvent(customEvent);
    });
  }
}
