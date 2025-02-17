// Quantity Selector
class QuantityPicker {
    constructor() {
        this.value = 1;
        this.valueElement = document.querySelector('.quantity-picker__value');
        this.decreaseBtn = document.querySelector('.quantity-picker__btn--decrease');
        this.increaseBtn = document.querySelector('.quantity-picker__btn--increase');

        this.init();
    }

    init() {
        this.decreaseBtn.addEventListener('click', () => this.decrease());
        this.increaseBtn.addEventListener('click', () => this.increase());
    }

    decrease() {
        if (this.value > 1) {
            this.value--;
            this.updateDisplay();
        }
    }

    increase() {
        this.value++;
        this.updateDisplay();
    }

    updateDisplay() {
        this.valueElement.textContent = this.value;
    }
}

// Color Picker
class ColorPicker {
    constructor() {
        this.options = document.querySelectorAll('.color-picker__option:not(.color-picker__option--disabled)');
        this.init();
    }

    init() {
        this.options.forEach(option => {
            option.addEventListener('click', () => this.selectColor(option));
        });
    }

    selectColor(selectedOption) {
        this.options.forEach(option => {
            option.classList.remove('color-picker__option--selected');
        });
        selectedOption.classList.add('color-picker__option--selected');
    }
}

// Size Picker
class SizePicker {
    constructor() {
        this.options = document.querySelectorAll('.size-picker__option:not(.size-picker__option--disabled)');
        this.init();
    }

    init() {
        this.options.forEach(option => {
            option.addEventListener('click', () => this.selectSize(option));
        });
    }

    selectSize(selectedOption) {
        this.options.forEach(option => {
            option.classList.remove('size-picker__option--selected');
        });
        selectedOption.classList.add('size-picker__option--selected');
    }
}

// Wishlist Toggle
class WishlistButton {
    constructor() {
        this.buttons = document.querySelectorAll('.product-card__wishlist, .product-item__wishlist');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.toggle(e));
        });
    }

    toggle(event) {
        const icon = event.currentTarget.querySelector('i');
        icon.classList.toggle('fa-regular');
        icon.classList.toggle('fa-solid');
    }
}

// Add to Cart
class AddToCart {
    constructor() {
        this.button = document.querySelector('.product-card__add-to-cart');
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => this.addToCart());
    }

    addToCart() {
        const selectedColor = document.querySelector('.color-picker__option--selected');
        const selectedSize = document.querySelector('.size-picker__option--selected');
        const quantity = document.querySelector('.quantity-picker__value').textContent;

        if (!selectedColor || !selectedSize) {
            alert('Please select both color and size');
            return;
        }

        // Add your cart logic here
        console.log({
            product: 'Bomber Jacket',
            color: selectedColor.classList.toString(),
            size: selectedSize.textContent,
            quantity: parseInt(quantity)
        });
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    new QuantityPicker();
    new ColorPicker();
    new SizePicker();
    new WishlistButton();
    new AddToCart();
});