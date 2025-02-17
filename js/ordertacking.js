class OrderTracking {
    constructor() {
        this.init();
    }

    init() {
        this.initTabs();
        this.initCardHighlight();
    }

    initTabs() {
        // Get the elements
        const currentOrders = document.querySelector('.current-orders');
        const currentOrders0 = document.querySelector('.current-ordersd');
        const historyOrders = document.querySelector('.history-orders');
        const historyOrders0 = document.querySelector('.history-ordersd');

        // Add click handlers to nav buttons
        document.querySelectorAll('.order-nav__btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Update nav button states
                document.querySelectorAll('.order-nav__btn').forEach(b => {
                    b.classList.remove('order-nav__btn--active');
                    b.classList.add('order-nav__btn--inactive');
                    b.querySelector('.order-nav__check').innerHTML = '';
                });

                btn.classList.remove('order-nav__btn--inactive');
                btn.classList.add('order-nav__btn--active');

                // Add checkmark to active button
                if (btn.classList.contains('order-nav__btn--active')) {
                    btn.querySelector('.order-nav__check').innerHTML = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4163 9.50002C17.4163 5.12777 13.8719 1.58335 9.49967 1.58335C5.12742 1.58335 1.58301 5.12777 1.58301 9.50002C1.58301 13.8723 5.12742 17.4167 9.49967 17.4167C13.8719 17.4167 17.4163 13.8723 17.4163 9.50002Z" stroke="white" stroke-width="1.5"/>
                        <path d="M6.33301 10.0938C6.33301 10.0938 7.59967 10.8162 8.23301 11.875C8.23301 11.875 10.133 7.71876 12.6663 6.33334" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`;
                }

                // Toggle content visibility based on button clicked
                const isHistory = btn.textContent.trim().toLowerCase() === 'history';
                currentOrders.style.display = isHistory ? 'none' : 'block';
                currentOrders0.style.display = isHistory ? 'none' : 'block';
                historyOrders.style.display = isHistory ? 'block' : 'none';
                historyOrders0.style.display = isHistory ? 'block' : 'none';
            });
        });
    }

    initCardHighlight() {
        document.querySelectorAll('.order-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.order-card').forEach(c => {
                    c.classList.remove('order-card--highlighted');
                });
                card.classList.add('order-card--highlighted');
            });
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new OrderTracking();
});