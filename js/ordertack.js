class OrderModals {
    constructor() {
        this.init();
        this.attachEventListeners();
    }

    init() {
        if (!document.querySelector('.order-tracking-modal-container')) {
            const modalContainer = document.createElement('div');
            modalContainer.className = 'order-tracking-modal-container';
            modalContainer.innerHTML = `
                <!-- Modal Overlay -->
                <div class="order-tracking-modal-overlay"></div>
                
                <!-- Barcode Modal -->
                <div class="order-tracking-modal order-tracking-barcode-modal" id="orderTrackingBarcodeModal">
                    <div class="order-tracking-modal-content">
                        <div class="order-tracking-modal-header">
                            <h3>Order Barcode</h3>
                            <button class="order-tracking-modal-close">&times;</button>
                        </div>
                        <div class="order-tracking-modal-body">
                            <div class="order-tracking-barcode-image">
                                <svg width="200" height="100" viewBox="0 0 200 100">
                                    <!-- Simple barcode illustration -->
                                    <rect x="10" y="10" width="180" height="80" fill="none" stroke="#333"/>
                                    <g fill="#333">
                                        <rect x="20" y="20" width="2" height="60"/>
                                        <rect x="30" y="20" width="4" height="60"/>
                                        <rect x="40" y="20" width="1" height="60"/>
                                        <rect x="50" y="20" width="3" height="60"/>
                                    </g>
                                </svg>
                            </div>
                            <p class="order-tracking-barcode-number">#52156564320</p>
                            <p class="order-tracking-barcode-expiry">Available for pickup until 21/06/2023</p>
                        </div>
                    </div>
                </div>

                <!-- Warning Modal -->
                <div class="order-tracking-modal order-tracking-warning-modal" id="orderTrackingWarningModal">
                    <div class="order-tracking-modal-content">
                        <div class="order-tracking-modal-header">
                            <h3>Confirm Action</h3>
                            <button class="order-tracking-modal-close">&times;</button>
                        </div>
                        <div class="order-tracking-modal-body">
                            <div class="order-tracking-warning-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM26 34H22V30H26V34ZM26 26H22V14H26V26Z" fill="#FFA726"/>
                                </svg>
                            </div>
                            <p class="order-tracking-warning-message">Are you sure you want to proceed with this action?</p>
                            <div class="order-tracking-modal-actions">
                                <button class="order-tracking-btn-secondary order-tracking-modal-cancel">Cancel</button>
                                <button class="order-tracking-btn-primary order-tracking-modal-confirm">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modalContainer);

            // Add styles
            const styles = document.createElement('style');
            styles.textContent = `
                .order-tracking-modal-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    display: none;
                }

                .order-tracking-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1001;
                }

                .order-tracking-modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    border-radius: 12px;
                    z-index: 1002;
                    min-width: 320px;
                    max-width: 90%;
                    display: none;
                }

                .order-tracking-modal-content {
                    padding: 24px;
                }

                .order-tracking-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .order-tracking-modal-header h3 {
                    margin: 0;
                    font-size: 18px;
                    color: #1A1A1A;
                }

                .order-tracking-modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                }

                .order-tracking-modal-body {
                    text-align: center;
                }

                .order-tracking-barcode-image {
                    margin: 20px 0;
                }

                .order-tracking-barcode-number {
                    font-size: 16px;
                    color: #1A1A1A;
                    margin: 10px 0;
                }

                .order-tracking-barcode-expiry {
                    font-size: 14px;
                    color: #666;
                }

                .order-tracking-warning-icon {
                    margin: 20px 0;
                }

                .order-tracking-warning-message {
                    font-size: 16px;
                    color: #1A1A1A;
                    margin: 20px 0;
                }

                .order-tracking-modal-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                    margin-top: 24px;
                }

                .order-tracking-btn-primary,
                .order-tracking-btn-secondary {
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 14px;
                    cursor: pointer;
                    border: none;
                }

                .order-tracking-btn-primary {
                    background: #c4a77d;
                    color: white;
                }

                .order-tracking-btn-secondary {
                    background: #f5f5f5;
                    color: #666;
                }

                .order-tracking-modal.active {
                    display: block;
                }

                .order-tracking-modal-container.active {
                    display: block;
                }
            `;
            document.head.appendChild(styles);
        }
    }

    attachEventListeners() {
        // Show barcode modal
        // document.querySelectorAll('.barcode-btn').forEach(btn => {
        //     btn.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         this.showBarcodeModal();
        //     });
        // });

        // Show warning modal for delete and cancel actions
        // document.querySelectorAll('.product-card__delete, .store-block__cancel').forEach(btn => {
        //     btn.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         const action = btn.classList.contains('product-card__delete') ? 'delete' : 'cancel';
        //         this.showWarningModal(action, btn);
        //     });
        // });

        // Close modal handlers
        document.querySelectorAll('.order-tracking-modal-close, .order-tracking-modal-cancel').forEach(btn => {
            btn.addEventListener('click', () => this.hideModals());
        });

        // Close on overlay click
        document.querySelector('.order-tracking-modal-overlay').addEventListener('click', () => this.hideModals());
    }

    showBarcodeModal() {
        document.querySelector('.order-tracking-modal-container').classList.add('active');
        document.querySelector('#orderTrackingBarcodeModal').classList.add('active');
    }

    showWarningModal(action, targetButton) {
        const modal = document.querySelector('#orderTrackingWarningModal');
        const message = modal.querySelector('.order-tracking-warning-message');
        const confirmBtn = modal.querySelector('.order-tracking-modal-confirm');

        // Update message based on action
        message.textContent = action === 'delete'
            ? 'Are you sure you want to delete this item?'
            : 'Are you sure you want to cancel this order?';

        // Remove previous confirm handler
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

        // Add new confirm handler
        newConfirmBtn.addEventListener('click', () => {
            if (action === 'delete') {
                targetButton.closest('.product-card').remove();
            } else {
                targetButton.closest('.store-block').remove();
            }
            this.hideModals();
        });

        document.querySelector('.order-tracking-modal-container').classList.add('active');
        modal.classList.add('active');
    }

    hideModals() {
        document.querySelector('.order-tracking-modal-container').classList.remove('active');
        document.querySelectorAll('.order-tracking-modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }
}

// Initialize modals
document.addEventListener('DOMContentLoaded', () => {
    new OrderModals();
});