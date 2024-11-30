document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentItem = 0;
    let isPlaying = true;
    const totalItems = items.length;
    const interval = 3000;
    let slideInterval;

    function goToItem(index) {
        // Remove active class from current item and indicator
        items[currentItem].classList.remove('active');
        indicators[currentItem].classList.remove('active');

        // Add active class to new item and indicator
        items[index].classList.add('active');
        indicators[index].classList.add('active');

        currentItem = index;
    }

    function nextItem() {
        let next = (currentItem + 1) % totalItems;
        goToItem(next);
    }

    function prevItem() {
        let prev = (currentItem - 1 + totalItems) % totalItems;
        goToItem(prev);
    }

    function startSlideshow() {
        if (!isPlaying) {
            isPlaying = true;
            slideInterval = setInterval(nextItem, interval);
        }
    }

    function pauseSlideshow() {
        if (isPlaying) {
            isPlaying = false;
            clearInterval(slideInterval);
        }
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        pauseSlideshow();
        prevItem();
    });

    nextBtn.addEventListener('click', () => {
        pauseSlideshow();
        nextItem();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            pauseSlideshow();
            goToItem(index);
        });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', pauseSlideshow);
    carousel.addEventListener('mouseleave', startSlideshow);

    // Start the slideshow
    startSlideshow();
});