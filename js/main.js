(function () {
  "use strict";

  const navToggle = document.querySelector(".nav__toggle");
  const navOverlay = document.getElementById("nav-overlay");
  const navClose = document.querySelector(".nav-overlay__close");
  const overlayLinks = document.querySelectorAll(".nav-overlay__link, .nav-overlay__cta a");
  const revealElements = document.querySelectorAll(".reveal");
  const statValues = document.querySelectorAll("[data-count]");
  const backToTop = document.getElementById("back-to-top");
  const navLinksContainer = document.querySelector(".nav__links");
  const navLinkItems = document.querySelectorAll(".nav__link");
  const navIndicator = document.querySelector(".nav__indicator");

  let statsAnimated = false;

  function moveNavIndicator(link) {
    if (!navIndicator || !link || !navLinksContainer) return;

    navLinkItems.forEach(function (item) {
      item.classList.remove("nav__link--active");
    });
    link.classList.add("nav__link--active");

    const containerRect = navLinksContainer.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    navIndicator.style.width = linkRect.width + "px";
    navIndicator.style.transform = "translateX(" + (linkRect.left - containerRect.left) + "px)";
  }

  function initNavIndicator() {
    const activeLink = document.querySelector(".nav__link--active") || navLinkItems[0];
    if (activeLink) {
      moveNavIndicator(activeLink);
    }
  }

  if (navLinksContainer && navIndicator && navLinkItems.length) {
    navLinkItems.forEach(function (link) {
      link.addEventListener("click", function () {
        moveNavIndicator(link);
      });
    });

    initNavIndicator();
    window.addEventListener("resize", initNavIndicator);
  }

  function openNav() {
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    navOverlay.classList.add("is-open");
    navOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-open");
  }

  function closeNav() {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    navOverlay.classList.remove("is-open");
    navOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
    navToggle.focus();
  }

  if (navToggle && navOverlay) {
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    navClose.addEventListener("click", closeNav);

    overlayLinks.forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navOverlay.classList.contains("is-open")) {
        closeNav();
      }
    });
  }

  function animateCount(element, target) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      element.textContent = target;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statValues.forEach(function (stat) {
      const target = parseInt(stat.getAttribute("data-count"), 10);
      animateCount(stat, target);
    });
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });

    const statsObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateStats();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.querySelector(".hero__stats");
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
    animateStats();
  }

  if (backToTop) {
    backToTop.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function fitFooterWatermark() {
    const watermark = document.querySelector(".footer__watermark");
    if (!watermark) return;

    watermark.style.fontSize = "";
    const maxWidth = watermark.clientWidth;
    if (!maxWidth) return;

    let size = 16;
    watermark.style.fontSize = size + "px";

    while (watermark.scrollWidth <= maxWidth && size < 400) {
      size += 1;
      watermark.style.fontSize = size + "px";
    }

    watermark.style.fontSize = Math.max(16, size - 1) + "px";
  }

  fitFooterWatermark();
  window.addEventListener("resize", fitFooterWatermark);

  const accordion = document.querySelector("[data-accordion]");

  if (accordion) {
    const accordionItems = accordion.querySelectorAll(".accordion__item");

    function closeAccordionItem(item) {
      const trigger = item.querySelector(".accordion__trigger");
      const panel = item.querySelector(".accordion__panel");

      item.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
    }

    function openAccordionItem(item) {
      const trigger = item.querySelector(".accordion__trigger");
      const panel = item.querySelector(".accordion__panel");

      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      panel.setAttribute("aria-hidden", "false");
    }

    accordionItems.forEach(function (item) {
      const trigger = item.querySelector(".accordion__trigger");

      trigger.addEventListener("click", function () {
        const isOpen = item.classList.contains("is-open");

        accordionItems.forEach(function (other) {
          if (other !== item) {
            closeAccordionItem(other);
          }
        });

        if (isOpen) {
          closeAccordionItem(item);
        } else {
          openAccordionItem(item);
        }
      });
    });
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
})();
