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
                <button class="apply-btn">Apply</button>
                <button class="reset-btn">Rest</button>
            </div>
        `;

        this.container.innerHTML = template;
    }

    renderCategories() {
        return this.config.categories.map(category => `
            <div class="category-item" data-category="${category.name}">
                <div class="category-name">
                    <span class="category-dot"></span>
                    <span>${category.name}</span>
                </div>
                <span class="category-count">${category.count}</span>
            </div>
        `).join('');
    }

    renderSubCategories(items, level = 0) {
        return items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = level < 4; // Auto-expand first 4 levels
            const expandIcon = hasChildren ? (isExpanded ? '−' : '+') : '+';
            const hiddenClass = !isExpanded && hasChildren ? 'hidden' : '';
            const isLast = index === items.length - 1;

            return `
                <div class="subcategory-item">
                    <div class="subcategory-content">
                        ${level > 0 ? `<div class="tree-line"></div>
                        <div class="tree-line-horizontal"></div>` : ''}
                        <div class="subcategory-header">
                            <button class="expand-icon ${hasChildren ? 'has-children' : ''}">${expandIcon}</button>
                            <span class="subcategory-name">${item.name}</span>
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
            <div class="size-option ${size.selected ? 'selected' : ''}" data-size="${size.label}">
                ${size.label}
            </div>
        `).join('');
    }

    renderColorOptions() {
        return this.config.colors.map(color => `
            <div class="color-option ${color === '#c4a77d' ? 'selected' : ''}" 
                 style="background-color: ${color}"
                 data-color="${color}">
            </div>
        `).join('');
    }

    initRangeSlider() {
        const slider = this.container.querySelector('.range-slider');
        const track = slider.querySelector('.slider-track');
        const minHandle = slider.querySelector('[data-handle="min"]');
        const maxHandle = slider.querySelector('[data-handle="max"]');
        const minPrice = this.container.querySelector('.min-price');
        const maxPrice = this.container.querySelector('.max-price');

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
                minPrice.textContent = `${this.getPriceFromPercent(finalPercent).toFixed(1)} YER`;
            } else {
                const minPercent = parseFloat(minHandle.style.left) / 100 || 0;
                const finalPercent = Math.max(percent, minPercent + 0.1);
                handle.style.left = `${finalPercent * 100}%`;
                track.style.right = `${(1 - finalPercent) * 100}%`;
                maxPrice.textContent = `${this.getPriceFromPercent(finalPercent)} YER`;
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
        // Category selection
        this.container.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', () => {
                const categoryName = item.dataset.category;
                if (this.selectedFilters.categories.has(categoryName)) {
                    this.selectedFilters.categories.delete(categoryName);
                    item.classList.remove('selected');
                } else {
                    this.selectedFilters.categories.add(categoryName);
                    item.classList.add('selected');
                }
            });
        });

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
            });
        });

        // Size selection
        this.container.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', () => {
                const size = option.dataset.size;
                if (this.selectedFilters.sizes.has(size)) {
                    this.selectedFilters.sizes.delete(size);
                    option.classList.remove('selected');
                } else {
                    this.selectedFilters.sizes.add(size);
                    option.classList.add('selected');
                }
            });
        });

        // Color selection
        this.container.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.color;
                if (this.selectedFilters.colors.has(color)) {
                    this.selectedFilters.colors.delete(color);
                    option.classList.remove('selected');
                } else {
                    this.selectedFilters.colors.add(color);
                    option.classList.add('selected');
                }
            });
        });

        // Apply button
        this.container.querySelector('.apply-btn').addEventListener('click', () => {
            this.applyFilters();
        });

        // Reset button
        this.container.querySelector('.reset-btn').addEventListener('click', () => {
            this.resetFilters();
        });
    }

    applyFilters() {
        const selectedFilters = {
            categories: Array.from(this.selectedFilters.categories),
            sizes: Array.from(this.selectedFilters.sizes),
            colors: Array.from(this.selectedFilters.colors),
            price: {
                min: this.getPriceFromPercent(parseFloat(this.container.querySelector('[data-handle="min"]').style.left) / 100),
                max: this.getPriceFromPercent(parseFloat(this.container.querySelector('[data-handle="max"]').style.left) / 100)
            }
        };

        const event = new CustomEvent('filtersApplied', {
            detail: selectedFilters
        });
        this.container.dispatchEvent(event);
    }

    resetFilters() {
        // Clear selected filters
        this.selectedFilters.categories.clear();
        this.selectedFilters.sizes.clear();
        this.selectedFilters.colors.clear();

        // Reset UI
        this.container.querySelectorAll('.selected').forEach(el => {
            el.classList.remove('selected');
        });

        // Reset price range
        const slider = this.container.querySelector('.range-slider');
        const track = slider.querySelector('.slider-track');
        const minHandle = slider.querySelector('[data-handle="min"]');
        const maxHandle = slider.querySelector('[data-handle="max"]');

        minHandle.style.left = '0%';
        maxHandle.style.left = '100%';
        track.style.left = '0%';
        track.style.right = '0%';

        // Reset price display
        this.container.querySelector('.min-price').textContent = `${this.config.price.min}.0 YER`;
        this.container.querySelector('.max-price').textContent = `${this.config.price.max} YER`;

        // Dispatch reset event
        const event = new CustomEvent('filtersReset');
        this.container.dispatchEvent(event);
    }
}