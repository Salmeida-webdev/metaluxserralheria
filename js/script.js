document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const header = document.getElementById("header");
  const backToTop = document.getElementById("backToTop");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const revealElements = document.querySelectorAll(".reveal");

  if (loader) {
    requestAnimationFrame(() => {
      loader.classList.add("hide");
    });
  }

  const closeMenu = () => {
    nav?.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;

    header?.classList.toggle("scrolled", scrollY > 60);
    backToTop?.classList.toggle("show", scrollY > 650);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");

      document.body.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  if (revealElements.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");
            currentObserver.unobserve(entry.target);
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -48px 0px",
        },
      );

      revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
        observer.observe(element);
      });
    } else {
      revealElements.forEach((element) => {
        element.classList.add("active");
      });
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});
