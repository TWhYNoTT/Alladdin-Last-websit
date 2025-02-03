class CartManager {
    constructor() {
        this.initEventListeners();
        this.updateSummary();
    }

    initEventListeners() {
        // Select all checkbox
        const selectAllCheckbox = document.querySelector('.select-all input');
        selectAllCheckbox?.addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('.product-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
            });
            this.updateSummary();
        });

        // Individual product checkboxes
        const productCheckboxes = document.querySelectorAll('.product-checkbox');
        productCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateSummary());
        });

        // Quantity controls
        const quantityControls = document.querySelectorAll('.quantity-controls');
        quantityControls.forEach(control => {
            const minusBtn = control.querySelector('.quantity-btn:first-child');
            const plusBtn = control.querySelector('.quantity-btn:last-child');
            const quantitySpan = control.querySelector('.quantity');

            minusBtn?.addEventListener('click', () => {
                let quantity = parseInt(quantitySpan.textContent);
                if (quantity > 0) {
                    quantitySpan.textContent = quantity - 1;
                    this.updateSummary();
                }
            });

            plusBtn?.addEventListener('click', () => {
                let quantity = parseInt(quantitySpan.textContent);
                quantitySpan.textContent = quantity + 1;
                this.updateSummary();
            });
        });

        // Delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    productCard.remove();
                    this.updateSummary();
                    this.updateProductCount();
                }
            });
        });

        // Clear all button
        const clearAllBtn = document.querySelector('.clear-all');
        clearAllBtn?.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all items?')) {
                const products = document.querySelectorAll('.product-card');
                products.forEach(product => product.remove());
                this.updateSummary();
                this.updateProductCount();
            }
        });

        // Apply coupon button
        const applyBtn = document.querySelector('.apply-btn');
        applyBtn?.addEventListener('click', () => {
            const couponField = document.querySelector('.coupon-field');
            if (couponField?.value.trim() === '65qwR151') {
                document.querySelector('.discount-message').style.display = 'block';
                this.updateSummary();
            } else {
                alert('Invalid coupon code');
            }
        });

        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        checkoutBtn?.addEventListener('click', () => {
            const selectedProducts = document.querySelectorAll('.product-checkbox:checked');
            if (selectedProducts.length === 0) {
                alert('Please select at least one product');
                return;
            }
            alert('Proceeding to checkout...');
        });
    }

    updateSummary() {
        const selectedProducts = document.querySelectorAll('.product-checkbox:checked');
        let total = 0;

        selectedProducts.forEach(checkbox => {
            const productCard = checkbox.closest('.product-card');
            const priceText = productCard.querySelector('.current-price').textContent;
            const price = parseFloat(priceText.replace(' YER', ''));
            const quantity = parseInt(productCard.querySelector('.quantity').textContent);
            total += price * quantity;
        });

        const discount = 20.0; // Fixed discount for demo
        const finalTotal = total - discount;

        // Update summary values
        document.querySelector('.summary-list .summary-item:nth-child(1) span:last-child')
            .textContent = `${total.toFixed(1)} YER`;
        document.querySelector('.summary-list .summary-item:nth-child(2) span:last-child')
            .textContent = `-${discount.toFixed(1)} YER`;
        document.querySelector('.total-row span:last-child')
            .textContent = `${finalTotal.toFixed(1)} YER`;
    }

    updateProductCount() {
        const count = document.querySelectorAll('.product-card').length;
        document.querySelector('.cart-title').textContent = `Products: ${count}`;
    }
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    new CartManager();
});