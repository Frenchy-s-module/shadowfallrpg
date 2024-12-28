export class CountableInput {
    constructor(element) {
        this.element = element;
        this.valueElement = element.querySelector('.shf-countable-value');
        this.minusButton = element.querySelector('.shf-countable-minus');
        this.plusButton = element.querySelector('.shf-countable-plus');
        
        this._initializeListeners();
    }

    _initializeListeners() {
        this.minusButton.addEventListener('click', () => this._decrement());
        this.plusButton.addEventListener('click', () => this._increment());
    }

    getValue() {
        return parseInt(this.valueElement.textContent) || 0;
    }

    setValue(newValue) {
        // Ensure the value is never negative
        const validValue = Math.max(0, newValue);
        this.valueElement.textContent = validValue;
    }

    _increment() {
        this.setValue(this.getValue() + 1);
    }

    _decrement() {
        this.setValue(this.getValue() - 1);
    }
}