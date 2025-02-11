// address-components.js

// Shared Modal System
const Modal = {
    overlay: null,
    activeModal: null,

    init() {
        if (!this.overlay) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'modal-overlay';
            document.body.appendChild(this.overlay);

            this.overlay.addEventListener('click', () => this.hide());
        }
    },

    show(element) {
        this.init();
        if (this.activeModal) {
            this.activeModal.style.display = 'none';
        }
        this.activeModal = element;
        this.overlay.style.display = 'flex';
        element.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    hide() {
        if (this.activeModal) {
            this.activeModal.style.display = 'none';
        }
        this.overlay.style.display = 'none';
        document.body.style.overflow = '';
        this.activeModal = null;
    }
};

// Main Address List Component


// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add Leaflet CSS
    if (!document.querySelector('#leaflet-css')) {
        const leafletCSS = document.createElement('link');
        leafletCSS.id = 'leaflet-css';
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
        document.head.appendChild(leafletCSS);
    }

    // Add Leaflet JS
    if (!document.querySelector('#leaflet-js')) {
        const leafletJS = document.createElement('script');
        leafletJS.id = 'leaflet-js';
        leafletJS.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
        document.head.appendChild(leafletJS);
    }

    // Add lodash for debounce functionality
    if (!document.querySelector('#lodash-js')) {
        const lodashJS = document.createElement('script');
        lodashJS.id = 'lodash-js';
        lodashJS.src = 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js';
        document.head.appendChild(lodashJS);
    }

    // Initialize components once Leaflet is loaded
    const initComponents = () => {
        document.querySelectorAll('[data-component="address-list"]').forEach(element => {
            new AddressList(element);
        });
    };

    // Check if Leaflet is already loaded
    if (window.L) {
        initComponents();
    } else {
        // leafletJS.onload = () => {
        //     // Wait for a short time to ensure Leaflet is fully initialized
        //     setTimeout(initComponents, 100);
        // };
    }
});



class AddressList {
    constructor(element) {
        this.element = element;
        this.addresses = [
            {
                "id": 1,
                "type": "Home",
                "isDefault": true,
                "address": "ST7, Shabwa, Dar Muhaimud, Yemen",
                "phone": "+967 123 456 789"
            },
            {
                "id": 2,
                "type": "Work",
                "isDefault": false,
                "address": "ST12, Shabwa, Dar Muhaimud, Yemen",
                "phone": "+967 987 654 321"
            }
        ];
        element.__component = this;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.element.innerHTML = `
            <div class="address-container">
                <div class="address-header" data-action="toggle-list">
                    <div class="address-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#FF4B4B"/>
                        </svg>
                    </div>
                    <div class="address-details">
                        <span class="address-label">Default address</span>
                        <div class="address-text">
                            <span data-default-address>No address set</span>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 4l4 4 4-4" stroke="#666" stroke-width="2"/>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div class="address-modal" style="display: none">
                    <button class="new-address-btn" data-action="new-address">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M3 8h10" stroke="#333" stroke-width="2"/>
                        </svg>
                        New Address
                    </button>
                    <div class="address-list"></div>
                </div>
            </div>
        `;

        this.renderAddresses();
    }

    renderAddresses() {
        const listContainer = this.element.querySelector('.address-list');
        listContainer.innerHTML = this.addresses.map(address => `
            <div class="address-card ${address.isDefault ? 'default' : ''}" data-address-id="${address.id}">
                ${address.isDefault ? '<div class="default-badge">Default</div>' : ''}
                <div class="address-type">${address.type}</div>
                <div class="address-details">${address.address}</div>
                <div class="phone-number">${address.phone}</div>
                <div class="address-actions">
                    <button class="action-btn" data-action="edit">
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_88_11856)">
                                <path d="M18.092 0.956628C17.5538 0.390959 16.8243 0.0732422 16.0637 0.0732422C15.3032 0.0732422 14.5737 0.390959 14.0355 0.956628L1.1598 14.51C0.791086 14.8959 0.498732 15.355 0.299656 15.8606C0.100581 16.3663 -0.00126506 16.9084 1.18601e-05 17.4558V19.1666C1.18601e-05 19.3876 0.0834194 19.5996 0.231886 19.7559C0.380352 19.9122 0.581716 20 0.791679 20H2.41697C2.93691 20.0015 3.45197 19.8945 3.93234 19.6851C4.41272 19.4756 4.84886 19.168 5.21551 18.78L18.092 5.22579C18.6291 4.65929 18.9308 3.8916 18.9308 3.09121C18.9308 2.29082 18.6291 1.52313 18.092 0.956628Z" fill="#07CB6F"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_88_11856">
                                    <rect width="19" height="20" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                    <button class="action-btn" data-action="delete">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.4993 3.33333H14.916C14.7226 2.39284 14.2109 1.54779 13.4671 0.940598C12.7233 0.333408 11.7929 0.0012121 10.8327 0L9.16602 0C8.20584 0.0012121 7.27545 0.333408 6.53164 0.940598C5.78783 1.54779 5.2761 2.39284 5.08268 3.33333H2.49935C2.27834 3.33333 2.06637 3.42113 1.91009 3.57741C1.75381 3.73369 1.66602 3.94565 1.66602 4.16667C1.66602 4.38768 1.75381 4.59964 1.91009 4.75592C2.06637 4.9122 2.27834 5 2.49935 5H3.33268V15.8333C3.33401 16.938 3.77342 17.997 4.55453 18.7782C5.33565 19.5593 6.39469 19.9987 7.49935 20H12.4993C13.604 19.9987 14.6631 19.5593 15.4442 18.7782C16.2253 17.997 16.6647 16.938 16.666 15.8333V5H17.4993C17.7204 5 17.9323 4.9122 18.0886 4.75592C18.2449 4.59964 18.3327 4.38768 18.3327 4.16667C18.3327 3.94565 18.2449 3.73369 18.0886 3.57741C17.9323 3.42113 17.7204 3.33333 17.4993 3.33333Z" fill="#7A808A"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');

        // Update default address display
        const defaultAddress = this.getDefaultAddress();
        const defaultDisplay = this.element.querySelector('[data-default-address]');
        defaultDisplay.textContent = defaultAddress ? defaultAddress.address : 'No address set';
    }

    setupEventListeners() {
        this.element.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            if (action) {
                switch (action) {
                    case 'toggle-list':
                        this.toggleList();
                        break;
                    case 'new-address':
                        this.showAddressForm();
                        break;
                    case 'edit':
                        const editCard = e.target.closest('.address-card');
                        if (editCard) {
                            this.editAddress(editCard.dataset.addressId);
                        }
                        break;
                    case 'delete':
                        const deleteCard = e.target.closest('.address-card');
                        if (deleteCard) {
                            this.showDeleteConfirmation(deleteCard.dataset.addressId);
                        }
                        break;
                }
            }
        });
    }

    toggleList() {
        const modal = this.element.querySelector('.address-modal');
        if (modal.style.display === 'none') {
            Modal.show(modal);
        } else {
            Modal.hide();
        }
    }

    getDefaultAddress() {
        return this.addresses.find(a => a.isDefault);
    }

    showAddressForm(addressId = null) {
        let formElement = document.querySelector('#address-form');
        if (!formElement) {
            formElement = document.createElement('div');
            formElement.id = 'address-form';
            document.body.appendChild(formElement);
            new AddressForm(formElement, this);
        }

        const form = formElement.__component;
        if (addressId) {
            const address = this.addresses.find(a => a.id === parseInt(addressId));
            if (address) {
                form.setEditMode(address);
            }
        } else {
            form?.setAddMode();
        }

        Modal.show(formElement);
    }

    showDeleteConfirmation(addressId) {
        let confirmElement = document.querySelector('#delete-confirmation');
        if (!confirmElement) {
            confirmElement = document.createElement('div');
            confirmElement.id = 'delete-confirmation';
            document.body.appendChild(confirmElement);
            new DeleteConfirmation(confirmElement, this);
        }

        confirmElement.__component.setAddressId(parseInt(addressId));
        Modal.show(confirmElement);
    }

    editAddress(addressId) {
        this.showAddressForm(addressId);
    }

    updateAddresses(newAddresses) {
        this.addresses = newAddresses;
        this.renderAddresses();
    }
}

// Address Form Component with Leaflet integration
class AddressForm {
    constructor(element, listComponent) {
        this.element = element;
        this.listComponent = listComponent;
        this.currentAddressId = null;
        this.map = null;
        this.marker = null;
        element.__component = this;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
        // Initialize map after render
        setTimeout(() => this.initializeMap(), 100);
    }

    render() {
        this.element.innerHTML = `
            <form class="address-form">
                <h2 class="form-title">Add Address</h2>
                
                <div class="search-input-group">
                    <input type="text" id="searchAddress" placeholder="Search for an address..." />
                </div>
                
                <div id="mapContainer" style="height: 200px; width: 100%; margin-bottom: 20px;"></div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="addressName">Address Name *</label>
                        <input type="text" id="addressName" name="addressName" required placeholder="Home">
                    </div>
                    <div class="form-group">
                        <label for="buildingNumber">Building Number *</label>
                        <input type="text" id="buildingNumber" name="buildingNumber" required placeholder="23">
                    </div>
                    <div class="form-group">
                        <label for="apartmentNumber">Apartment Number</label>
                        <input type="text" id="apartmentNumber" name="apartmentNumber" placeholder="10">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="country">Country *</label>
                        <select id="country" name="country" required>
                            <option value="Yemen">Yemen</option>
                            <option value="Egypt">Egypt</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="specialMark">Special Mark</label>
                        <input type="text" id="specialMark" name="specialMark" placeholder="Front of McDonald's">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="governorate">Governorate *</label>
                        <select id="governorate" name="governorate" required>
                            <option value="Shabwa">Shabwa</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="city">City *</label>
                        <select id="city" name="city" required>
                            <option value="Dar Muhaimud">Dar Muhaimud</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="phone">Mobile Number *</label>
                        <input type="tel" id="phone" name="phone" required placeholder="+967 123 456 789">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="street">Street *</label>
                        <input type="text" id="street" name="street" required placeholder="ST7">
                    </div>
                    <div class="form-group">
                        <label for="anotherPhone">Another Mobile Number</label>
                        <input type="tel" id="anotherPhone" name="anotherPhone" placeholder="+967 123 456 789">
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-cancel" data-action="cancel">Cancel</button>
                    <button type="submit" class="btn btn-save">Save Address</button>
                </div>
            </form>
        `;
    }

    initializeMap() {
        // Initialize Leaflet map
        this.map = L.map('mapContainer').setView([15.3694, 47.3725], 13); // Default to Yemen coordinates

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Add initial marker
        this.marker = L.marker([15.3694, 47.3725], {
            draggable: true
        }).addTo(this.map);

        // Handle marker drag events
        this.marker.on('dragend', (event) => {
            const position = event.target.getLatLng();
            this.reverseGeocode(position.lat, position.lng);
        });

        // Handle map click events
        this.map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            this.marker.setLatLng([lat, lng]);
            this.reverseGeocode(lat, lng);
        });

        // Initialize search functionality
        this.initializeSearch();

        // Force map to recalculate its size
        setTimeout(() => {
            this.map.invalidateSize();
        }, 100);
    }

    initializeSearch() {
        const searchInput = this.element.querySelector('#searchAddress');

        // Using Nominatim for geocoding (consider rate limits for production)
        searchInput.addEventListener('input', _.debounce(async (e) => {
            const query = e.target.value;
            if (query.length < 3) return;

            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
                const data = await response.json();

                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    this.updateMapPosition(lat, lon);
                    this.reverseGeocode(lat, lon);
                }
            } catch (error) {
                console.error('Geocoding error:', error);
            }
        }, 500));
    }

    async reverseGeocode(lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();

            if (data.address) {
                this.fillAddressFields(data.address);
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error);
        }
    }

    updateMapPosition(lat, lng) {
        this.map.setView([lat, lng], 16);
        this.marker.setLatLng([lat, lng]);
    }

    fillAddressFields(address) {
        const form = this.element.querySelector('form');

        // Map OSM address fields to form fields
        if (address.house_number) form.buildingNumber.value = address.house_number;
        if (address.road) form.street.value = address.road;
        if (address.city) form.city.value = address.city;
        if (address.state) {
            const governorateSelect = form.querySelector('#governorate');
            const option = Array.from(governorateSelect.options).find(opt =>
                opt.text.toLowerCase() === address.state.toLowerCase()
            );
            if (option) governorateSelect.value = option.value;
        }
        if (address.country) {
            const countrySelect = form.querySelector('#country');
            const option = Array.from(countrySelect.options).find(opt =>
                opt.text.toLowerCase() === address.country.toLowerCase()
            );
            if (option) countrySelect.value = option.value;
        }
    }

    setupEventListeners() {
        this.element.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));
        this.element.querySelector('[data-action="cancel"]').addEventListener('click', () => {
            Modal.hide();
        });
    }

    setEditMode(address) {
        this.currentAddressId = address.id;
        this.element.querySelector('.form-title').textContent = 'Edit Address';

        const form = this.element.querySelector('form');
        form.addressName.value = address.type;
        form.buildingNumber.value = address.buildingNumber || '';
        form.apartmentNumber.value = address.apartmentNumber || '';
        form.street.value = address.street || '';
        form.city.value = address.city || '';
        form.country.value = address.country || '';
        form.governorate.value = address.governorate || '';
        form.phone.value = address.phone || '';
        form.anotherPhone.value = address.anotherPhone || '';
        form.specialMark.value = address.specialMark || '';

        // Update map position if coordinates are available
        if (address.lat && address.lng) {
            this.updateMapPosition(address.lat, address.lng);
        }
    }

    setAddMode() {
        this.currentAddressId = null;
        this.element.querySelector('.form-title').textContent = 'Add Address';
        this.element.querySelector('form').reset();

        // Reset map to default position
        if (this.map && this.marker) {
            this.updateMapPosition(15.3694, 47.3725);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const markerPosition = this.marker.getLatLng();
        const addressDetails = {
            buildingNumber: data.buildingNumber,
            apartmentNumber: data.apartmentNumber,
            street: data.street,
            city: data.city,
            governorate: data.governorate,
            country: data.country,
            lat: markerPosition.lat,
            lng: markerPosition.lng
        };

        const formattedAddress = `${addressDetails.buildingNumber} ${addressDetails.street}, ${addressDetails.city}, ${addressDetails.governorate}, ${addressDetails.country}`;

        if (this.currentAddressId) {
            this.updateAddress({
                ...data,
                ...addressDetails,
                address: formattedAddress,
                id: this.currentAddressId
            });
        } else {
            this.createAddress({
                ...data,
                ...addressDetails,
                address: formattedAddress
            });
        }

        Modal.hide();
        e.target.reset();
    }

    createAddress(data) {
        const newAddress = {
            id: Date.now(),
            type: data.addressName,
            address: data.address,
            phone: data.phone,
            anotherPhone: data.anotherPhone,
            specialMark: data.specialMark,
            isDefault: this.listComponent.addresses.length === 0,
            ...data
        };

        const newAddresses = [...this.listComponent.addresses, newAddress];
        this.listComponent.updateAddresses(newAddresses);
    }

    updateAddress(data) {
        const newAddresses = this.listComponent.addresses.map(addr =>
            addr.id === this.currentAddressId
                ? {
                    ...addr,
                    type: data.addressName,
                    address: data.address,
                    phone: data.phone,
                    anotherPhone: data.anotherPhone,
                    specialMark: data.specialMark,
                    ...data
                }
                : addr
        );
        this.listComponent.updateAddresses(newAddresses);
    }
}

// Delete Confirmation Component
class DeleteConfirmation {
    constructor(element, listComponent) {
        this.element = element;
        this.listComponent = listComponent;
        this.addressId = null;
        element.__component = this;
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.element.innerHTML = `
            <div class="confirm-modal">
                <h2>Delete Address</h2>
                <p>Are you sure you want to delete this address? This action cannot be undone.</p>
                <div class="confirm-actions">
                    <button class="btn btn-cancel" data-action="cancel">Cancel</button>
                    <button class="btn btn-delete" data-action="confirm">Delete</button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.element.querySelector('[data-action="cancel"]').addEventListener('click', () => {
            Modal.hide();
            this.reset();
        });

        this.element.querySelector('[data-action="confirm"]').addEventListener('click', () => {
            this.deleteAddress();
        });
    }

    setAddressId(addressId) {
        this.addressId = addressId;
    }

    reset() {
        this.addressId = null;
    }

    deleteAddress() {
        if (this.addressId) {
            const addressToDelete = this.listComponent.addresses.find(a => a.id === this.addressId);
            const newAddresses = this.listComponent.addresses.filter(a => a.id !== this.addressId);

            // If we deleted the default address, make the first remaining address default
            if (addressToDelete?.isDefault && newAddresses.length > 0) {
                newAddresses[0].isDefault = true;
            }

            this.listComponent.updateAddresses(newAddresses);
            Modal.hide();
        }
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any address lists in the document
    document.querySelectorAll('[data-component="address-list"]').forEach(element => {
        new AddressList(element);
    });
});