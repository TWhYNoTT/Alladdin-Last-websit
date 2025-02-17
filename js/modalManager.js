class GeneModal {
    constructor() {
        this.init();
    }

    init() {
        // Create modal container if it doesn't exist
        if (!document.querySelector('.modal-container')) {
            const modalContainer = document.createElement('div');
            modalContainer.className = 'modal-container';
            modalContainer.innerHTML = `
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title"></h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button class="modal-btn modal-btn--secondary" data-action="cancel">Cancel</button>
                        <button class="modal-btn modal-btn--primary" data-action="confirm">Confirm</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modalContainer);

            // Add styles
            const styles = document.createElement('style');
            styles.textContent = `
                .modal-container {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1001;
                }

                .modal-content {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 400px;
                    z-index: 1002;
                }

                .modal-header {
                    padding: 16px;
                    border-bottom: 1px solid #eaeaea;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .modal-title {
                    margin: 0;
                    font-size: 18px;
                    color: #1A1A1A;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #999;
                    cursor: pointer;
                }

                .modal-body {
                    padding: 16px;
                    color: #666;
                }

                .modal-footer {
                    padding: 16px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: flex-end;
                    gap: 8px;
                }

                .modal-btn {
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 14px;
                    cursor: pointer;
                    border: none;
                }

                .modal-btn--primary {
                    background: #c4a77d;
                    color: white;
                }

                .modal-btn--secondary {
                    background: #f5f5f5;
                    color: #666;
                }

                .modal-container.active {
                    display: block;
                }
            `;
            document.head.appendChild(styles);
        }

        this.container = document.querySelector('.modal-container');
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Close button
        this.container.querySelector('.modal-close').addEventListener('click', () => {
            this.hide();
        });

        // Cancel button
        this.container.querySelector('[data-action="cancel"]').addEventListener('click', () => {
            this.hide();
        });

        // Confirm button
        this.container.querySelector('[data-action="confirm"]').addEventListener('click', () => {
            if (this.onConfirm) {
                this.onConfirm();
            }
            this.hide();
        });

        // Close on overlay click
        this.container.querySelector('.modal-overlay').addEventListener('click', () => {
            this.hide();
        });
    }

    show({ title, content, onConfirm }) {
        this.container.querySelector('.modal-title').textContent = title;
        this.container.querySelector('.modal-body').innerHTML = content;
        this.onConfirm = onConfirm;
        this.container.classList.add('active');
    }

    hide() {
        this.container.classList.remove('active');
        this.onConfirm = null;
    }
}
