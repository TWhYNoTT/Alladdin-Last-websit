class CartManager {
    constructor() {
        this.form = document.querySelector('#cart-form');
        this.initEventListeners();
        this.updateSummary();
    }

    initEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            // e.preventDefault();
            this.handleFormSubmit();
        });

        // Select all checkbox
        const selectAllCheckbox = this.form.querySelector('.select-all input');
        selectAllCheckbox?.addEventListener('change', (e) => {
            const checkboxes = this.form.querySelectorAll('.product-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
            });
            this.updateSummary();
        });

        // Individual product checkboxes
        const productCheckboxes = this.form.querySelectorAll('.product-checkbox');
        productCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateSummary());
        });

        // Quantity controls
        const quantityControls = this.form.querySelectorAll('.quantity-controls');
        quantityControls.forEach(control => {
            const minusBtn = control.querySelector('.quantity-btn:first-child');
            const plusBtn = control.querySelector('.quantity-btn:last-child');
            const quantityInput = control.querySelector('input[type="number"]');

            minusBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                let quantity = parseInt(quantityInput.value);
                if (quantity > 0) {
                    quantityInput.value = quantity - 1;
                    this.updateSummary();
                }
            });

            plusBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                let quantity = parseInt(quantityInput.value);
                quantityInput.value = quantity + 1;
                this.updateSummary();
            });

            // Add input event listener for direct value changes
            quantityInput?.addEventListener('input', () => {
                if (quantityInput.value < 0) {
                    quantityInput.value = 0;
                }
                this.updateSummary();
            });
        });

        // Delete buttons
        const deleteButtons = this.form.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    productCard.remove();
                    this.updateSummary();
                    this.updateProductCount();
                }
            });
        });

        // Clear all button
        const clearAllBtn = this.form.querySelector('.clear-all');
        clearAllBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to clear all items?')) {
                const products = this.form.querySelectorAll('.product-card');
                products.forEach(product => product.remove());
                this.updateSummary();
                this.updateProductCount();
            }
        });

        // Apply coupon button
        const applyBtn = this.form.querySelector('.coupon-apply-btn');
        applyBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            const couponField = this.form.querySelector('input[name="coupon"]');
            if (couponField?.value.trim() === '65qwR151') {
                this.form.querySelector('.discount-message').style.display = 'block';
                this.updateSummary();
            } else {
                alert('Invalid coupon code');
            }
        });
    }

    handleFormSubmit() {
        const formData = new FormData(this.form);
        const selectedProducts = this.form.querySelectorAll('.product-checkbox:checked');

        if (selectedProducts.length === 0) {
            alert('Please select at least one product');
            return;
        }

        // Create cart data object
        const cartData = {
            products: [],
            coupon: formData.get('coupon'),
            total: this.calculateTotal(),
            discount: 20.0,
            finalTotal: this.calculateTotal() - 20.0
        };

        // Add selected products to cart data
        selectedProducts.forEach(checkbox => {
            const productCard = checkbox.closest('.product-card');
            const productId = productCard.dataset.productId;
            const quantityInput = productCard.querySelector('input[type="number"]');
            const priceText = productCard.querySelector('.current-price').textContent;

            cartData.products.push({
                id: productId,
                quantity: parseInt(quantityInput.value),
                price: parseFloat(priceText.replace(' YER', ''))
            });
        });

        console.log('Submitting cart data:', cartData);
        alert('Proceeding to checkout...');
    }

    calculateTotal() {
        const selectedProducts = this.form.querySelectorAll('.product-checkbox:checked');
        let total = 0;

        selectedProducts.forEach(checkbox => {
            const productCard = checkbox.closest('.product-card');
            const priceText = productCard.querySelector('.current-price').textContent;
            const price = parseFloat(priceText.replace(' YER', ''));
            const quantityInput = productCard.querySelector('input[type="number"]');
            const quantity = parseInt(quantityInput.value);
            total += price * quantity;
        });

        return total;
    }

    updateSummary() {
        const total = this.calculateTotal();
        const discount = 20.0; // Fixed discount for demo
        const finalTotal = total - discount;

        // Update summary values
        this.form.querySelector('.summary-list .summary-item:nth-child(1) span:last-child')
            .textContent = `${total.toFixed(1)} YER`;
        this.form.querySelector('.summary-list .summary-item:nth-child(2) span:last-child')
            .textContent = `-${discount.toFixed(1)} YER`;
        this.form.querySelector('.total-row span:last-child')
            .textContent = `${finalTotal.toFixed(1)} YER`;
    }

    updateProductCount() {
        const count = this.form.querySelectorAll('.product-card').length;
        this.form.querySelector('.cart-title').textContent = `Products: ${count}`;
    }
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    new CartManager();
});