class FilterComponent {
    constructor(container, config) {
        this.container = container;
        this.config = config;
        this.selectedFilters = {
            categories: new Set(),
            subCategories: new Set(),
            sizes: new Set(),
            colors: new Set(),
            price: { min: config.price.min, max: config.price.max }
        };
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.initRangeSlider();
    }

    render() {
        const template = `
            <form class="filter-form">
                <div class="filter-section">
                    <h3>Categories</h3>
                    <div class="categories-list">
                        ${this.renderCategories()}
                    </div>
                </div>
                
                <div class="filter-section">
                    <h3>Sub Categories</h3>
                    <div class="subcategories-tree">
                        ${this.renderSubCategories(this.config.subCategories)}
                    </div>
                </div>

                <div class="filter-section">
                    <h3>Price</h3>
                    <div class="price-range">
                        <div class="range-slider">
                            <div class="slider-track"></div>
                            <div class="slider-handle" data-handle="min"></div>
                            <div class="slider-handle" data-handle="max"></div>
                        </div>
                        <div class="price-values">
                            <span class="min-price">${this.config.price.min}.0 YER</span>
                            <span class="max-price">${this.config.price.max} YER</span>
                        </div>
                        <!-- Hidden inputs for price range values -->
                        <input type="hidden" name="minPrice" value="${this.config.price.min}">
                        <input type="hidden" name="maxPrice" value="${this.config.price.max}">
                    </div>
                </div>

                <div class="filter-section">
                    <h3>Size</h3>
                    <div class="size-options">
                        ${this.renderSizeOptions()}
                    </div>
                </div>

                <div class="filter-section">
                    <h3>Color</h3>
                    <div class="color-options">
                        ${this.renderColorOptions()}
                    </div>
                </div>

                <div class="filter-actions">
                    <button type="submit" class="apply-btn">Apply</button>
                    <button type="button" class="reset-btn">Reset</button>
                </div>
            </form>
        `;

        this.container.innerHTML = template;
    }

    renderCategories() {
        return this.config.categories.map(category => `
            <div class="category-item">
                <label class="category-label">
                    <input type="checkbox" 
                           name="categories" 
                           value="${category.name}" 
                           ${this.selectedFilters.categories.has(category.name) ? 'checked' : ''}>
                    <div class="category-name">
                        <span class="category-dot"></span>
                        <span>${category.name}</span>
                    </div>
                    <span class="category-count">${category.count}</span>
                </label>
            </div>
        `).join('');
    }

    renderSubCategories(items, level = 0) {
        return items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = level < 4;
            const expandIcon = hasChildren ? (isExpanded ? '−' : '+') : '+';
            const hiddenClass = !isExpanded && hasChildren ? 'hidden' : '';
            const isLast = index === items.length - 1;

            return `
                <div class="subcategory-item">
                    <div class="subcategory-content">
                        ${level > 0 ? `<div class="tree-line"></div>
                        <div class="tree-line-horizontal"></div>` : ''}
                        <div class="subcategory-header">
                            <button type="button" class="expand-icon ${hasChildren ? 'has-children' : ''}">${expandIcon}</button>
                            <label class="subcategory-label">
                                <input type="checkbox" 
                                       name="subCategories" 
                                       value="${item.name}"
                                       ${this.selectedFilters.subCategories.has(item.name) ? 'checked' : ''}>
                                <span class="subcategory-name">${item.name}</span>
                            </label>
                            ${item.count ? `<span class="subcategory-count">${item.count}</span>` : ''}
                        </div>
                    </div>
                    ${hasChildren ? `
                        <div class="nested-subcategories ${hiddenClass}">
                            ${this.renderSubCategories(item.children, level + 1)}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    renderSizeOptions() {
        return this.config.sizes.map(size => `
            <label class="size-option ${size.selected ? 'selected' : ''}">
                <input type="checkbox" 
                       name="sizes" 
                       value="${size.label}"
                       ${this.selectedFilters.sizes.has(size.label) ? 'checked' : ''}>
                <span class="size-label">${size.label}</span>
            </label>
        `).join('');
    }

    renderColorOptions() {
        return this.config.colors.map(color => `
            <label class="color-option ${this.selectedFilters.colors.has(color) ? 'selected' : ''}"
                   style="background-color: ${color}">
                <input type="checkbox" 
                       name="colors" 
                       value="${color}"
                       ${this.selectedFilters.colors.has(color) ? 'checked' : ''}>
            </label>
        `).join('');
    }

    initRangeSlider() {
        const slider = this.container.querySelector('.range-slider');
        const track = slider.querySelector('.slider-track');
        const minHandle = slider.querySelector('[data-handle="min"]');
        const maxHandle = slider.querySelector('[data-handle="max"]');
        const minPrice = this.container.querySelector('.min-price');
        const maxPrice = this.container.querySelector('.max-price');
        const minPriceInput = this.container.querySelector('input[name="minPrice"]');
        const maxPriceInput = this.container.querySelector('input[name="maxPrice"]');

        let isDragging = false;
        let activeHandle = null;

        const updateSlider = (e, handle) => {
            const sliderRect = slider.getBoundingClientRect();
            const percent = Math.min(Math.max((e.clientX - sliderRect.left) / sliderRect.width, 0), 1);

            if (handle.dataset.handle === 'min') {
                const maxPercent = parseFloat(maxHandle.style.left) / 100 || 1;
                const finalPercent = Math.min(percent, maxPercent - 0.1);
                handle.style.left = `${finalPercent * 100}%`;
                track.style.left = `${finalPercent * 100}%`;
                const price = this.getPriceFromPercent(finalPercent);
                minPrice.textContent = `${price.toFixed(1)} YER`;
                minPriceInput.value = price;
            } else {
                const minPercent = parseFloat(minHandle.style.left) / 100 || 0;
                const finalPercent = Math.max(percent, minPercent + 0.1);
                handle.style.left = `${finalPercent * 100}%`;
                track.style.right = `${(1 - finalPercent) * 100}%`;
                const price = this.getPriceFromPercent(finalPercent);
                maxPrice.textContent = `${price} YER`;
                maxPriceInput.value = price;
            }
        };

        const handleDrag = (e) => {
            if (!isDragging) return;
            updateSlider(e, activeHandle);
        };

        const stopDragging = () => {
            isDragging = false;
            activeHandle = null;
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', stopDragging);
        };

        [minHandle, maxHandle].forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                isDragging = true;
                activeHandle = handle;
                document.addEventListener('mousemove', handleDrag);
                document.addEventListener('mouseup', stopDragging);
                e.preventDefault();
            });
        });

        // Initialize positions
        minHandle.style.left = '0%';
        maxHandle.style.left = '100%';
        track.style.left = '0%';
        track.style.right = '0%';
    }

    getPriceFromPercent(percent) {
        const range = this.config.price.max - this.config.price.min;
        return Math.round(this.config.price.min + (range * percent));
    }

    attachEventListeners() {
        const form = this.container.querySelector('.filter-form');

        // Subcategory expansion
        this.container.querySelectorAll('.expand-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const item = e.target.closest('.subcategory-item');
                const nestedContent = item.querySelector('.nested-subcategories');
                if (nestedContent) {
                    nestedContent.classList.toggle('hidden');
                    e.target.textContent = nestedContent.classList.contains('hidden') ? '+' : '−';
                }
                e.stopPropagation();
                e.preventDefault(); // Prevent form submission
            });
        });

        // Handle form submission
        form.addEventListener('submit', (e) => {
            // e.preventDefault();
            const formData = new FormData(form);

            const filters = {
                categories: formData.getAll('categories'),
                subCategories: formData.getAll('subCategories'),
                sizes: formData.getAll('sizes'),
                colors: formData.getAll('colors'),
                price: {
                    min: parseInt(formData.get('minPrice')),
                    max: parseInt(formData.get('maxPrice'))
                }
            };

            const event = new CustomEvent('filtersApplied', {
                detail: filters
            });
            this.container.dispatchEvent(event);
        });

        // Reset button
        this.container.querySelector('.reset-btn').addEventListener('click', () => {
            this.resetFilters();
        });

        // Update visual states for checkboxes
        form.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const label = e.target.closest('label');
                if (label) {
                    label.classList.toggle('selected', e.target.checked);
                }
            }
        });
    }

    resetFilters() {
        const form = this.container.querySelector('.filter-form');
        form.reset();

        // Reset price range
        const slider = this.container.querySelector('.range-slider');
        const track = slider.querySelector('.slider-track');
        const minHandle = slider.querySelector('[data-handle="min"]');
        const maxHandle = slider.querySelector('[data-handle="max"]');

        minHandle.style.left = '0%';
        maxHandle.style.left = '100%';
        track.style.left = '0%';
        track.style.right = '0%';

        // Reset price display and hidden inputs
        this.container.querySelector('.min-price').textContent = `${this.config.price.min}.0 YER`;
        this.container.querySelector('.max-price').textContent = `${this.config.price.max} YER`;
        this.container.querySelector('input[name="minPrice"]').value = this.config.price.min;
        this.container.querySelector('input[name="maxPrice"]').value = this.config.price.max;

        // Reset visual states
        this.container.querySelectorAll('.selected').forEach(el => {
            el.classList.remove('selected');
        });

        // Dispatch reset event
        const event = new CustomEvent('filtersReset');
        this.container.dispatchEvent(event);
    }
}