let images = [
    {
        url: 'images/banner.png'
    },
    {
        url: 'images/banner2.png'
    },
    {
        url: 'images/banner3.png'
    }
];

export class Slider {
    constructor(images) {
        this.images = images;
        this.currentSlide = 0;
        this.intervalId = null;
    }

    initSlider() {
        if (!this.images || !this.images.length) return;

        let sliderImages = document.querySelector('.slider__images');
        let sliderDots = document.querySelector('.slider__dots');

        this.initImages(sliderImages);
        this.initDots(sliderDots);

        // Запускаем автоматическую прокрутку
        this.startAutoSlide();
    }

    initImages(sliderImages) {
        this.images.forEach((image, index) => {
            let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url('${this.images[index].url}');" data-index="${index}"></div>`;
            sliderImages.innerHTML += imageDiv;
        });
    }

    initDots(sliderDots) {
        this.images.forEach((image, index) => {
            let dot = `<div class="dot n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        });

        sliderDots.querySelectorAll(".dot").forEach(dot => {
            dot.addEventListener("click", () => {
                this.moveSlider(dot.dataset.index);
                this.restartAutoSlide();
            });
        });
    }

    moveSlider(num) {
        const sliderImages = document.querySelector('.slider__images');
        const sliderDots = document.querySelector('.slider__dots');

        sliderImages.querySelector(".active").classList.remove("active");
        sliderImages.querySelector(".n" + num).classList.add("active");

        sliderDots.querySelector('.active').classList.remove('active');
        sliderDots.querySelector('.n' + num).classList.add('active');

        this.currentSlide = parseInt(num);
    }

    autoSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
        this.moveSlider(this.currentSlide);
    }

    startAutoSlide() {
        this.intervalId = setInterval(() => {
            this.autoSlide();
        }, 5000);
    }

    restartAutoSlide() {
        clearInterval(this.intervalId);
        this.startAutoSlide();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const slider = new Slider(images);
    slider.initSlider();
});