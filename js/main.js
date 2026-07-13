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

  const processTabsRoots = document.querySelectorAll("[data-process-tabs]");

  processTabsRoots.forEach(function (root) {
    const tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    const panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));
    const prevButton = root.querySelector("[data-process-prev]");
    const nextButton = root.querySelector("[data-process-next]");

    if (!tabs.length || !panels.length) return;

    function getActiveIndex() {
      return tabs.findIndex(function (tab) {
        return tab.getAttribute("aria-selected") === "true";
      });
    }

    function updateArrowState(activeIndex) {
      if (prevButton) {
        prevButton.disabled = activeIndex <= 0;
      }
      if (nextButton) {
        nextButton.disabled = activeIndex >= tabs.length - 1;
      }
    }

    function activateTab(nextTab) {
      const nextIndex = tabs.indexOf(nextTab);
      if (nextIndex < 0) return;

      tabs.forEach(function (tab, index) {
        const isActive = index === nextIndex;
        tab.classList.toggle("project-page__step--active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
        tab.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      panels.forEach(function (panel, index) {
        if (index === nextIndex) {
          panel.removeAttribute("hidden");
        } else {
          panel.setAttribute("hidden", "");
        }
      });

      updateArrowState(nextIndex);
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(tab);
      });

      tab.addEventListener("keydown", function (event) {
        const currentIndex = tabs.indexOf(tab);
        let nextIndex = currentIndex;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = Math.min(currentIndex + 1, tabs.length - 1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = Math.max(currentIndex - 1, 0);
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }

        event.preventDefault();
        tabs[nextIndex].focus();
        activateTab(tabs[nextIndex]);
      });
    });

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        const activeIndex = getActiveIndex();
        if (activeIndex > 0) {
          activateTab(tabs[activeIndex - 1]);
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        const activeIndex = getActiveIndex();
        if (activeIndex < tabs.length - 1) {
          activateTab(tabs[activeIndex + 1]);
        }
      });
    }

    updateArrowState(Math.max(getActiveIndex(), 0));
  });

  const carouselRoots = document.querySelectorAll("[data-carousel]");

  carouselRoots.forEach(function (root) {
    const slides = Array.prototype.slice.call(root.querySelectorAll("[data-carousel-slide]"));
    const prevButton = root.querySelector("[data-carousel-prev]");
    const nextButton = root.querySelector("[data-carousel-next]");
    const status = root.querySelector("[data-carousel-status]");

    if (slides.length < 2) return;

    let activeIndex = slides.findIndex(function (slide) {
      return slide.classList.contains("is-active");
    });

    if (activeIndex < 0) activeIndex = 0;

    function updateCarousel(nextIndex) {
      if (nextIndex < 0 || nextIndex >= slides.length) return;

      activeIndex = nextIndex;

      slides.forEach(function (slide, index) {
        const isActive = index === activeIndex;
        slide.classList.toggle("is-active", isActive);
        if (isActive) {
          slide.removeAttribute("hidden");
        } else {
          slide.setAttribute("hidden", "");
        }
      });

      if (status) {
        status.textContent = activeIndex + 1 + " / " + slides.length;
      }

      if (prevButton) {
        prevButton.disabled = activeIndex <= 0;
      }

      if (nextButton) {
        nextButton.disabled = activeIndex >= slides.length - 1;
      }
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        updateCarousel(activeIndex - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        updateCarousel(activeIndex + 1);
      });
    }

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        updateCarousel(activeIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        updateCarousel(activeIndex + 1);
      }
    });

    updateCarousel(activeIndex);
  });

  const lightboxTriggers = document.querySelectorAll("[data-lightbox-trigger]");

  if (lightboxTriggers.length) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("hidden", "");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Enlarged diagram");
    lightbox.innerHTML =
      '<button type="button" class="lightbox__close" data-lightbox-close aria-label="Close enlarged image">' +
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
      '<path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      "</svg>" +
      "</button>" +
      '<div class="lightbox__dialog">' +
      '<img class="lightbox__image" alt="">' +
      "</div>";

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox__image");
    const lightboxClose = lightbox.querySelector("[data-lightbox-close]");
    let lastTrigger = null;

    function openLightbox(trigger) {
      const image = trigger.querySelector("img");
      if (!image || !lightboxImage) return;

      lastTrigger = trigger;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || "";
      lightbox.removeAttribute("hidden");
      document.body.classList.add("lightbox-open");
      lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.setAttribute("hidden", "");
      document.body.classList.remove("lightbox-open");
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";

      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    }

    lightboxTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openLightbox(trigger);
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !lightbox.hasAttribute("hidden")) {
        event.preventDefault();
        closeLightbox();
      }
    });
  }
})();
