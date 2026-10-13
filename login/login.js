(function () {
  "use strict";
  if (window.__INSPIRA_LOGIN__) return;
  window.__INSPIRA_LOGIN__ = true;

  // Official event time, from the event banner: Thursday 22 Oct 2026, 5:00 PM to 8:00 PM BRT.
  // Can be overridden before this script loads with window.INSPIRA_EVENT_CONFIG = { ... }.
  const EVENT = Object.assign({
    name: "Rede Inspira Virtual College Fairs",
    start: "2026-10-22T17:00:00-03:00",
    end: "2026-10-22T20:00:00-03:00",
    timeZone: "America/Sao_Paulo",
    timeZoneLabel: "BRT",
    registerUrl: "/register"
  }, window.INSPIRA_EVENT_CONFIG || {});

  const START = new Date(EVENT.start).getTime();
  const END = new Date(EVENT.end).getTime();

  const ICONS = {
    star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    booth: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2l10 5H2l10-5z"/></svg>',
    chat: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    cap: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    mail: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E05C3A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><polyline points="3 7 12 13 21 7"/></svg>'
  };

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function setText(el, text) { if (el && el.textContent !== text) el.textContent = text; }
  function setHTML(el, html) {
    if (!el || (el.__inspiraHTML === html && el.innerHTML === el.__inspiraOut)) return;
    el.innerHTML = html;
    el.__inspiraHTML = html;
    el.__inspiraOut = el.innerHTML;
  }
  function clean(s) { return String(s).replace(/\s+/g, " ").trim(); }

  function universityCount() {
    // Saved by the register page script when it sees the university cards.
    try { return parseInt(localStorage.getItem("inspira_univ_count"), 10) || 0; } catch (e) { return 0; }
  }

  function eventDateLabel() {
    try {
      const d = new Date(START);
      const day = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: EVENT.timeZone }).format(d);
      const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: EVENT.timeZone }).format(d);
      return clean(day + ", " + time + " " + EVENT.timeZoneLabel).replace(/,\s*,/g, ",");
    } catch (e) {
      return "Thu 22 Oct, 5:00 PM BRT";
    }
  }

  function phase() {
    const now = Date.now();
    if (now < START) return "before";
    if (now < END) return "live";
    return "after";
  }

  function heading(count) {
    return count
      ? 'Meet admissions teams from <span class="hero-highlight-word">' + count + " universities</span>"
      : 'Meet admissions teams from <span class="hero-highlight-word">top universities</span>';
  }

  function pills(count) {
    const list = [
      ICONS.booth + "<span>Live university booths</span>",
      ICONS.chat + "<span>Chat with admissions teams</span>"
    ];
    if (count) list.push(ICONS.cap + "<span>" + count + " universities</span>");
    return list.map(function (p) { return '<div class="hero-badge-pill">' + p + "</div>"; }).join("");
  }

  function badge() {
    const p = phase();
    if (p === "live") return '<span class="hero-live-dot"></span>Live now';
    if (p === "after") return "This fair has ended";
    return eventDateLabel();
  }

  function heroMarkup(count) {
    return '' +
      '<div class="hero-top-brand">' +
      '<div class="hero-brand-logo">inspira<span>fairs</span></div>' +
      '<div class="hero-live-badge">' + badge() + "</div>" +
      "</div>" +
      '<div class="hero-content-center">' +
      '<div class="hero-kicker">' + ICONS.star + "<span>" + EVENT.name.toUpperCase() + "</span></div>" +
      '<h1 class="hero-heading">' + heading(count) + "</h1>" +
      '<p class="hero-subheading">Explore degrees and scholarships, and talk live with official university representatives.</p>' +
      '<div class="hero-countdown-strip" role="timer" aria-label="Time until the fair starts">' +
      unit("Days", "inspiraLoginDays") + sep() + unit("Hours", "inspiraLoginHours") + sep() +
      unit("Mins", "inspiraLoginMins") + sep() + unit("Secs", "inspiraLoginSecs") +
      "</div>" +
      '<div class="hero-pills-row">' + pills(count) + "</div>" +
      "</div>" +
      '<div class="hero-bottom-proof">' +
      '<div class="proof-caption">Hosted by <strong>Rede Inspira</strong>. Powered by WebiFair.</div>' +
      "</div>";

    function unit(label, id) {
      return '<div class="countdown-unit"><div class="countdown-val" id="' + id + '">--</div><div class="countdown-lbl">' + label + "</div></div>";
    }
    function sep() { return '<div class="countdown-sep" aria-hidden="true">:</div>'; }
  }

  /* ------------------------------------------------------------------ */
  /* Left column: event hero                                             */
  /* ------------------------------------------------------------------ */
  function enhanceHero(leftCol) {
    $$("#sliderSection, .logInBlock, .logInBlockInner", leftCol).forEach(function (el) {
      el.style.setProperty("display", "none", "important");
    });

    const count = universityCount();
    let hero = $(".inspira-hero-injected", leftCol);
    if (!hero) {
      hero = document.createElement("div");
      hero.className = "inspira-hero-injected";
      hero.id = "injectedHeroPane";
      setHTML(hero, heroMarkup(count));
      leftCol.appendChild(hero);
    } else {
      setHTML($(".hero-heading", hero), heading(count));
      setHTML($(".hero-pills-row", hero), pills(count));
    }
    const badgeEl = $(".hero-live-badge", hero);
    setHTML(badgeEl, badge());
    if (badgeEl) badgeEl.classList.toggle("is-live", phase() === "live");
  }

  let countdownTimer = null;
  function tickCountdown() {
    const strip = $(".inspira-hero-injected .hero-countdown-strip");
    if (!strip) return;
    const diff = Math.max(0, START - Date.now());
    if (!diff) {
      strip.hidden = true;
      clearInterval(countdownTimer);
      countdownTimer = null;
      return;
    }
    const pad = function (n) { return String(n).padStart(2, "0"); };
    setText($("#inspiraLoginDays"), pad(Math.floor(diff / 86400000)));
    setText($("#inspiraLoginHours"), pad(Math.floor(diff / 3600000) % 24));
    setText($("#inspiraLoginMins"), pad(Math.floor(diff / 60000) % 60));
    setText($("#inspiraLoginSecs"), pad(Math.floor(diff / 1000) % 60));
  }
  function startCountdown() {
    if (countdownTimer) return;
    tickCountdown();
    if (Date.now() < START) countdownTimer = setInterval(tickCountdown, 1000);
  }

  /* ------------------------------------------------------------------ */
  /* Right column: title, label and a short note under the form          */
  /* ------------------------------------------------------------------ */
  function enhanceForm(rightCol) {
    $$(".topBrandText section, .topBrandText .slick-slider, .eventLogoWrapper, .socialButtons", rightCol).forEach(function (el) {
      el.style.setProperty("display", "none", "important");
    });

    const path = location.pathname;
    const isSignUp = path.indexOf("/sign-up") > -1 || !!$("input[name='firstName']", rightCol);
    const isCode = path.indexOf("/login-with-code") > -1 || !!$("input[name='codeVal'], input[name='code'], input[name='otp']", rightCol);

    if (isSignUp || isCode) {
      // These steps keep the platform's own wording; remove anything added on /login.
      $$(".vip-perk-card, .form-footer-trust, .inspira-form-badge, .inspira-form-subtext, .inspira-input-label", rightCol)
        .forEach(function (el) { el.remove(); });
      return;
    }

    const titleEl = $(".topBrandText h2, .topBrandText h3, .topBrandText .MuiTypography-root", rightCol);
    if (titleEl) {
      setText(titleEl, "Welcome to the Fair");
      if (!$(".inspira-form-badge", rightCol)) {
        const b = document.createElement("div");
        b.className = "inspira-form-badge";
        b.textContent = "Student sign in";
        titleEl.parentNode.insertBefore(b, titleEl);
      }
      let sub = $(".inspira-form-subtext", rightCol);
      if (!sub) {
        sub = document.createElement("p");
        sub.className = "inspira-form-subtext";
        titleEl.parentNode.appendChild(sub);
      }
      setText(sub, "Enter the email you registered with. We will send you a one-time code to sign in.");
    }

    const form = $("form", rightCol);
    if (!form || !form.parentElement) return;

    const input = $("input#email, input[name='email']", form);
    if (input) {
      if (!input.id) input.id = "inspiraLoginEmail";
      if (input.getAttribute("autocomplete") !== "email") input.setAttribute("autocomplete", "email");
    }

    if (!$(".inspira-input-label", rightCol)) {
      const label = document.createElement("label");
      label.className = "inspira-input-label";
      label.textContent = "Email address";
      if (input) label.htmlFor = input.id;
      form.parentNode.insertBefore(label, form);
    }

    // Added next to the form, never inside it, so React keeps full control of the form.
    if (!$(".vip-perk-card", rightCol)) {
      const perk = document.createElement("div");
      perk.className = "vip-perk-card";
      perk.innerHTML =
        '<div class="vip-perk-icon">' + ICONS.mail + "</div>" +
        '<div class="vip-perk-text"><strong>No password needed</strong>' +
        "Check your inbox for the code after you continue. It can take a minute to arrive.</div>";

      const footer = document.createElement("div");
      footer.className = "form-footer-trust";
      footer.innerHTML = '<span>Not registered yet?</span> <a href="' + EVENT.registerUrl + '">Register for the fair</a>';

      form.insertAdjacentElement("afterend", footer);
      form.insertAdjacentElement("afterend", perk);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Init                                                                */
  /* ------------------------------------------------------------------ */
  function update() {
    if (location.pathname.indexOf("/register") > -1) return;
    const leftCol = $(".logInBlockWrapper, [class*='logInBlockWrapper']");
    const rightCol = $(".loginWrapperTop, [class*='loginWrapperTop']");
    if (!leftCol && !rightCol) return;
    try {
      if (leftCol) { enhanceHero(leftCol); startCountdown(); }
      if (rightCol) enhanceForm(rightCol);
    } catch (err) {
      if (window.console) console.warn("[inspira-login]", err);
    }
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; update(); });
  }

  const OWN = ".inspira-hero-injected, .vip-perk-card, .form-footer-trust, .inspira-form-badge, .inspira-form-subtext, .inspira-input-label";
  function isOwn(m) {
    const t = m.target && (m.target.nodeType === 1 ? m.target : m.target.parentElement);
    return !!(t && t.closest && t.closest(OWN));
  }

  function boot() {
    update();
    new MutationObserver(function (list) {
      if (list.every(isOwn)) return;
      schedule();
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
