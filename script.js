// Interactive Slider Script
        function initInteractiveSlider() {
            const sliderOptions = document.querySelectorAll('.slider-option');
            
            sliderOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove active class from all options
                    sliderOptions.forEach(opt => opt.classList.remove('active'));
                    // Add active class to clicked option
                    this.classList.add('active');
                });
            });
        }

        // Desktop Carousel Script
        function initCarousel(containerId, prevBtnId, nextBtnId, dotsId) {
            const container = document.getElementById(containerId);
            const prevBtn = document.getElementById(prevBtnId);
            const nextBtn = document.getElementById(nextBtnId);
            const dotsContainer = document.getElementById(dotsId);
            
            if (!container || !prevBtn || !nextBtn || !dotsContainer) return;
            
            const slides = container.querySelectorAll('.carousel-slide');
            let currentSlide = 0;
            const totalSlides = slides.length;
            let autoSlideInterval;

            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }

            const dots = dotsContainer.querySelectorAll('.dot');

            function updateCarousel() {
                container.style.transform = `translateX(-${currentSlide * 100}%)`;
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
                resetAutoSlide();
            }

            function prevSlide() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
                resetAutoSlide();
            }

            function goToSlide(index) {
                currentSlide = index;
                updateCarousel();
                resetAutoSlide();
            }

            function startAutoSlide() {
                autoSlideInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    updateCarousel();
                }, 5000);
            }

            function resetAutoSlide() {
                clearInterval(autoSlideInterval);
                startAutoSlide();
            }

            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);

            startAutoSlide();
        }

        // Modern Slider Functionality
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;
        let autoSlideInterval;

        // Initialize slider
        function initSlider() {
            showSlide(currentSlideIndex);
            startAutoSlide();
        }

        // Show specific slide
        function showSlide(index) {
            // Handle wrap-around
            if (index >= totalSlides) {
                currentSlideIndex = 0;
            } else if (index < 0) {
                currentSlideIndex = totalSlides - 1;
            } else {
                currentSlideIndex = index;
            }

            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            slides[currentSlideIndex].classList.add('active');
            dots[currentSlideIndex].classList.add('active');
        }

        // Change slide with arrow buttons
        function changeSlide(direction) {
            clearInterval(autoSlideInterval);
            showSlide(currentSlideIndex + direction);
            startAutoSlide();
        }

        // Navigate to specific slide with dots
        function currentSlide(index) {
            clearInterval(autoSlideInterval);
            showSlide(index);
            startAutoSlide();
        }

        // Auto advance slides every 6 seconds
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentSlideIndex++;
                showSlide(currentSlideIndex);
            }, 6000);
        }

        // Pause auto-slide on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            sliderContainer.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        }

        // Initialize slider when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initInteractiveSlider();
            initCarousel('carouselContainerDesktop', 'prevBtnDesktop', 'nextBtnDesktop', 'dotsDesktop');
            initSlider();
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
        });