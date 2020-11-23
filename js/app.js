/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const button = document.querySelector("#button");
const navbar = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

window.onscroll = () => {
    if (
      document.body.scrollTop > 250 ||
      document.documentElement.scrollTop > 250
    ) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };

  button.addEventListener("click", () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function addSections() {
    for (let item of sections) {
        let section = document.createElement('li');
        section.className = 'menu__link';
        section.dataset.nav = item.id;
        section.innerText = item.dataset.nav;
        navbar.appendChild(section);
    };
};


// Add class 'active' to section when near top of viewport

function setActive () {
  let currentElem ; // highlight first section on default
  let top = 300;
  let navMenu = Array.from(document.querySelectorAll(".menu__link"));
  for (item of sections) {
    let rect = item.getBoundingClientRect();
    //returns the size of an element and its position relative to the viewport.
    // console.log(rect, item.id);
    if (rect.top > -top && rect.top < top) {
      top = rect.top;
      currentElem = item;
    }
  }
  //highlight the section on the viewport and disable the rest of sections
  //usung classList methods to change the CSS
  for (let item of navMenu) {
    if (item.dataset.nav == currentElem.id) {
      item.classList.add("menu-active");
    } else {
      item.classList.remove("menu-active");
    }
  }
  currentElem.classList.add("your-active-class");
  for (item of sections) {
    if (item.id != currentElem.id) {
      item.classList.remove("your-active-class");
    }
  }
};

// Scroll to anchor ID using scrollTO event
function scrollToClick() {
    navbar.addEventListener('click', function (event) {
        const clicked = document.querySelector('#' + event.target.dataset.nav)
        clicked.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
    });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
addSections();

// Scroll to section on link click
scrollToClick();

// Set sections as active
window.addEventListener("scroll", setActive);

