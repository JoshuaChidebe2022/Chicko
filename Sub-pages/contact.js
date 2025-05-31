"use strict";

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
// Clearing form fields
// const formInputFields = document.querySelectorAll('.form-input');
// const submitFormBtn = document.querySelector('.form-submit');

// submitFormBtn.addEventListener('click', function (e) {
//   e.preventDefault();
//   formInputFields.forEach(field => {
//     field.value = '';
//   });
// });

const form = document.getElementById("contact-form");
const formModal = document.querySelector(".form-modal");
const formOverlay = document.querySelector(".form-modal-overlay");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Success - clear the form
        form.reset();
        formModal.classList.remove("hidden");
        formOverlay.classList.remove("hidden");
      } else {
        alert("Oops! Something went wrong.");
      }
    })
    .catch((error) => {
      alert("Network error. Try again later.");
    });
});

formOverlay.addEventListener("click", function () {
  formModal.classList.add("hidden");
  formOverlay.classList.add("hidden");
});