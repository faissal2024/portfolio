const toggleBtn = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

toggleBtn.addEventListener('click', function() {
  if (navbar.style.display === 'none' || navbar.style.display === '') {
    navbar.style.display = 'block';
    toggleBtn.textContent = ''; // Change button text
  } else {
    navbar.style.display = 'none';
    toggleBtn.textContent = ''; // Change button text
  }
});



document.addEventListener("DOMContentLoaded", function () {
  window.onload = function () {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
  };
});


const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    // التمرير لأسفل -> إخفاء الـ header
    header.style.top = "-70px";
  } else {
    // التمرير لأعلى -> إظهار الـ header
    header.style.top = "0";
  }

  lastScroll = currentScroll;
});




const roles = [
  "Front-end Developer",
  "UI / UX Designer",
  "Cyber Security",
  "Web Developer"
];

let i = 0;
let j = 0;
let currentRole = "";
let isDeleting = false;
const typingElement = document.querySelector(".typing");

function type() {
  if (i < roles.length) {
    if (!isDeleting && j <= roles[i].length) {
      currentRole = roles[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      currentRole = roles[i].substring(0, j--);
    }

    typingElement.textContent = currentRole;

    let speed = isDeleting ? 60 : 100;
    if (!isDeleting && j === roles[i].length) {
      speed = 1500;
      isDeleting = true;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % roles.length;
    }

    setTimeout(type, speed);
  }
}
type();




// Scroll Animation (Simple)
const contactSection = document.querySelector('.contact-section');
window.addEventListener('scroll', () => {
  const sectionPos = contactSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.2;
  if(sectionPos < screenPos){
    contactSection.classList.add('show');
  }
});

  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });