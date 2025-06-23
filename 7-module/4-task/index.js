export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.render();
    this.initClickListener();
    this.initDragAndDrop();
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
    for (let i = 0; i < this.steps; i++) {
      const span = document.createElement('span');
      if (i === this.value) span.classList.add('slider__step-active');
      stepsContainer.append(span);
    }

    return slider;
  }

  initClickListener() {
    this.elem.addEventListener('click', (event) => {
      const left = event.clientX - this.elem.getBoundingClientRect().left;
      const leftRelative = left / this.elem.offsetWidth;

      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      const newValue = Math.round(approximateValue);
      const valuePercents = newValue / segments * 100;

      this.setValue(newValue);
      this.updateSliderUI(valuePercents, newValue);

      this.dispatchChangeEvent();
    });
  }

  initDragAndDrop() {
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();

      this.elem.classList.add('slider_dragging');

      const onPointerMove = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;

        if (leftRelative < 0) leftRelative = 0;
        if (leftRelative > 1) leftRelative = 1;

        const leftPercents = leftRelative * 100;

        const segments = this.steps - 1;
        const approximateValue = leftRelative * segments;
        const newValue = Math.round(approximateValue);

        this.updateSliderUI(leftPercents, newValue);
      };

      const onPointerUp = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;

        if (leftRelative < 0) leftRelative = 0;
        if (leftRelative > 1) leftRelative = 1;

        const segments = this.steps - 1;
        const approximateValue = leftRelative * segments;
        const newValue = Math.round(approximateValue);
        const valuePercents = newValue / segments * 100;

        this.setValue(newValue);
        this.updateSliderUI(valuePercents, newValue);
        this.dispatchChangeEvent();

        this.elem.classList.remove('slider_dragging');
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      };

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });
  }

  setValue(value) {
    this.value = value;
  }

  updateSliderUI(valuePercents, value) {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valueElem = this.elem.querySelector('.slider__value');
    const stepsSpans = this.elem.querySelectorAll('.slider__steps span');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    valueElem.textContent = value;

    stepsSpans.forEach((span, index) => {
      span.classList.toggle('slider__step-active', index === value);
    });
  }

  dispatchChangeEvent() {
    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }
}
