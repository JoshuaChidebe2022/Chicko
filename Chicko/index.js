'use strict';

//////////////////////////////////////////
// Side Navigation
const sideNav = document.querySelector(".side-nav");
const menuBtn = document.querySelector(".nav-menu-icon");
const closeBtn = document.querySelector(".side-nav-close");
const overlay = document.querySelector(".overlay");

// Functions
function openNav() {
  sideNav?.classList.remove("side-nav-hidden");
  overlay?.classList.remove("hidden");
}
function closeNav() {
  sideNav?.classList.add("side-nav-hidden");
  overlay?.classList.add("hidden");
}

menuBtn?.addEventListener("click", function () {
  openNav();
});

closeBtn?.addEventListener("click", function () {
  closeNav();
});
overlay?.addEventListener("click", function () {
  closeNav();
});
///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.fade-in');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('fade--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('fade--hidden');
});

//////////////////////////////////////////
// Testimonial Slider

// Slider
function slider() {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  const maxSlide = slides.length;
  let curSlide = 0;

  // Functions
  function createDots() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  }

  function activateDot(slide) {
    document.querySelectorAll(".dots__dot").forEach((x) => {
      x.classList.remove("dots__dot--active");
    });

    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add("dots__dot--active");
  }

  function goToSlide(slide) {
    slides.forEach((x, i) => {
      x.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  function nextSlide() {
    if (maxSlide === curSlide + 1) curSlide = 0;
    else curSlide++;

    slides.forEach((x, i) => {
      // if (i === slides.length) return;
      goToSlide(curSlide);
      activateDot(curSlide);
    });
  }

  function prevSlide() {
    if (curSlide <= 0) curSlide = slides.length;
    else curSlide--;
    activateDot(curSlide);
    goToSlide(curSlide);
  }

  function init() {
    createDots();
    activateDot(0);
    goToSlide(0);
  }
  init();
  // Next Slide
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    console.log(e);

    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;
      activateDot(slide);
      goToSlide(slide);
    }
  });
}
slider();
