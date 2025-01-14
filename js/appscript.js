

// Add any interactive functionality here
document.querySelectorAll('.store-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Prevent default if no actual store URL is set
        if (!e.currentTarget.parentElement.href.includes('http')) {
            e.preventDefault();
        }
    });
});





// Select all slides and dots
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Function to show a specific slide
function showSlide(slideNumber) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    slides[slideNumber - 1].classList.add('active');
    dots[slideNumber - 1].classList.add('active');
}

// Add click event listener to each dot
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        showSlide(dot.getAttribute('data-slide'));
    });
});

// Optional: Auto slide after every 5 seconds
let currentSlide = 1;
setInterval(() => {
    currentSlide = (currentSlide % slides.length) + 1;
    showSlide(currentSlide);
}, 5000);














const products = [
    {
        id: 1,
        name: "Premium Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "30.0 YER",
        originalPrice: "49.9 YER",
        discount: "40%",
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        name: "Classic Leather Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "35.0 YER",
        originalPrice: "55.9 YER",
        discount: "37%",
        rating: 4.8,
        reviews: 256
    },
    {
        id: 3,
        name: "Denim Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "28.0 YER",
        originalPrice: "45.9 YER",
        discount: "39%",
        rating: 4.3,
        reviews: 92
    },
    {
        id: 4,
        name: "Vintage Style Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "32.0 YER",
        originalPrice: "52.9 YER",
        discount: "40%",
        rating: 4.6,
        reviews: 156
    },
    {
        id: 5,
        name: "Modern Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "33.0 YER",
        originalPrice: "53.9 YER",
        discount: "39%",
        rating: 4.7,
        reviews: 184
    },
    {
        id: 6,
        name: "Sport Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "29.0 YER",
        originalPrice: "48.9 YER",
        discount: "41%",
        rating: 4.4,
        reviews: 142
    }
];

let startIndex = 0;
const itemsToShow = 4;

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    if (hasHalfStar) {
        starsHTML += '½';
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '☆';
    }

    return starsHTML;
}

function createProductCard(product) {
    return `
        <div class="fs-product" data-product-id="${product.id}">
          <div class="fs-product__image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="fs-product__image">
            <button class="fs-product__favorite" aria-label="Add to favorites">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <div class="fs-product__discount">${product.discount}</div>
          </div>
          <div class="fs-product__info">
            <h3 class="fs-product__name">${product.name}</h3>
            <div class="fs-product__price">
              <span class="fs-product__price-sale">${product.salePrice}</span>
              


              <span class="fs-product__price-original">${product.originalPrice}</span>
            </div>
           
          </div>
        </div>
      `;
}

function updateCarousel() {
    const track = document.getElementById('fs-carousel-track');
    track.style.transform = `translateX(-${startIndex * (100 / itemsToShow)}%)`;

    const prevButton = document.getElementById('fs-prev-button');
    const nextButton = document.getElementById('fs-next-button');

    prevButton.disabled = startIndex === 0;
    nextButton.disabled = startIndex >= products.length - itemsToShow;

    // Add ARIA labels for accessibility
    prevButton.setAttribute('aria-disabled', startIndex === 0);
    nextButton.setAttribute('aria-disabled', startIndex >= products.length - itemsToShow);
}

function handleFavoriteClick(event) {
    const favoriteButton = event.target.closest('.fs-product__favorite');
    if (favoriteButton) {
        favoriteButton.classList.toggle('active');

        // Add haptic feedback if available
        if (window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }

        // Optional: Save to localStorage
        const productId = favoriteButton.closest('.fs-product').dataset.productId;
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (favoriteButton.classList.contains('active')) {
            favorites.push(productId);
        } else {
            const index = favorites.indexOf(productId);
            if (index > -1) favorites.splice(index, 1);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

function initializeCarousel() {
    const track = document.getElementById('fs-carousel-track');
    track.innerHTML = products.map(product => createProductCard(product)).join('');

    // Touch handling
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                handleNext();
            } else {
                // Swipe right
                handlePrev();
            }
        }
    }

    function handlePrev() {
        if (startIndex > 0) {
            startIndex--;
            updateCarousel();
        }
    }

    function handleNext() {
        if (startIndex < products.length - itemsToShow) {
            startIndex++;
            updateCarousel();
        }
    }

    // Button click handlers
    document.getElementById('fs-prev-button').addEventListener('click', handlePrev);
    document.getElementById('fs-next-button').addEventListener('click', handleNext);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
    });

    // Favorite button handlers
    track.addEventListener('click', handleFavoriteClick);

    // Load favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.forEach(productId => {
        const product = track.querySelector(`[data-product-id="${productId}"]`);
        if (product) {
            product.querySelector('.fs-product__favorite').classList.add('active');
        }
    });

    // Initialize first state
    updateCarousel();
}

function updateTimer() {
    let timeLeft = {
        days: 2,
        hours: 11,
        minutes: 15,
        seconds: 4
    };

    function padNumber(num) {
        return num.toString().padStart(2, '');
    }

    function updateDisplay() {
        document.getElementById('fs-days').innerHTML = `${padNumber(timeLeft.days)} <span>D</span>`;
        document.getElementById('fs-hours').innerHTML = `${padNumber(timeLeft.hours)} <span>H</span>`;
        document.getElementById('fs-minutes').innerHTML = `${padNumber(timeLeft.minutes)} <span>MIN</span>`;
        document.getElementById('fs-seconds').innerHTML = `${padNumber(timeLeft.seconds)} <span>SEC</span>`;

        // Add urgency class when time is running low
        if (timeLeft.days === 0 && timeLeft.hours < 12) {
            document.querySelectorAll('.fs-timer-box').forEach(box => {
                box.style.animation = 'pulse 1s infinite';
            });
        }
    }

    const timerInterval = setInterval(() => {
        if (timeLeft.seconds > 0) {
            timeLeft.seconds--;
        } else {
            timeLeft.seconds = 59;
            if (timeLeft.minutes > 0) {
                timeLeft.minutes--;
            } else {
                timeLeft.minutes = 59;
                if (timeLeft.hours > 0) {
                    timeLeft.hours--;
                } else {
                    timeLeft.hours = 23;
                    if (timeLeft.days > 0) {
                        timeLeft.days--;
                    } else {
                        // Sale ended
                        clearInterval(timerInterval);
                        document.querySelector('.fs-container').innerHTML = `
                  <div class="fs-sale-ended">
                    <h2>Flash Sale Ended</h2>
                    <p>Don't worry! New deals coming soon.</p>
                  </div>
                `;
                        return;
                    }
                }
            }
        }
        updateDisplay();
    }, 1000);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    updateTimer();

    // Optional: Add ResizeObserver for responsive adjustments
    const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
            const width = entry.contentRect.width;
            // Adjust itemsToShow based on screen width
            if (width < 640) itemsToShow = 1;
            else if (width < 768) itemsToShow = 2;
            else if (width < 1024) itemsToShow = 3;
            else itemsToShow = 4;

            updateCarousel();
        }
    });

    resizeObserver.observe(document.querySelector('.fs-carousel'));
});








let scrollPosition = 0;
const storeList = document.querySelector('.store-slider__list');
const cardWidth = 310; // card width + gap
const visibleCards = Math.floor(document.querySelector('.store-slider__wrapper').offsetWidth / cardWidth);
const maxScroll = (storeList.children.length - visibleCards) * cardWidth;

function slideStores(direction) {
    const prevButton = document.querySelector('.store-slider__nav-btn--prev');
    const nextButton = document.querySelector('.store-slider__nav-btn--next');

    if (direction === 'next' && scrollPosition < maxScroll) {
        scrollPosition += cardWidth;
    } else if (direction === 'prev' && scrollPosition > 0) {
        scrollPosition -= cardWidth;
    }

    storeList.style.transform = `translateX(-${scrollPosition}px)`;

    // Update button states
    prevButton.disabled = scrollPosition <= 0;
    nextButton.disabled = scrollPosition >= maxScroll;
}

// Initialize button states
document.querySelector('.store-slider__nav-btn--prev').disabled = true;







const bomberCarousel = document.querySelector('.bomber-carousel');
const prevButton = document.querySelector('.bomber-carousel__button--prev');
const nextButton = document.querySelector('.bomber-carousel__button--next');
const products0 = document.querySelectorAll('.bomber-product');
const productWidth = products0[0].offsetWidth + 20; // Include gap
let currentPosition = 0;
const maxPosition = -(products0.length * productWidth - bomberCarousel.offsetWidth);

function updateCarousel() {
    bomberCarousel.style.transform = `translateX(${currentPosition}px)`;
    prevButton.style.display = currentPosition === 0 ? 'none' : 'flex';
    nextButton.style.display = currentPosition <= maxPosition ? 'none' : 'flex';
}

prevButton.addEventListener('click', () => {
    currentPosition = Math.min(currentPosition + productWidth, 0);
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentPosition = Math.max(currentPosition - productWidth, maxPosition);
    updateCarousel();
});

// Handle favorite buttons
document.querySelectorAll('.bomber-product__favorite').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
    });
});

// Initial update
updateCarousel();

// Update on window resize
window.addEventListener('resize', () => {
    const newMaxPosition = -(products0.length * productWidth - bomberCarousel.offsetWidth);
    currentPosition = Math.max(currentPosition, newMaxPosition);
    updateCarousel();
});




// Handle favorite buttons
document.querySelectorAll('.suggested-product__favorite').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
    });
});




