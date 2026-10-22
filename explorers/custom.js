/* Logos and banners a university uploaded for another GEMS fair (same client account) but not yet for this one.
   Used only where the platform would show its grey placeholder; a real upload always wins. */
(function () {
  "use strict";
  if (window.__INSPIRA_IMG_FALLBACK__) return;
  var BASE = "https://cdn.hubilo.com/";
  var LOGO = {
    amritauniversity: "exhibitor/3380930/300/1242_6907_592575001792590327.jpg",
    flameuniversity: "exhibitor/3380930/300/3155_8411_719706001792590230.jpg",
    ieuniversity: "exhibitor/3380930/300/1108_6188_221350001792590382.jpg",
    lancasteruniversity: "exhibitor/3380930/300/1311_7048_635108001792590427.jpg",
    shivnadaruniversitydelhincr: "exhibitor/3380930/300/2269_8579_956613001792590548.jpg",
    hongkonguniversityofscienceandtechnology: "exhibitor/3380930/300/2505_8869_418031001792588885.jpg",
    universityofdundee: "exhibitor/3380930/300/2935_8808_246338001792590531.png",
    universityofguelphhumber: "exhibitor/3380930/300/965a9b60-cc26-11f1-8b4d-31c7cb6197c2_1792460152854.png",
    universityofsouthampton: "exhibitor/3380930/300/1078_5326_690996001792589950.jpg",
    universityoftoronto: "exhibitor/3380930/300/3482_5025_741448001792589966.jpg"
  };
  var BANNER = {
    amritauniversity: "banner/exhibitor_list_banner_image/3380930/1036/1276_6628_962151001792586053.png",
    flameuniversity: "banner/exhibitor_list_banner_image/3380930/1036/1673_8530_850123001792585773.png",
    ieuniversity: "banner/exhibitor_list_banner_image/3380930/1036/3901_6442_551975001792585746.png",
    lancasteruniversity: "banner/exhibitor_list_banner_image/3380930/1036/2667_8764_436928001792585702.png",
    mcmasteruniversityfacultyofengineering: "banner/exhibitor_list_banner_image/3380930/1036/2698_9979_927582001792585665.png",
    shivnadaruniversitydelhincr: "banner/exhibitor_list_banner_image/3380930/1036/4530_5735_878859001792585589.png",
    shorelinecollege: "banner/exhibitor_list_banner_image/3380930/1036/2824_7851_304902001792585558.png",
    templeuniversity: "banner/exhibitor_list_banner_image/3380930/1036/1076_9614_880223001792041700.jpeg",
    hongkonguniversityofscienceandtechnology: "banner/exhibitor_list_banner_image/3380930/1036/4456_7117_260127001792585397.png",
    universityofdundee: "banner/exhibitor_list_banner_image/3380930/1036/4874_7179_955534001792585288.png",
    universityofguelphhumber: "banner/exhibitor_list_banner_image/3380930/1036/1508ea60-cc28-11f1-9427-730f6f995ee6_1792460794886.png",
    universityofsouthampton: "banner/exhibitor_list_banner_image/3380930/1036/1987_5639_017353001792588144.png",
    universityoftoronto: "banner/exhibitor_list_banner_image/3380930/1036/2844_7809_473755001792584953.png",
    westernuniversity: "banner/exhibitor_list_banner_image/3380930/1036/2087_7963_985930001792584880.png"
  };
  function key(name) {
    return String(name || "").split("\u2022")[0].toLowerCase().replace(/^\s*the\s+/, "").replace(/[^a-z0-9]/g, "");
  }
  window.__INSPIRA_IMG_FALLBACK__ = function (name, kind) {
    var map = kind === "banner" ? BANNER : LOGO;
    var p = map[key(name)] || map[key(String(name || "").split(",")[0])];
    return p ? BASE + p : "";
  };
})();

(function () {
  "use strict";
  if (window.__INSPIRA_LOGIN__) return;
  window.__INSPIRA_LOGIN__ = true;

  const EVENT = Object.assign({
    name: "Explorers - GEMS Education Virtual University Fair",
    start: "2026-11-04T16:30:00+04:00",
    end: "2026-11-04T19:00:00+04:00",
    timeZone: "Asia/Dubai",
    timeZoneLabel: "GST",
    registerUrl: "/register",
    logo: "https://cdn.prod.website-files.com/64760766fa26f8bd63c8fee5/6ad5d9a86ddbb8d775280cb2_Gems.svg"
  }, window.INSPIRA_EVENT_CONFIG || {});

  const START = new Date(EVENT.start).getTime();
  const END = new Date(EVENT.end).getTime();

  const ICONS = {
    star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    booth: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2l10 5H2l10-5z"/></svg>',
    chat: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    cap: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
    mail: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DA5A97" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><polyline points="3 7 12 13 21 7"/></svg>'
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

    try { return parseInt(localStorage.getItem("inspira_univ_count_v2"), 10) || 0; } catch (e) { return 0; }
  }

  function eventDateLabel() {
    try {
      const d = new Date(START);
      const day = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: EVENT.timeZone }).format(d);
      const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: EVENT.timeZone }).format(d);
      return clean(day + ", " + time + " " + EVENT.timeZoneLabel).replace(/,\s*,/g, ",");
    } catch (e) {
      return "Wed 4 Nov, 4:30 PM GST";
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
      '<div class="hero-brand-logo"><img src="' + EVENT.logo + '" alt="GEMS Education"></div>' +
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
      '<div class="proof-caption">Hosted by <strong>GEMS Education</strong>. Powered by WebiFair.</div>' +
      "</div>";

    function unit(label, id) {
      return '<div class="countdown-unit"><div class="countdown-val" id="' + id + '">--</div><div class="countdown-lbl">' + label + "</div></div>";
    }
    function sep() { return '<div class="countdown-sep" aria-hidden="true">:</div>'; }
  }

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

  function enhanceForm(rightCol) {
    $$(".topBrandText section, .topBrandText .slick-slider, .eventLogoWrapper, .socialButtons", rightCol).forEach(function (el) {
      el.style.setProperty("display", "none", "important");
    });

    const path = location.pathname;
    const isSignUp = path.indexOf("/sign-up") > -1 || !!$("input[name='firstName']", rightCol);
    const isCode = path.indexOf("/login-with-code") > -1 || !!$("input[name='codeVal'], input[name='code'], input[name='otp']", rightCol);

    if (isSignUp || isCode) {

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
        b.textContent = "Portal Login";
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
;

(function () {
  "use strict";
  if (window.__INSPIRA_REGISTER__) return;
  window.__INSPIRA_REGISTER__ = true;

  // Official event time, from the event banner: Wednesday 4 Nov 2026, 4:30 PM to 7:00 PM GST.
  // Can be overridden before this script loads with window.INSPIRA_EVENT_CONFIG = { ... }.
  const EVENT = Object.assign({
    name: "Explorers - GEMS Education Virtual University Fair",
    start: "2026-11-04T16:30:00+04:00",
    end: "2026-11-04T19:00:00+04:00",
    timeZone: "Asia/Dubai",
    timeZoneLabel: "GST",
    passImage: "https://cdn.hubilo.com/banner/community_login_banner/3380930/1120/1096_7777_662997001791369162.png",
    logo: "https://cdn.prod.website-files.com/64760766fa26f8bd63c8fee5/6ad5d9a86ddbb8d775280cb2_Gems.svg"
  }, window.INSPIRA_EVENT_CONFIG || {});

  // Platform data uses a bullet between name and country ("Cardiff University <bullet> U.K.").
  // It is only matched here, never shown.
  const BULLET = "\u2022";
  const SEP = '<span class="inspira-sep" aria-hidden="true"></span>';

  // Writes only when the element does not already show this markup (also repairs it if
  // something else rewrote it), so the page observer is not triggered for nothing.
  function setHTML(el, html) {
    if (!el || (el.__inspiraHTML === html && el.innerHTML === el.__inspiraOut)) return;
    el.innerHTML = html;
    el.__inspiraHTML = html;
    el.__inspiraOut = el.innerHTML;
  }
  function setText(el, text) { if (el && el.textContent !== text) el.textContent = text; }
  function visibleMatch(sel) {
    return Array.prototype.some.call(document.querySelectorAll(sel), function (el) { return el.getClientRects().length > 0; });
  }

  // Help desks ("Event Support" cards) are listed with the universities but are not universities.
  function isSupportCard(card) {
    const title = card.querySelector(".MuiCardContent-root h3");
    return /help\s*desk|support/i.test(title ? title.textContent : "");
  }

  function getUniversityCount() {
    const cards = document.querySelectorAll(SELECTORS.cards);
    const n = Array.prototype.filter.call(cards, function (card) { return !isSupportCard(card); }).length;
    try {
      if (cards.length > 0) {
        if (localStorage.getItem("inspira_univ_count_v2") !== String(n)) localStorage.setItem("inspira_univ_count_v2", String(n));
        return n;
      }
      return parseInt(localStorage.getItem("inspira_univ_count_v2"), 10) || 0;
    } catch (e) {
      return n;
    }
  }

  // The platform's "43 Participating Universities" badge counts the help desks too; only its
  // number text node is changed.
  function fixParticipatingCount() {
    const count = getUniversityCount();
    if (!count) return;
    document.querySelectorAll(SELECTORS.universitiesSection + " h4 span").forEach(function (span) {
      if (!/Participating Universities/i.test(span.textContent)) return;
      const num = Array.prototype.find.call(span.childNodes, function (node) {
        return node.nodeType === 3 && /^\s*\d+\s*$/.test(node.nodeValue);
      });
      if (num && num.nodeValue.trim() !== String(count)) num.nodeValue = String(count);
    });
  }

  function brandSubtitle(count) {
    return count ? `WebiFairs${SEP}${count} universities` : "WebiFairs";
  }

  function countryName(country) {
    const names = { "U.S.": "United States", "U.K.": "United Kingdom", "U.A.E.": "United Arab Emirates", "Global": "International" };
    const key = normalizeCountry(country);
    return names[key] || key || "";
  }

  const EUROPE = ["germany", "finland", "netherlands", "belgium", "france", "spain", "italy", "ireland",
    "switzerland", "austria", "sweden", "norway", "denmark", "portugal", "poland", "hungary", "czech",
    "greece", "estonia", "latvia", "lithuania", "luxembourg", "malta", "cyprus", "iceland", "croatia",
    "slovenia", "slovakia", "romania", "bulgaria", "monaco"];

  function inRegion(text, region) {
    const t = text.toLowerCase();
    const tag = function (s) { return t.includes(BULLET + " " + s) || t.includes(BULLET + s); };
    if (region === "u.s.") return tag("u.s.") || t.includes("united states");
    if (region === "u.k.") return tag("u.k.") || t.includes("united kingdom");
    if (region === "canada") return tag("canada");
    if (region === "europe") return EUROPE.some(function (c) { return t.includes(c); });
    return true;
  }

  function eventDateParts() {
    const start = new Date(EVENT.start);
    const end = new Date(EVENT.end);
    const tz = EVENT.timeZone;
    const plain = function (s) { return String(s).replace(/\s+/g, " ").trim(); };
    try {
      const date = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: tz }).format(start);
      const t = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz });
      return { date: plain(date), time: plain(t.format(start) + " to " + t.format(end) + " " + EVENT.timeZoneLabel) };
    } catch (e) {
      return { date: "Wed 4 Nov 2026", time: "4:30 PM to 7:00 PM GST" };
    }
  }

  // Configuration constants
  const SELECTORS = {
    header: "#headerTop",
    headerLogoBox: "#headerTop [class*='mui-jx8ode']",
    universitiesSection: '[id="Participating Universities"]',
    cardGrid: '[id="Participating Universities"] .MuiGrid-container',
    cards: '[id="Participating Universities"] .MuiCard-root',
    cardTitles: '[id="Participating Universities"] .MuiCardContent-root h3',
    drawer: ".MuiDrawer-root",
    registerPanel: "#refFormPanel",
  };

  /**
   * 1. HIDE REDUNDANT STICKY TAB BAR
   * Removes the redundant "Participating Universities" secondary sticky tab bar.
   */
  function removeStickyTabBar() {
    const stickyEls = document.querySelectorAll(
      '#headerSticky, [id*="headerSticky"], .headerSticky, [class*="headerSticky"]'
    );
    stickyEls.forEach((el) => {
      el.style.setProperty("display", "none", "important");
      el.setAttribute("aria-hidden", "true");
    });
  }

  /**
   * 2. HEADER BRANDING ENHANCEMENT
   * Injects the official Explorers event brand into the empty header slot.
   */
  function enhanceHeaderBrand() {
    const logoBox = document.querySelector(SELECTORS.headerLogoBox);
    if (!logoBox) return;

    const count = getUniversityCount();

    const existingSub = logoBox.querySelector(".inspira-nav-title-sub");
    if (existingSub) {
      setHTML(existingSub, brandSubtitle(count));
      return;
    }

    logoBox.dataset.inspiraEnhanced = "true";
    logoBox.innerHTML = `
      <a href="#" class="inspira-nav-brand" title="Explorers - GEMS Education Virtual University Fair" style="text-decoration: none;">
        <img class="inspira-nav-logo" src="${EVENT.logo}" alt="GEMS Education">
        <div class="inspira-nav-title">
          <span class="inspira-nav-title-main">Virtual University Fair</span>
          <span class="inspira-nav-title-sub">${brandSubtitle(count)}</span>
        </div>
      </a>
    `;

    const brandLink = logoBox.querySelector(".inspira-nav-brand");
    if (brandLink) {
      brandLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /**
   * 3. HEADER SCROLL EFFECT
   * Adds an elevation class to the header when user scrolls down.
   */
  function initHeaderScrollListener() {
    const header = document.querySelector(SELECTORS.header);
    if (!header || header.dataset.scrollListenerActive) return;

    header.dataset.scrollListenerActive = "true";
    let isScrolled = false;

    window.addEventListener(
      "scroll",
      function () {
        const scrolled = window.scrollY > 25;
        if (scrolled !== isScrolled) {
          isScrolled = scrolled;
          header.classList.toggle("header-scrolled", isScrolled);
          document.body.classList.toggle("cmx-scrolled", isScrolled);
        }
      },
      { passive: true }
    );
  }

  /**
   * 4. COUNTDOWN TIMER HERO ENHANCEMENT
   * Replaces Hubilo's raw unstyled countdown with an executive, modern timer widget
   * (frosted glass pill).
   * Robust against any DOM structure, case-insensitive, extracts numbers reliably,
   * hides native raw elements, and updates live via MutationObserver and 1s fallback ticker.
   */
  let _inspiraCountdownInterval = null;

  function enhanceCountdownTimer() {
    // 1. Locate the timer container element
    const timerCandidates = document.querySelectorAll(
      '#description [class*="styleTimerWrapper"], #description [class*="styleTimerComponent"], [class*="styleTimerComponent"], [class*="styleTimerWrapper"], #description > .MuiBox-root:has(> label), [class*="TimerComponent"]'
    );
    let timerEl = null;
    for (const el of timerCandidates) {
      const text = (el.textContent || "").trim();
      // Case-insensitive matching for "event starts in", "starts in", "days", "secs"
      if (
        /(?:event starts in|starts in|fair begins in)/i.test(text) ||
        (/days/i.test(text) && /(?:secs?|seconds?|mins?|minutes?|hours?)/i.test(text))
      ) {
        timerEl = el;
        break;
      }
    }

    // Fallback: search anywhere inside #description
    if (!timerEl) {
      const desc = document.getElementById("description");
      if (desc) {
        const divs = desc.querySelectorAll("div, section");
        for (const el of divs) {
          const text = (el.textContent || "").trim();
          if (/days/i.test(text) && /secs?/i.test(text) && /(?:starts in|\d+\s*(?:days|d))/i.test(text)) {
            timerEl = el.closest('[class*="styleTimerComponent"], [class*="styleTimerWrapper"]') || el;
            break;
          }
        }
      }
    }

    if (!timerEl) return;

    timerEl.style.setProperty("width", "100%", "important");
    timerEl.style.setProperty("max-width", "100%", "important");
    timerEl.style.setProperty("box-sizing", "border-box", "important");

    // 2. Hide all native Hubilo child elements so they never bleed through
    Array.from(timerEl.children).forEach((child) => {
      if (!child.classList.contains("inspira-enhanced-countdown")) {
        child.style.setProperty("display", "none", "important");
      }
    });

    // 3. Extract countdown digits (Days, Hours, Mins, Secs)
    function extractCountdownNumbers() {
      const raw = timerEl.textContent || "";
      let d = raw.match(/(\d+)\s*(?:days?|d\b)/i)?.[1];
      let h = raw.match(/(\d+)\s*(?:hours?|hrs?|h\b)/i)?.[1];
      let m = raw.match(/(\d+)\s*(?:minutes?|mins?|m\b)/i)?.[1];
      let s = raw.match(/(\d+)\s*(?:seconds?|secs?|s\b)/i)?.[1];

      // If unit tags and numbers are separate nodes, inspect leaf elements
      if (!d || !h || !m || !s) {
        const leafTexts = Array.from(timerEl.querySelectorAll("*"))
          .filter((el) => el.children.length === 0 && !el.closest(".inspira-enhanced-countdown"))
          .map((el) => el.textContent.trim());

        for (let i = 0; i < leafTexts.length; i++) {
          const cur = leafTexts[i];
          const next = leafTexts[i + 1] || "";
          if (/^\d+$/.test(cur)) {
            if (/^days?$/i.test(next) && !d) d = cur;
            else if (/^(?:hours?|hrs?)$/i.test(next) && !h) h = cur;
            else if (/^(?:minutes?|mins?)$/i.test(next) && !m) m = cur;
            else if (/^(?:seconds?|secs?)$/i.test(next) && !s) s = cur;
          }
        }

        // Check if there are 4 standalone numeric leaves: [days, hours, mins, secs]
        if (!d || !h || !m || !s) {
          const pureDigits = leafTexts.filter((t) => /^\d+$/.test(t));
          if (pureDigits.length >= 4) {
            if (!d) d = pureDigits[0];
            if (!h) h = pureDigits[1];
            if (!m) m = pureDigits[2];
            if (!s) s = pureDigits[3];
          }
        }
      }

      // Fallback: colon or slash sequence e.g. "13:15:40:16"
      if (!d || !h || !m || !s) {
        const seqMatch = raw.match(/(\d{1,3})\s*[:\-\/]\s*(\d{1,2})\s*[:\-\/]\s*(\d{1,2})\s*[:\-\/]\s*(\d{1,2})/);
        if (seqMatch) {
          d = seqMatch[1];
          h = seqMatch[2];
          m = seqMatch[3];
          s = seqMatch[4];
        }
      }

      // On the day itself the platform drops the larger units ("12 Hrs 3 Mins 23 Secs", later "3 Mins 23 Secs"):
      // once the seconds are there, a unit it no longer shows is 0.
      if (s != null) {
        if (d == null) d = 0;
        if (h == null) h = 0;
        if (m == null) m = 0;
      }

      // Keep "--" until all four numbers can be read (never show invented numbers)
      if (d == null || h == null || m == null || s == null) return null;
      return {
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        mins: String(m).padStart(2, "0"),
        secs: String(s).padStart(2, "0"),
      };
    }

    // Same clock as the login page: count down to the event's own start time, so the numbers never depend on
    // how the platform words its timer (on the day itself it drops the days). Its text is only the backup.
    function countdownValues() {
      const left = new Date(EVENT.start).getTime() - Date.now();
      if (!(left > 0)) return extractCountdownNumbers();
      const pad = (n) => String(n).padStart(2, "0");
      return {
        days: pad(Math.floor(left / 86400000)),
        hours: pad(Math.floor(left / 3600000) % 24),
        mins: pad(Math.floor(left / 60000) % 60),
        secs: pad(Math.floor(left / 1000) % 60),
      };
    }

    // 4. Timer widget
    const style = "apple";

    let widget = timerEl.querySelector(".inspira-enhanced-countdown");
    if (!widget || widget.dataset.inspiraStyle !== style) {
      if (widget) widget.remove();
      widget = document.createElement("div");
      widget.className = "inspira-enhanced-countdown";
      widget.dataset.inspiraStyle = style;

      {
        widget.innerHTML = `
          <div class="inspira-timer-wrap inspira-timer-apple">
            <div class="inspira-timer-apple-badge">
              <span class="inspira-timer-apple-dot"></span>
              <span class="inspira-timer-apple-label">EVENT STARTS IN</span>
            </div>
            <div class="inspira-timer-apple-units" role="timer" aria-label="Time until the fair starts">
              <div class="inspira-timer-apple-unit">
                <span class="inspira-timer-apple-num" data-unit="days">--</span>
                <span class="inspira-timer-apple-sub">DAYS</span>
              </div>
              <div class="inspira-timer-apple-sep"></div>
              <div class="inspira-timer-apple-unit">
                <span class="inspira-timer-apple-num" data-unit="hours">--</span>
                <span class="inspira-timer-apple-sub">HOURS</span>
              </div>
              <div class="inspira-timer-apple-sep"></div>
              <div class="inspira-timer-apple-unit">
                <span class="inspira-timer-apple-num" data-unit="mins">--</span>
                <span class="inspira-timer-apple-sub">MINS</span>
              </div>
              <div class="inspira-timer-apple-sep"></div>
              <div class="inspira-timer-apple-unit inspira-timer-apple-unit-sec">
                <span class="inspira-timer-apple-num" data-unit="secs">--</span>
                <span class="inspira-timer-apple-sub">SECS</span>
              </div>
            </div>
          </div>
        `;
      }
      timerEl.appendChild(widget);
    }

    function updateWidgetValues(values) {
      if (!values || !widget) return;
      const { days, hours, mins, secs } = values;
      const daysEl = widget.querySelector('[data-unit="days"]');
      const hoursEl = widget.querySelector('[data-unit="hours"]');
      const minsEl = widget.querySelector('[data-unit="mins"]');
      const secsEl = widget.querySelector('[data-unit="secs"]');

      if (daysEl && daysEl.textContent !== days) daysEl.textContent = days;
      if (hoursEl && hoursEl.textContent !== hours) hoursEl.textContent = hours;
      if (minsEl && minsEl.textContent !== mins) minsEl.textContent = mins;
      if (secsEl && secsEl.textContent !== secs) secsEl.textContent = secs;
    }

    // Initial update
    const initialValues = countdownValues();
    updateWidgetValues(initialValues);

    // 5. Real-Time Mutation Observer on timerEl
    if (!timerEl.dataset.timerObserved) {
      timerEl.dataset.timerObserved = "true";
      const observer = new MutationObserver(function (mutations) {
        const isSelf = mutations.every(
          (m) => m.target && (m.target === widget || (m.target.closest && m.target.closest(".inspira-enhanced-countdown")))
        );
        if (!isSelf) {
          Array.from(timerEl.children).forEach((child) => {
            if (!child.classList.contains("inspira-enhanced-countdown")) {
              child.style.setProperty("display", "none", "important");
            }
          });
          const fresh = countdownValues();
          updateWidgetValues(fresh);
        }
      });
      observer.observe(timerEl, { childList: true, characterData: true, subtree: true });
    }

    // 6. Resilient 1-Second Fallback Ticker
    if (!_inspiraCountdownInterval) {
      _inspiraCountdownInterval = setInterval(function () {
        if (!document.body.contains(timerEl)) {
          clearInterval(_inspiraCountdownInterval);
          _inspiraCountdownInterval = null;
          return;
        }
        const currentVals = countdownValues();
        updateWidgetValues(currentVals);
      }, 1000);
    }
  }

  /**
   * AUTHENTIC WEBSITE UNIVERSITIES DATASET
   * Extracted directly from live platform (redeinspira.webifairs.com).
   * 100% real university names, countries, official CDN logos, and official CDN banners.
   * Zero custom or mock data.
   */
  const REAL_WEBSITE_UNIVERSITIES = [
    {
      name: "Technology Help Desk",
      country: "Event Support",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1028_8539_543542001791631204.png",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4465_6893_713005001791631192.png",
      isSupport: true
    },
    {
      name: "The American College of Greece",
      country: "Greece",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2407_9920_617435001792054463.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4006_7023_202907001792059857.png"
    },
    {
      name: "School Counselor Help Desk",
      country: "Event Support",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3330_6006_651949001792055354.png",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3243_7854_262585001792055349.png",
      isSupport: true
    },
    {
      name: "Ashoka University",
      country: "India",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3560_5633_062205001792054597.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4254_8241_076358001792059891.png"
    },
    {
      name: "The American University of Paris",
      country: "France",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2669_6533_257231001792406969.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1024_7026_858065001792406975.jpeg"
    },
    {
      name: "The Australian National University",
      country: "Australia",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3563_8644_148621001792055161.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3778_8928_337943001791630439.png"
    },
    {
      name: "Bond University",
      country: "Australia",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3809_5244_022564001792055372.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4449_8472_501487001791629990.png"
    },
    {
      name: "Brock University",
      country: "Canada",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2412_7472_908303001792055439.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3138_9540_949708001791626949.png"
    },
    {
      name: "EUROPEAN COLLEGE-EC BUSINESS SCHOOL, S.A.",
      country: "Spain",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2057_8423_355944001792057162.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2231_7772_551335001791624979.png"
    },
    {
      name: "University of Minnesota Twin Cities",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1331_7497_601679001792057495.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3869_6984_355721001792059950.png"
    },
    {
      name: "Foothill + De Anza Colleges",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1282_6374_527293001792064176.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4342_7072_254965001791630035.png"
    },
    {
      name: "Hult International Business School",
      country: "U. A. E.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3423_9536_591497001792062504.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4495_6081_780740001791630144.png"
    },
    {
      name: "University of Oregon",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2876_5642_266393001792063392.png",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4496_5883_763568001792059980.png"
    },
    {
      name: "Huron University",
      country: "Canada",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2728_7652_129798001792063832.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1178_9172_275339001791630212.png"
    },
    {
      name: "Johnson & Wales University",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3811_8122_695430001792064760.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1279_5783_585573001791630264.png"
    },
    {
      name: "Joliet Junior College",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3537_8829_663683001792065607.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3177_5180_307088001791624410.png"
    },
    {
      name: "LASALLE College of the Arts, University of the Arts Singapore (UAS)",
      country: "Singapore",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3191_9319_561246001792065736.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3587_9310_647163001792060132.png"
    },
    {
      name: "Kansas State University",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3464_5264_884135001792066395.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2507_8758_056916001791625186.png"
    },
    {
      name: "Northwestern Qatar",
      country: "Qatar",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4105_8739_626164001792066841.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2972_7682_902831001792060155.png"
    },
    {
      name: "Kent State University",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1777_6737_484997001792066575.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1803_5409_997750001791625534.png"
    },
    {
      name: "Northumbria University",
      country: "U. K.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3765_5715_825775001792067568.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4238_7474_426935001791630308.png"
    },
    {
      name: "Purdue University Fort Wayne",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3652_8814_902637001792067642.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1953_8964_763345001791626870.png"
    },
    {
      name: "Royal Holloway, University of London",
      country: "U. K.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4941_5690_241944001792068202.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2211_9300_370092001792060186.png"
    },
    {
      name: "SCAD",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1371_8673_637033001792068256.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3669_7246_127949001791625106.png"
    },
    {
      name: "St. Joseph’s University, Bengaluru.",
      country: "India",
      logo: "https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "Stony Brook University - The State University of New York",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2868_7841_567861001792068474.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2931_6486_836385001791625783.png"
    },
    {
      name: "Swiss Education Group",
      country: "Switzerland",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3704_8796_649906001792068701.png",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1978_9697_052384001791625667.png"
    },
    {
      name: "Temple University",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3598_6545_339353001792131258.jpg",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "Tennessee Tech",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2621_6438_356140001792132854.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4205_6094_735994001791624472.png"
    },
    {
      name: "University of Aberdeen",
      country: "U. K.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1244_8811_170261001792133300.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2068_5834_623337001791630715.png"
    },
    {
      name: "University of Auckland",
      country: "New Zealand",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1724_6392_283212001792133370.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4533_6105_875951001792062527.png"
    },
    {
      name: "University of Bristol",
      country: "U. K.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3673_9336_671438001792134157.jpg",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "University of California, Riverside",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1126_6908_947381001792134505.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4863_9017_297525001791630755.png"
    },
    {
      name: "University of Guelph-Humber",
      country: "Canada",
      logo: "https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "The University of Hong Kong -Faculty of Social Sciences",
      country: "Hong Kong",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4661_9302_825777001792135641.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4079_5218_885683001792060239.png"
    },
    {
      name: "University of Kansas",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4292_8413_299411001792135962.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1430_8505_947744001791630788.png"
    },
    {
      name: "University of Manitoba",
      country: "Canada",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3077_9930_258119001792136028.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1282_6777_062673001791624765.png"
    },
    {
      name: "University of New South Wales (UNSW)",
      country: "Australia",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4180_5105_594660001792136271.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3894_6057_431462001791630832.png"
    },
    {
      name: "University of Otago",
      country: "New Zealand",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1070_7356_974184001792146006.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1158_8775_595556001791630881.png"
    },
    {
      name: "University of Ottawa",
      country: "Canada",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3469_9422_110321001792139275.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2076_6948_420909001791631114.png"
    },
    {
      name: "University of Waterloo",
      country: "Canada",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1131_6659_485514001792140269.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4920_7891_706891001791631139.png"
    },
    {
      name: "Washington College",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1378_7336_595080001792140738.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2479_6824_227484001791625625.png"
    },
    {
      name: "Webster University",
      country: "U. S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3710_6151_999768001792140870.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4327_5671_214105001791626704.png"
    },
    {
      name: "Imperial",
      country: "U.K.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1265_9895_875277001792146146.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4116_5878_445100001792136308.png"
    },
    {
      name: "City University of Hong Kong",
      country: "Hong Kong",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3887_5777_090114001792146325.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1610_7833_674160001792136129.png"
    },
    {
      name: "Amrita University",
      country: "India",
      logo: "https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "Shiv Nadar University Delhi NCR",
      country: "India",
      logo: "https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "McMaster University - Faculty of Engineering",
      country: "Canada",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4024_7136_652784001792239350.jpg",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "Università IULM",
      country: "Italy",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3441_7335_581861001792408003.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1888_6234_895653001792408012.jpeg"
    },
    {
      name: "Shoreline College",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2305_8358_286727001792411279.jpg",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "MIT World Peace University, Pune",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "IE University",
      country: "Spain",
      logo: "https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "Illinois Tech",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    }
  ];
  // Shared with the lobby extras at the end of this file (country chips, progress).
  window.__INSPIRA_UNIVERSITIES__ = REAL_WEBSITE_UNIVERSITIES;

  window._inspiraCardViewMode = "style2";

  /**
   * 5. CARD DESIGN SYSTEM: STYLE 2 (SPLIT CLEAN) - 100% REAL PLATFORM DATA
   * Contained official banner with logo badge, clean white base,
   * real university name, real country tag, official booth tag, and dark "Explore Booth" pill CTA.
   */
  /**
   * Intelligently formats university names and campus/location details.
   * Prevents long institution names from overflowing and formats campus locations
   * meaningfully into card subtitles (e.g., "Concordia University Wisconsin" with
   * "Mequon Campus" subtitle).
   */
  function formatUniversityCardDetails(rawName, countryHint, isSupportHint) {
    let displayName = (rawName || "").trim();
    let campusLocation = "";
    let displayCountry = countryHint || "Global";
    const isSupport = isSupportHint || /help desk|support/i.test(displayName);

    if (isSupport) {
      return {
        displayName: displayName || "Technology Help Desk",
        campusLocation: "",
        subtitle: "Technical help for students",
        country: "Event Support",
        isSupport: true
      };
    }

    // Check if the university name contains a campus or location separated by hyphen or dash
    // Handles a regular hyphen, an en dash (u2013) and an em dash (u2014)
    // e.g. "Concordia University Wisconsin - Mequon, WI" -> "Concordia University Wisconsin" + "Mequon Campus"
    if (/[\-\u2013\u2014]/.test(displayName)) {
      const parts = displayName.split(/\s*[\-\u2013\u2014]\s*/);
      const head = parts[0].trim();
      const tail = parts.slice(1).join(" - ").trim();
      const isAcademicUnit = /school|college|institute|faculty|department|center|centre|programme/i.test(tail);
      if (!isAcademicUnit && tail.length > 0) {
        displayName = head;
        campusLocation = tail;
      }
    }

    // Meaningful concise subtitle: fits comfortably within 3-column cards without truncation
    let subtitle = escapeHTML(countryName(displayCountry));
    if (campusLocation) {
      let cleanCampus = campusLocation;
      if (!/campus/i.test(cleanCampus)) {
        cleanCampus = cleanCampus.replace(/,\s*[A-Z]{2}$/, "").trim();
        cleanCampus = `${cleanCampus} Campus`;
      }
      subtitle = `<span class="inspira-campus-tag">${escapeHTML(cleanCampus)}</span>`;
    }

    return {
      displayName,
      campusLocation,
      subtitle,
      country: displayCountry,
      isSupport: false
    };
  }

  /**
   * 5. ENHANCE PARTICIPATING UNIVERSITY CARDS (STYLE 2: SPLIT CLEAN)
   * Transforms raw 32 cards into high-conversion cards:
   * Contained top 110px photo banner with badge, white content, 2-line title, dark pill CTA.
   */
  function enhanceUniversityCards(forceUpdate = false) {
    const cards = document.querySelectorAll(SELECTORS.cards);
    if (!cards.length) return;

    cards.forEach((card, index) => {
      // 1. Extract real university details from Hubilo raw DOM or authentic dataset
      let univName = "";
      let country = "";
      let logo = "";
      let banner = "";
      let isSupport = false;

      const rawH3 = card.querySelector(".MuiCardContent-root h3, [class*='mui-aqn2jx']");
      const rawText = rawH3 ? rawH3.textContent.trim() : "";
      const rawLogoImg = card.querySelector(".mui-1lv1xbc img, [class*='mui-1lv1xbc'] img, .MuiBox-root img:not(.bgImage)");
      const rawBannerImg = card.querySelector("img.bgImage, img[alt*='BANNER']");

      if (rawText) {
        if (rawText.includes(" " + BULLET + " ")) {
          const parts = rawText.split(" " + BULLET + " ");
          univName = parts[0].trim();
          country = parts[parts.length - 1].trim();
        } else if (rawText.includes(" - ")) {
          const parts = rawText.split(" - ");
          univName = parts[0].trim();
          country = parts[1].trim();
        } else {
          univName = rawText;
          country = (rawText.toLowerCase().includes("help desk") || rawText.toLowerCase().includes("support")) ? "Event Support" : "Global";
        }
      }

      if (rawLogoImg && rawLogoImg.src) logo = rawLogoImg.src;
      if (rawBannerImg && rawBannerImg.src) banner = rawBannerImg.src;

      // Match against official dataset for guaranteed authentic logo & banner
      const matched = REAL_WEBSITE_UNIVERSITIES.find(
        (u) =>
          univName &&
          (u.name.toLowerCase() === univName.toLowerCase() ||
            univName.toLowerCase().includes(u.name.toLowerCase()) ||
            u.name.toLowerCase().includes(univName.toLowerCase()))
      );

      let rawFullName = univName;
      if (matched) {
        rawFullName = matched.name;
        if (!country || country === "Global") country = matched.country;
        if (!logo || logo.includes("exhibitor_default") || logo.includes("placeholder")) logo = matched.logo;
        if (!banner || banner.includes("exhibitor_cover") || banner.includes("placeholder")) banner = matched.banner;
        if (matched.isSupport) isSupport = true;
      } else if (!univName && REAL_WEBSITE_UNIVERSITIES[index]) {
        const item = REAL_WEBSITE_UNIVERSITIES[index];
        rawFullName = item.name;
        country = item.country;
        logo = item.logo;
        banner = item.banner;
        if (item.isSupport) isSupport = true;
      } else if (!univName) {
        const fallback = REAL_WEBSITE_UNIVERSITIES[index % REAL_WEBSITE_UNIVERSITIES.length];
        rawFullName = fallback.name;
        country = fallback.country;
        logo = fallback.logo;
        banner = fallback.banner;
        if (fallback.isSupport) isSupport = true;
      }

      // still a placeholder: the university's own image from another GEMS fair, when there is one
      const imgFallback = window.__INSPIRA_IMG_FALLBACK__;
      if (imgFallback && (!logo || logo.includes("exhibitor_default"))) logo = imgFallback(rawFullName, "logo") || logo;
      if (imgFallback && (!banner || banner.includes("exhibitor_cover"))) banner = imgFallback(rawFullName, "banner") || banner;

      // Format card details with smart campus/title separation and meaningful subtitle
      const details = formatUniversityCardDetails(rawFullName, country, isSupport);
      univName = details.displayName;
      country = details.country;
      isSupport = details.isSupport;
      const subtitle = details.subtitle;
      const boothTag = isSupport ? "Help Desk" : "Official Booth";
      const boothIconPath = isSupport
        ? '<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>'
        : '<path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2l10 5H2l10-5z"></path>';

      // Clean up any lingering chat, message buttons, or stray undergrad/grad tags on the card
      card.querySelectorAll(".inspira-card-chat-frosted, .inspira-card-chat-circle, .inspira-card-fav-btn, .inspira-card-fav-circle, [class*='chat-circle'], [class*='chat-frosted']").forEach((el) => el.remove());
      card.querySelectorAll(".inspira-card-tags-row-dark span, .inspira-card-tags-row span, [class*='inspira-tag']").forEach((tag) => {
        if (/undergrad|grad|live support/i.test(tag.textContent)) {
          tag.remove();
        }
      });

      const hasOldChat = card.querySelector(".inspira-card-chat-circle, .inspira-card-chat-frosted, [class*='chat-circle']");
      const hasNewBrandRow = card.querySelector(".inspira-card-brand-row");
      const isUpToDate = card.dataset.renderedStyle === "style2" && card.dataset.cardVersion === "v9" && hasNewBrandRow && !hasOldChat;

      if (!forceUpdate && isUpToDate && card.querySelector(".inspira-card-view")) {
        return;
      }
      card.dataset.renderedStyle = "style2";
      card.dataset.cardVersion = "v9";
      card.dataset.country = country;
      const colWrapper = card.closest(".MuiGrid-item, .MuiGrid-root") || card.parentElement;
      if (colWrapper) colWrapper.dataset.country = country;

      // Clean all existing custom overlays
      card.querySelectorAll(".inspira-card-view").forEach((el) => el.remove());

      // STYLE 2: SPLIT CLEAN CARD (100% Real Website Data)
      const cardHtml = `
        <div class="inspira-card-view inspira-view-split">
          <div class="inspira-card-split-media">
            <img src="${banner}" class="inspira-card-split-img" alt="${escapeHTML(univName)}" loading="lazy" />
            <span class="inspira-split-badge inspira-location-badge">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="11" r="2.5"></circle>
              </svg>
              ${escapeHTML(normalizeCountry(country))}
            </span>
          </div>
          <div class="inspira-card-split-content">
            <div class="inspira-card-brand-row">
              <div class="inspira-card-logo-box">
                ${logo ? `<img src="${logo}" class="inspira-card-brand-logo" alt="${escapeHTML(univName)} logo" loading="lazy" />` : `
                  <div class="inspira-card-logo-fallback">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                  </div>`}
              </div>
              <div class="inspira-card-info-col">
                <h3 class="inspira-card-name-dark" title="${escapeHTML(univName)}">${escapeHTML(univName)}</h3>
                <span class="inspira-card-desc-muted">${subtitle}</span>
              </div>
            </div>
            <div class="inspira-card-tags-row-dark">
              <span class="inspira-tag-item-dark" title="${isSupport ? 'Support Desk' : 'Booth Verification'}">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  ${boothIconPath}
                </svg>
                ${escapeHTML(boothTag)}
              </span>
            </div>
            <div class="inspira-card-split-btn-group">
              <button type="button" class="inspira-card-cta-btn inspira-cta-dark">
                Explore Booth
              </button>
            </div>
          </div>
        </div>
      `;

      card.insertAdjacentHTML("beforeend", cardHtml);

      // Explore Booth button handler (opens booth modal drawer)
      const exploreBtn = card.querySelector(".inspira-card-cta-btn");
      if (exploreBtn) {
        exploreBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          card.click();
        });
      }
    });
  }

  /**
   * 6. DIRECTORY LIVE SEARCH & DYNAMIC COUNTRY FILTERS
   * Injects an interactive search input and dynamic pills for ALL countries
   * detected across the participating university cards.
   */
  let currentDirectoryFilter = "all";
  let currentDirectorySearch = "";

  function normalizeCountry(raw) {
    if (!raw) return "";
    const s = String(raw).trim();
    const lower = s.toLowerCase();
    // platform data sometimes has spaces inside abbreviations ("U. K.")
    const compact = lower.replace(/\s+/g, "");
    if (/^u\.?s\.?a?\.?$/i.test(compact) || lower === "united states" || lower === "usa") return "U.S.";
    if (/^u\.?k\.?$/i.test(compact) || lower === "united kingdom" || lower === "uk") return "U.K.";
    if (/^u\.?a\.?e\.?$/i.test(compact) || lower === "united arab emirates") return "U.A.E.";
    if (/^([a-z]\.)+$/.test(compact)) return compact.toUpperCase();
    if (/^hong\s*kong\b/.test(lower)) return "Hong Kong"; // "Hong Kong (SAR China)" and "Hong Kong" are one filter
    if (lower === "canada") return "Canada";
    if (lower === "finland") return "Finland";
    if (lower === "belgium") return "Belgium";
    if (lower === "netherlands" || lower === "holland") return "Netherlands";
    if (lower === "germany" || lower === "deutschland") return "Germany";
    if (lower === "france") return "France";
    if (lower === "spain") return "Spain";
    if (lower === "italy") return "Italy";
    if (lower === "ireland") return "Ireland";
    if (lower === "switzerland") return "Switzerland";
    if (lower === "australia") return "Australia";
    if (lower === "japan") return "Japan";
    if (lower.includes("support") || lower.includes("help desk")) return "Event Support";
    // title-case, but keep short capitalised words as they are ("Hong Kong (SAR China)")
    return s.replace(/\w\S*/g, (txt) => (txt.length <= 4 && txt === txt.toUpperCase()) ? txt : txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  function getCardCountry(col) {
    if (!col) return "";
    if (col.dataset && col.dataset.country) return normalizeCountry(col.dataset.country);
    const card = col.querySelector(SELECTORS.cards) || col;
    if (card && card.dataset && card.dataset.country) return normalizeCountry(card.dataset.country);

    const badge = col.querySelector(".inspira-location-badge, [class*='location-badge']");
    if (badge) {
      const badgeText = badge.textContent.replace(/[\n\r]+/g, " ").trim();
      if (badgeText) return normalizeCountry(badgeText);
    }

    const h3 = col.querySelector("h3, .MuiCardContent-root h3, [class*='mui-aqn2jx']");
    const h3Text = h3 ? h3.textContent.trim() : "";
    if (h3Text.includes(BULLET)) {
      return normalizeCountry(h3Text.split(BULLET)[1]);
    }
    if (h3Text.includes(" - ")) {
      return normalizeCountry(h3Text.split(" - ")[1]);
    }

    const fullText = col.textContent.toLowerCase();
    if (fullText.includes("u.s.") || fullText.includes("united states")) return "U.S.";
    if (fullText.includes("u.k.") || fullText.includes("united kingdom")) return "U.K.";
    if (fullText.includes("canada")) return "Canada";
    if (fullText.includes("finland")) return "Finland";
    if (fullText.includes("belgium")) return "Belgium";
    if (fullText.includes("netherlands")) return "Netherlands";
    if (fullText.includes("germany")) return "Germany";
    if (fullText.includes("support") || fullText.includes("help desk")) return "Event Support";

    return "Global";
  }

  function initDirectorySearchAndFilter() {
    const section = document.querySelector(SELECTORS.universitiesSection);
    const grid = document.querySelector(SELECTORS.cardGrid);
    if (!section || !grid) return;

    const cardColumns = Array.from(grid.children).filter(c => !c.classList.contains("univ-empty-state"));
    if (!cardColumns.length) return;

    let filterContainer = section.querySelector(".univ-filter-container");
    if (!filterContainer) {
      filterContainer = document.createElement("div");
      filterContainer.className = "univ-filter-container";
      filterContainer.innerHTML = `
        <div class="univ-search-wrapper">
          <svg class="univ-search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input 
            type="text" 
            id="univSearchInput" 
            class="univ-search-input" 
            placeholder="Search by university or country" 
            aria-label="Search participating universities"
          />
        </div>
        <div class="univ-country-filters" role="group" aria-label="Filter universities by country"></div>
      `;
      grid.parentNode.insertBefore(filterContainer, grid);

      const searchInput = filterContainer.querySelector("#univSearchInput");
      searchInput.addEventListener("input", function (e) {
        currentDirectorySearch = e.target.value;
        applyFilter();
      });
    }

    function applyFilter() {
      let visibleCount = 0;
      const q = currentDirectorySearch.toLowerCase().trim();

      cardColumns.forEach((col) => {
        const country = getCardCountry(col);
        const countryKey = country.toLowerCase();
        const text = col.textContent.toLowerCase();

        let matchesCountry = false;
        if (currentDirectoryFilter === "all") {
          matchesCountry = true;
        } else if (currentDirectoryFilter === countryKey) {
          matchesCountry = true;
        }

        const matchesSearch = !q || text.includes(q) || countryKey.includes(q);

        if (matchesCountry && matchesSearch) {
          col.style.display = "";
          visibleCount++;
        } else {
          col.style.display = "none";
        }
      });

      let emptyMsg = grid.querySelector(".univ-empty-state");
      if (visibleCount === 0) {
        if (!emptyMsg) {
          emptyMsg = document.createElement("div");
          emptyMsg.className = "univ-empty-state";
          emptyMsg.innerHTML = `
            <p class="univ-empty-title">No universities match your search.</p>
            <button type="button" id="resetUnivFilterBtn" class="univ-empty-reset">Show all ${cardColumns.filter(col => getCardCountry(col) !== "Event Support").length} universities</button>
          `;
          grid.appendChild(emptyMsg);
          emptyMsg.querySelector("#resetUnivFilterBtn").addEventListener("click", () => {
            const searchInput = filterContainer.querySelector("#univSearchInput");
            if (searchInput) searchInput.value = "";
            currentDirectorySearch = "";
            currentDirectoryFilter = "all";
            renderCountryPills();
            applyFilter();
          });
        }
        emptyMsg.style.display = "block";
      } else if (emptyMsg) {
        emptyMsg.style.display = "none";
      }
    }

    function renderCountryPills() {
      const counts = {};
      cardColumns.forEach((col) => {
        const c = getCardCountry(col);
        if (c) {
          counts[c] = (counts[c] || 0) + 1;
        }
      });

      // Show ALL countries present in the fair
      const countryNames = Object.keys(counts).filter(c => c !== "Event Support");
      countryNames.sort((a, b) => {
        if (counts[b] !== counts[a]) return counts[b] - counts[a];
        return a.localeCompare(b);
      });

      if (counts["Event Support"]) {
        countryNames.push("Event Support");
      }

      const pillsContainer = filterContainer.querySelector(".univ-country-filters");
      if (!pillsContainer) return;

      const totalCount = cardColumns.filter(col => getCardCountry(col) !== "Event Support").length;
      let pillsHtml = `
        <button type="button" class="univ-filter-pill ${currentDirectoryFilter === 'all' ? 'active' : ''}" data-filter="all">
          All <span class="univ-filter-count">(${totalCount})</span>
        </button>
      `;

      countryNames.forEach((country) => {
        const key = country.toLowerCase();
        const active = currentDirectoryFilter === key ? "active" : "";
        pillsHtml += `
          <button type="button" class="univ-filter-pill ${active}" data-filter="${escapeHTML(key)}">
            ${escapeHTML(country)} <span class="univ-filter-count">(${counts[country]})</span>
          </button>
        `;
      });

      // Avoid re-rendering if HTML is identical to preserve focus and DOM
      if (pillsContainer.__lastHtml !== pillsHtml) {
        pillsContainer.__lastHtml = pillsHtml;
        pillsContainer.innerHTML = pillsHtml;

        pillsContainer.querySelectorAll(".univ-filter-pill").forEach((pill) => {
          pill.addEventListener("click", function () {
            pillsContainer.querySelectorAll(".univ-filter-pill").forEach((p) => p.classList.remove("active"));
            this.classList.add("active");
            currentDirectoryFilter = this.dataset.filter;
            applyFilter();
          });
        });
      }
    }

    renderCountryPills();
    applyFilter();
  }

  /**
   * 7. ACTIVE CARD TRACKING & DRAWER STATE
   * Highlights the active card while its detail drawer is open.
   */
  function initCardInteractionTracking() {
    if (window._inspiraTrackingInitialized) return;
    window._inspiraTrackingInitialized = true;

    document.addEventListener("click", function (e) {
      const card = e.target.closest(SELECTORS.cards);
      if (card) {
        document.querySelectorAll(SELECTORS.cards).forEach((c) => c.classList.remove("card-selected"));
        card.classList.add("card-selected");
      }
    });
  }

  /**
   * Helper function to detect any open modal popup or drawer on the page
   */
  function getActiveModalPopup() {
    const papers = document.querySelectorAll(".MuiDrawer-paper, .MuiDialog-paper, [class*='modalContentStyle']");
    for (const paper of papers) {
      if (paper.offsetWidth > 0 || paper.offsetHeight > 0) {
        return paper.closest(".MuiDrawer-root, .MuiModal-root, .MuiDialog-root, [role='presentation'], body") || paper;
      }
    }

    const roots = document.querySelectorAll(".MuiDrawer-root, .MuiModal-root, .MuiDialog-root, [role='dialog']");
    for (const root of roots) {
      if (root.getAttribute("aria-hidden") === "true") continue;
      const style = window.getComputedStyle(root);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (root.offsetWidth > 0 || root.offsetHeight > 0) {
        return root;
      }
    }
    return null;
  }

  /**
   * Helper function to locate the close button in any open modal or drawer
   */
  function findModalCloseButton() {
    // 1. Preview cards demo close button
    const demoClose = document.getElementById("demoCloseBtn");
    if (demoClose && demoClose.offsetParent !== null) return demoClose;

    // 2. Add To Calendar modal close button (or any standalone MuiModal close button)
    const modalClose = document.querySelector(
      ".MuiModal-root:not(.MuiDrawer-root) button:has(path[d*='205.66']), " +
      ".MuiModal-root:not(.MuiDrawer-root) button.mui-1e6be0u, " +
      ".MuiModal-root:not(.MuiDrawer-root) .mui-f0uyk5 > button, " +
      ".MuiModal-root:not(.MuiDrawer-root) [class*='mui-f0uyk5'] button, " +
      ".MuiModal-root:not(.MuiDrawer-root) button"
    );
    if (modalClose && (modalClose.offsetWidth > 0 || modalClose.offsetHeight > 0 || modalClose.offsetParent !== null)) {
      return modalClose;
    }

    // 3. Direct Hubilo Drawer paper close button (fastest & most reliable)
    const drawerBtn = document.querySelector(".MuiDrawer-paper > button, .MuiDrawer-paper > .MuiIconButton-root, .MuiDrawer-paper button.mui-cysavz, .MuiDrawer-paper [class*='mui-cysavz']");
    if (drawerBtn && (drawerBtn.offsetWidth > 0 || drawerBtn.offsetHeight > 0 || drawerBtn.offsetParent !== null)) return drawerBtn;

    // 4. Active open drawer paper on screen (DO NOT check generic .MuiPaper-root cards!)
    const openPapers = document.querySelectorAll(
      ".MuiDrawer-paper, .MuiDialog-paper, [class*='modalContentStyle'], .MuiModal-root [role='dialog'], .MuiModal-root .MuiBox-root[tabindex='-1']"
    );

    for (const paper of openPapers) {
      if (paper.offsetWidth === 0 && paper.offsetHeight === 0) continue;
      // Skip if this paper is inside a card, accordion, or ticket panel
      if (paper.closest(".MuiCard-root, .MuiAccordion-root, #refFormPanel")) continue;

      // Direct child button of drawer paper (Hubilo close button)
      const directBtn = paper.querySelector(":scope > button, :scope > .MuiIconButton-root, button.mui-cysavz, [class*='mui-cysavz']");
      if (directBtn) return directBtn;

      // Injected close button
      const injected = paper.querySelector("#inspiraInjectedCloseBtn, button.inspira-modal-close-btn");
      if (injected) return injected;

      // SVG with close icon or cross path (Phosphor 205.66 or MUI 19 6.41)
      const closeSvgBtn = paper.querySelector(
        "button:has(path[d*='205.66']), button:has(path[d*='19 6.41']), button:has(svg[data-testid='CloseIcon'])"
      );
      if (closeSvgBtn && !closeSvgBtn.closest("[class*='social' i], [class*='Social' i], .tabs-filter-bar")) return closeSvgBtn;

      // Close button with aria-label
      const ariaClose = paper.querySelector(
        "button[aria-label*='close' i], button[aria-label*='fechar' i], [aria-label*='close' i]"
      );
      if (ariaClose) return ariaClose;

      // Registration form close button
      const regClose = paper.querySelector(
        ".widgetRegCloseSingleView button, .widgetRegCloseSingleView .MuiIconButton-root, [class*='widgetRegClose'] button"
      );
      if (regClose) return regClose;
    }

    // 5. Global search for visible close button
    const globalClose = document.querySelector(
      ".MuiDrawer-root button[aria-label*='close' i], .MuiModal-root button[aria-label*='close' i], .widgetRegCloseSingleView button, #demoCloseBtn"
    );
    if (globalClose) return globalClose;

    return null;
  }

  /**
   * Helper function to dismiss any open modal/drawer cleanly with re-entrancy protection
   */
  let isDismissingModal = false;
  function dismissModalPopup() {
    if (isDismissingModal) return;
    isDismissingModal = true;

    try {
      // 1. Remove active card highlight
      document.querySelectorAll(".card-selected").forEach((c) => c.classList.remove("card-selected"));

      // 2. Hide demo drawer in preview
      const demoDrawer = document.getElementById("demoDrawer");
      if (demoDrawer) {
        demoDrawer.style.display = "none";
        document.body.style.overflow = "";
      }

      // 3. Find Hubilo/MUI close button and trigger it
      const closeBtn = findModalCloseButton();
      if (closeBtn && closeBtn.id !== "demoCloseBtn") {
        const actualBtn = closeBtn.closest("button") || closeBtn;
        const reactKey = Object.keys(actualBtn).find((k) => k.startsWith("__reactProps"));
        if (reactKey && actualBtn[reactKey]?.onClick) {
          try {
            actualBtn[reactKey].onClick({ preventDefault: () => { }, stopPropagation: () => { } });
          } catch (_) { }
        }
        actualBtn.click();
      }

      // 4. Dispatch native Escape key (standard MUI modal closer)
      ["keydown", "keyup"].forEach((type) => {
        const escEvent = new KeyboardEvent(type, {
          key: "Escape",
          code: "Escape",
          keyCode: 27,
          which: 27,
          bubbles: true,
          cancelable: true,
        });
        document.dispatchEvent(escEvent);
        window.dispatchEvent(escEvent);
      });
    } finally {
      setTimeout(() => {
        isDismissingModal = false;
      }, 50);
    }

    return true;
  }

  /**
   * 8. EXHIBITOR DRAWER ENHANCEMENT: PROPERTY PROGRAM BADGE & ALIGNMENT
   * Re-aligns visual hierarchy (Banner -> Logo -> Title & Location -> Socials -> Programs -> About),
   * formats programs into a modern Bento card, prevents text truncation, and binds backdrop dismissal.
   */
  function enhanceExhibitorDrawer() {

    // Direct click-outside dismiss listener on all backdrops & modal containers
    document.querySelectorAll(".MuiBackdrop-root, .MuiDrawer-root, .MuiModal-root, #demoDrawer").forEach((container) => {
      if (!container.dataset.inspiraBackdropBound) {
        container.dataset.inspiraBackdropBound = "true";
        container.style.cursor = "pointer";
        container.style.pointerEvents = "auto";
        container.addEventListener("click", function (e) {
          if (!e.target.closest(".MuiDrawer-paper, [class*='modalContentStyle'], .MuiModal-root .MuiBox-root[tabindex='-1'], .MuiModal-root:not(.MuiDrawer-root) > div:not(.MuiBackdrop-root)")) {
            e.preventDefault();
            e.stopPropagation();
            dismissModalPopup();
          }
        });
      }
    });

    const drawerPaper = document.querySelector(
      ".MuiDrawer-root .MuiDrawer-paper, .MuiDrawer-paper"
    );
    if (!drawerPaper || drawerPaper.offsetHeight === 0) {
      const cached = document.querySelectorAll("[data-inspira-exhibitor-enhanced]");
      cached.forEach((el) => el.removeAttribute("data-inspira-exhibitor-enhanced"));
      document.querySelectorAll(".card-selected").forEach((c) => c.classList.remove("card-selected"));
      return;
    }

    // Hubilo's close button natively dispatches React modal dismissal; no custom listener needed

    // Ensure vertical scrolling and custom colored scrollbar
    drawerPaper.style.setProperty("overflow-y", "auto", "important");
    drawerPaper.style.setProperty("overflow-x", "hidden", "important");
    drawerPaper.style.setProperty("-webkit-overflow-scrolling", "touch", "important");
    drawerPaper.style.setProperty("overscroll-behavior-y", "contain", "important");
    drawerPaper.style.setProperty("scrollbar-width", "thin", "important");
    drawerPaper.style.setProperty("scrollbar-color", "#DA5A97 rgba(109, 74, 194, 0.08)", "important");

    // Force 100% width on all inner wrappers to eliminate Hubilo's hardcoded 46rem empty space
    const innerWrappers = drawerPaper.querySelectorAll(
      ":scope > div, :scope > .MuiBox-root, [class*='styleExhibitorSidebarImage'], div[style*='46rem']"
    );
    innerWrappers.forEach((el) => {
      const container = el.classList?.contains("styleExhibitorSidebarImage") ? el.parentElement : el;
      if (container) {
        container.style.setProperty("width", "100%", "important");
        container.style.setProperty("max-width", "100%", "important");
        container.style.setProperty("box-sizing", "border-box", "important");
        container.style.setProperty("height", "auto", "important");
        container.style.setProperty("min-height", "0px", "important");
        container.style.setProperty("max-height", "none", "important");
        container.style.setProperty("overflow", "visible", "important");
      }
    });

    // Check if Hubilo is still loading skeleton data over network
    if (drawerPaper.querySelector(".MuiSkeleton-root")) {
      return;
    }

    const title = drawerPaper.querySelector("h3, [class*='styleExhibitorNameSidebar']");
    if (title && title.children.length === 0) {
      const parts = title.textContent.split(" " + BULLET + " ");
      if (parts.length > 1) title.textContent = parts[0].trim();
    }
    const titleText = title ? title.textContent.trim() : "";
    if (drawerPaper.dataset.inspiraEnhancedTitle === titleText && drawerPaper.querySelector(".inspira-filter-tabs-wrapper")) {
      return;
    }

    const chips = drawerPaper.querySelectorAll(".MuiChip-root");
    if (!chips.length) return;

    drawerPaper.dataset.inspiraEnhancedTitle = titleText;
    drawerPaper.dataset.inspiraExhibitorEnhanced = "true";

    const chipsContainer = chips[0].parentElement;
    if (!chipsContainer) return;

    chipsContainer.classList.add("inspira-programs-container");

    // 8. ENHANCE ACADEMIC PROGRAMS & MAJORS (STYLE 2: FILTER TABS STANDARD)
    const rawChips = Array.from(chipsContainer.querySelectorAll(".MuiChip-root"));
    if (!rawChips.length) return;

    // Helper: Categorize raw academic majors into standard department tabs
    function categorizeProgram(rawText) {
      const lower = (rawText || "").toLowerCase();
      if (/engineer|computer|tech|software|cyber|data|robotics|ai|mechanic|civil|electric|chemical|industrial|it\b/.test(lower)) {
        return { cat: "eng", label: "Engineering and Tech", shortLabel: "Engineering" };
      }
      if (/business|admin|management|finance|account|market|entrepreneur|economics|mba|commerce|hospitality|leadership/.test(lower)) {
        return { cat: "biz", label: "Business and Leadership", shortLabel: "Business" };
      }
      if (/science|biology|biomed|health|nursing|medicine|pharma|physics|chemistry|psychology|environment/.test(lower)) {
        return { cat: "sci", label: "Sciences and Health", shortLabel: "Sciences" };
      }
      return { cat: "hum", label: "Humanities and Arts", shortLabel: "Humanities" };
    }

    // Helper: Format raw shouting ALL-CAPS strings into clean Title Case
    function formatProgramTitle(rawText) {
      let raw = (rawText || "").replace(/_/g, " ").trim();
      const engMatch = raw.match(/^engineering:\s*(.*)/i);
      if (engMatch) {
        const spec = engMatch[1].trim();
        return spec.toLowerCase().replace(/(?:^|\s|\/|-|\()\S/g, (char) => char.toUpperCase()) + " Engineering";
      }
      let name = raw.replace(/^(?:department of|school of|major in):\s*/i, "");
      if (/computer science.*information tech/i.test(name)) return "Computer Science and IT";
      if (/business admin.*intl business/i.test(name)) return "Business Administration and International Business";
      return name.toLowerCase().replace(/(?:^|\s|\/|-|\()\S/g, (char) => char.toUpperCase());
    }

    // Extract and structure program list
    const programs = [];
    rawChips.forEach((chip) => {
      const label = chip.querySelector(".MuiChip-label") || chip;
      const raw = label.textContent.trim();
      if (!raw) return;
      const cleanName = formatProgramTitle(raw);
      const catInfo = categorizeProgram(raw);
      programs.push({
        raw,
        cleanName,
        cat: catInfo.cat,
        catLabel: catInfo.label,
        catShort: catInfo.shortLabel
      });
      // Hide raw MUI chips safely without removing from React's DOM tree
      chip.style.setProperty("display", "none", "important");
    });

    if (!programs.length) return;

    // Remove any previously injected filter tabs wrapper
    const oldWrapper = chipsContainer.querySelector(".inspira-filter-tabs-wrapper");
    if (oldWrapper) oldWrapper.remove();
    const oldHeader = chipsContainer.querySelector(".inspira-programs-header-badge");
    if (oldHeader) oldHeader.remove();

    const tabsWrapper = document.createElement("div");
    tabsWrapper.className = "inspira-filter-tabs-wrapper";

    // Determine unique departments present
    const categoryCounts = {};
    programs.forEach((p) => {
      categoryCounts[p.cat] = (categoryCounts[p.cat] || 0) + 1;
    });

    // Clean vector library icons (Phosphor / Lucide UI style, crisp SVGs without system emojis)
    const SVG_ICONS = {
      filterPill: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; margin-right:4px;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
      all: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; margin-right:3px;"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      eng: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; margin-right:3px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      biz: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; margin-right:3px;"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
      sci: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; margin-right:3px;"><path d="M10 2v7.31L4.2 20.4A2 2 0 0 0 5.86 23h12.28a2 2 0 0 0 1.66-2.6L14 9.31V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/></svg>`,
      hum: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; margin-right:3px;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      other: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; margin-right:3px;"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      chevronDown: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:0px; margin-left:3px;"><polyline points="6 9 12 15 18 9"/></svg>`,
      chevronUp: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:0px; margin-left:3px;"><polyline points="18 15 12 9 6 15"/></svg>`
    };

    const catConfig = {
      eng: { label: "Engineering", icon: SVG_ICONS.eng },
      biz: { label: "Business", icon: SVG_ICONS.biz },
      sci: { label: "Sciences", icon: SVG_ICONS.sci },
      hum: { label: "Humanities", icon: SVG_ICONS.hum }
    };

    // Build chips HTML (collapse items beyond index 5 if > 6 items)
    const hasMore = programs.length > 6;
    let chipsHtml = "";
    programs.forEach((p, idx) => {
      const isCollapsed = hasMore && idx >= 6;
      chipsHtml += `<span class="tab-chip ${isCollapsed ? "tab-chip-collapsed" : ""}" data-cat="${p.cat}" title="${escapeHTML(p.raw)}">${escapeHTML(p.cleanName)}</span>`;
    });

    if (hasMore) {
      const moreCount = programs.length - 6;
      chipsHtml += `
        <button type="button" class="tab-more-btn" id="modalDrawerMoreBtn">
          <span>Show ${moreCount} more</span> ${SVG_ICONS.chevronDown}
        </button>
      `;
    }

    tabsWrapper.innerHTML = `
      <div class="c2-filter-header-bar">
        <span class="c2-filter-title">
          ${SVG_ICONS.filterPill} POPULAR ACADEMIC PROGRAMS AND MAJORS
        </span>
        <span class="c2-filter-count">
          ${programs.length} ${programs.length === 1 ? "major" : "majors"}
        </span>
      </div>
      <div class="tab-chips-container" style="justify-content: flex-start; gap: 6px; display: flex; flex-wrap: wrap;">
        ${chipsHtml}
      </div>
    `;

    chipsContainer.appendChild(tabsWrapper);

    // Interactive expander listener
    const programChips = tabsWrapper.querySelectorAll(".tab-chip");
    const moreBtn = tabsWrapper.querySelector(".tab-more-btn");
    let isExpanded = false;

    if (moreBtn) {
      moreBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        isExpanded = !isExpanded;
        if (isExpanded) {
          programChips.forEach((c) => c.classList.remove("tab-chip-collapsed"));
          this.innerHTML = `<span>Show Less</span> ${SVG_ICONS.chevronUp}`;
        } else {
          programChips.forEach((c, idx) => {
            if (idx >= 6) c.classList.add("tab-chip-collapsed");
          });
          const moreCount = programs.length - 6;
          this.innerHTML = `<span>Show ${moreCount} more</span> ${SVG_ICONS.chevronDown}`;
        }
      });
    }
  }

  /**
   * 9. BACKDROP / CLICK-OUTSIDE DISMISSAL & ESCAPE KEY
   * Closes the modal popup when the user clicks anywhere outside the popup card
   * or presses the Escape key.
   */
  function initBackdropDismissal() {
    if (window._inspiraBackdropDismissalActive) return;
    window._inspiraBackdropDismissalActive = true;


    function handleOutsideInteraction(e) {
      if (!isLandingPage()) return;
      // Find open modal card on screen
      const papers = document.querySelectorAll(
        ".MuiDrawer-paper, .MuiDialog-paper, [class*='modalContentStyle'], #demoDrawer .MuiPaper-root, .MuiModal-root:not(.MuiDrawer-root) > div:not(.MuiBackdrop-root), .MuiModal-root .MuiBox-root[tabindex='-1']"
      );
      // On phones and tablets two popups can be open at once (the ticket sheet and the form on
      // top of it). A click inside ANY open popup is inside; only a click outside all of them
      // closes. (Checking only the first popup found treated every click in the form as
      // "outside", which blocked dropdowns, radio buttons and checkboxes.)
      const openPapers = Array.from(papers).filter((p) => {
        const container = p.closest(".MuiDrawer-root, .MuiModal-root, #demoDrawer");
        if (container && window.getComputedStyle(container).display === "none") return false;
        const rect = p.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && window.getComputedStyle(p).display !== "none";
      });
      if (!openPapers.length) return;
      if (!(e.target instanceof Element) || !e.target.isConnected) return;
      if (openPapers.some((p) => p.contains(e.target))) return;

      // Don't dismiss if clicked inside popovers, menus, select dropdowns
      if (e.target.closest(".MuiMenu-root, .MuiPopover-root, .MuiAutocomplete-popper, .MuiTooltip-popper, .flatpickr-calendar, .cookieBlock, [class*='cookieBlock']")) {
        return;
      }

      // User clicked outside the modal card (on backdrop, dimmed area, background cards, screen edges)
      e.stopPropagation();
      dismissModalPopup();
    }

    // Register with capture: true on window so outside click cannot be swallowed
    window.addEventListener("click", handleOutsideInteraction, true);

    // Explicit delegated listener for standalone MuiModal / Add To Calendar close button & backdrop
    document.addEventListener("click", function (e) {
      if (!isLandingPage()) return;
      const calModal = document.querySelector(".MuiModal-root:not(.MuiDrawer-root)");
      if (!calModal) return;

      const target = e.target;
      const closeBtn = target.closest("button");
      if (closeBtn && calModal.contains(closeBtn)) {
        const isClose = closeBtn.classList.contains("mui-1e6be0u") ||
          closeBtn.closest(".mui-f0uyk5") ||
          closeBtn.querySelector("path[d*='205.66'], svg[data-testid='CloseIcon']") ||
          target.closest("path[d*='205.66'], svg[data-testid='CloseIcon']");

        if (isClose) {
          e.preventDefault();
          e.stopImmediatePropagation();

          const reactKey = Object.keys(closeBtn).find((k) => k.startsWith("__reactProps"));
          if (reactKey && closeBtn[reactKey]?.onClick) {
            try { closeBtn[reactKey].onClick(e); } catch (_) { }
          }

          dismissModalPopup();
          return;
        }
      }

      // Check if click was on modal backdrop
      const backdrop = calModal.querySelector(".MuiBackdrop-root");
      if (backdrop && (target === backdrop || backdrop.contains(target))) {
        e.preventDefault();
        e.stopImmediatePropagation();
        dismissModalPopup();
      }
    }, true);

    // On window (capture) so it runs before the form's own Escape handling
    window.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" && e.key !== "Esc") return;
      if (!isLandingPage()) return;
      // Ignore the synthetic Escape that dismissModalPopup() dispatches itself
      if (!e.isTrusted || isDismissingModal) return;
      // An open dropdown, menu or date picker closes first
      if (visibleMatch(".MuiPopover-root, .MuiMenu-root, .MuiAutocomplete-popper, .flatpickr-calendar.open, [role='listbox']")) return;
      // The registration form uses its own dropdowns (a ".popup" box with a list). They close
      // when the user clicks elsewhere in the form, so Escape does the same instead of closing the form.
      const openList = Array.prototype.find.call(document.querySelectorAll(".popup .MuiList-root"), (el) => el.getClientRects().length > 0);
      if (openList) {
        const host = openList.closest(".singleViewWidgetDetails, .modalContent, .MuiDrawer-paper, .MuiDialog-paper") || document.body;
        const heading = host.querySelector("h1, h2, h3, h4, h5, h6") || host;
        ["pointerdown", "mousedown", "pointerup", "mouseup", "click"].forEach((type) => {
          heading.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window }));
        });
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (!getActiveModalPopup()) return;
      dismissModalPopup();
    }, true);
  }

  /**
   * HELPER: Basic HTML sanitizer for safe text insertion
   */
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    }[tag] || tag));
  }

  /**
   * 10. EVENT PASS (ticket panel, #refFormPanel)
   * Shows the platform's registration panel as an event pass: photo header, real event date
   * and time, the ticket name and "available till" text read from the platform, and buttons
   * that click the platform's own Register Now and Add To Calendar buttons.
   */
  function readNativeTicket(panel) {
    const leaves = Array.from(panel.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, div"))
      .filter((n) => n.children.length === 0 && !n.closest(".inspira-ticket-v2-container"))
      .map((n) => n.textContent.replace(/\s+/g, " ").trim())
      .filter(Boolean);
    const until = leaves.find((t) => /^available till/i.test(t)) || "";
    const index = leaves.findIndex((t) => /^available till/i.test(t));
    let name = index > 0 ? leaves[index - 1] : "";
    if (/register now|add to calendar|event starts in/i.test(name) || name.length > 60) name = "";
    return {
      name: name,
      until: until ? until.replace(/^available till/i, "Registration open until") : ""
    };
  }

  function ticketSubtitle(count) {
    return count
      ? `Meet admissions teams from ${count} universities, live and online.`
      : "Meet university admissions teams, live and online.";
  }

  function enhanceEventTicketPanel() {
    const panel = document.querySelector(SELECTORS.registerPanel);
    if (!panel) return;

    panel.classList.add("inspira-ticket-shell");

    const count = getUniversityCount();
    const when = eventDateParts();
    const native = readNativeTicket(panel);
    const heroSub = count ? `${when.date}${SEP}${count} universities` : when.date;

    // Already built: only refresh values that can change
    const existingTicket = panel.querySelector(".inspira-ticket-v2-container");
    if (existingTicket) {
      setHTML(existingTicket.querySelector(".inspira-ticket-hero-subtitle"), heroSub);
      setText(existingTicket.querySelector(".inspira-ticket-main-subtitle"), ticketSubtitle(count));
      if (native.name) setText(existingTicket.querySelector("[data-ticket-name]"), native.name);
      if (native.until) setText(existingTicket.querySelector(".inspira-ticket-note"), native.until);
      return;
    }

    // Direct child container inside #refFormPanel
    const innerBox = panel.querySelector(":scope > .MuiBox-root") || panel.firstElementChild || panel;
    if (!innerBox) return;

    // Clean any prior partial ticket fragments if any
    panel.querySelectorAll(".inspira-ticket-hero-card, .inspira-ticket-perforation, .inspira-ticket-details-block, .inspira-ticket-barcode-card, .inspira-ticket-v2-container")
      .forEach((el) => el.remove());

    const ticketContainer = document.createElement("div");
    ticketContainer.className = "inspira-ticket-v2-container";
    ticketContainer.innerHTML = `
      <div class="inspira-ticket-hero-card">
        <div class="inspira-ticket-hero-media">
          <img src="${EVENT.passImage}" alt="" class="inspira-ticket-hero-img" />
          <div class="inspira-ticket-hero-scrim"></div>
          <div class="inspira-ticket-hero-overlay-text">
            <span class="inspira-ticket-hero-kicker">Student pass</span>
            <h3 class="inspira-ticket-hero-title">${escapeHTML(EVENT.name)}</h3>
            <p class="inspira-ticket-hero-subtitle">${heroSub}</p>
          </div>
        </div>
      </div>

      <div class="inspira-ticket-perforation inspira-ticket-perforation-top">
        <span class="inspira-notch inspira-notch-left"></span>
        <div class="inspira-dashed-line"></div>
        <span class="inspira-notch inspira-notch-right"></span>
      </div>

      <div class="inspira-ticket-details-block">
        <div class="inspira-ticket-meta-header">
          <span class="inspira-ticket-category-pill">Online event</span>
        </div>

        <h2 class="inspira-ticket-main-title">Register for the fair</h2>
        <p class="inspira-ticket-main-subtitle">${ticketSubtitle(count)}</p>

        <div class="inspira-ticket-hairline"></div>

        <div class="inspira-ticket-grid">
          <div class="inspira-ticket-col">
            <span class="inspira-ticket-label">Date</span>
            <span class="inspira-ticket-val">${when.date}</span>
          </div>
          <div class="inspira-ticket-col">
            <span class="inspira-ticket-label">Time</span>
            <span class="inspira-ticket-val">${when.time}</span>
          </div>
          <div class="inspira-ticket-col">
            <span class="inspira-ticket-label">Location</span>
            <span class="inspira-ticket-val">Online</span>
          </div>
          <div class="inspira-ticket-col">
            <span class="inspira-ticket-label">Ticket</span>
            <span class="inspira-ticket-val" data-ticket-name>${escapeHTML(native.name || "Student pass")}</span>
          </div>
        </div>

        <div class="inspira-ticket-actions">
          <button type="button" class="inspira-ticket-btn-primary" id="inspiraTicketRegisterBtn">
            <span>Register Now</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button type="button" class="inspira-ticket-btn-secondary" id="inspiraTicketCalendarBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Add To Calendar</span>
          </button>
        </div>
        <p class="inspira-ticket-note">${escapeHTML(native.until)}</p>
      </div>
    `;

    innerBox.insertBefore(ticketContainer, innerBox.firstChild);

    // Our buttons click the platform's own buttons, so registration keeps working exactly as before
    function clickNative(e, label, ownId) {
      e.preventDefault();
      e.stopPropagation();
      const orig = Array.from(panel.querySelectorAll("button")).find(
        (b) => b.id !== ownId && !b.closest(".inspira-ticket-v2-container") && b.textContent.toLowerCase().includes(label)
      );
      if (orig) orig.click();
    }
    // Phones: the platform first opens a sheet that lists the tickets. When there is only one,
    // continue straight to the form (with several tickets the sheet stays so the student can choose).
    function continueSingleTicket(tries) {
      if (document.querySelector(".singleViewWidgetDetails")) return;
      const buttons = Array.from(document.querySelectorAll(".MuiDrawer-paper .ticketListActionWrapper button"))
        .filter((b) => b.getClientRects().length > 0 && /register now/i.test(b.textContent));
      if (buttons.length === 1) {
        buttons[0].click();
      } else if (buttons.length === 0 && tries > 0) {
        setTimeout(() => continueSingleTicket(tries - 1), 100);
      }
    }
    const regBtn = ticketContainer.querySelector("#inspiraTicketRegisterBtn");
    if (regBtn) regBtn.addEventListener("click", (e) => {
      clickNative(e, "register now", "inspiraTicketRegisterBtn");
      setTimeout(() => continueSingleTicket(20), 100);
    });
    const calBtn = ticketContainer.querySelector("#inspiraTicketCalendarBtn");
    if (calBtn) calBtn.addEventListener("click", (e) => clickNative(e, "add to calendar", "inspiraTicketCalendarBtn"));
  }

  /**
   * TICKET SHEET (phones and tablets)
   * The platform opens a sheet listing the tickets; its Register Now opens the form as a second
   * popup on top. The sheet is hidden while the form is open (css) and closed together with the
   * form, so closing the form never reveals a second popup. Works for every Register button.
   */
  function closeSheetAfterForm(sheet) {
    if (!sheet || sheet.__inspiraWatched) return;
    sheet.__inspiraWatched = true;
    const started = Date.now();
    let formSeen = false;
    const watcher = new MutationObserver(() => {
      if (document.querySelector(".singleViewWidgetDetails")) { formSeen = true; return; }
      if (!sheet.isConnected) { watcher.disconnect(); return; }
      if (!formSeen) {
        if (Date.now() - started > 15000) { watcher.disconnect(); sheet.__inspiraWatched = false; }
        return;
      }
      watcher.disconnect();
      const close = sheet.querySelector(":scope > .MuiIconButton-root");
      if (close) close.click();
    });
    watcher.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener("click", function (e) {
    if (!isLandingPage()) return;
    const btn = e.target instanceof Element && e.target.closest(".MuiDrawer-paper .ticketListActionWrapper button");
    if (btn) closeSheetAfterForm(btn.closest(".MuiDrawer-paper"));
  }, true);

  /**
   * Continuous drawer polling helper to immediately enhance drawer once chips appear
   */
  let drawerPollTimer = null;
  function triggerDrawerEnhancement() {
    if (drawerPollTimer) clearInterval(drawerPollTimer);
    let attempts = 0;
    drawerPollTimer = setInterval(() => {
      attempts++;
      const paper = document.querySelector(".MuiDrawer-paper, .MuiDialog-paper, [class*='modalContentStyle']");
      if (!paper || attempts > 60) {
        clearInterval(drawerPollTimer);
        drawerPollTimer = null;
        return;
      }
      const chips = paper.querySelectorAll(".MuiChip-root");
      const hasTabs = !!paper.querySelector(".inspira-filter-tabs-wrapper");
      if (chips.length > 0 && !hasTabs) {
        enhanceExhibitorDrawer();
        clearInterval(drawerPollTimer);
        drawerPollTimer = null;
      }
    }, 50);
  }

  // Fast trigger on card clicks
  document.addEventListener("click", function (e) {
    if (!isLandingPage() || !(e.target instanceof Element)) return;
    if (e.target.closest(SELECTORS.cards) || e.target.closest(".MuiCard-root, [class*='Card-root']")) {
      setTimeout(triggerDrawerEnhancement, 100);
    }
  }, true);

  /**
   * 11. INITIALIZATION
   * Runs once on load and again when the platform changes the page. Changes made by this
   * script itself are ignored, so the observer cannot keep re-triggering itself.
   */
  // The register (landing) page only. The event pages inside the fair use other layouts, so
  // nothing here runs there even if this file is loaded on every page.
  function isLandingPage() {
    return /^\/(register\/?)?$/.test(location.pathname) || !!document.getElementById("headerTop");
  }

  function initializeAll() {
    if (!isLandingPage()) return;
    [
      removeStickyTabBar,
      enhanceHeaderBrand,
      initHeaderScrollListener,
      enhanceCountdownTimer,
      enhanceUniversityCards,
      initDirectorySearchAndFilter,
      initCardInteractionTracking,
      enhanceExhibitorDrawer,
      enhanceEventTicketPanel,
      initBackdropDismissal,
      fixParticipatingCount
    ].forEach(function (fn) {
      try { fn(); } catch (err) { if (window.console) console.warn("[inspira-register]", fn.name, err); }
    });
  }

  const OWN_NODES = ".inspira-enhanced-countdown, .inspira-ticket-v2-container, .inspira-nav-brand, " +
    ".univ-filter-container, .univ-empty-state, .inspira-filter-tabs-wrapper, .inspira-card-view";

  function isOwnMutation(m) {
    const t = m.target && (m.target.nodeType === 1 ? m.target : m.target.parentElement);
    return !!(t && t.closest && t.closest(OWN_NODES));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAll);
  } else {
    initializeAll();
  }

  let debounceTimeout;
  const bodyObserver = new MutationObserver(function (mutations) {
    if (mutations.every(isOwnMutation)) return;
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(initializeAll, 120);

    const paper = isLandingPage() && document.querySelector(".MuiDrawer-paper");
    if (paper && !paper.querySelector(".inspira-filter-tabs-wrapper")) {
      enhanceExhibitorDrawer();
    }
  });

  bodyObserver.observe(document.body, { childList: true, subtree: true });
})();
;

(function () {
  'use strict';

  if (window.__BT_ROOMS__) return;
  window.__BT_ROOMS__ = true;

  var CFG = Object.assign({
    closeDrawerOnOutside: true,
    searchShortcut: true,
    staggerCards: true,
    spotlight: true
  }, window.BT_ROOMS_CONFIG || {});

  var doc = document;
  var root = doc.documentElement;
  var mql = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduceMotion = mql('(prefers-reduced-motion: reduce)');

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function setClass(el, cls, on) {
    if (el && el.classList.contains(cls) !== !!on) el.classList.toggle(cls, !!on);
  }
  function visible(el) { return !!(el && el.getClientRects().length); }
  function isEditable(el) {
    return !!(el && el.closest && el.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]'));
  }
  function anyModalOpen() {
    return !!$('.ReactModal__Overlay, .MuiModal-root:not(.MuiModal-hidden), .MuiPopover-root');
  }
  function focusLater(el) {
    if (!el) return;
    setTimeout(function () {
      if (el.isConnected) { try { el.focus({ preventScroll: true }); } catch (e) { } }
    }, 30);
  }
  function onRoomsPage() { return root.classList.contains('bt-rooms'); }

  function openDrawer() { return $('.sidedrawerWrapper.open:not(.profile)'); }

  function pageFlags() {
    var page = $('.roomPageWrapper, .roomsCardsList, .roomListWrapper') || (window.location && window.location.pathname && window.location.pathname.indexOf('/rooms') !== -1);
    setClass(root, 'bt-rooms', !!page);
    setClass(root, 'bt-mobile', !!$('.isMobileContainer, .mainContainerMob'));
    setClass(root, 'bt-drawer-open', !!openDrawer());
    return page;
  }

  var scrolled = null;
  function onScroll() {
    var s = (window.pageYOffset || root.scrollTop || 0) > 8;
    if (s !== scrolled) { scrolled = s; setClass(root, 'bt-scrolled', s); }
  }

  function showcase() {
    $$('.roomsCardsList .roomCardMedia').forEach(function (media) {
      var img = $('img', media);
      var src = img && (img.currentSrc || img.getAttribute('src'));
      var value = src ? 'url(' + JSON.stringify(src) + ')' : '';
      if (media.style.getPropertyValue('--bt-media') !== value) {
        if (value) media.style.setProperty('--bt-media', value);
        else media.style.removeProperty('--bt-media');
      }
    });
  }

  var firstRun = true;
  function stagger() {
    if (!CFG.staggerCards || reduceMotion) return;
    var i = 0;
    $$('.roomsCardsList .roomAnimate').forEach(function (card) {
      if (card.__btI !== undefined) return;
      if (firstRun) { card.__btI = -1; return; }
      card.__btI = Math.min(i++, 11);
      card.style.setProperty('--bt-i', String(card.__btI));
    });
    firstRun = false;
  }

  var spotCard = null, spotX = 0, spotY = 0, spotQueued = false;
  function paintSpot() {
    spotQueued = false;
    if (!spotCard) return;
    var r = spotCard.getBoundingClientRect();
    spotCard.style.setProperty('--bt-mx', Math.round(spotX - r.left) + 'px');
    spotCard.style.setProperty('--bt-my', Math.round(spotY - r.top) + 'px');
  }
  doc.addEventListener('pointermove', function (e) {
    if (!CFG.spotlight || reduceMotion || e.pointerType !== 'mouse') return;
    var card = e.target.closest && e.target.closest('.roomsCardsList .roomCard');
    spotCard = card || null;
    if (!card) return;
    spotX = e.clientX;
    spotY = e.clientY;
    if (!spotQueued) { spotQueued = true; requestAnimationFrame(paintSpot); }
  }, { passive: true });

  function nameTips() {
    $$('.roomsCardsList .orgName h6').forEach(function (h) {
      var full = (h.textContent || '').trim();
      var cut = h.scrollHeight > h.clientHeight + 1;
      if (cut && h.getAttribute('title') !== full) h.setAttribute('title', full);
      if (!cut && h.hasAttribute('title') && h.__btTitled) h.removeAttribute('title');
      h.__btTitled = cut;
    });
  }

  /* ---------- 5b. link Enter buttons to open card popup ---------- */
  function findIconTarget(card) {
    if (!card) return null;

    var profileTarget = card.querySelector('.orgProfile img, .orgProfile, .orgProfile a, a.orgProfile');
    var orgNameTarget = card.querySelector('.orgName h6, .orgName a, .orgName');

    var candidates = [
      card.querySelector('.orgProfile img'),
      card.querySelector('.orgProfile'),
      card.querySelector('.orgProfile a, a.orgProfile'),
      orgNameTarget,
      card.querySelector('.roomCardMedia img'),
      card.querySelector('.roomCardMedia')
    ];

    // Priority 1: Check if any candidate has a direct React onClick prop or fiber prop
    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      if (!el) continue;
      for (var k in el) {
        if (k.indexOf('__reactProps') === 0 || k.indexOf('__reactEventHandlers') === 0) {
          var p = el[k];
          if (p && typeof p.onClick === 'function') {
            return el;
          }
        }
        if (k.indexOf('__reactFiber') === 0 || k.indexOf('__reactInternalInstance') === 0) {
          var f = el[k];
          if (f && f.memoizedProps && typeof f.memoizedProps.onClick === 'function') {
            return el;
          }
        }
      }
    }

    // Priority 2: Return profile icon target if present (main element opening the popup)
    if (profileTarget) return profileTarget;

    // Priority 3: Return first existing candidate (profile icon -> media -> heading)
    for (var j = 0; j < candidates.length; j++) {
      if (candidates[j]) return candidates[j];
    }

    return card;
  }

  function triggerIconClick(target) {
    if (!target) return;
    try {
      var opts = { bubbles: true, cancelable: true, view: window, detail: 1 };
      if (typeof PointerEvent !== 'undefined') {
        try { target.dispatchEvent(new PointerEvent('pointerdown', opts)); } catch (p1) {}
        try { target.dispatchEvent(new PointerEvent('pointerup', opts)); } catch (p2) {}
      }
      try { target.dispatchEvent(new MouseEvent('mousedown', opts)); } catch (m1) {}
      try { target.dispatchEvent(new MouseEvent('mouseup', opts)); } catch (m2) {}
      target.dispatchEvent(new MouseEvent('click', opts));
    } catch (err) {
      if (window.console) console.warn('[linkEnterButtons] dispatchEvent failed', err);
    }

    try {
      if (typeof target.click === 'function') {
        target.click();
      }
    } catch (cErr) {}
  }

  function linkEnterButtons() {
    $$('.roomsCardsList .roomCard, .roomCard').forEach(function (card) {
      // 1. Remove obsolete overlay from previous code
      var oldOverlay = card.querySelector('a.bt-enter-overlay');
      if (oldOverlay) oldOverlay.remove();

      // The platform's roomStartAt line stays in place (hidden by master.css); its time is shown as .bt-room-time.

      // 2. Ensure cardBottom and cardActions container exist
      var cardBottom = card.querySelector('.cardBottom');
      if (!cardBottom) {
        cardBottom = doc.createElement('div');
        cardBottom.className = 'cardBottom';
        card.appendChild(cardBottom);
      }

      var cardActions = cardBottom.querySelector('.cardActions');
      if (!cardActions) {
        cardActions = doc.createElement('div');
        cardActions.className = 'cardActions';
        cardBottom.appendChild(cardActions);
      }

      // 3. Keep Start vs Enter constant:
      // For admin/host, Hubilo shows "Start". For attendee, it shows "Enter".
      var btn = cardActions.querySelector('.MuiButton-root, button, a');
      var btnText = btn ? (btn.textContent || '').trim() : '';
      var isStart = /start/i.test(btnText) || /iniciar/i.test(btnText);

      if (!btn) {
        btn = doc.createElement('button');
        btn.className = 'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary';
        btn.setAttribute('type', 'button');
        btn.innerHTML = '<span class="MuiButton-label">Enter</span>';
        cardActions.appendChild(btn);
        btnText = 'Enter';
        isStart = false;
        btn.__btFallback = true;
      }

      // Rooms stay closed until the room owner presses Start; until then the platform keeps everyone else's
      // "Enter" disabled. Keep that state and show it: a button forced on would look clickable and do nothing.
      var reactKey = Object.keys(btn).filter(function (k) { return k.indexOf('__reactProps') === 0; })[0];
      var locked = !btn.__btFallback && (btn.disabled || btn.classList.contains('Mui-disabled') ||
        !!(reactKey && btn[reactKey] && btn[reactKey].disabled));
      var lockedTip = 'Opens when the university starts its room';
      card.classList.toggle('bt-room-locked', locked);
      if (locked) btn.setAttribute('title', lockedTip);
      else if (btn.getAttribute('title') === lockedTip) btn.removeAttribute('title');
      btn.style.pointerEvents = 'auto'; // a disabled button still ignores clicks; this lets the tooltip show
      btn.style.cursor = locked ? 'not-allowed' : 'pointer';
      btn.setAttribute('data-bt-label', isStart ? 'Start' : 'Enter');

      // 4. Button behavior:
      // Native Hubilo buttons ("Start" and "Enter", both labelled "Start" via CSS) keep their
      // native React handler, so every card button starts/joins the room the same way.
      // Only the fallback button we injected (no native handler) opens the room/exhibitor popup.
      if (btn.__btFallback && !isStart) {
        if (!btn.__btBound) {
          btn.__btBound = true;
          btn.addEventListener('click', function (e) {
            var curText = (btn.textContent || '').trim();
            if (/start/i.test(curText) || /iniciar/i.test(curText)) {
              return; // Start button: let native Hubilo React click handler start the room
            }
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }
            var target = findIconTarget(card);
            triggerIconClick(target);
            setTimeout(fixCardModalScroll, 50);
            setTimeout(fixCardModalScroll, 200);
            setTimeout(fixCardModalScroll, 500);
            setTimeout(enhancePopupMajors, 80);
            setTimeout(enhancePopupMajors, 250);
            setTimeout(enhancePopupMajors, 600);
          });
        }
      }

      // 5. Card image + logo open the university popup; only the Start button joins the room.
      // The logo (.orgProfile) opens the popup natively, so it is left alone; the banner image has no
      // native handler, so a click on it is passed to the logo.
      var orgLogo = card.querySelector('.orgProfile');
      if (orgLogo) orgLogo.style.cursor = 'pointer';
      var media = card.querySelector('.roomCardMedia');
      if (media) {
        media.style.cursor = 'pointer';
        if (!media.__btPopupBound) {
          media.__btPopupBound = true;
          media.addEventListener('click', function (e) {
            if (e.target && e.target.closest && e.target.closest('button, a')) return;
            e.preventDefault();
            e.stopPropagation();
            triggerIconClick(findIconTarget(card));
            setTimeout(fixCardModalScroll, 50);
            setTimeout(fixCardModalScroll, 200);
            setTimeout(fixCardModalScroll, 500);
            setTimeout(enhancePopupMajors, 80);
            setTimeout(enhancePopupMajors, 250);
            setTimeout(enhancePopupMajors, 600);
          });
        }
      }

      // 6. Virtual Lobby cards only: name + location line, an "Info" button next to Start,
      // and a "View university info" hint on the banner.
      if (card.closest('.roomsCardsList') && !card.closest('.sidedrawerWrapper, .ReactModalPortal, .sponsorsProfileWrapper')) {
        enhanceRoomCard(card);
      }
    });
  }

  var ROOM_ICONS = {
    info: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    eye: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };

  function openRoomCardInfo(card) {
    triggerIconClick(findIconTarget(card));
    setTimeout(fixCardModalScroll, 50);
    setTimeout(fixCardModalScroll, 200);
    setTimeout(fixCardModalScroll, 500);
    setTimeout(enhancePopupMajors, 80);
    setTimeout(enhancePopupMajors, 250);
    setTimeout(enhancePopupMajors, 600);
  }

  // Some rooms were saved without the " • Country" part ("University of York",
  // "... Social Sciences China Hong Kong (SAR China)"), so the country comes from the university list.
  function splitRoomName(full) {
    var parts = full.split(/\s+•\s+/);
    if (parts.length > 1) return parts;
    var hk = full.match(/^(.*?)\s+(?:China\s+)?(Hong Kong\s*\(SAR China\))$/i);
    if (hk) return [hk[1], hk[2]];
    var key = full.toLowerCase().replace(/[^a-z0-9]/g, '');
    var u = (window.__INSPIRA_UNIVERSITIES__ || []).filter(function (x) {
      return x && x.name && !x.isSupport && x.name.toLowerCase().replace(/[^a-z0-9]/g, '') === key;
    })[0];
    return u && u.country ? [full, u.country] : parts;
  }

  function isRoomLive(card) {
    if (card.classList.contains('bt-room-locked')) return false;
    var btn = card.querySelector('.cardActions .MuiButton-root');
    if (btn && !btn.__btFallback && /^enter$/i.test((btn.textContent || '').trim())) return true;
    // the platform's own flag, when it sets one
    var fiberKey = Object.keys(card).filter(function (k) { return k.indexOf('__reactFiber') === 0; })[0];
    for (var f = fiberKey && card[fiberKey], i = 0; f && i < 8; f = f.return, i++) {
      var d = f.memoizedProps && f.memoizedProps.data;
      if (d && 'isLive' in d) return d.isLive === 'YES' || d.isLive === true;
    }
    return false;
  }

  function enhanceRoomCard(card) {
    // "Brock University • Canada" -> name, then a pin + "Canada" line (the platform h6 stays in the DOM, hidden).
    var h = card.querySelector('.orgName h6');
    var nameBox = h && h.parentNode;
    if (nameBox) {
      var full = (h.textContent || '').trim();
      if (nameBox.__btFull !== full) {
        nameBox.__btFull = full;
        var parts = splitRoomName(full);
        var title = nameBox.querySelector('.bt-room-title');
        var loc = nameBox.querySelector('.bt-room-loc');
        if (parts.length > 1 && parts[0]) {
          if (!title) { title = doc.createElement('div'); title.className = 'bt-room-title'; nameBox.appendChild(title); }
          if (!loc) { loc = doc.createElement('div'); loc.className = 'bt-room-loc'; nameBox.appendChild(loc); }
          title.textContent = parts[0];
          title.setAttribute('title', parts[0]);
          loc.innerHTML = ROOM_ICONS.pin + '<span></span>';
          loc.lastChild.textContent = parts.slice(1).join(', ').replace(/\b([A-Z])\.\s+(?=[A-Z]\.)/g, '$1.');
          nameBox.classList.add('bt-split');
        } else {
          if (title) title.remove();
          if (loc) loc.remove();
          nameBox.classList.remove('bt-split');
        }
      }
    }

    // The room's start time from the platform ("Starts at Oct 29 5:45 PM", already in the viewer's own time
    // zone). The card layout hides the platform line, so the same text is shown under the country.
    // Once the owner has started the room, the platform turns its button into an active "Enter" for everyone
    // (or flags the room live): the line then reads "Live now".
    if (nameBox) {
      var when = card.querySelector('.roomStartAt [data-testid="meeting-time"], .roomStartAt p');
      var whenText = when ? (when.textContent || '').replace(/\s+/g, ' ').trim() : '';
      var live = isRoomLive(card);
      var label = live ? 'Live now' : whenText;
      var time = nameBox.querySelector('.bt-room-time');
      card.classList.toggle('bt-room-live', live);
      if (label) {
        if (!time) {
          time = doc.createElement('div');
          time.className = 'bt-room-time';
          nameBox.appendChild(time);
        }
        var kind = live ? 'live' : 'time';
        if (time.getAttribute('data-kind') !== kind) {
          time.setAttribute('data-kind', kind);
          time.innerHTML = (live ? '<i class="bt-live-dot" aria-hidden="true"></i>' : ROOM_ICONS.clock) + '<span></span>';
        }
        if (time.lastChild.textContent !== label) time.lastChild.textContent = label;
      } else if (time) {
        time.remove();
      }
    }

    // "Info" button before the Start button; opens the same university popup as the banner/logo.
    var bottom = card.querySelector('.cardBottom');
    var actions = bottom && bottom.querySelector('.cardActions');
    if (actions && !bottom.querySelector('.bt-room-info')) {
      var info = doc.createElement('button');
      info.type = 'button';
      info.className = 'bt-room-info';
      info.setAttribute('aria-label', 'View university info');
      info.innerHTML = ROOM_ICONS.info + '<span>Info</span>';
      info.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openRoomCardInfo(card);
      });
      bottom.insertBefore(info, actions);
    }

    // Hover hint on the banner (the banner click itself is handled in step 5).
    var media = card.querySelector('.roomCardMedia');
    if (media && !media.querySelector('.bt-media-hint')) {
      var hint = doc.createElement('span');
      hint.className = 'bt-media-hint';
      hint.setAttribute('aria-hidden', 'true');
      hint.innerHTML = ROOM_ICONS.eye + '<span>View university info</span>';
      media.appendChild(hint);
    }
  }

  function fixCardModalScroll() {
    var modalSelectors = [
      '.ReactModal__Overlay.sideBarUserPanel .sidedrawerWrapper',
      '.ReactModalPortal .sidedrawerWrapper',
      '.sidedrawerWrapper.profile',
      '.sidedrawerWrapper.open',
      '.sidedrawerWrapper',
      '.sponsorsProfileWrapper',
      '.sideBarUserPanel [class*="sidedrawer"]'
    ].join(', ');

    var modals = Array.from(document.querySelectorAll(modalSelectors));
    if (!modals.length) return;

    modals.forEach(function (modal) {
      // On /booth pages .sponsorsProfileWrapper is the page itself, not a popup: making it a contained
      // scroll box traps the mouse wheel and the page stops scrolling.
      if (modal.classList.contains('sponsorsProfileWrapper') && !modal.closest('.ReactModalPortal, .ReactModal__Overlay, .sidedrawerWrapper')) return;
      if (modal.style.overflowY !== 'auto') {
        modal.style.setProperty('overflow-y', 'auto', 'important');
        modal.style.setProperty('overflow-x', 'hidden', 'important');
        modal.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
        modal.style.setProperty('overscroll-behavior-y', 'contain', 'important');
        modal.style.setProperty('scrollbar-width', 'thin', 'important');
        modal.style.setProperty('scrollbar-color', '#DA5A97 rgba(109, 74, 194, 0.08)', 'important');
      }

      var inners = modal.querySelectorAll(
        '.companyProfileFeeds, .DelegateSidebar, .profileHeaderRow, .profileContent, ' +
        '.drawerTabWrapper, .tagsWrapper, .sponsorsDetails, :scope > div'
      );
      inners.forEach(function (inner) {
        // .companyProfileFeeds / .DelegateSidebar are Hubilo's own scroll areas (its wheel guard only lets the
        // mouse wheel scroll inside them), so master.css keeps them scrollable instead of flattening them here.
        if (inner.classList.contains('companyProfileFeeds') || inner.classList.contains('DelegateSidebar')) return;
        if (inner.style.height !== 'auto') {
          inner.style.setProperty('height', 'auto', 'important');
          inner.style.setProperty('min-height', '0px', 'important');
          inner.style.setProperty('max-height', 'none', 'important');
          inner.style.setProperty('overflow', 'visible', 'important');
        }
      });
    });
  }
  window.fixCardModalScroll = fixCardModalScroll;

  function enhancePopupMajors() {
    var modals = $$(
      '.sidedrawerWrapper, .sidedrawerWrapper.profile, .ReactModal__Overlay.sideBarUserPanel, .companyProfileFeeds, .sponsorsProfileWrapper'
    );
    if (!modals.length) return;

    modals.forEach(function (modal) {
      var title = modal.querySelector('h3, h4, h5, h6, [class*="styleExhibitorNameSidebar"], .orgName h6, .profileHeaderRow h6, .profileHeaderRow h4, .profileHeaderRow h3');
      var titleText = title ? title.textContent.trim() : '';

      if (modal.dataset.inspiraEnhancedTitle === titleText && modal.querySelector('.inspira-filter-tabs-wrapper')) {
        return;
      }

      if (modal.querySelector('.MuiSkeleton-root')) return;

      // Only a university's own programs/majors tag list becomes the majors panel. People popups also use
      // .tagsWrapper + MuiChip for their meeting time slots, which must stay native (they book meetings).
      var chipsContainer = modal.querySelector('.companyProfileArea .tagsWrapper, .sponsorsDetails .tagsWrapper');
      if (!chipsContainer || chipsContainer.closest('.meeting-sec, .meetbox, .DelegateSidebar')) return;

      var rawChips = $$(
        ':scope > .MuiChip-root:not(.tab-chip), .MuiChip-root:not(.tab-chip)',
        chipsContainer
      );
      if (!rawChips.length) return;

      function categorizeProgram(rawText) {
        var lower = (rawText || '').toLowerCase();
        if (/engineer|computer|tech|software|cyber|data|robotics|ai|mechanic|civil|electric|chemical|industrial|it\b/.test(lower)) {
          return { cat: 'eng', label: 'Engineering and Tech', shortLabel: 'Engineering' };
        }
        if (/business|admin|management|finance|account|market|entrepreneur|economics|mba|commerce|hospitality|leadership/.test(lower)) {
          return { cat: 'biz', label: 'Business and Leadership', shortLabel: 'Business' };
        }
        if (/science|biology|biomed|health|nursing|medicine|pharma|physics|chemistry|psychology|environment/.test(lower)) {
          return { cat: 'sci', label: 'Sciences and Health', shortLabel: 'Sciences' };
        }
        return { cat: 'hum', label: 'Humanities and Arts', shortLabel: 'Humanities' };
      }

      function formatProgramTitle(rawText) {
        var raw = (rawText || '').replace(/_/g, ' ').trim();
        var engMatch = raw.match(/^engineering:\s*(.*)/i);
        if (engMatch) {
          var spec = engMatch[1].trim();
          return spec.toLowerCase().replace(/(?:^|\s|\/|-|\()\S/g, function (char) { return char.toUpperCase(); }) + ' Engineering';
        }
        var name = raw.replace(/^(?:department of|school of|major in):\s*/i, '');
        if (/computer science.*information tech/i.test(name)) return 'Computer Science and IT';
        if (/business admin.*intl business/i.test(name)) return 'Business Administration and International Business';
        return name.toLowerCase().replace(/(?:^|\s|\/|-|\()\S/g, function (char) { return char.toUpperCase(); });
      }

      function escapeStr(str) {
        return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      }

      var programs = [];
      rawChips.forEach(function (chip) {
        var label = chip.querySelector('.MuiChip-label') || chip;
        var raw = (label.textContent || '').trim();
        if (!raw) return;
        var cleanName = formatProgramTitle(raw);
        var catInfo = categorizeProgram(raw);
        programs.push({
          raw: raw,
          cleanName: cleanName,
          cat: catInfo.cat,
          catLabel: catInfo.label,
          catShort: catInfo.shortLabel
        });
        chip.style.setProperty('display', 'none', 'important');
      });

      if (!programs.length) return;

      modal.dataset.inspiraEnhancedTitle = titleText;
      chipsContainer.classList.add('inspira-programs-container');

      var oldWrapper = chipsContainer.querySelector('.inspira-filter-tabs-wrapper');
      if (oldWrapper) oldWrapper.remove();
      var oldBtn = chipsContainer.parentNode && chipsContainer.parentNode.querySelector('.bt-tags-toggle');
      if (oldBtn) oldBtn.remove();

      var tabsWrapper = doc.createElement('div');
      tabsWrapper.className = 'inspira-filter-tabs-wrapper';

      var SVG_ICONS = {
        filterPill: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; margin-right:4px;"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
        chevronDown: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:0px; margin-left:3px;"><polyline points="6 9 12 15 18 9"/></svg>',
        chevronUp: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:0px; margin-left:3px;"><polyline points="18 15 12 9 6 15"/></svg>'
      };

      var hasMore = programs.length > 6;
      var chipsHtml = '';
      programs.forEach(function (p, idx) {
        var isCollapsed = hasMore && idx >= 6;
        chipsHtml += '<span class="tab-chip ' + (isCollapsed ? 'tab-chip-collapsed' : '') + '" data-cat="' + p.cat + '" title="' + escapeStr(p.raw) + '">' + escapeStr(p.cleanName) + '</span>';
      });

      if (hasMore) {
        var moreCount = programs.length - 6;
        chipsHtml += '<button type="button" class="tab-more-btn" id="modalDrawerMoreBtn">' +
          '<span>Show ' + moreCount + ' more</span> ' + SVG_ICONS.chevronDown +
          '</button>';
      }

      tabsWrapper.innerHTML =
        '<div class="c2-filter-header-bar">' +
          '<span class="c2-filter-title">' +
            SVG_ICONS.filterPill + ' POPULAR ACADEMIC PROGRAMS AND MAJORS' +
          '</span>' +
          '<span class="c2-filter-count">' +
            programs.length + ' ' + (programs.length === 1 ? 'major' : 'majors') +
          '</span>' +
        '</div>' +
        '<div class="tab-chips-container" style="justify-content: flex-start; gap: 6px; display: flex; flex-wrap: wrap;">' +
          chipsHtml +
        '</div>';

      chipsContainer.appendChild(tabsWrapper);

      var programChips = tabsWrapper.querySelectorAll('.tab-chip');
      var moreBtn = tabsWrapper.querySelector('.tab-more-btn');
      var isExpanded = false;

      if (moreBtn) {
        moreBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          isExpanded = !isExpanded;
          if (isExpanded) {
            programChips.forEach(function (c) { c.classList.remove('tab-chip-collapsed'); });
            moreBtn.innerHTML = '<span>Show Less</span> ' + SVG_ICONS.chevronUp;
          } else {
            programChips.forEach(function (c, idx) {
              if (idx >= 6) c.classList.add('tab-chip-collapsed');
            });
            var moreCount = programs.length - 6;
            moreBtn.innerHTML = '<span>Show ' + moreCount + ' more</span> ' + SVG_ICONS.chevronDown;
          }
          setTimeout(fixCardModalScroll, 30);
        });
      }
    });
  }


  function sortButton() {
    var desk = $('.roomsHeadBarDesktop .sortDropdown button');
    if (visible(desk)) return desk;
    var phone = $('.roomsHeadBarMobile .sortDropdown button');
    return visible(phone) ? phone : null;
  }
  function closeSortMenu() {
    var menu = $('.ListMenuPopup');
    var btn = sortButton();
    if (!menu || !btn || !visible(menu) || !onRoomsPage()) return false;
    btn.click();
    focusLater(btn);
    return true;
  }

  function searchControls() {
    return {
      wrap: $('.roomsHeadBarDesktop .pageSearchWrapper.searchIcon'),
      btn: $('.roomsHeadBarDesktop .searchBtn'),
      deskInput: $('.roomsHeadBarDesktop .searchInput'),
      close: $('.roomsHeadBarDesktop .searchCloseBtn'),
      barInput: $('.roomsHeadBarMobile input')
    };
  }
  function focusSearch() {
    var s = searchControls();
    if (visible(s.barInput)) { s.barInput.focus(); return true; }
    if (s.wrap && visible(s.btn)) {
      if (!s.wrap.classList.contains('active')) s.btn.click();

      if (s.deskInput) { try { s.deskInput.focus({ preventScroll: true }); } catch (e) { } }
      focusLater(s.deskInput);
      return true;
    }
    return false;
  }
  function closeSearch(target) {
    var s = searchControls();
    if (!s.wrap || !s.wrap.classList.contains('active') || !s.close) return false;
    if (target && !s.wrap.contains(target)) return false;
    s.close.click();
    focusLater(s.btn);
    return true;
  }

  var opener = null;
  doc.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('button, a, [role="tab"]');
    if (!b || openDrawer()) return;
    setTimeout(function () { if (openDrawer()) opener = b; }, 60);
  }, true);

  function closeDrawer(d) {
    var back = d && $('.backBtn', d);
    if (!back) return false;
    var focusWasInPanel = !doc.activeElement || doc.activeElement === doc.body || d.contains(doc.activeElement);
    back.click();
    if (focusWasInPanel) focusLater(opener);
    return true;
  }

  function phoneSheet() {
    try { return $('.bottom-sheet__wrapper.open .bottom-sheet__container:has(.mobDelegateSidebar)'); }
    catch (e) { return null; }
  }
  function closeSheet(c) {
    var btn = c && $('.drawerCloseButton button', c);
    if (!btn) return false;
    btn.click();
    return true;
  }

  var IGNORE_OUTSIDE = [
    '.miniSidedrawer', '.headerWrapper', '.ReactModalPortal', '.MuiPopover-root',
    '.MuiModal-root', '.MuiPopper-root', '[role="dialog"]', '[role="menu"]',
    '[role="listbox"]', '.toastWrapper', '.ListMenuPopup', '.roomCard',

    'button', 'a', 'input', 'textarea', 'select', 'label', '[role="button"]',
    '[role="tab"]', '[role="link"]', '[contenteditable]', '[tabindex]'
  ].join(',');

  var pressedOutside = false;
  window.addEventListener('pointerdown', function (e) {
    pressedOutside = false;
    if (!CFG.closeDrawerOnOutside || !onRoomsPage() || root.classList.contains('bt-mobile')) return;
    var d = openDrawer();
    var t = e.target;
    if (!d || !(t instanceof Element) || d.contains(t) || t.closest(IGNORE_OUTSIDE)) return;
    pressedOutside = true;
  }, true);

  window.addEventListener('click', function (e) {
    var c = phoneSheet();
    var t = e.target;
    if (c && t instanceof Element && !c.contains(t) && t.closest('.bottom-sheet__wrapper')) {
      if (!e.defaultPrevented) {
        e.preventDefault();
        e.stopPropagation();
        closeSheet(c);
      }
      return;
    }
    if (!pressedOutside) return;
    pressedOutside = false;
    if (e.defaultPrevented) return;
    if (String(window.getSelection ? window.getSelection() : '') !== '') return;
    var d = openDrawer();
    if (d && !d.contains(t)) closeDrawer(d);
  }, true);

  doc.addEventListener('keydown', function (e) {
    if (e.defaultPrevented) return;

    if (e.key === 'Escape') {
      if (closeSheet(phoneSheet())) { e.preventDefault(); return; }
      if (anyModalOpen()) return;
      if (closeSortMenu() || closeSearch(e.target)) { e.preventDefault(); return; }
      if (isEditable(e.target) && e.target.value) return;
      var d = openDrawer();
      if (d && closeDrawer(d)) e.preventDefault();
      return;
    }

    if (e.key === '/' && CFG.searchShortcut && onRoomsPage()) {
      if (e.altKey || e.ctrlKey || e.metaKey || isEditable(e.target) || anyModalOpen()) return;
      if (focusSearch()) e.preventDefault();
    }
  });

  function update() {
    var page = pageFlags();
    onScroll();
    var hasRoomCards = $$('.roomsCardsList .roomCard, .roomCard').length > 0;
    if (page || hasRoomCards) {
      [showcase, stagger, nameTips, linkEnterButtons].forEach(function (fn) {
        try { fn(); } catch (err) { if (window.console) console.warn('[rooms-override]', fn.name, err); }
      });
    }
    [fixCardModalScroll, enhancePopupMajors].forEach(function (fn) {
      try { fn(); } catch (err) { if (window.console) console.warn('[modal-override]', fn.name, err); }
    });
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; update(); });
  }

  var mo = new MutationObserver(schedule);

  function boot() {
    update();
    mo.observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'src'] });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(schedule);

    doc.addEventListener('click', function (e) {
      if (e.target && e.target.closest && (
        e.target.closest('.roomCard') ||
        e.target.closest('.roomCardMedia') ||
        e.target.closest('.orgProfile') ||
        e.target.closest('.MuiCard-root') ||
        e.target.closest('.inspira-card-cta-btn') ||
        e.target.closest('.inspira-card-view') ||
        e.target.closest('.inspira-split-btn-group') ||
        e.target.closest('[class*="Card"]')
      )) {
        setTimeout(fixCardModalScroll, 20);
        setTimeout(fixCardModalScroll, 80);
        setTimeout(fixCardModalScroll, 200);
        setTimeout(fixCardModalScroll, 450);
        setTimeout(fixCardModalScroll, 800);
        setTimeout(enhancePopupMajors, 80);
        setTimeout(enhancePopupMajors, 250);
        setTimeout(enhancePopupMajors, 600);
        setTimeout(enhancePopupMajors, 1000);
      }
    }, true);
  }

  if (doc.readyState === 'complete') {
    boot();
  } else {
    window.addEventListener('load', boot);
  }
})();
;

(function () {
  'use strict';

  if (window.__BT_EMBED__) return;
  window.__BT_EMBED__ = true;

  var CFG = Object.assign({
    closeDrawerOnOutside: true
  }, window.BT_EMBED_CONFIG || {});

  var doc = document;
  var root = doc.documentElement;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function setClass(el, cls, on) {
    if (el && el.classList.contains(cls) !== !!on) el.classList.toggle(cls, !!on);
  }
  function isEditable(el) {
    return !!(el && el.closest && el.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]'));
  }
  function anyModalOpen() {
    return !!$('.ReactModal__Overlay, .MuiModal-root:not(.MuiModal-hidden), .MuiPopover-root');
  }
  function focusLater(el) {
    if (!el) return;
    setTimeout(function () {
      if (el.isConnected) { try { el.focus({ preventScroll: true }); } catch (e) { } }
    }, 30);
  }
  function onEmbedPage() { return root.classList.contains('bt-embed'); }

  function openDrawer() { return $('.sidedrawerWrapper.open:not(.profile)'); }

  function pageFlags() {
    setClass(root, 'bt-embed', !!$('.hasEmbedAppScreen'));
    setClass(root, 'bt-mobile', !!$('.isMobileContainer, .mainContainerMob'));
    setClass(root, 'bt-drawer-open', !!openDrawer());
  }

  var scrolled = null;
  function onScroll() {
    var s = (window.pageYOffset || root.scrollTop || 0) > 8;
    if (s !== scrolled) { scrolled = s; setClass(root, 'bt-scrolled', s); }
  }

  var opener = null;
  doc.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('button, a, [role="tab"]');
    if (!b || openDrawer()) return;
    setTimeout(function () { if (openDrawer()) opener = b; }, 60);
  }, true);

  function closeDrawer(d) {
    var back = d && $('.backBtn', d);
    if (!back) return false;
    var focusWasInPanel = !doc.activeElement || doc.activeElement === doc.body || d.contains(doc.activeElement);
    back.click();
    if (focusWasInPanel) focusLater(opener);
    return true;
  }

  var IGNORE_OUTSIDE = [
    '.miniSidedrawer', '.headerWrapper', '.ReactModalPortal', '.MuiPopover-root',
    '.MuiModal-root', '.MuiPopper-root', '[role="dialog"]', '[role="menu"]',
    '[role="listbox"]', '.toastWrapper', 'iframe',

    'button', 'a', 'input', 'textarea', 'select', 'label', '[role="button"]',
    '[role="tab"]', '[role="link"]', '[contenteditable]', '[tabindex]'
  ].join(',');

  function phoneSheet() {
    try { return $('.bottom-sheet__wrapper.open .bottom-sheet__container:has(.mobDelegateSidebar)'); }
    catch (e) { return null; }
  }
  function closeSheet(c) {
    var btn = c && $('.drawerCloseButton button', c);
    if (!btn) return false;
    btn.click();
    return true;
  }

  var pressedOutside = false;
  window.addEventListener('pointerdown', function (e) {
    pressedOutside = false;
    if (!CFG.closeDrawerOnOutside || !onEmbedPage() || root.classList.contains('bt-mobile')) return;
    var d = openDrawer();
    var t = e.target;
    if (!d || !(t instanceof Element) || d.contains(t) || t.closest(IGNORE_OUTSIDE)) return;
    pressedOutside = true;
  }, true);

  window.addEventListener('click', function (e) {
    var c = phoneSheet();
    var t = e.target;
    if (c && t instanceof Element && !c.contains(t) && t.closest('.bottom-sheet__wrapper')) {
      if (!e.defaultPrevented) {
        e.preventDefault();
        e.stopPropagation();
        closeSheet(c);
      }
      return;
    }
    if (!pressedOutside) return;
    pressedOutside = false;
    if (e.defaultPrevented) return;
    if (String(window.getSelection ? window.getSelection() : '') !== '') return;
    var d = openDrawer();
    if (d && !d.contains(t)) closeDrawer(d);
  }, true);

  doc.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.key !== 'Escape') return;
    if (closeSheet(phoneSheet())) { e.preventDefault(); return; }
    if (anyModalOpen()) return;
    if (isEditable(e.target) && e.target.value) return;
    var d = openDrawer();
    if (d && closeDrawer(d)) e.preventDefault();
  });

  function update() {
    pageFlags();
    onScroll();
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; update(); });
  }

  var mo = new MutationObserver(schedule);

  function boot() {
    update();
    mo.observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (doc.readyState === 'complete') {
    boot();
  } else {
    window.addEventListener('load', boot);
  }
})();
;

(function () {
  'use strict';

  if (window.__BT_BOOTH__) return;
  window.__BT_BOOTH__ = true;

  var CFG = Object.assign({
    closeDrawerOnOutside: true,
    escapeClosesDrawer: true,
    keyboardBoothNav: true,
    tagRows: 3,
    minHiddenTags: 4,
    aboutLines: 8,
    reveal: true
  }, window.BT_CONFIG || {});

  var doc = document;
  var root = doc.documentElement;
  var mql = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduceMotion = mql('(prefers-reduced-motion: reduce)');

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  function setClass(el, cls, on) {
    if (el && el.classList.contains(cls) !== !!on) el.classList.toggle(cls, !!on);
  }
  function setAttr(el, name, value) {
    if (el && el.getAttribute(name) !== value) el.setAttribute(name, value);
  }
  function setText(el, text) {
    if (el && el.textContent !== text) el.textContent = text;
  }
  function isEditable(el) {
    return !!(el && el.closest && el.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]'));
  }
  function anyModalOpen() {
    return !!$('.ReactModal__Overlay, .MuiModal-root:not(.MuiModal-hidden), .MuiPopover-root, [role="dialog"]');
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';
  function icon(cls, d) {
    var svg = doc.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', cls);
    d.forEach(function (path) {
      var p = doc.createElementNS(SVG_NS, 'path');
      p.setAttribute('d', path);
      svg.appendChild(p);
    });
    return svg;
  }

  var live;
  function announce(msg) {
    if (!live) {
      live = doc.createElement('div');
      live.className = 'bt-sr';
      live.setAttribute('data-bt', '');
      live.setAttribute('aria-live', 'polite');
      doc.body.appendChild(live);
    }
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 30);
  }

  function openDrawer() { return $('.sidedrawerWrapper.open:not(.profile)'); }

  function pageFlags() {
    var booth = $('.sponsorsProfileWrapper');
    setClass(root, 'bt-booth', !!booth);
    setClass(root, 'bt-mobile', !!$('.isMobileContainer, .mainContainerMob'));
    setClass(root, 'bt-drawer-open', !!openDrawer());
    return booth;
  }

  var scrolled = null;
  function onScroll() {
    var s = (window.pageYOffset || root.scrollTop || 0) > 8;
    if (s !== scrolled) { scrolled = s; setClass(root, 'bt-scrolled', s); }
  }

  var REVEAL = '.sponsorSocialDetails, .sponsorsInfoWrapper, .roomSlider, .twoColumnWrapper, .filesWrapper';
  var revealed = typeof WeakSet === 'function' ? new WeakSet() : null;
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      revealed.add(e.target);
      e.target.classList.add('bt-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }) : null;

  function reveal(booth) {
    if (!CFG.reveal || reduceMotion || !io || !revealed) return;
    $$(REVEAL, booth).forEach(function (el) {
      if (revealed.has(el)) {

        setClass(el, 'bt-reveal', true);
        setClass(el, 'bt-in', true);
        return;
      }
      if (el.__btWatch) {
        setClass(el, 'bt-reveal', true);
        return;
      }
      el.__btWatch = true;
      el.classList.add('bt-reveal');
      io.observe(el);
    });
  }

  function tags(booth) {
    var wrap = $('.sponsorsDetails .tagsWrapper', booth);
    if (!wrap) return;
    var btn = wrap.nextElementSibling && wrap.nextElementSibling.classList.contains('bt-tags-toggle')
      ? wrap.nextElementSibling : null;
    if (wrap.querySelector('.inspira-filter-tabs-wrapper')) {
      if (btn) btn.remove();
      setClass(wrap, 'bt-collapsible', false);
      setClass(wrap, 'bt-collapsed', false);
      wrap.style.removeProperty('max-height');
      return;
    }
    var chips = $$('.MuiChip-root', wrap);
    if (!chips.length) { if (btn) btn.remove(); return; }

    var cs = getComputedStyle(wrap);
    var gap = parseFloat(cs.rowGap) || 8;
    var chipH = chips[0].offsetHeight || 30;
    var limit = CFG.tagRows * chipH + (CFG.tagRows - 1) * gap;
    var hidden = chips.filter(function (c) { return c.offsetTop >= limit - 2; }).length;

    if (hidden < CFG.minHiddenTags) {
      setClass(wrap, 'bt-collapsible', false);
      setClass(wrap, 'bt-collapsed', false);
      wrap.style.removeProperty('max-height');
      if (btn) btn.remove();
      return;
    }

    var expanded = !!wrap.__btExpanded;
    var max = limit + 'px';
    if (wrap.style.getPropertyValue('--bt-tags-max') !== max) wrap.style.setProperty('--bt-tags-max', max);
    setClass(wrap, 'bt-collapsible', true);
    setClass(wrap, 'bt-collapsed', !expanded);

    if (expanded && !wrap.__btReleased) {
      wrap.style.maxHeight = wrap.scrollHeight + 'px';
      wrap.__btReleased = true;
      setTimeout(function () { if (wrap.__btExpanded) wrap.style.maxHeight = 'none'; }, 380);
    }

    if (!btn) {
      btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'bt-tags-toggle';
      btn.setAttribute('data-bt', '');
      btn.addEventListener('click', function () {
        if (wrap.__btExpanded) {

          wrap.style.maxHeight = wrap.scrollHeight + 'px';
          void wrap.offsetHeight;
          wrap.style.removeProperty('max-height');
        }
        wrap.__btExpanded = !wrap.__btExpanded;
        wrap.__btReleased = false;
        update();
      });
      wrap.insertAdjacentElement('afterend', btn);
    }
    if (!wrap.id) wrap.id = 'bt-tags';
    setAttr(btn, 'aria-controls', wrap.id);
    setAttr(btn, 'aria-expanded', String(expanded));
    setText(btn, expanded ? 'Show less' : '+' + hidden + ' more');
  }

  function about(booth) {
    var p = $('.aboutSponsors .aboutText', booth);
    if (!p) return;
    var btn = p.nextElementSibling && p.nextElementSibling.classList.contains('bt-more')
      ? p.nextElementSibling : null;
    var lh = parseFloat(getComputedStyle(p).lineHeight) || 24;
    var expanded = !!p.__btExpanded;

    var lines = Math.round(p.scrollHeight / lh);
    var needs = lines > CFG.aboutLines + 1;

    if (!needs) { setClass(p, 'bt-clamp', false); if (btn) btn.remove(); return; }

    if (p.style.getPropertyValue('--bt-lines') !== String(CFG.aboutLines)) p.style.setProperty('--bt-lines', String(CFG.aboutLines));
    setClass(p, 'bt-clamp', !expanded);
    if (!btn) {
      btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'bt-more';
      btn.setAttribute('data-bt', '');
      btn.addEventListener('click', function () {
        p.__btExpanded = !p.__btExpanded;
        update();
      });
      p.insertAdjacentElement('afterend', btn);
    }
    if (!p.id) p.id = 'bt-about';
    setAttr(btn, 'aria-controls', p.id);
    setAttr(btn, 'aria-expanded', String(expanded));
    setText(btn, expanded ? 'Show less' : 'Read more');
  }

  var COPY_D = ['M8 8h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z', 'M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3'];
  var CHECK_D = ['M20 6 9 17l-5-5'];

  function copyText(text, btn) {
    function done() {
      btn.classList.add('bt-copied');
      btn.setAttribute('data-tip', 'Copied');
      announce('Copied ' + text);
      clearTimeout(btn.__btT);
      btn.__btT = setTimeout(function () {
        btn.classList.remove('bt-copied');
        btn.setAttribute('data-tip', btn.__btTip);
      }, 1600);
    }
    function fallback() {
      var ta = doc.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.setAttribute('data-bt', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      doc.body.appendChild(ta);
      ta.select();
      try { if (doc.execCommand('copy')) done(); } catch (e) { }
      ta.remove();
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  function addCopy(row, value, what) {
    if (!row || !value) return;
    var btn = row.querySelector(':scope > .bt-copy');
    if (!btn) {
      btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'bt-copy';
      btn.setAttribute('data-bt', '');
      btn.appendChild(icon('bt-i-copy', COPY_D));
      btn.appendChild(icon('bt-i-check', CHECK_D));
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        copyText(btn.__btValue, btn);
      });
      row.appendChild(btn);
    }
    btn.__btValue = value;
    btn.__btTip = 'Copy ' + what;
    if (!btn.classList.contains('bt-copied')) setAttr(btn, 'data-tip', btn.__btTip);
    setAttr(btn, 'aria-label', 'Copy ' + what + ' ' + value);
  }

  function contact(booth) {
    var box = $('.getInTouch', booth);
    if (!box) return;

    var phone = $('.phoneText', box);
    if (phone) {
      var row = phone.closest('.phone');
      var shown = (phone.textContent || '').trim();
      var tel = shown.replace(/[^\d+]/g, '');
      if (row && tel.length >= 6) {
        addCopy(row, shown, 'phone number');

        if (mql('(pointer: coarse)')) {
          setClass(row, 'bt-tel', true);
          setAttr(row, 'data-bt-tel', tel);
        }
      }
    }

    var mail = $('a[href^="mailto:"]', box);
    if (mail) {
      var email = decodeURIComponent(mail.getAttribute('href').slice(7).split('?')[0]);
      addCopy(mail.closest('.phone') || mail.parentNode, email, 'email');
    }
  }

  function arrows(booth) {
    [['prev', 'Previous university'], ['next', 'Next university']].forEach(function (a) {
      var el = $('.exibitorNavigation .arrowNav.' + a[0], booth);
      if (!el) return;
      setAttr(el, 'aria-label', a[1]);
      setAttr(el, 'title', a[1]);

      var inner = el.querySelector('button');
      if (inner) { setAttr(inner, 'tabindex', '-1'); setAttr(inner, 'aria-hidden', 'true'); }
    });
  }

  function clickArrow(which) {
    var el = $('.sponsorsProfileWrapper .exibitorNavigation .arrowNav.' + which);
    if (!el || el.disabled || !el.offsetParent) return false;
    (el.querySelector('button') || el).click();
    return true;
  }

  var opener = null;
  doc.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('button, a, [role="tab"]');
    if (!b || openDrawer()) return;
    setTimeout(function () { if (openDrawer()) opener = b; }, 60);
  }, true);

  function closeDrawer(d) {
    var back = d && $('.backBtn', d);
    if (!back) return false;
    var focusWasInPanel = !doc.activeElement || doc.activeElement === doc.body || d.contains(doc.activeElement);
    back.click();
    if (focusWasInPanel && opener && opener.isConnected) {
      try { opener.focus({ preventScroll: true }); } catch (e) { }
    }
    return true;
  }

  var IGNORE_OUTSIDE = [
    '.miniSidedrawer', '.headerWrapper', '.ReactModalPortal', '.MuiPopover-root',
    '.MuiModal-root', '.MuiPopper-root', '[role="dialog"]', '[role="menu"]',
    '[role="listbox"]', '.toastWrapper', '.bottom-drawer',

    'button', 'a', 'input', 'textarea', 'select', 'label', '[role="button"]',
    '[role="tab"]', '[role="link"]', '[contenteditable]', '[tabindex]',
    '.roomCard', '.peoplesCardWrapper', '.fileBox', '.cursor', '.cursorHand'
  ].join(',');

  var pressedOutside = false;
  window.addEventListener('pointerdown', function (e) {
    pressedOutside = false;
    if (!CFG.closeDrawerOnOutside || root.classList.contains('bt-mobile')) return;
    var d = openDrawer();
    var t = e.target;
    if (!d || !(t instanceof Element) || d.contains(t) || t.closest(IGNORE_OUTSIDE)) return;
    pressedOutside = true;
  }, true);

  window.addEventListener('click', function (e) {
    if (!pressedOutside) return;
    pressedOutside = false;
    if (String(window.getSelection ? window.getSelection() : '') !== '') return;
    var d = openDrawer();
    if (d && !d.contains(e.target)) closeDrawer(d);
  }, true);

  function profileSheet() {
    try { return $('.bottom-sheet__wrapper.open .bottom-sheet__container:has(.mobDelegateSidebar)'); }
    catch (e) { return null; }
  }
  function closeSheet(c) {
    var btn = c && $('.drawerCloseButton button', c);
    if (!btn) return false;
    btn.click();
    return true;
  }
  window.addEventListener('click', function (e) {
    var c = profileSheet();
    var t = e.target;
    if (!c || !(t instanceof Element) || c.contains(t) || !t.closest('.bottom-sheet__wrapper')) return;
    e.preventDefault();
    e.stopPropagation();
    closeSheet(c);
  }, true);

  doc.addEventListener('keydown', function (e) {
    if (e.defaultPrevented) return;

    if (e.key === 'Escape' && closeSheet(profileSheet())) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Escape' && CFG.escapeClosesDrawer) {
      if (anyModalOpen()) return;
      if (isEditable(e.target) && e.target.value) return;
      var d = openDrawer();
      if (d && closeDrawer(d)) e.preventDefault();
      return;
    }

    if (!CFG.keyboardBoothNav || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (!root.classList.contains('bt-booth') || anyModalOpen() || isEditable(e.target)) return;
    if (e.target.closest && e.target.closest('.slick-slider, [role="tablist"], .sidedrawerWrapper, .bottom-drawer')) return;
    if (clickArrow(e.key === 'ArrowLeft' ? 'prev' : 'next')) e.preventDefault();
  });

  doc.addEventListener('click', function (e) {
    var row = e.target.closest && e.target.closest('.bt-tel');
    var tel = row && row.getAttribute('data-bt-tel');
    if (tel && !e.target.closest('.bt-copy')) window.location.href = 'tel:' + tel;
  });

  function update() {
    var booth = pageFlags();
    onScroll();
    if (!booth) return;
    [reveal, tags, about, contact, arrows].forEach(function (fn) {
      try { fn(booth); } catch (err) { if (window.console) console.warn('[booth-override]', fn.name, err); }
    });
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; update(); });
  }

  function own(node) {
    var el = node && (node.nodeType === 1 ? node : node.parentNode);
    return !!(el && el.closest && el.closest('[data-bt]'));
  }

  var mo = new MutationObserver(function (list) {
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (own(m.target)) continue;
      if (m.type !== 'childList') { schedule(); return; }
      var nodes = Array.prototype.slice.call(m.addedNodes).concat(Array.prototype.slice.call(m.removedNodes));
      for (var j = 0; j < nodes.length; j++) {
        if (!(nodes[j].nodeType === 1 && nodes[j].hasAttribute('data-bt'))) { schedule(); return; }
      }
    }
  });

  var resizeT;
  function boot() {
    update();
    mo.observe(doc.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'] });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(schedule, 120);
    });

    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(schedule);
  }

  if (doc.readyState === 'complete') {
    boot();
  } else {
    window.addEventListener('load', boot);
  }
})();
;

(function () {
  'use strict';

  if (window.__BT_PEOPLE__) return;
  window.__BT_PEOPLE__ = true;

  var CFG = Object.assign({
    closeDrawerOnOutside: true,
    searchShortcut: true,
    backToTop: true,
    staggerCards: true
  }, window.BT_PEOPLE_CONFIG || {});

  var doc = document;
  var root = doc.documentElement;
  var mql = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduceMotion = mql('(prefers-reduced-motion: reduce)');

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function setClass(el, cls, on) {
    if (el && el.classList.contains(cls) !== !!on) el.classList.toggle(cls, !!on);
  }
  function setAttr(el, name, value) {
    if (el && el.getAttribute(name) !== value) el.setAttribute(name, value);
  }
  function visible(el) { return !!(el && el.getClientRects().length); }
  function isEditable(el) {
    return !!(el && el.closest && el.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]'));
  }
  function anyModalOpen() {
    return !!$('.ReactModal__Overlay, .MuiModal-root:not(.MuiModal-hidden), .MuiPopover-root');
  }
  function focusLater(el) {
    if (!el) return;
    setTimeout(function () {
      if (el.isConnected) { try { el.focus({ preventScroll: true }); } catch (e) { } }
    }, 30);
  }
  function onPeoplePage() { return root.classList.contains('bt-people'); }

  function openDrawer() { return $('.sidedrawerWrapper.open:not(.profile)'); }

  function pageFlags() {
    var page = $('.peopleTabHeader') || $('.delegatespageTab');
    setClass(root, 'bt-people', !!page);
    setClass(root, 'bt-mobile', !!$('.isMobileContainer, .mainContainerMob'));
    setClass(root, 'bt-drawer-open', !!openDrawer());
    return page;
  }

  var scrolled = null;
  function onScroll() {
    var y = window.pageYOffset || root.scrollTop || 0;
    var s = y > 8;
    if (s !== scrolled) { scrolled = s; setClass(root, 'bt-scrolled', s); }
    if (topBtn) setClass(topBtn, 'bt-show', onPeoplePage() && y > window.innerHeight * 1.5);
  }

  var firstRun = true;
  function stagger() {
    if (!CFG.staggerCards || reduceMotion) return;
    var i = 0;
    $$('.delegatesTab .peopleAnimate').forEach(function (card) {
      if (card.__btI !== undefined) return;
      if (firstRun) { card.__btI = -1; return; }
      card.__btI = Math.min(i++, 11);
      card.style.setProperty('--bt-i', String(card.__btI));
    });
    firstRun = false;
  }

  function searchControls() {
    return {
      wrap: $('.peopleTabHeader .pageSearchWrapper'),
      btn: $('.peopleTabHeader .pageSearchWrapper .searchBtn'),
      deskInput: $('.peopleTabHeader .pageSearchWrapper .searchInput'),
      close: $('.peopleTabHeader .pageSearchWrapper .searchCloseBtn'),
      barInput: $('.peopleTabHeader .searchBarWrap input')
    };
  }

  function searchA11y() {
    var s = searchControls();
    if (CFG.searchShortcut) {
      if (s.deskInput) setAttr(s.deskInput, 'aria-keyshortcuts', '/');
      if (s.barInput) setAttr(s.barInput, 'aria-keyshortcuts', '/');
      if (s.btn) setAttr(s.btn, 'data-bt-kbd', 'Press / to search');
    }
  }

  function focusSearch() {
    var s = searchControls();
    if (visible(s.barInput)) { s.barInput.focus(); return true; }
    if (s.wrap && visible(s.btn)) {
      if (!s.wrap.classList.contains('active')) s.btn.click();

      if (s.deskInput) { try { s.deskInput.focus({ preventScroll: true }); } catch (e) { } }
      focusLater(s.deskInput);
      return true;
    }
    return false;
  }

  function phoneSheet() {
    try { return $('.bottom-sheet__wrapper.open .bottom-sheet__container:has(.mobDelegateSidebar, .mobileFilterDrawer)'); }
    catch (e) { return null; }
  }
  function closeSheet(c) {
    var btn = c && $('.drawerCloseButton button', c);
    if (!btn) return false;
    btn.click();
    return true;
  }

  var lastChip = null;
  doc.addEventListener('click', function (e) {
    var chip = e.target.closest && e.target.closest('.delegatesTab .filterList .MuiChip-root');
    if (chip) lastChip = chip;
  }, true);

  function closeFilterDropdown() {
    var dd = $('.delegatesTab .filterDropDown');
    var btn = dd && $('.filterCloseIcon button', dd);
    if (!btn || !visible(dd)) return false;
    btn.click();
    focusLater(lastChip);
    return true;
  }
  function closeSortMenu() {
    var menu = $('.delegatesTab .ListMenuPopup');
    var btn = $('.delegatesTab .sortButtonWrapper > button');
    if (!menu || !btn || !visible(menu)) return false;
    btn.click();
    focusLater(btn);
    return true;
  }
  function closeSearch(target) {
    var s = searchControls();
    if (!s.wrap || !s.wrap.classList.contains('active') || !s.close) return false;
    if (target && !s.wrap.contains(target)) return false;
    s.close.click();
    focusLater(s.btn);
    return true;
  }

  var opener = null;
  doc.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('button, a, [role="tab"]');
    if (!b || openDrawer()) return;
    setTimeout(function () { if (openDrawer()) opener = b; }, 60);
  }, true);

  function closeDrawer(d) {
    var back = d && $('.backBtn', d);
    if (!back) return false;
    var focusWasInPanel = !doc.activeElement || doc.activeElement === doc.body || d.contains(doc.activeElement);
    back.click();
    if (focusWasInPanel) focusLater(opener);
    return true;
  }

  var IGNORE_OUTSIDE = [
    '.miniSidedrawer', '.headerWrapper', '.ReactModalPortal', '.MuiPopover-root',
    '.MuiModal-root', '.MuiPopper-root', '[role="dialog"]', '[role="menu"]',
    '[role="listbox"]', '.toastWrapper', '.filterDropDown', '.ListMenuPopup',
    '.filtersWrapper', '.bt-top',

    'button', 'a', 'input', 'textarea', 'select', 'label', '[role="button"]',
    '[role="tab"]', '[role="link"]', '[contenteditable]', '[tabindex]',
    '.peoplesCardWrapper', '.cursor', '.cursorHand'
  ].join(',');

  var pressedOutside = false;
  window.addEventListener('pointerdown', function (e) {
    pressedOutside = false;
    if (!CFG.closeDrawerOnOutside || !onPeoplePage() || root.classList.contains('bt-mobile')) return;
    var d = openDrawer();
    var t = e.target;
    if (!d || !(t instanceof Element) || d.contains(t) || t.closest(IGNORE_OUTSIDE)) return;
    pressedOutside = true;
  }, true);

  window.addEventListener('click', function (e) {

    var c = phoneSheet();
    var t = e.target;
    if (c && t instanceof Element && !c.contains(t) && t.closest('.bottom-sheet__wrapper')) {
      if (!e.defaultPrevented) {
        e.preventDefault();
        e.stopPropagation();
        closeSheet(c);
      }
      return;
    }

    if (!pressedOutside) return;
    pressedOutside = false;
    if (e.defaultPrevented) return;
    if (String(window.getSelection ? window.getSelection() : '') !== '') return;
    var d = openDrawer();
    if (d && !d.contains(t)) closeDrawer(d);
  }, true);

  doc.addEventListener('keydown', function (e) {
    if (e.defaultPrevented) return;

    if (e.key === 'Escape') {
      if (closeSheet(phoneSheet())) { e.preventDefault(); return; }
      if (anyModalOpen()) return;
      if (closeFilterDropdown() || closeSortMenu() || closeSearch(e.target)) { e.preventDefault(); return; }
      if (isEditable(e.target) && e.target.value) return;
      var d = openDrawer();
      if (d && closeDrawer(d)) e.preventDefault();
      return;
    }

    if (e.key === '/' && CFG.searchShortcut && onPeoplePage()) {
      if (e.altKey || e.ctrlKey || e.metaKey || isEditable(e.target) || anyModalOpen()) return;
      if (focusSearch()) e.preventDefault();
    }
  });

  var topBtn = null;
  function backToTop() {
    if (!CFG.backToTop || topBtn) return;
    topBtn = doc.createElement('button');
    topBtn.type = 'button';
    topBtn.className = 'bt-top';
    topBtn.setAttribute('data-bt', '');
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.title = 'Back to top';
    var svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2.4');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    var p = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', 'M12 19V5M5 12l7-7 7 7');
    svg.appendChild(p);
    topBtn.appendChild(svg);
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var s = searchControls();
      focusLater(visible(s.barInput) ? s.barInput : s.btn);
    });
    doc.body.appendChild(topBtn);
  }

  function update() {
    var page = pageFlags();
    onScroll();
    if (!page) return;
    [backToTop, stagger, searchA11y].forEach(function (fn) {
      try { fn(); } catch (err) { if (window.console) console.warn('[people-override]', fn.name, err); }
    });
    onScroll();
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; update(); });
  }

  function own(node) {
    var el = node && (node.nodeType === 1 ? node : node.parentNode);
    return !!(el && el.closest && el.closest('[data-bt]'));
  }

  var mo = new MutationObserver(function (list) {
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (own(m.target)) continue;
      if (m.type !== 'childList') { schedule(); return; }
      var nodes = Array.prototype.slice.call(m.addedNodes).concat(Array.prototype.slice.call(m.removedNodes));
      for (var j = 0; j < nodes.length; j++) {
        if (!(nodes[j].nodeType === 1 && nodes[j].hasAttribute('data-bt'))) { schedule(); return; }
      }
    }
  });

  function boot() {
    update();
    mo.observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
  }

  if (doc.readyState === 'complete') {
    boot();
  } else {
    window.addEventListener('load', boot);
  }
})();
;
/* =====================================================================
   Student UX extras (additive only; uses the page DOM and this
   browser's localStorage, never the platform's data or buttons' logic):
   1. Virtual Lobby "How it works" guide (shown until dismissed)
   2. Country chips above the lobby cards (they drive the platform's own search)
   3. "Visited" badges + "x of 42 universities explored" progress
   4. Floating fair status (opens in / live now / ended) + "Need help?" button
   ===================================================================== */
(function () {
  "use strict";
  if (window.__EXP_UX__) return;
  window.__EXP_UX__ = true;

  var doc = document;
  var CFG = Object.assign({
    start: "2026-11-04T16:30:00+04:00",
    end: "2026-11-04T19:00:00+04:00",
    timeZone: "Asia/Dubai",
    timeZoneLabel: "GST",
    helpDesk: "Technology Help Desk"
  }, window.INSPIRA_EVENT_CONFIG || {});
  var START = new Date(CFG.start).getTime();
  var END = new Date(CFG.end).getTime();
  var BULLET = "•";
  var KEY_GUIDE = "exp_ux_guide_done";
  var KEY_VISITED = "exp_ux_visited";
  var OWN = ".lx-toolbar, .lx-dock, .lx-visited-badge";

  var ICON = {
    school: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>',
    info: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    video: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="6" width="13" height="12" rx="2.5"/><path d="m15.5 10.5 6-3.5v10l-6-3.5"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5 10 17 19 7.5"/></svg>',
    help: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/></svg>'
  };

  function load(key, def) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? def : v; } catch (e) { return def; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { }
  }
  function setText(el, text) { if (el && el.textContent !== text) el.textContent = text; }

  /* ---------- names and countries ---------- */
  function baseName(text) { return String(text || "").split(BULLET)[0].replace(/\s+/g, " ").trim(); }
  function nameKey(text) { return baseName(text).toLowerCase(); }
  function isSupport(text) { return /help\s*desk|support/i.test(text || ""); }
  function normCountry(c) {
    var s = String(c || "").replace(/\s+/g, " ").trim();
    var compact = s.replace(/\s+/g, "").toLowerCase();
    if (/^u\.?s\.?a?\.?$/.test(compact)) return "U.S.";
    if (/^u\.?k\.?$/.test(compact)) return "U.K.";
    if (/^u\.?a\.?e\.?$/.test(compact)) return "U.A.E.";
    if (/^hong\s*kong\b/i.test(s)) return "Hong Kong";
    return s;
  }
  function countryOf(text) {
    var parts = String(text || "").split(BULLET);
    if (parts.length > 1) return normCountry(parts[parts.length - 1]);
    // rooms saved without " • Country": "... China Hong Kong (SAR China)", or a name on the university list
    if (/\(SAR China\)\s*$/i.test(text)) return normCountry("Hong Kong");
    var k = nameKey(text), hit = (window.__INSPIRA_UNIVERSITIES__ || []).filter(function (u) {
      return u && u.name && nameKey(u.name) === k;
    })[0];
    return hit && hit.country ? normCountry(hit.country) : "";
  }

  /* ---------- lobby DOM ---------- */
  function onRooms() { return /^\/rooms\/?$/.test(location.pathname); }
  function lobbyList() { return doc.querySelector(".roomsCardsList"); }
  function lobbyCards() {
    return Array.prototype.filter.call(doc.querySelectorAll(".roomsCardsList .roomCard"), function (c) {
      return !c.closest(".sidedrawerWrapper, .ReactModalPortal, .sponsorsProfileWrapper");
    });
  }
  function cardTitle(card) {
    var h = card && card.querySelector(".orgName h6");
    return h ? h.textContent : "";
  }

  // Every university we know of: the fair's list plus any lobby card already loaded.
  function universities() {
    var map = {};
    (window.__INSPIRA_UNIVERSITIES__ || []).forEach(function (u) {
      if (!u || !u.name) return;
      map[nameKey(u.name)] = { country: u.isSupport ? "Event Support" : normCountry(u.country), support: !!u.isSupport };
    });
    lobbyCards().forEach(function (card) {
      var t = cardTitle(card);
      var k = nameKey(t);
      if (k && !map[k]) map[k] = { country: isSupport(t) ? "Event Support" : countryOf(t), support: isSupport(t) };
    });
    return map;
  }

  /* ---------- visited tracker ---------- */
  var visited = load(KEY_VISITED, []);
  if (!Array.isArray(visited)) visited = [];
  function isVisited(text) { return !isSupport(text) && visited.indexOf(nameKey(text)) !== -1; }
  function markVisited(text) {
    var k = nameKey(text);
    if (!k || isSupport(text) || visited.indexOf(k) !== -1) return;
    visited.push(k);
    save(KEY_VISITED, visited);
    schedule();
  }
  // Capture phase, no preventDefault: the platform's own clicks run exactly as before.
  doc.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var room = t.closest(".roomsCardsList .roomCard");
    if (room && t.closest(".bt-room-info, .roomCardMedia, .orgProfile, .cardActions, .orgName")) {
      markVisited(cardTitle(room));
      return;
    }
    var booth = t.closest(".exibitorCard");
    if (booth) {
      var h = booth.querySelector(".logoTextWrapper h3, h3");
      if (h) markVisited(h.textContent);
    }
  }, true);

  function badge(host, on) {
    var b = host.querySelector(":scope > .lx-visited-badge");
    if (on && !b) {
      b = doc.createElement("span");
      b.className = "lx-visited-badge";
      b.innerHTML = ICON.check + "<span>Visited</span>";
      host.appendChild(b);
    } else if (!on && b) {
      b.remove();
    }
  }
  function badges() {
    lobbyCards().forEach(function (card) {
      var on = isVisited(cardTitle(card));
      card.classList.toggle("lx-visited", on);
      badge(card, on);
    });
    Array.prototype.forEach.call(doc.querySelectorAll(".exibitorCard"), function (card) {
      var h = card.querySelector(".logoTextWrapper h3, h3");
      var on = !!h && isVisited(h.textContent);
      card.classList.toggle("lx-visited", on);
      badge(card, on);
    });
  }

  /* ---------- lobby toolbar: guide + progress + country chips ---------- */
  // Country chips filter the loaded cards here (the platform search can't match "U. S." and
  // "U.S." together) and ask the platform for the rest of the list while a filter is on.
  var currentCountry = "";
  var activeCountry = "";
  var loadTries = 0, lastCount = -1, lastNudge = 0;

  function cardCountry(card) {
    var t = cardTitle(card);
    return isSupport(t) ? "Event Support" : countryOf(t);
  }
  function cardColumn(card) {
    var col = card;
    while (col.parentElement && !col.parentElement.classList.contains("row") && !col.parentElement.classList.contains("roomsCardsList")) col = col.parentElement;
    return col;
  }
  function applyFilter(bar) {
    var cards = lobbyCards();
    var shown = 0;
    cards.forEach(function (card) {
      var hide = !!activeCountry && cardCountry(card) !== activeCountry;
      var col = cardColumn(card);
      if (col.classList.contains("lx-hide") !== hide) col.classList.toggle("lx-hide", hide);
      if (!hide) shown++;
    });
    if (activeCountry) {
      if (cards.length !== lastCount) { lastCount = cards.length; loadTries = 0; }
      if (loadTries < 4 && Date.now() - lastNudge > 700) {
        lastNudge = Date.now();
        loadTries++;
        // The platform loads the next page on scroll once its list looks short: collapse the list
        // for one synchronous layout, send the scroll signal, restore it (nothing is painted between).
        var row = cards.length ? cardColumn(cards[0]).parentElement : null;
        var kids = row ? Array.prototype.slice.call(row.children) : [];
        var prev = kids.map(function (c) { return c.style.display; });
        kids.forEach(function (c) { c.style.display = "none"; });
        void doc.documentElement.scrollHeight;
        window.dispatchEvent(new Event("scroll"));
        doc.dispatchEvent(new Event("scroll"));
        kids.forEach(function (c, j) { c.style.display = prev[j]; });
        setTimeout(schedule, 900);
      }
    }
    var empty = bar.querySelector(".lx-empty");
    var showEmpty = !!activeCountry && shown === 0 && loadTries >= 4;
    if (empty.hidden === showEmpty) empty.hidden = !showEmpty;
    if (showEmpty) setText(empty, "No " + activeCountry + " universities are in the lobby yet.");
  }

  function buildToolbar() {
    var bar = doc.createElement("div");
    bar.className = "lx-toolbar";
    bar.innerHTML =
      '<section class="lx-guide" aria-label="How the Virtual Lobby works">' +
        '<div class="lx-guide-head">' +
          '<div><span class="lx-guide-kicker">New here?</span>' +
          '<h3 class="lx-guide-title">How the Virtual Lobby works</h3></div>' +
          '<button type="button" class="lx-guide-close" aria-label="Hide this guide">&times;</button>' +
        "</div>" +
        '<ol class="lx-steps">' +
          '<li><span class="lx-step-ico">' + ICON.school + '</span><div><strong>1. Pick a university</strong><span>Browse the cards or filter by country below.</span></div></li>' +
          '<li><span class="lx-step-ico">' + ICON.info + '</span><div><strong>2. Tap Info</strong><span>See programmes, contacts and the admissions team.</span></div></li>' +
          '<li><span class="lx-step-ico">' + ICON.video + '</span><div><strong>3. Press <span class="lx-press">Enter</span></strong><span>Join the university\'s live video room once they open it, and ask your questions.</span></div></li>' +
        "</ol>" +
        '<button type="button" class="lx-guide-ok">Got it</button>' +
      "</section>" +
      '<section class="lx-panel" aria-label="Your progress and country filter">' +
        '<div class="lx-progress">' +
          '<p class="lx-progress-text"></p>' +
          '<div class="lx-progress-track" aria-hidden="true"><span class="lx-progress-fill"></span></div>' +
          '<button type="button" class="lx-guide-open">How it works</button>' +
        "</div>" +
        '<div class="lx-chips" role="group" aria-label="Filter universities by country"></div>' +
        '<p class="lx-empty" hidden></p>' +
      "</section>";

    function setGuide(done) {
      save(KEY_GUIDE, done);
      bar.classList.toggle("lx-guide-hidden", done);
    }
    bar.querySelector(".lx-guide-close").addEventListener("click", function () { setGuide(true); });
    bar.querySelector(".lx-guide-ok").addEventListener("click", function () { setGuide(true); });
    bar.querySelector(".lx-guide-open").addEventListener("click", function () { setGuide(false); });
    bar.querySelector(".lx-chips").addEventListener("click", function (e) {
      var chip = e.target.closest && e.target.closest(".lx-chip");
      if (!chip) return;
      var country = chip.getAttribute("data-country") || "";
      activeCountry = country === activeCountry ? "" : country;
      loadTries = 0;
      lastCount = -1;
      schedule();
    });
    bar.classList.toggle("lx-guide-hidden", !!load(KEY_GUIDE, false));
    return bar;
  }

  function lobby() {
    var old = doc.querySelector(".lx-toolbar");
    var list = lobbyList();
    if (!onRooms() || !list) {
      if (old) old.remove();
      activeCountry = "";
      return;
    }
    var bar = old || buildToolbar();
    if (bar.nextElementSibling !== list) list.parentNode.insertBefore(bar, list);

    var unis = universities();
    var counts = {};
    var hasSupport = false;
    var total = 0;
    var done = 0;
    Object.keys(unis).forEach(function (k) {
      var u = unis[k];
      if (u.support) { hasSupport = true; return; }
      total++;
      if (visited.indexOf(k) !== -1) done++;
      if (u.country) counts[u.country] = (counts[u.country] || 0) + 1;
    });

    // Lobby room names sometimes differ slightly from the university list ("Northwestern Qatar" /
    // "Northwestern University in Qatar"), so the total is the list's own count when we have it,
    // but never fewer than the rooms actually in the lobby (admins add universities after launch).
    var listTotal = (window.__INSPIRA_UNIVERSITIES__ || []).filter(function (u) { return u && u.name && !u.isSupport; }).length;
    var roomTotal = 0, seen = {};
    lobbyCards().forEach(function (card) {
      var t = cardTitle(card), k = nameKey(t);
      if (k && !isSupport(t) && !seen[k]) { seen[k] = true; roomTotal++; }
    });
    if (listTotal) total = Math.max(listTotal, roomTotal);
    if (done > total) done = total;

    var countries = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); });
    if (hasSupport) countries.push("Event Support");

    if (activeCountry && countries.indexOf(activeCountry) === -1) activeCountry = "";
    currentCountry = activeCountry;
    applyFilter(bar);

    // the signature lives on the toolbar, so a toolbar rebuilt after a platform re-render redraws its chips
    var sig = countries.join("|") + "#" + currentCountry;
    if (sig !== bar.__lxSig) {
      bar.__lxSig = sig;
      var html = '<button type="button" class="lx-chip' + (currentCountry === "" ? " is-active" : "") + '" data-country="" aria-pressed="' + (currentCountry === "") + '">All</button>';
      countries.forEach(function (c) {
        var on = c === currentCountry;
        html += '<button type="button" class="lx-chip' + (on ? " is-active" : "") + '" data-country="' + c.replace(/"/g, "&quot;") + '" aria-pressed="' + on + '">' + c.replace(/</g, "&lt;") + "</button>";
      });
      bar.querySelector(".lx-chips").innerHTML = html;
    }

    var text = done === 0
      ? "Start exploring: 0 of " + total + " universities visited"
      : done >= total
        ? "You've explored all " + total + " universities. Great job!"
        : "You've explored " + done + " of " + total + " universities";
    setText(bar.querySelector(".lx-progress-text"), text);
    var pct = total ? Math.round(done / total * 100) : 0;
    var fill = bar.querySelector(".lx-progress-fill");
    if (fill.style.width !== pct + "%") fill.style.width = pct + "%";

    // "Need help?" pressed on another page: open the help desk once the lobby is here
    var pending = false;
    try { pending = sessionStorage.getItem("lx_open_help") === "1"; } catch (e) { }
    if (pending && openHelpCard()) {
      try { sessionStorage.removeItem("lx_open_help"); } catch (e) { }
    }
  }

  /* ---------- fair status + help dock ---------- */
  function fmtEnd() {
    try {
      return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: CFG.timeZone }).format(new Date(END)) + " " + CFG.timeZoneLabel;
    } catch (e) { return "7:00 PM " + CFG.timeZoneLabel; }
  }
  function untilText(ms) {
    var m = Math.max(1, Math.round(ms / 60000));
    var d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
    if (d > 0) return d + "d " + h + "h";
    if (h > 0) return h + "h " + mm + "m";
    return mm + "m";
  }
  function status() {
    var now = Date.now();
    if (now < START) return { cls: "lx-soon", text: "Fair opens in " + untilText(START - now) };
    if (now < END) return { cls: "lx-live", text: "Live now · until " + fmtEnd() };
    return { cls: "lx-ended", text: "The fair has ended · thanks for joining" };
  }

  function openHelpCard() {
    var want = nameKey(CFG.helpDesk);
    var card = lobbyCards().filter(function (c) { return nameKey(cardTitle(c)) === want; })[0];
    if (!card) return false;
    var btn = card.querySelector(".bt-room-info") || card.querySelector(".roomCardMedia") || card.querySelector(".orgProfile");
    if (btn) btn.click();
    return !!btn;
  }
  function openHelpDesk() {
    if (onRooms() && openHelpCard()) return;
    try { sessionStorage.setItem("lx_open_help", "1"); } catch (e) { }
    var nav = Array.prototype.filter.call(doc.querySelectorAll(".headerWrapper .menuItem, .headerWrapper a, .mobileNav a"), function (el) {
      return /virtual lobby/i.test(el.textContent || "");
    })[0];
    if (nav) nav.click();
    else location.assign("/rooms");
  }

  function dock() {
    var el = doc.querySelector(".lx-dock");
    var show = !!doc.querySelector(".headerWrapper, .mobileNav") && !/^\/room\//.test(location.pathname);
    if (!show) { if (el) el.remove(); return; }
    if (!el) {
      el = doc.createElement("div");
      el.className = "lx-dock";
      el.innerHTML =
        '<span class="lx-status" role="status"><span class="lx-dot" aria-hidden="true"></span><span class="lx-status-text"></span></span>' +
        '<button type="button" class="lx-help">' + ICON.help + "<span>Need help?</span></button>";
      el.querySelector(".lx-help").addEventListener("click", openHelpDesk);
      doc.body.appendChild(el);
    }
    var s = status();
    var st = el.querySelector(".lx-status");
    if (st.getAttribute("data-state") !== s.cls) {
      st.className = "lx-status " + s.cls;
      st.setAttribute("data-state", s.cls);
    }
    setText(el.querySelector(".lx-status-text"), s.text);
  }

  /* ---------- run ---------- */
  var queued = false;
  // Students see "Enter" on the room buttons; hosts and university staff see "Start".
  // The guide names whichever button this viewer actually has.
  function pressLabel() {
    var el = doc.querySelector(".lx-press");
    if (!el) return;
    var start = 0, enter = 0;
    lobbyCards().forEach(function (card) {
      Array.prototype.forEach.call(card.querySelectorAll(".cardActions button, .cardActions a"), function (b) {
        var t = (b.textContent || "").trim();
        if (/^start$/i.test(t)) start++;
        else if (/^enter$/i.test(t)) enter++;
      });
    });
    setText(el, start > enter ? "Start" : "Enter");
  }

  function tick() {
    [lobby, badges, dock, pressLabel].forEach(function (fn) {
      try { fn(); } catch (err) { if (window.console) console.warn("[exp-ux]", err); }
    });
  }
  function schedule() {
    if (queued) return;
    queued = true;
    setTimeout(function () { queued = false; tick(); }, 150);
  }
  function start() {
    tick();
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var t = muts[i].target;
        if (t && t.nodeType === 1 && t.closest && t.closest(OWN)) continue;
        schedule();
        return;
      }
    }).observe(doc.body, { childList: true, subtree: true });
    setInterval(dock, 30000);
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", start);
  else start();
})();

/* Register ticket: keep the see-through notches (master.css) level with the dashed line. */
(function () {
  "use strict";
  if (window.__TICKET_NOTCH__) return;
  window.__TICKET_NOTCH__ = true;
  function place() {
    var t = document.querySelector(".inspira-ticket-v2-container");
    var p = t && t.querySelector(".inspira-ticket-perforation");
    if (!p || !p.offsetHeight) return;
    var y = Math.round(p.offsetTop + p.offsetHeight / 2) + "px";
    if (t.style.getPropertyValue("--tk-notch-y") !== y) t.style.setProperty("--tk-notch-y", y);
  }
  setInterval(place, 500);
  window.addEventListener("resize", place);
})();

/* Some rooms are tagged "VIRUTAL BOOTH" on the platform. Correct the text on screen only
   (the text node's value changes; the platform element and its behaviour stay as they are). */
(function () {
  "use strict";
  if (window.__TAG_TYPO__) return;
  window.__TAG_TYPO__ = true;
  function fix() {
    var roots = document.querySelectorAll(".roomsCardsList, .sidedrawerWrapper, .bottom-sheet__container, .roomPageWrapper");
    Array.prototype.forEach.call(roots, function (root) {
      var walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      for (var n = walk.nextNode(); n; n = walk.nextNode()) {
        if (/virutal/i.test(n.nodeValue)) {
          n.nodeValue = n.nodeValue.replace(/virutal/gi, function (m) { return m === m.toUpperCase() ? "VIRTUAL" : "Virtual"; });
        }
      }
    });
  }
  setInterval(fix, 800);
})();

/* University Info, lobby and popups: swap the grey placeholder logo/banner for the fallback above (display only). */
(function () {
  "use strict";
  if (window.__IMG_FALLBACK_LIVE__) return;
  window.__IMG_FALLBACK_LIVE__ = true;
  function nameOf(img) {
    var m = (img.alt || "").match(/^(?:Logo for the booth|Banner image \d* ?for (?:the )?(?:booth|room))\s+(.+)$/i);
    if (m) return m[1];
    var box = img.closest(".exibitorCard, .roomCard, .companyProfileFeeds, .DelegateSidebar, .mobDelegateSidebar");
    var h = box && box.querySelector(".orgName h6, h1, h2, h3, h4, h5, h6");
    if (h) return h.textContent;
    // a university page: its heading carries the name
    if (!/^\/booth\//.test(location.pathname)) return "";
    var hs = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    for (var i = 0; i < hs.length; i++) {
      if (window.__INSPIRA_IMG_FALLBACK__(hs[i].textContent, "logo")) return hs[i].textContent;
    }
    return "";
  }
  function swap() {
    var fb = window.__INSPIRA_IMG_FALLBACK__;
    if (!fb) return;
    Array.prototype.forEach.call(document.querySelectorAll('img[src*="exhibitor_default"], img[src*="exhibitor_cover"]'), function (img) {
      var banner = /exhibitor_cover/.test(img.getAttribute("src"));
      var url = fb(nameOf(img), banner ? "banner" : "logo");
      if (!url) return;
      img.setAttribute("src", url);
      if (img.hasAttribute("srcset")) img.removeAttribute("srcset");
      var box = banner && img.closest(".boothBanner.noMedia");
      if (box) box.classList.add("bt-fallback-media");
    });
  }
  setInterval(swap, 1000);
})();
