import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;       // Исходный список всех продуктов
    this.filters = {};              // Объект текущих фильтров
    this.render();                  // Создаём DOM-структуру
    this.updateFilter({});         // Показываем все товары изначально
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          <!-- Сюда будут добавлены карточки товаров -->
        </div>
      </div>
    `);

    this.inner = this.elem.querySelector('.products-grid__inner');
  }

  updateFilter(newFilters) {
    // Обновляем фильтры, не сбрасывая старые
    Object.assign(this.filters, newFilters);

    // Очищаем текущее содержимое
    this.inner.innerHTML = '';

    // Применяем фильтрацию к списку товаров
    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) {
        continue;
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        continue;
      }

      if (
        this.filters.maxSpiciness !== undefined &&
        product.spiciness > this.filters.maxSpiciness
      ) {
        continue;
      }

      if (
        this.filters.category &&
        product.category !== this.filters.category
      ) {
        continue;
      }

      // Создаём и добавляем карточку товара
      let card = new ProductCard(product);
      this.inner.append(card.elem);
    }
  }
}
