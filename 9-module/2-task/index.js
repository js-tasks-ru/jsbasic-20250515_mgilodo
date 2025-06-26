import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {}

  async render() {
    // 1. Инициализация компонентов

    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    // 2. Загрузка товаров с сервера
    const response = await fetch('products.json');
    this.products = await response.json();

    this.productsGrid = new ProductsGrid(this.products);

    const productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = ''; // Очистка от заглушки
    productsGridHolder.append(this.productsGrid.elem);

    // 3. Установка начальных фильтров
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    // 4. Обработчики пользовательских событий

    document.body.addEventListener('product-add', (event) => {
      const productId = event.detail;
      const product = this.products.find(p => p.id === productId);
      if (product) {
        this.cart.addProduct(product);
      }
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      const value = event.detail;
      this.productsGrid.updateFilter({ maxSpiciness: value });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      const categoryId = event.detail;
      this.productsGrid.updateFilter({ category: categoryId });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({ noNuts: event.target.checked });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
    });
  }
}
