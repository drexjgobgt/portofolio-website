(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ----------------------------------------------------------------------
     Local time in Medan (WIB)
  ---------------------------------------------------------------------- */

  var clockEls = Array.prototype.slice.call(document.querySelectorAll("[data-clock]"));
  var clockFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  function updateClock() {
    var value = clockFormatter.format(new Date());
    clockEls.forEach(function (el) {
      el.textContent = value;
    });
  }

  if (clockEls.length) {
    updateClock();
    window.setInterval(updateClock, 15000);
  }

  /* ----------------------------------------------------------------------
     Opening the page: a slow shift in the light
  ---------------------------------------------------------------------- */

  var hero = document.querySelector(".hero");

  if (hero && !reduceMotion) {
    var deep = false;
    window.setInterval(function () {
      if (document.hidden) return;
      deep = !deep;
      hero.classList.toggle("is-deep", deep);
    }, 9000);
  }

  /* ----------------------------------------------------------------------
     Mobile navigation
  ---------------------------------------------------------------------- */

  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav__toggle");
  var navMenu = document.getElementById("nav-menu");

  function setMenu(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.textContent = open ? "Close" : "Menu";
  }

  if (nav && navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        navToggle.focus();
      }
    });
  }

  /* ----------------------------------------------------------------------
     Selected work: the index and the preview
  ---------------------------------------------------------------------- */

  var projects = {
    sipw: {
      image: "assets/projects/sipw-dashboard.webp",
      alt: "SIPW report dashboard with complaint cards, filters, and SLA status labels.",
      title: "Sistem Informasi Pengaduan Warga",
      desc: "A public complaint system for Medan’s city agencies: map reports, SLA tracking, and an AI triage layer that fails safe.",
      stack: "React · Node · PostgreSQL · LLM",
      link: "https://github.com/drexjgobgt/si-pengduan-warga",
      linkLabel: "View repository",
      position: "top center"
    },
    clipflow: {
      image: "assets/projects/clipflow.webp",
      alt: "ClipFlow desktop app showing a recording buffer and a grid of saved gameplay clips.",
      title: "ClipFlow",
      desc: "A rolling replay buffer that saves the last 120 seconds of gameplay without leaving the game.",
      stack: "Rust · Tauri · D3D11 · WASAPI",
      link: "https://github.com/drexjgobgt/ClipFlow-Dev",
      linkLabel: "View repository",
      position: "top center"
    },
    crm: {
      image: "assets/projects/cover-crm.webp",
      alt: "Mini CRM project cover with the project name and stack.",
      title: "Mini CRM",
      desc: "Customers, orders, and follow-ups for one-person shops, with WhatsApp built into the workflow.",
      stack: "React · Express · PostgreSQL",
      link: "https://github.com/drexjgobgt/mini_crm",
      linkLabel: "View repository",
      position: "center"
    },
    tokogas: {
      image: "assets/projects/tokogas-live.webp",
      alt: "Toko Gas UMKM storefront with a product catalog and vendor information.",
      title: "Toko Gas UMKM",
      desc: "A live storefront for a gas vendor: catalog, cart, QRIS, and a WhatsApp handoff at checkout.",
      stack: "React · Node · MongoDB · Midtrans",
      link: "https://simple-e-commerce-umkm.vercel.app",
      linkLabel: "Visit live site",
      position: "top center"
    },
    makeaconv: {
      image: "assets/projects/makeaconv.webp",
      alt: "makeAconv promotional screen showing the real-time chat interface.",
      title: "makeAconv",
      desc: "A chat and file-sharing app with presence, uploads, and email onboarding.",
      stack: "React · Socket.io · MongoDB",
      link: "https://github.com/drexjgobgt/makeAconv",
      linkLabel: "View repository",
      position: "center"
    },
    simawa: {
      image: "assets/projects/cover-simawa.webp",
      alt: "SiMawa project cover with the project name and stack.",
      title: "SiMawa",
      desc: "Student records for a university course, with photo uploads and print-ready exports.",
      stack: "PHP · MySQL · Bootstrap",
      link: "https://github.com/drexjgobgt/SI-Mawa",
      linkLabel: "View repository",
      position: "center"
    }
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".project"));
  var stage = document.querySelector(".work__stage");
  var stageImage = document.getElementById("stage-image");
  var stageTitle = document.getElementById("stage-title");
  var stageDesc = document.getElementById("stage-desc");
  var stageStack = document.getElementById("stage-stack");
  var stageLink = document.getElementById("stage-link");
  var stageLinkLabel = document.getElementById("stage-link-label");

  if (tabs.length && stage && stageImage && stageTitle && stageDesc && stageStack && stageLink && stageLinkLabel) {
    var activeKey = "sipw";
    var swapTimer = 0;

    tabs.forEach(function (tab, index) {
      tab.tabIndex = index === 0 ? 0 : -1;
    });

    function activate(key) {
      var project = projects[key];
      if (!project || key === activeKey) return;
      activeKey = key;

      tabs.forEach(function (tab) {
        var isActive = tab.getAttribute("data-project") === key;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        if (isActive) {
          stage.setAttribute("aria-labelledby", tab.id);
        }
      });

      stageTitle.textContent = project.title;
      stageDesc.textContent = project.desc;
      stageStack.textContent = project.stack;
      stageLink.href = project.link;
      stageLinkLabel.textContent = project.linkLabel;

      stage.classList.add("is-swapping");
      window.clearTimeout(swapTimer);
      swapTimer = window.setTimeout(function () {
        stageImage.src = project.image;
        stageImage.alt = project.alt;
        stageImage.style.objectPosition = project.position;
        stage.classList.remove("is-swapping");
      }, 160);
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(tab.getAttribute("data-project"));
      });

      tab.addEventListener("focus", function () {
        activate(tab.getAttribute("data-project"));
      });

      if (canHover) {
        tab.addEventListener("mouseenter", function () {
          activate(tab.getAttribute("data-project"));
        });
      }

      tab.addEventListener("keydown", function (event) {
        var next = null;

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          next = tabs[(index + 1) % tabs.length];
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (event.key === "Home") {
          next = tabs[0];
        } else if (event.key === "End") {
          next = tabs[tabs.length - 1];
        }

        if (next) {
          event.preventDefault();
          next.focus();
        }
      });
    });

    // Warm the previews after the first paint, without blocking the hero.
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(function () {
        Object.keys(projects).forEach(function (key) {
          var preload = new Image();
          preload.src = projects[key].image;
        });
      }, { timeout: 2500 });
    } else {
      window.setTimeout(function () {
        Object.keys(projects).forEach(function (key) {
          var preload = new Image();
          preload.src = projects[key].image;
        });
      }, 1400);
    }
  }

  /* ----------------------------------------------------------------------
     Scroll-in reveals
  ---------------------------------------------------------------------- */

  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("is-inview");
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  window.__revealReady = true;
})();
