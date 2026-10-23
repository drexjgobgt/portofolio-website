/* ==========================================================================
   Rafif Syandana — portofolio
   Vanilla JS. Tanpa dependensi.
   ========================================================================== */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- data */
  const PROJECTS = [
    {
      n: "01",
      title: "SIPW",
      sub: "Sistem Informasi Pengaduan Warga",
      desc: "Warga melapor, sistem yang mengarahkan. Penelusuran status, disposisi tugas lintas OPD, dan pemantauan SLA penanganan masalah lingkungan perkotaan.",
      chips: ["React 18", "Node 18", "PostgreSQL 14", "Tailwind"],
      cat: "web",
      meta: "Pelayanan publik",
      year: "2026",
      thumb: "assets/projects/sipw.svg",
      url: "https://github.com/drexjgobgt/si-pengduan-warga",
    },
    {
      n: "02",
      title: "Mini CRM",
      sub: "untuk UMKM",
      desc: "Data pelanggan, riwayat order, dan jadwal follow-up dalam satu dashboard. Tombol WhatsApp langsung dari kartu pelanggan, plus export Excel.",
      chips: ["JavaScript", "WhatsApp deep link", "Export Excel"],
      cat: "web",
      meta: "UMKM",
      year: "2025",
      thumb: "assets/projects/mini_crm.svg",
      url: "https://github.com/drexjgobgt/mini_crm",
    },
    {
      n: "03",
      title: "ClipFlow",
      sub: "instant replay Windows",
      desc: "Rekam gameplay tanpa menjatuhkan frame rate. Frame di-encode langsung di GPU ke ring buffer RAM, lalu 15–120 detik terakhir disimpan jadi MP4 dengan satu hotkey.",
      chips: ["Rust", "Tauri v2", "Direct3D 11", "Media Foundation"],
      cat: "tool",
      meta: "Desktop tool",
      year: "2026",
      thumb: "assets/projects/clipflow.svg",
      url: "https://github.com/drexjgobgt/ClipFlow-Dev",
    },
    {
      n: "04",
      title: "Toko Gas UMKM",
      sub: "e-commerce distributor",
      desc: "Katalog, keranjang, riwayat order, dan dashboard vendor. Checkout sebagai tamu, bayar transfer / COD / e-wallet, dengan konfigurasi hybrid Midtrans atau QRIS manual.",
      chips: ["JavaScript", "Midtrans", "QRIS", "Vercel"],
      cat: "web",
      meta: "E-commerce",
      year: "2025",
      thumb: "assets/projects/umkm-shop.svg",
      url: "https://github.com/drexjgobgt/simple-e-commerce-umkm",
      live: true,
    },
    {
      n: "05",
      title: "Kunang-Kunang",
      sub: "bot musik Discord",
      desc: "Bot musik Discord yang bisa dikendalikan dari live chat TikTok. Antrean, multi-sumber YouTube/Spotify/SoundCloud, overlay web realtime untuk streamer, dan logging.",
      chips: ["TypeScript", "discord.js v14", "discord-player v7", "TikTok Live"],
      cat: "bot",
      meta: "Bot · Realtime",
      year: "2025",
      thumb: "assets/projects/kunang-kunang.svg",
      url: "https://github.com/drexjgobgt/kunang-kunang",
    },
    {
      n: "06",
      title: "handTracker3Dvoxel",
      sub: "tangan jadi voxel",
      desc: "Eksperimen computer vision di browser: gerakan tangan dilacak secara realtime lalu dirender sebagai volume voxel 3D yang bisa dijelajahi.",
      chips: ["JavaScript", "Canvas", "Realtime"],
      cat: "tool",
      meta: "Eksperimen",
      year: "2026",
      thumb: "assets/projects/handtracker.svg",
      url: "https://github.com/drexjgobgt/handTracker3Dvoxel",
    },
  ];

  const WORDS = [
    "Pelayanan publik", "UMKM & retail", "Realtime", "Rust / Tauri", "React",
    "PostgreSQL", "PHP native", "Bot Discord", "Computer vision", "E-commerce",
    "SLA & alur status", "Windows API",
  ];

  /* --------------------------------------------------------------- cards */
  const grid = $("#workGrid");
  if (grid) {
    grid.innerHTML = PROJECTS.map((p) => `
      <article class="card" data-cat="${p.cat}" data-reveal style="--i:${+p.n % 2}">
        <a class="card__link" href="${p.url}" target="_blank" rel="noopener noreferrer">
          <div class="card__thumb">
            <img src="${p.thumb}" width="800" height="520" decoding="async" alt="">
            <span class="card__idx">${p.n}</span>
          </div>
          <div class="card__body">
            <p class="card__meta">
              <span class="dot" aria-hidden="true"></span>${p.meta}
              <span aria-hidden="true">·</span>${p.year}
              ${p.live ? '<span aria-hidden="true">·</span><span class="live">live demo</span>' : ""}
            </p>
            <h3 class="card__title">${p.title} <span>— ${p.sub}</span></h3>
            <p class="card__desc">${p.desc}</p>
            <ul class="chips">${p.chips.map((c) => `<li>${c}</li>`).join("")}</ul>
          </div>
          <span class="card__go" aria-hidden="true">&#8599;</span>
        </a>
      </article>`).join("");
  }

  /* ------------------------------------------------------------- marquee */
  const track = $("#marquee");
  if (track) {
    const run = WORDS.map((w) => `<span>${w}</span>`).join("");
    track.innerHTML = run + run;
  }

  /* --------------------------------------------------------------- clock */
  const fmt = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false,
  });
  const tick = () => {
    const t = fmt.format(new Date());
    $$("[data-clock]").forEach((el) => (el.textContent = t));
    const c2 = $("#clock2");
    if (c2) c2.textContent = t + " WIB";
  };
  tick();
  setInterval(tick, 20000);

  const y = $("#year");
  if (y) y.textContent = new Date().toLocaleDateString("id-ID", { timeZone: "Asia/Jakarta", year: "numeric" });

  /* -------------------------------------------------------------- reveal */
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      obs.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  const observeReveals = () => $$("[data-reveal]").forEach((el) => io.observe(el));
  observeReveals();

  /* ---------------------------------------------------------------- nav */
  const nav = $("#nav");
  const burger = $("#burger");
  const sheet = $("#sheet");
  const progress = $("#progress");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    });
    sheet?.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --------------------------------------------------- scroll behaviours */
  let raf = null;
  const onScroll = () => {
    const sc = window.scrollY || 0;
    nav?.classList.toggle("is-scrolled", sc > 24);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(sc / max, 1) : 0})`;
    }
    if (!reduced) {
      const hero = $("#hero");
      if (hero && sc < window.innerHeight * 1.2) {
        hero.style.setProperty("--sy", (sc * 0.16).toFixed(1) + "px");
      }
    }
    raf = null;
  };
  const queueScroll = () => { if (raf === null) raf = requestAnimationFrame(onScroll); };
  window.addEventListener("scroll", queueScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------ spotlight */
  const hero = $("#hero");
  const spot = $("#spot");
  if (hero && spot && !reduced && window.matchMedia("(hover: hover)").matches) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      spot.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(2) + "%");
      spot.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(2) + "%");
      hero.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      hero.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    }, { passive: true });
  }

  $$(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(2) + "%");
      card.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(2) + "%");
    }, { passive: true });
  });

  /* -------------------------------------------------------------- filter */
  const filterBtns = $$("[data-filter]");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      $$(".card", grid).forEach((card) => {
        const show = f === "all" || card.dataset.cat === f;
        card.classList.toggle("is-hidden", !show);
        if (show) card.classList.add("is-in");
      });
    });
  });

  /* ---------------------------------------------------------------- copy */
  const toast = $("#toast");
  let toastTimer;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-on"), 2200);
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      throw new Error("no clipboard api");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.cssText = "position:fixed;top:0;left:-9999px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch {
        return false;
      }
    }
  };

  document.addEventListener("click", async (e) => {
    const trigger = e.target.closest("[data-copy]");
    if (!trigger) return;
    e.preventDefault();
    const text = trigger.dataset.copy;
    const ok = await copyText(text);
    const pill = trigger.closest("#pill");
    if (pill) {
      pill.classList.add("is-copied");
      setTimeout(() => pill.classList.remove("is-copied"), 1800);
    }
    const short = text.replace(/^https?:\/\//, "");
    showToast(ok ? "Tersalin — " + short : "Salin manual: " + short);
  });

  /* --------------------------------------------------------- escape/menu */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (nav?.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      burger?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-label", "Buka menu");
      burger?.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && nav?.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      burger?.setAttribute("aria-expanded", "false");
    }
  });

  /* ------------------------------------------------- active nav section */
  const links = $$("#navLinks a");
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + e.target.id)));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ------------------------------------------------------ graceful images */
  $$("img").forEach((img) => {
    img.addEventListener("error", () => { img.style.opacity = "0"; }, { once: true });
  });
})();
