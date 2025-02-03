
class AddressManager {
    constructor() {
        this.addresses = [];
        this.map = null;
        this.marker = null;
        this.currentId = 0;
        this.editingId = null;

        this.initMap();
        this.initEventListeners();
    }

    initMap() {
        // Initialize map
        this.map = L.map('map').setView([15.3694, 44.1910], 13); // Sana'a coordinates

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Add click handler to map
        this.map.on('click', (e) => {
            this.updateMarker(e.latlng);
        });
    }

    updateMarker(latlng) {
        if (this.marker) {
            this.marker.setLatLng(latlng);
        } else {
            this.marker = L.marker(latlng, {
                icon: L.divIcon({
                    className: 'addr-marker',
                    iconSize: [20, 20]
                })
            }).addTo(this.map);
        }

        // Update hidden form fields
        const form = document.getElementById('addressForm');
        if (form) {
            form.elements['lat'].value = latlng.lat;
            form.elements['lng'].value = latlng.lng;
        }
    }

    initEventListeners() {
        // Form submission
        document.getElementById('addressForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // New address button
        document.querySelector('.addr-new-btn').addEventListener('click', () => {
            this.openModal();
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', this.debounce(() => {
            this.searchLocation(searchInput.value);
        }, 500));
    }

    async searchLocation(query) {
        if (!query) return;

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (data.length > 0) {
                const location = data[0];
                const latlng = L.latLng(location.lat, location.lon);
                this.map.setView(latlng, 16);
                this.updateMarker(latlng);
            }
        } catch (error) {
            console.error('Error searching location:', error);
        }
    }

    handleFormSubmit() {
        const form = document.getElementById('addressForm');
        const formData = new FormData(form);

        // Get coordinates from hidden fields or marker
        const lat = formData.get('lat') || (this.marker ? this.marker.getLatLng().lat : null);
        const lng = formData.get('lng') || (this.marker ? this.marker.getLatLng().lng : null);

        const addressData = {
            id: this.editingId || ++this.currentId,
            addressName: formData.get('addressName'),
            buildingNumber: formData.get('buildingNumber'),
            apartmentNumber: formData.get('apartmentNumber'),
            specialMark: formData.get('specialMark'),
            country: formData.get('country'),
            governorate: formData.get('governorate'),
            city: formData.get('city'),
            street: formData.get('street'),
            phone: formData.get('phone'),
            alternatePhone: formData.get('alternatePhone'),
            lat: lat,
            lng: lng
        };

        if (this.editingId) {
            this.updateAddress(addressData);
        } else {
            this.addAddress(addressData);
        }

        this.closeModal();
        this.renderAddresses();
    }

    addAddress(address) {
        this.addresses.push(address);
    }

    updateAddress(address) {
        const index = this.addresses.findIndex(a => a.id === address.id);
        if (index !== -1) {
            this.addresses[index] = address;
        }
    }

    deleteAddress(id) {
        this.addresses = this.addresses.filter(a => a.id !== id);
        this.renderAddresses();
    }

    renderAddresses() {
        const container = document.getElementById('addressList');
        container.innerHTML = '';

        this.addresses.forEach(address => {
            const card = this.createAddressCard(address);
            container.appendChild(card);
        });
    }

    createAddressCard(address) {
        const card = document.createElement('div');
        card.className = 'addr-card';
        card.innerHTML = `
    <h3>${address.addressName || 'Unnamed Address'}</h3>
    <p>Building: ${address.buildingNumber}, Apt: ${address.apartmentNumber}</p>
    <p>${address.street}, ${address.city}</p>
    <p>${address.phone}</p>
    <div class="addr-actions">
        <button class="addr-edit" data-id="${address.id}">Edit</button>
        <button class="addr-delete" data-id="${address.id}">Delete</button>
    </div>
    `;

        // Add event listeners
        card.querySelector('.addr-edit').addEventListener('click', () => {
            this.editAddress(address.id);
        });

        card.querySelector('.addr-delete').addEventListener('click', () => {
            this.showDeleteConfirmation(address.id);
        });

        return card;
    }

    editAddress(id) {
        const address = this.addresses.find(a => a.id === id);
        if (address) {
            this.editingId = id;
            const form = document.getElementById('addressForm');

            // Reset form first
            form.reset();

            // Fill form with address data
            Object.keys(address).forEach(key => {
                const input = form.elements[key];
                if (input && address[key] !== null && address[key] !== undefined) {
                    input.value = address[key];
                }
            });

            // Update map and marker if coordinates exist
            if (address.lat && address.lng) {
                const latlng = L.latLng(address.lat, address.lng);
                this.map.setView(latlng, 16);
                this.updateMarker(latlng);
            } else {
                // Reset marker if no coordinates
                if (this.marker) {
                    this.map.removeLayer(this.marker);
                    this.marker = null;
                }
            }

            document.querySelector('.addr-modal-title').textContent = 'Edit address';
            this.openModal();
        }
    }

    showDeleteConfirmation(id) {
        const modal = document.getElementById('deleteModal');
        modal.classList.add('active');

        const handleConfirm = () => {
            this.deleteAddress(id);
            modal.classList.remove('active');
            removeListeners();
        };

        const handleCancel = () => {
            modal.classList.remove('active');
            removeListeners();
        };

        const confirmBtn = modal.querySelector('.delete-confirm');
        const cancelBtn = modal.querySelector('.delete-cancel');

        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);

        const removeListeners = () => {
            confirmBtn.removeEventListener('click', handleConfirm);
            cancelBtn.removeEventListener('click', handleCancel);
        };
    }

    openModal() {
        document.getElementById('addressModal').classList.add('active');
        this.map.invalidateSize();
    }

    closeModal() {
        document.getElementById('addressModal').classList.remove('active');
        document.getElementById('addressForm').reset();
        this.editingId = null;
        document.querySelector('.addr-modal-title').textContent = 'Add address';
        if (this.marker) {
            this.map.removeLayer(this.marker);
            this.marker = null;
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const addressManager = new AddressManager();

    // Close modal button handler
    document.querySelector('.addr-close').addEventListener('click', () => {
        addressManager.closeModal();
    });
});
