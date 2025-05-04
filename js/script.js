/**
 * MEGA NetCafe - Main JavaScript
 * Author: Mohammed Salah Ahmed
 * Description: JavaScript functionality for the MEGA NetCafe website
 */

// DOM Elements
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.querySelector('.scroll-top');
const themeToggle = document.getElementById('theme-toggle');

// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
  });

  // Update active nav link based on scroll position
  updateActiveNavLink();

  // Set initial theme based on user preference or localStorage
  initializeTheme();
});

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
  const links = navbar.querySelector('.links');
  links.classList.toggle('active');
  menuBtn.classList.toggle('fa-bars');
  menuBtn.classList.toggle('fa-times');
});

// Close menu when clicking on a nav link (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const links = navbar.querySelector('.links');
    links.classList.remove('active');
    menuBtn.classList.add('fa-bars');
    menuBtn.classList.remove('fa-times');
  });
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
  // Show/hide scroll-to-top button
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }

  // Update active nav link
  updateActiveNavLink();

  // Header shadow on scroll
  if (window.scrollY > 0) {
    document.querySelector('.header').style.boxShadow = '0 0.5rem 1.5rem rgba(0, 0, 0, 0.1)';
  } else {
    document.querySelector('.header').style.boxShadow = 'none';
  }
});

// Scroll to top when the button is clicked
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Services hover animation effect
const serviceBoxes = document.querySelectorAll('.services .box');
serviceBoxes.forEach(box => {
  box.addEventListener('mouseenter', () => {
    box.style.transform = 'translateY(-10px)';
  });

  box.addEventListener('mouseleave', () => {
    box.style.transform = 'translateY(0)';
  });
});

// Dark Mode Functionality
// Initialize theme based on user preference or localStorage
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
  } else {
    // If no theme saved or it's 'light', default to light
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.checked = false;

    if (!savedTheme) {
      localStorage.setItem('theme', 'light'); // Only set if not already set
    }
  }
}

// Toggle between light and dark mode
themeToggle.addEventListener('change', function() {
  if (this.checked) {
    // Dark mode
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    // Light mode
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.style.overflow = 'visible';
  }, 1000);
});
