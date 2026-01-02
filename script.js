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

        document.addEventListener('DOMContentLoaded', () => {
            initInteractiveSlider();
            initCarousel('carouselContainerDesktop', 'prevBtnDesktop', 'nextBtnDesktop', 'dotsDesktop');
        });