class CustomModal {
    constructor() {
        this.init();
    }

    init() {
        if (!document.querySelector('.app-modal-container')) {
            const modalContainer = document.createElement('div');
            modalContainer.className = 'app-modal-container';
            modalContainer.innerHTML = `
                <div class="app-modal-overlay"></div>
                <div class="app-modal-wrapper">
                    <div class="app-modal">
                        <div class="app-modal__header">
                            <button class="app-modal__close">×</button>
                        </div>
                        <div class="app-modal__body"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(modalContainer);

            const styles = document.createElement('style');
            styles.textContent = `
                .app-modal-container {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                }

                .app-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1001;
                }

                .app-modal-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1002;
                    padding: 20px;
                }

                .app-modal {
                    background: white;
                    border-radius: 24px;
                    width: 100%;
                    max-width: 400px;
                    max-height: 90vh;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }

                .app-modal__header {
                    position: sticky;
                    top: 0;
                    background: white;
                    border-radius: 24px 24px 0 0;
                    padding: 24px 24px 0 24px;
                    z-index: 10;
                }

                .app-modal__body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 24px;
                    -webkit-overflow-scrolling: touch;
                }

                .app-modal__footer {
                    position: sticky;
                    bottom: 0;
                    background: white;
                    border-radius: 0 0 24px 24px;
                    padding: 16px 24px;
                    z-index: 10;
                }

                .app-modal__close {
                    position: absolute;
                    right: 16px;
                    top: 16px;
                    width: 32px;
                    height: 32px;
                    background: #F5F5F5;
                    border: none;
                    border-radius: 50%;
                    font-size: 20px;
                    cursor: pointer;
                    color: #666;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1;
                }

                .app-modal__title {
                    font-size: 24px;
                    color: #C4A77D;
                    text-align: center;
                    margin-bottom: 24px;
                    font-weight: 500;
                }

                .app-modal__body {
                    text-align: center;
                }

                /* Rating styles */
                .app-modal__stars {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin: 24px 0;
                }

                .app-modal__star {
                    color: #FFB800;
                    font-size: 32px;
                    cursor: pointer;
                }

                .app-modal__comment {
                    width: 100%;
                    min-height: 120px;
                    padding: 16px;
                    border: 1px solid #E5E5E5;
                    border-radius: 16px;
                    margin-bottom: 24px;
                    resize: none;
                    font-size: 16px;
                    color: #666;
                }

                .app-modal__comment::placeholder {
                    color: #999;
                }

                /* Photo upload styles */
                .app-modal__photo-upload {
                    margin-top: 16px;
                }

                .app-modal__photo-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border: 1px solid #C4A77D;
                    border-radius: 8px;
                    color: #C4A77D;
                    background: none;
                    cursor: pointer;
                    margin: 0 auto;
                }

                .app-modal__photo-preview {
                    display: flex;
                    gap: 12px;
                    margin-top: 16px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .app-modal__photo-item {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .app-modal__photo-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .app-modal__photo-remove {
                    position: absolute;
                    top: 4px;
                    right: 4px;
                    width: 24px;
                    height: 24px;
                    background: #FF4444;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    cursor: pointer;
                    border: none;
                    font-size: 16px;
                }

                /* Success modal */
                .app-modal__success-icon {
                    width: 150px;
                    height: 150px;
                    margin: 0 auto 24px;
                }

                .app-modal__success-title {
                    font-size: 24px;
                    color: #00C17C;
                    margin-bottom: 8px;
                }

                .app-modal__success-message {
                    color: #666;
                    margin-bottom: 24px;
                }

                /* Delete modal */
                .app-modal__delete-icon {
                    width: 64px;
                    height: 64px;
                    margin: 0 auto 24px;
                    background: #FF4444;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .app-modal__delete-message {
                font-weight: bold;
                    color: #1A1A1A;
                    margin-bottom: 24px;
                }

                /* Balance modal */
                .app-modal__balance {
                    color: #00C17C;
                    font-size: 32px;
                    font-weight: 500;
                    margin: 24px 0;
                }

                /* Buttons */
                .app-modal__buttons {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                    margin-top: 24px;
                }

                .app-modal__btn {
                    padding: 16px 32px;
                    border-radius: 12px;
                    font-size: 16px;
                    cursor: pointer;
                    border: none;
                    min-width: 120px;
                    font-weight: 500;
                }

                .app-modal__btn--primary {
                    background: #C4A77D;
                    color: white;
                }

                .app-modal__btn--secondary {
                    background: #EEEEEE;
                    color: #666;
                }

                .app-modal-container.active {
                    display: block;
                }

                /* Map styles */
                .app-modal__search {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #E5E5E5;
                    border-radius: 12px;
                    margin-bottom: 16px;
                    font-size: 16px;
                }

                .app-modal__map {
                    width: 100%;
                    height: 300px;
                    border-radius: 12px;
                    margin-bottom: 16px;
                    background: #F5F5F5;
                }

                /* Delivery point styles */
                .delivery-point {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    background: white;
                    border-radius: 16px;
                    margin-bottom: 12px;
                    cursor: pointer;
                }

                .delivery-point__icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: white;
                }

                .delivery-point__info {
                    flex: 1;
                }

                .delivery-point__rating {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    color: #666;
                    font-size: 14px;
                }

                .delivery-point__distance {
                    color: #FF4444;
                    font-weight: 500;
                }


                 .barcode-modal {
            padding: 24px;
            text-align: center;
        }

        .barcode-modal__title {
            font-size: 18px;
            color: #1A1A1A;
            margin: 0 0 8px 0;
            font-weight: 500;
        }

        .barcode-modal__code {
            font-size: 14px;
            color: #666;
            margin: 0 0 24px 0;
        }

        .barcode-modal__barcode {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .app-modal__stars {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin: 24px 0;
    }

    .app-modal__star {
        color: #ddd;
        font-size: 32px;
        cursor: pointer;
        transition: color 0.2s;
    }

    .app-modal__star.active {
        color: #FFB800;
    }

    .app-modal__comment {
        width: 100%;
        min-height: 120px;
        padding: 16px;
        border: 1px solid #E5E5E5;
        border-radius: 16px;
        margin-bottom: 24px;
        resize: none;
        font-size: 16px;
        color: #666;
    }

    .app-modal__photo-upload {
        margin-top: 16px;
    }

    .app-modal__photo-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border: 1px solid #C4A77D;
        border-radius: 8px;
        color: #C4A77D;
        background: none;
        cursor: pointer;
        margin: 0 auto;
    }

    .app-modal__photo-preview {
        display: flex;
        gap: 12px;
        margin-top: 16px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .app-modal__photo-item {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 12px;
        overflow: hidden;
    }

    .app-modal__photo-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .app-modal__photo-remove {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 24px;
        height: 24px;
        background: #FF4444;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        border: none;
        font-size: 16px;
    }
            `;
            document.head.appendChild(styles);
        }

        this.container = document.querySelector('.app-modal-container');
        this.modal = this.container.querySelector('.app-modal');
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.container.querySelector('.app-modal-overlay').addEventListener('click', () => {
            this.hide();
        });

        this.container.querySelector('.app-modal__close').addEventListener('click', () => {
            this.hide();
        });
    }

    show({ type, content }) {
        this.modal.className = 'app-modal';
        if (type) {
            this.modal.classList.add(`app-modal--${type}`);
        }
        this.modal.querySelector('.app-modal__body').innerHTML = content;
        this.container.classList.add('active');
    }

    hide() {
        this.container.classList.remove('active');
    }

    showSuccess({ title, message }) {
        this.show({
            type: 'success',
            content: `
                <div>
                
<svg  class="app-modal__success-icon" viewBox="0 0 208 131" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M102.729 130.52C89.8827 130.52 77.3248 126.707 66.6433 119.562C55.9619 112.418 47.6368 102.263 42.7206 90.382C37.8045 78.5012 36.5182 65.4278 39.0244 52.8152C41.5307 40.2026 47.7168 28.6171 56.8006 19.5239C65.8845 10.4307 77.4579 4.23816 90.0575 1.72935C102.657 -0.779458 115.717 0.508149 127.586 5.42936C139.454 10.3506 149.598 18.6843 156.735 29.3768C163.873 40.0693 167.682 52.6402 167.682 65.5C167.662 82.7382 160.812 99.2647 148.636 111.454C136.459 123.643 119.95 130.5 102.729 130.52ZM102.729 3.01456C90.3775 3.01456 78.3032 6.68138 68.0335 13.5512C57.7638 20.4211 49.7599 30.1854 45.0343 41.6091C40.3086 53.0329 39.0735 65.603 41.485 77.7295C43.8965 89.856 49.8464 100.994 58.5821 109.736C67.3179 118.477 78.447 124.428 90.562 126.837C102.677 129.247 115.234 128.005 126.644 123.27C138.054 118.535 147.805 110.519 154.663 100.236C161.522 89.9527 165.18 77.8644 165.175 65.5C165.149 48.9316 158.56 33.0498 146.854 21.3366C135.148 9.62333 119.28 3.03447 102.729 3.01456Z" fill="#D1D3D4"/>
<path d="M148.354 49.1139C147.91 49.8321 147.407 50.512 146.85 51.1465L93.4039 104.573C93.1295 104.987 92.757 105.327 92.3195 105.562C91.8821 105.797 91.3935 105.92 90.897 105.92C90.4006 105.92 89.912 105.797 89.4745 105.562C89.0371 105.327 88.6646 104.987 88.3902 104.573C78.3627 94.2338 68.3353 83.8782 58.3078 73.5058C57.9294 73.2214 57.6254 72.8496 57.4216 72.4221C57.2179 71.9946 57.1205 71.5241 57.1377 71.0508C57.1549 70.5774 57.2863 70.1153 57.5206 69.7038C57.7549 69.2923 58.0852 68.9436 58.4833 68.6876L66.0039 61.887C66.2739 61.5472 66.617 61.2728 67.0077 61.0842C67.3983 60.8956 67.8264 60.7976 68.2601 60.7976C68.6938 60.7976 69.1219 60.8956 69.5125 61.0842C69.9032 61.2728 70.2463 61.5472 70.5162 61.887L88.2899 80.0052C90.145 81.8873 91.5237 81.9124 93.3036 80.0052L134.817 38.6243C135.088 38.2048 135.459 37.8598 135.897 37.6209C136.335 37.382 136.825 37.2568 137.324 37.2568C137.823 37.2568 138.314 37.382 138.752 37.6209C139.19 37.8598 139.561 38.2048 139.831 38.6243C142.187 40.9832 144.544 43.3421 146.85 45.7261C147.383 46.3505 147.868 47.0131 148.304 47.7086L148.354 49.1139Z" fill="#00CC6A"/>
<path d="M28.8269 28.862C28.5675 28.8608 28.3144 28.7822 28.0999 28.6362L0.524454 9.56433C0.25606 9.3681 0.0745402 9.07497 0.0183842 8.74706C-0.0377718 8.41914 0.0358626 8.08222 0.223643 7.80772C0.316312 7.67284 0.434922 7.55784 0.572574 7.46947C0.710227 7.3811 0.864135 7.32113 1.02524 7.29308C1.18635 7.26504 1.35144 7.26948 1.51081 7.30614C1.67019 7.3428 1.82063 7.41094 1.95334 7.50658L29.5288 26.5784C29.6655 26.6692 29.7827 26.7865 29.8734 26.9234C29.9641 27.0603 30.0264 27.2139 30.0568 27.3753C30.0872 27.5367 30.0849 27.7026 30.0502 27.8631C30.0155 28.0236 29.9491 28.1756 29.8547 28.3099C29.7409 28.4785 29.588 28.6168 29.4089 28.713C29.2299 28.8091 29.0301 28.8603 28.8269 28.862Z" fill="#BFA274"/>
<path d="M1.30221 123.744C1.10049 123.75 0.900623 123.704 0.721017 123.612C0.541411 123.52 0.387826 123.384 0.27439 123.217C0.0866103 122.943 0.0130142 122.606 0.0691702 122.278C0.125326 121.95 0.306846 121.657 0.57524 121.461L28.1507 102.389C28.287 102.294 28.4407 102.227 28.603 102.192C28.7653 102.156 28.933 102.154 29.0963 102.184C29.2595 102.215 29.4151 102.277 29.5541 102.368C29.693 102.459 29.8125 102.577 29.9055 102.715C29.9998 102.849 30.0663 103.001 30.101 103.162C30.1357 103.322 30.1379 103.488 30.1076 103.65C30.0772 103.811 30.0148 103.965 29.9241 104.101C29.8335 104.238 29.7163 104.356 29.5796 104.446L2.00413 123.518C1.80032 123.667 1.5543 123.746 1.30221 123.744Z" fill="#BFA274"/>
<path d="M25.9434 66.7546H1.35109C1.01866 66.7546 0.699821 66.6224 0.464758 66.3871C0.229694 66.1518 0.0976562 65.8326 0.0976562 65.4998C0.0976562 65.1671 0.229694 64.8479 0.464758 64.6126C0.699821 64.3773 1.01866 64.2451 1.35109 64.2451H25.9434C26.2758 64.2451 26.5946 64.3773 26.8297 64.6126C27.0647 64.8479 27.1968 65.1671 27.1968 65.4998C27.1968 65.8326 27.0647 66.1518 26.8297 66.3871C26.5946 66.6224 26.2758 66.7546 25.9434 66.7546Z" fill="#00CC6A"/>
<path d="M179.164 28.862C178.961 28.8603 178.761 28.8091 178.582 28.713C178.403 28.6168 178.25 28.4785 178.136 28.3099C178.042 28.1756 177.976 28.0236 177.941 27.8631C177.906 27.7026 177.904 27.5367 177.934 27.3753C177.965 27.2139 178.027 27.0603 178.118 26.9234C178.208 26.7865 178.326 26.6692 178.462 26.5784L206.038 7.50658C206.17 7.41094 206.321 7.3428 206.48 7.30614C206.64 7.26948 206.805 7.26504 206.966 7.29308C207.127 7.32113 207.281 7.3811 207.419 7.46947C207.556 7.55784 207.675 7.67284 207.767 7.80772C207.864 7.94258 207.932 8.09516 207.969 8.25668C208.006 8.4182 208.011 8.58546 207.983 8.74878C207.955 8.9121 207.895 9.06826 207.806 9.20824C207.718 9.34822 207.602 9.46924 207.467 9.56433L179.891 28.6362C179.677 28.7822 179.424 28.8608 179.164 28.862Z" fill="#BFA274"/>
<path d="M206.69 123.744C206.438 123.743 206.193 123.664 205.988 123.518L178.412 104.446C178.276 104.356 178.159 104.238 178.068 104.101C177.977 103.965 177.915 103.811 177.885 103.65C177.854 103.488 177.856 103.322 177.891 103.162C177.926 103.001 177.992 102.849 178.087 102.715C178.18 102.577 178.299 102.459 178.438 102.368C178.577 102.277 178.733 102.215 178.896 102.184C179.059 102.154 179.227 102.156 179.389 102.192C179.551 102.227 179.705 102.294 179.841 102.389L207.417 121.461C207.552 121.556 207.668 121.677 207.756 121.817C207.845 121.957 207.905 122.113 207.933 122.276C207.961 122.439 207.956 122.607 207.919 122.768C207.882 122.93 207.814 123.082 207.718 123.217C207.604 123.384 207.451 123.52 207.271 123.612C207.091 123.704 206.892 123.75 206.69 123.744Z" fill="#BFA274"/>
<path d="M206.689 66.7546H182.096C181.764 66.7546 181.445 66.6224 181.21 66.3871C180.975 66.1518 180.843 65.8326 180.843 65.4998C180.843 65.1671 180.975 64.8479 181.21 64.6126C181.445 64.3773 181.764 64.2451 182.096 64.2451H206.689C207.021 64.2451 207.34 64.3773 207.575 64.6126C207.81 64.8479 207.942 65.1671 207.942 65.4998C207.942 65.8326 207.81 66.1518 207.575 66.3871C207.34 66.6224 207.021 66.7546 206.689 66.7546Z" fill="#00CC6A"/>
</svg>


                </div>
                <h3 class="app-modal__success-title">${title}</h3>
                <p class="app-modal__success-message">${message}</p>
                <a href="#" class="app-modal__btn app-modal__btn--primary" style="text-decoration:none">My orders</a>
            `
        });
    }



    showBarcode() {
        this.show({
            type: 'barcode',
            content: `
            <div class="barcode-modal">
                <h2 class="barcode-modal__title">Order barcode</h2>
                <p class="barcode-modal__code">#52156564320</p>
                <div class="barcode-modal__barcode">
                    <!-- The barcode with numbers below -->
                    <svg width="240" height="100" viewBox="0 0 240 100">
                        <!-- Barcode lines -->
                        <g>
                            <rect x="0" y="0" width="2" height="70" fill="black"/>
                            <rect x="4" y="0" width="2" height="70" fill="black"/>
                            <rect x="12" y="0" width="2" height="70" fill="black"/>
                            <rect x="22" y="0" width="3" height="70" fill="black"/>
                            <rect x="32" y="0" width="2" height="70" fill="black"/>
                            <rect x="38" y="0" width="3" height="70" fill="black"/>
                            <rect x="48" y="0" width="2" height="70" fill="black"/>
                            <rect x="54" y="0" width="2" height="70" fill="black"/>
                            <rect x="64" y="0" width="3" height="70" fill="black"/>
                            <rect x="72" y="0" width="2" height="70" fill="black"/>
                            <rect x="82" y="0" width="3" height="70" fill="black"/>
                            <rect x="92" y="0" width="2" height="70" fill="black"/>
                            <rect x="102" y="0" width="2" height="70" fill="black"/>
                            <rect x="112" y="0" width="3" height="70" fill="black"/>
                            <rect x="122" y="0" width="2" height="70" fill="black"/>
                            <rect x="132" y="0" width="3" height="70" fill="black"/>
                            <rect x="142" y="0" width="2" height="70" fill="black"/>
                            <rect x="152" y="0" width="2" height="70" fill="black"/>
                            <rect x="162" y="0" width="3" height="70" fill="black"/>
                            <rect x="172" y="0" width="2" height="70" fill="black"/>
                            <rect x="182" y="0" width="3" height="70" fill="black"/>
                            <rect x="192" y="0" width="2" height="70" fill="black"/>
                            <rect x="202" y="0" width="2" height="70" fill="black"/>
                            <rect x="212" y="0" width="3" height="70" fill="black"/>
                            <rect x="222" y="0" width="2" height="70" fill="black"/>
                            <rect x="232" y="0" width="2" height="70" fill="black"/>
                            <rect x="238" y="0" width="2" height="70" fill="black"/>
                            
                            <!-- Numbers below barcode -->
                            <text x="0" y="90" font-size="14" letter-spacing="16">123456789012</text>
                        </g>
                    </svg>
                </div>
            </div>
        `
        });
    }

    showRating({ title, image }) {
        this.show({
            type: 'rating',
            content: `
                <h3 class="app-modal__title">${title}</h3>
                ${image ? `<img src="${image}" alt="Rating" style="width: 80px; height: 80px; border-radius: 12px; margin-bottom: 16px;">` : ''}
                <div class="app-modal__stars" id="rating-stars">
                    ${Array(5).fill('★').map((star, i) =>
                `<span class="app-modal__star" data-rating="${i + 1}">${star}</span>`
            ).join('')}
                </div>
                <textarea class="app-modal__comment" placeholder="Type your comment..."></textarea>
                <button class="app-modal__btn app-modal__btn--primary">Add rating</button>
            `
        });

        this.initializeStarRating();

    }

    showDelete({ title, message }) {
        this.show({
            type: 'delete',
            content: `
                <div class="app-modal__delete-icon">
                 <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="100" height="100" fill="url(#pattern0_128_8786)"/>
<defs>
<pattern id="pattern0_128_8786" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_128_8786" transform="scale(0.00333333)"/>
</pattern>
<image id="image0_128_8786" width="300" height="300" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>

                </div>
                
                <p class="app-modal__delete-message bld">${message}</p>
                <div class="app-modal__buttons">
                    <button class="app-modal__btn app-modal__btn--primary">Confirm</button>
                    <button class="app-modal__btn app-modal__btn--secondary">Cancel</button>
                </div>
            `
        });
    }

    showBalance({ amount }) {
        this.show({
            type: 'balance',
            content: `
                
                <svg class="app-modal__success-icon" width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="94" height="94" fill="url(#pattern0_128_9488)"/>
<defs>
<pattern id="pattern0_128_9488" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_128_9488" transform="scale(0.0035461)"/>
</pattern>
<image id="image0_128_9488" width="282" height="282" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>

                <h3 class="app-modal__title">Successfully completed</h3>
                <p class="app-modal__success-message">Balance has been added successfully</p>
                <div class="app-modal__balance">${amount} YER</div>
            `
        });
    }

    // Question modal
    showQuestionForm() {
        this.show({
            type: 'question',
            content: `
                <h3 class="app-modal__title">Add your question</h3>
                <textarea class="app-modal__comment" placeholder="Type your question..."></textarea>
                <button class="app-modal__btn app-modal__btn--primary">Add question</button>
            `
        });
    }

    // Product rating with photo upload
    showProductRating({ title }) {
        this.show({
            type: 'rating',
            content: `
                <h3 class="app-modal__title">${title}</h3>
                <div class="app-modal__stars" id="rating-stars">
                    ${Array(5).fill('★').map((star, i) =>
                `<span class="app-modal__star" data-rating="${i + 1}">${star}</span>`
            ).join('')}
                </div>
                <textarea class="app-modal__comment" placeholder="Type your comment..."></textarea>
                <div class="app-modal__photo-upload">
                    <input type="file" id="photo-upload" multiple accept="image/*" style="display: none">
                    <button class="app-modal__photo-btn" onclick="document.getElementById('photo-upload').click()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 16V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V16M16 8L12 4M12 4L8 8M12 4V16" stroke-width="2"/>
                        </svg>
                        Add Photos
                    </button>
                    <div class="app-modal__photo-preview"></div>
                </div>
                <button class="app-modal__btn app-modal__btn--primary">Add rating</button>
            `
        });

        this.initializeStarRating();
        this.initializePhotoUpload();
    }

    // Map modal with delivery points
    showMap({ deliveryPoints }) {
        this.show({
            type: 'map',
            content: `
                <input type="text" class="app-modal__search" placeholder="Search...">
                <div class="app-modal__map">
                    <!-- Map container -->
                </div>
                <div class="app-modal__delivery-points">
                    ${deliveryPoints.map(point => `
                        <div class="delivery-point">
                            <div class="delivery-point__icon" style="background: ${point.color}">${point.icon}</div>
                            <div class="delivery-point__info">
                                <h4>${point.name}</h4>
                                <div class="delivery-point__rating">★ ${point.rating} -${point.numRatings} Ratings</div>
                            </div>
                            <div class="delivery-point__distance">${point.distance}</div>
                        </div>
                    `).join('')}
                </div>
            `
        });
    }

    // Delivery point details
    showDeliveryPointDetails({ name, icon, color, rating, numRatings, distance, address, workTime, waitingTime, description, withBTN }) {
        this.show({
            type: 'delivery-details',
            content: `
             
            ${withBTN ? `   <button class="back-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>`: ""}
            
         
                <div class="delivery-point__container">
                    <div class="delivery-point__header">
                        <div class="delivery-point__logo" style="background: ${color || '#4267B2'}">
                            <span class="delivery-point__letter">${icon || name.charAt(0)}</span>
                        </div>
                        <div class="delivery-point__title">
                            <h2>${name}</h2>
                            <div class="delivery-point__rating">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFB800">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                ${rating} -${numRatings} Ratings
                            </div>
                            <div class="delivery-point__distance">${distance}</div>
                        </div>
                        <button class="favorite-button">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                    </div>

                    <div class="delivery-point__info-container">
                        <div class="info-section">
                            <div class="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#C4A77D">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                </svg>
                            </div>
                            <div class="info-content">
                                <h3>Delivery point address</h3>
                                <p>${address}</p>
                            </div>
                            <button class="map-button">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4"/>
                                    <circle cx="12" cy="9" r="2.5" fill="#FFFFFF"/>
                                </svg>
                            </button>
                        </div>

                        <div class="info-section">
                            <div class="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#C4A77D">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                </svg>
                            </div>
                            <div class="info-content">
                                <h3>Work time</h3>
                                ${Object.entries(workTime).map(([day, time]) => `
                                    <div class="work-time-row">
                                        <span class="day">${day}</span>
                                        <span class="time">${time}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="info-section">
                            <div class="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#C4A77D">
                                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                </svg>
                            </div>
                            <div class="info-content">
                                <h3>Waiting time for the order</h3>
                                <p>${waitingTime}</p>
                            </div>
                        </div>

                        <div class="info-section">
                            <div class="info-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#C4A77D">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                                </svg>
                            </div>
                            <div class="info-content">
                                <h3>How does reach the delivery point?</h3>
                                <p>${description}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="app-modal__footer">
                ${withBTN ? `<button class="app-modal__btn app-modal__btn--primary confirm-button">Confirm</button>` : ''}
                    
                </div>
            `
        });



        // Add styles specific to this modal
        const styles = document.createElement('style');
        styles.textContent = `
            .back-button {
                position: absolute;
                left: 16px;
                top: 16px;
                width: 40px;
                height: 40px;
                background: #F5F5F5;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .delivery-point__container {
                padding: 0 16px;
            }

            /* Custom scrollbar styles */
            .app-modal__body::-webkit-scrollbar {
                width: 6px;
            }

            .app-modal__body::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 3px;
            }

            .app-modal__body::-webkit-scrollbar-thumb {
                background: #C4A77D;
                border-radius: 3px;
            }

            .app-modal__body::-webkit-scrollbar-thumb:hover {
                background: #b39671;
            }

            .delivery-point__header {
                display: flex;
                align-items: flex-start;
                gap: 16px;
                margin-bottom: 32px;
                padding-top: 24px;
            }

            .delivery-point__logo {
                width: 56px;
                height: 56px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                font-weight: bold;
            }

            .delivery-point__title {
                flex: 1;
            }

            .delivery-point__title h2 {
                font-size: 20px;
                margin: 0 0 4px 0;
                color: #1A1A1A;
            }

            .delivery-point__rating {
                display: flex;
                align-items: center;
                gap: 4px;
                color: #666;
                font-size: 14px;
                margin-bottom: 4px;
            }

            .delivery-point__distance {
                color: #FF4444;
                font-size: 14px;
            }

            .favorite-button {
                width: 40px;
                height: 40px;
                background: #F5F5F5;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .info-section {
                display: flex;
                gap: 16px;
                margin-bottom: 24px;
                padding-bottom: 24px;
                border-bottom: 1px solid #E5E5E5;
            }

            .info-section:last-child {
                border-bottom: none;
            }

            .info-icon {
                width: 40px;
                height: 40px;
                background: #F9F5F0;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .info-content {
                flex: 1;
            }

            .info-content h3 {
                font-size: 16px;
                color: #666;
                margin: 0 0 8px 0;
                font-weight: normal;
            }

            .info-content p {
                margin: 0;
                color: #1A1A1A;
            }

            .work-time-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                color: #1A1A1A;
            }

            .map-button {
                width: 40px;
                height: 40px;
                background: white;
                border: 1px solid #E5E5E5;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0;
            }

            .confirm-button {
                width: 100%;
                margin-top: 16px;
            }

             .barcode-modal {
            padding: 24px;
            text-align: center;
        }

        .barcode-modal__title {
            font-size: 18px;
            color: #1A1A1A;
            margin: 0 0 8px 0;
            font-weight: 500;
        }

        .barcode-modal__code {
            font-size: 14px;
            color: #666;
            margin: 0 0 24px 0;
        }

        .barcode-modal__barcode {
            display: flex;
            justify-content: center;
            align-items: center;
        }


        .app-modal__stars {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin: 24px 0;
    }

    .app-modal__star {
        color: #ddd;
        font-size: 32px;
        cursor: pointer;
        transition: color 0.2s;
    }

    .app-modal__star.active {
        color: #FFB800;
    }

    .app-modal__comment {
        width: 100%;
        min-height: 120px;
        padding: 16px;
        border: 1px solid #E5E5E5;
        border-radius: 16px;
        margin-bottom: 24px;
        resize: none;
        font-size: 16px;
        color: #666;
    }

    .app-modal__photo-upload {
        margin-top: 16px;
    }

    .app-modal__photo-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border: 1px solid #C4A77D;
        border-radius: 8px;
        color: #C4A77D;
        background: none;
        cursor: pointer;
        margin: 0 auto;
    }

    .app-modal__photo-preview {
        display: flex;
        gap: 12px;
        margin-top: 16px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .app-modal__photo-item {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 12px;
        overflow: hidden;
    }

    .app-modal__photo-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .app-modal__photo-remove {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 24px;
        height: 24px;
        background: #FF4444;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        border: none;
        font-size: 16px;
    }
        `;
        document.head.appendChild(styles);
    }

    initializeStarRating() {
        const starsContainer = document.querySelector('#rating-stars');
        const stars = starsContainer.querySelectorAll('.app-modal__star');
        let currentRating = 0;

        stars.forEach(star => {
            // Hover effect
            star.addEventListener('mouseover', function () {
                const rating = this.dataset.rating;
                highlightStars(rating);
            });

            // Click to set rating
            star.addEventListener('click', function () {
                currentRating = this.dataset.rating;
                highlightStars(currentRating);
            });
        });

        // Reset stars when mouse leaves container
        starsContainer.addEventListener('mouseleave', () => {
            highlightStars(currentRating);
        });

        function highlightStars(rating) {
            stars.forEach(star => {
                const starRating = star.dataset.rating;
                if (starRating <= rating) {
                    star.style.color = '#FFB800';
                    star.classList.add('active');
                } else {
                    star.style.color = '#ddd';
                    star.classList.remove('active');
                }
            });
        }
    }

    initializePhotoUpload() {
        const fileInput = document.getElementById('photo-upload');
        const previewContainer = document.querySelector('.app-modal__photo-preview');

        fileInput.addEventListener('change', function () {
            const files = Array.from(this.files).filter(file => file.type.startsWith('image/'));

            // Only show up to 5 images
            if (files.length > 5) {
                alert('You can only upload up to 5 images');
                return;
            }

            previewContainer.innerHTML = ''; // Clear existing previews

            files.forEach(file => {
                const reader = new FileReader();
                const preview = document.createElement('div');
                preview.className = 'app-modal__photo-item';

                reader.onload = function (e) {
                    preview.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="app-modal__photo-remove" onclick="this.parentElement.remove()">×</button>
                    `;
                };

                reader.readAsDataURL(file);
                previewContainer.appendChild(preview);
            });
        });
    }

}

// Initialize modal
const appModal = new CustomModal();