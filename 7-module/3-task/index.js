export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.render();
    this.initClickListener();
  }

  render() {
    const slider = document.createElement('div');
    slider.className = 'slider';

    slider.innerHTML = `
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps"></div>
    `;

    const stepsContainer = slider.querySelector('.slider__steps');

    // Добавляем шаги
    for (let i = 0; i < this.steps; i++) {
      const span = document.createElement('span');
      if (i === this.value) {
        span.classList.add('slider__step-active');
      }
      stepsContainer.append(span);
    }

    return slider;
  }

  initClickListener() {
    this.elem.addEventListener('click', (event) => {
      const sliderRect = this.elem.getBoundingClientRect();
      const left = event.clientX - sliderRect.left;
      const leftRelative = left / this.elem.offsetWidth;

      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      const newValue = Math.round(approximateValue);
      const valuePercents = newValue / segments * 100;

      this.value = newValue;

      // Обновляем UI
      this.updateSliderUI(valuePercents, newValue);

      // Генерация события
      const customEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      });

      this.elem.dispatchEvent(customEvent);
    });
  }

  updateSliderUI(valuePercents, value) {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valueElem = this.elem.querySelector('.slider__value');
    const stepsSpans = this.elem.querySelectorAll('.slider__steps span');

    // Обновить положение и значение
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    valueElem.textContent = value;

    // Обновить активный шаг
    stepsSpans.forEach((span, index) => {
      span.classList.toggle('slider__step-active', index === value);
    });
  }
}
