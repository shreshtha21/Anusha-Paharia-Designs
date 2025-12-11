const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}
navSlide();
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.2, 
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
function switchTheme(e) {
    if (e.target.checked) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
}
toggleSwitch.addEventListener('change', switchTheme, false);

const sliderTrack = document.querySelector('.slider-track');
const slidesOriginal = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextSlideBtn');
const prevBtn = document.getElementById('prevSlideBtn');
const firstClone = slidesOriginal[0].cloneNode(true);
const lastClone = slidesOriginal[slidesOriginal.length - 1].cloneNode(true);
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';
sliderTrack.append(firstClone);
sliderTrack.prepend(lastClone);
const slides = document.querySelectorAll('.slide');
let slideIndex = 1;
const slideInterval = 2000; 
let autoScroll;
sliderTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
const moveToSlide = () => {
    sliderTrack.classList.add('transition');
    sliderTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
};
const nextSlide = () => {
    if (slideIndex >= slides.length - 1) return;
    slideIndex++;
    moveToSlide();
};
const prevSlide = () => {
    if (slideIndex <= 0) return; 
    slideIndex--;
    moveToSlide();
};
sliderTrack.addEventListener('transitionend', () => {
    if (slides[slideIndex].id === 'first-clone') {
        sliderTrack.classList.remove('transition'); 
        slideIndex = 1; 
        sliderTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    if (slides[slideIndex].id === 'last-clone') {
        sliderTrack.classList.remove('transition'); 
        slideIndex = slides.length - 2; 
        sliderTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
});
const resetTimer = () => {
    clearInterval(autoScroll);
    autoScroll = setInterval(nextSlide, slideInterval);
};
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetTimer();
});
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetTimer();
});
autoScroll = setInterval(nextSlide, slideInterval);
const sliderSection = document.querySelector('.portfolio-slider');
sliderSection.addEventListener('mouseenter', () => clearInterval(autoScroll));
sliderSection.addEventListener('mouseleave', () => resetTimer());