"use strict";

// Sticky Navigation
// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the navbar
let navbar = document.querySelector(".navbar");

// Get the offset position of the navbar
let sticky = 400;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

const year = document.getElementById("getYear");
// Smooth Scrolling Effect
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });

// Project Section

const squareBox = document.querySelectorAll(".project-box");
const skillSet = document.querySelector("#skillset");
const contactForm = document.querySelector(".form-contact");

// const button = document.querySelectorAll("button");

function revealDetails() {
  this.childNodes[1].style.display = "none";
  this.childNodes[3].classList.add("overlay");
}

function hideDetails() {
  this.childNodes[1].style.display = "block";
  this.childNodes[3].classList.remove("overlay");
}

squareBox.forEach((square) =>
  square.addEventListener("mouseover", revealDetails)
);

squareBox.forEach((square) => square.addEventListener("mouseout", hideDetails));

function readMore(event) {
  let buttonId = event.target.id;

  function getSkills() {
    let output;
    skills.filter((p) => {
      if (p.id === parseInt(buttonId)) {
        output = `
                    <img src="${p.imageSource}" alt="${p.alt}" class="card-img">
                    <div class="card-body">
                        <h3>${p.name}</h3>
                        <p>${p.body}</p>
                        <span><a href="${p.github}"><i class="fab fa-github"></i>Source Code</a> <a href="${p.deployedLink}"><i class="fa fa-globe"></i>Demo</a> 
                    </div>`;
        const cardBody = document.querySelector(".card");
        cardBody.innerHTML = output;
        window.location.href = "#skillset";
        closeModal();
      }
    });
  }

  getSkills();

  function closeModal() {
    skillSet.addEventListener("click", function () {
      window.location.href = "#projects";
    });
  }
}

function headingText(label) {
  let element = document.querySelector(`.${label}`);
  function underlineHeading(e) {
    e.target.childNodes[3].style.display = "block";
  }
  function removeUnderline(e) {
    e.target.childNodes[3].style.display = "none";
  }

  element.addEventListener("mouseenter", underlineHeading);
  element.addEventListener("mouseleave", removeUnderline);
}
headingText("about");
headingText("skill");

const contactForm =document.querySelector('.form-contact');

let firstname = document.getElementById('input-firstname');
let lastname = document.getElementById('input-lastname');
let email = document.getElementById('inputEmail');
let subject = document.getElementById('input-subject');
let message = document.getElementById('inputMessage');

contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  let formData ={
    firstname:firstname.value, 
    lastname:lastname.value,
    email:email.value,
    subject:subject.value,
    message:message.value
  }

})

// Alert Box
function showAlert(message, type) {
  const alertMessage = document.querySelector("#alertMessage");
  alertMessage.innerHTML = `<div class="alert alert-${type} alert-block text-center" role="alert">
    ${message}
    </div>
    `;
  alertMessage.style.display = "block";

  setTimeout(function () {
    alertMessage.style.display = "none";
  }, 15000);
}

// Typewriter Effect
const TypeWriter = function (textElement, words, delay = 3000) {
  this.textElement = textElement;
  this.words = words;
  this.text = "";
  this.wordIndex = 0;
  this.delay = parseInt(delay, 10);
  this.type();
  this.isDeleting = false;
};

TypeWriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fullText = this.words[current];
  if (this.isDeleting) {
    this.text = fullText.substring(0, this.text.length - 1);
  } else {
    this.text = fullText.substring(0, this.text.length + 1);
  }
  this.textElement.innerHTML = `<span class="text">${this.text}</span>`;
  // Type speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  if (!this.isDeleting && this.text === fullText) {
    typeSpeed = this.delay;
    this.isDeleting = true;
  } else if (this.isDeleting && this.text === "") {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  const textElement = document.querySelector(".text-type");
  const words = JSON.parse(textElement.getAttribute("data-words"));
  const delay = textElement.getAttribute("data-delay");

  new TypeWriter(textElement, words, delay);
}
//Dynamic year value
const getYear = new Date();
year.textContent = getYear.getFullYear();
