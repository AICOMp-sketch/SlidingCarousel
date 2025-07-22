document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelector('.carousel-slides');
            const slideItems = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            const indicators = document.querySelectorAll('.indicator');
            
            let currentIndex = 0;
            const totalSlides = slideItems.length;
            let autoScroll = true;
            let intervalId;

            // Initialize carousel
            function init() {
                updateCarousel();
                startAutoScroll();
                setupEventListeners();
            }

            // Set up event listeners
            function setupEventListeners() {
                // Navigation buttons
                prevBtn.addEventListener('click', () => {
                    navigate(-1);
                    resetAutoScroll();
                });
                
                nextBtn.addEventListener('click', () => {
                    navigate(1);
                    resetAutoScroll();
                });

                // Indicator dots
                indicators.forEach(indicator => {
                    indicator.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        if (index !== currentIndex) {
                            goToSlide(index);
                            resetAutoScroll();
                        }
                    });
                });

                // Pause on hover
                const container = document.querySelector('.carousel-container');
                container.addEventListener('mouseenter', pauseAutoScroll);
                container.addEventListener('mouseleave', startAutoScroll);

                // Keyboard navigation
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowLeft') {
                        navigate(-1);
                        resetAutoScroll();
                    } else if (e.key === 'ArrowRight') {
                        navigate(1);
                        resetAutoScroll();
                    }
                });
            }

            // Navigate between slides
            function navigate(direction) {
                currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
                updateCarousel();
            }

            // Go to specific slide
            function goToSlide(index) {
                currentIndex = index;
                updateCarousel();
            }

            // Update carousel display
            function updateCarousel() {
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update indicators
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }

            // Auto-scroll functionality
            function startAutoScroll() {
                if (autoScroll) {
                    intervalId = setInterval(() => {
                        navigate(1);
                    }, 5000);
                }
            }

            function pauseAutoScroll() {
                clearInterval(intervalId);
            }

            function resetAutoScroll() {
                pauseAutoScroll();
                if (autoScroll) {
                    startAutoScroll();
                }
            }

            // Initialize the carousel
            init();
        });
