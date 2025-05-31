"use strict";

//////////////////////////////////////////
// Side Navigation
const sideNav = document.querySelector(".side-nav");
const menuBtn = document.querySelector(".nav-menu-icon");
const closeBtn = document.querySelector(".side-nav-close");
const overlay = document.querySelector(".overlay");
const galleryOverlay = document.querySelector(".gallery-overlay");
const galleryCloseBtn = document.querySelector(".gallery-close-btn");

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
const allSections = document.querySelectorAll(".fade-in");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("fade--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("fade--hidden");
});

///////////////////////////////////////////
// Gallery full view
function hideGallery() {
  galleryOverlay?.classList.add("hidden");
  galleryCloseBtn?.classList.add("hidden");
  const fullScreenImg = document.querySelector(".gallery-img--fullscreen");
  if (fullScreenImg) {
    fullScreenImg.classList.remove("gallery-img--fullscreen");
  }
}
document.querySelector(".gallery-div").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("gallery-img")) {
    e.target.classList.add("gallery-img--fullscreen");
    galleryOverlay?.classList.remove("hidden");
    galleryCloseBtn?.classList.remove("hidden");
  }
});
galleryOverlay?.addEventListener("click", function () {
  hideGallery();
});
galleryCloseBtn?.addEventListener("click", function () {
  hideGallery();
});