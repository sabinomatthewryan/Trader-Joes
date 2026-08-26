const portfolioName = "Nicko Albert Dela Cruz";
const portfolioTagline = "IT student · builder of small useful things";
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function typeText(element, text, speed = 85) {
  return new Promise((resolve) => {
    if (prefersReducedMotion || !element) {
      if (element) {
        element.textContent = text;
      }
      resolve();
      return;
    }

    let characterIndex = 0;
    element.textContent = "";

    const typeNextCharacter = () => {
      if (characterIndex >= text.length) {
        resolve();
        return;
      }

      element.textContent += text.charAt(characterIndex);
      characterIndex++;
      setTimeout(typeNextCharacter, speed);
    };

    typeNextCharacter();
  });
}

async function playHeroIntro() {
  const nameElement = document.getElementById("typed_name");
  const taglineElement = document.getElementById("hero_tagline");

  await typeText(nameElement, portfolioName, 85);
  await typeText(taglineElement, portfolioTagline, 30);
}

function initializeNavigation() {
  const navigationToggle = document.getElementById("nav_toggle");
  const directoryNavigation = document.querySelector(".dirbar-nav");

  if (!navigationToggle || !directoryNavigation) {
    return;
  }

  navigationToggle.addEventListener("click", () => {
    const isOpen = directoryNavigation.classList.toggle("open");
    navigationToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => {
      directoryNavigation.classList.remove("open");
      navigationToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initializeSectionObserver() {
  const sections = document.querySelectorAll("section[id]");
  const directoryLinks = document.querySelectorAll(".dirlink");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const sectionId = entry.target.getAttribute("id");
        directoryLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${sectionId}`;
          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "page");
            return;
          }

          link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function initializeRevealObserver() {
  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

function initializeBackToTop() {
  const backToTopButton = document.getElementById("back_to_top");

  if (!backToTopButton) {
    return;
  }

  window.addEventListener("scroll", () => {
    backToTopButton.classList.toggle("show", window.scrollY > 480);
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
}

function initializeContactForm() {
  const contactForm = document.getElementById("contact_form");
  const formNotice = document.getElementById("form_notice");

  if (!contactForm || !formNotice) {
    return;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = contactForm.querySelector("#name");
    const name = nameInput ? nameInput.value.trim() : "";

    if (!contactForm.checkValidity()) {
      formNotice.textContent =
        "Please fill in every field correctly before sending.";
      formNotice.classList.add("show");
      return;
    }

    formNotice.textContent =
      `Thanks, ${name.split(" ")[0] || "there"}! Your message has been sent.`;
    formNotice.classList.add("show");
    contactForm.reset();

    setTimeout(() => {
      formNotice.classList.remove("show");
    }, 5000);
  });
}

document.title = `${portfolioName} — Portfolio`;
document.getElementById("footer_name").textContent = portfolioName;
document.getElementById("year").textContent = new Date().getFullYear();

playHeroIntro();
initializeNavigation();
initializeSectionObserver();
initializeRevealObserver();
initializeBackToTop();
initializeContactForm();
