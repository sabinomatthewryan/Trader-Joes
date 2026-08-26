let yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

let navToggleElement = document.getElementById("nav_toggle");
let sidebarElement = document.getElementById("sidebar_nav");
let scrimElement = document.getElementById("sidebar_scrim");

function openNav() {
  sidebarElement.classList.add("is-open");
  scrimElement.hidden = false;
  navToggleElement.setAttribute("aria-expanded", "true");
  document.body.classList.add("no-scroll");
}

function closeNav() {
  sidebarElement.classList.remove("is-open");
  scrimElement.hidden = true;
  navToggleElement.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
}

function handleNavToggle() {
  let isSidebarOpen = sidebarElement.classList.contains("is-open");

  if (isSidebarOpen) {
    closeNav();
  } else {
    openNav();
  }
}

if (navToggleElement) {
  navToggleElement.addEventListener("click", handleNavToggle);
}

if (scrimElement) {
  scrimElement.addEventListener("click", closeNav);
}

function handleLinkClick() {
  let isMobileWindow = window.matchMedia("(max-width: 959px)").matches;

  if (isMobileWindow) {
    closeNav();
  }
}

let navLinks = document.querySelectorAll("[data-nav]");

navLinks.forEach(function (link) {
  link.addEventListener("click", handleLinkClick);
});

function handleKeydown(event) {
  let isEscapeKey = event.key === "Escape";
  let isSidebarOpen = sidebarElement.classList.contains("is-open");

  if (isEscapeKey && isSidebarOpen) {
    closeNav();
    navToggleElement.focus();
  }
}

document.addEventListener("keydown", handleKeydown);

let navLinksArray = Array.from(navLinks);
let sections = navLinksArray.map(function (link) {
  let targetId = link.getAttribute("href");
  return document.querySelector(targetId);
}).filter(Boolean);

function setActiveLink(id) {
  navLinksArray.forEach(function (link) {
    let isMatch = link.getAttribute("href") === `#${id}`;

    if (isMatch) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "true");
    } else {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    }
  });
}

function handleIntersect(entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}

let hasObserver = "IntersectionObserver" in window;

if (hasObserver && sections.length) {
  let observerOptions = {
    rootMargin: "-40% 0px -50% 0px",
    threshold: 0
  };

  let observer = new IntersectionObserver(handleIntersect, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });
}