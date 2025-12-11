/* project.js - Handles Nav, Theme, Fade-In, AND Slider logic */

// 1. Navbar Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if(burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
}
navSlide();

// 2. Dark Mode Toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme === 'dark' ? 'dark-mode' : 'light-mode');
    if (currentTheme === 'dark' && toggleSwitch) toggleSwitch.checked = true;
}
if(toggleSwitch) toggleSwitch.addEventListener('change', switchTheme, false);

// 3. Fade In Animation
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));


/* --- 4. SAFE SLIDER LOGIC (Only runs if slider exists) --- */
/* This allows this file to be used on 'Upcoming' (no slider) and 'Detail Page' (has slider) */

const sliderTrack = document.querySelector('.slider-track');

if (sliderTrack) {
    const slidesOriginal = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextSlideBtn');
    const prevBtn = document.getElementById('prevSlideBtn');

    // Clone First and Last for infinite loop
    const firstClone = slidesOriginal[0].cloneNode(true);
    const lastClone = slidesOriginal[slidesOriginal.length - 1].cloneNode(true);
    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';

    sliderTrack.append(firstClone);
    sliderTrack.prepend(lastClone);

    const slides = document.querySelectorAll('.slide');
    let slideIndex = 1;
    const slideInterval = 3000;
    let autoScroll;

    // Set initial position
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

    // Teleport Logic (Infinite Loop)
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

    // Controls
    const resetTimer = () => {
        clearInterval(autoScroll);
        autoScroll = setInterval(nextSlide, slideInterval);
    };

    if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    autoScroll = setInterval(nextSlide, slideInterval);
    
    // Hover Pause
    const sliderSection = document.querySelector('.portfolio-slider');
    if(sliderSection) {
        sliderSection.addEventListener('mouseenter', () => clearInterval(autoScroll));
        sliderSection.addEventListener('mouseleave', () => resetTimer());
    }
}