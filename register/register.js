(function () {
  "use strict";
  if (window.__INSPIRA_REGISTER__) return;
  window.__INSPIRA_REGISTER__ = true;

  // Official event time, from the event banner: Thursday 22 Oct 2026, 5:00 PM to 8:00 PM BRT.
  // Can be overridden before this script loads with window.INSPIRA_EVENT_CONFIG = { ... }.
  const EVENT = Object.assign({
    name: "Rede Inspira Virtual University Fair",
    start: "2026-10-22T17:00:00-03:00",
    end: "2026-10-22T20:00:00-03:00",
    timeZone: "America/Sao_Paulo",
    timeZoneLabel: "BRT",
    passImage: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3583_7137_630733001791452515.jpeg"
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

  function getUniversityCount() {
    const n = document.querySelectorAll(SELECTORS.cards).length;
    try {
      if (n > 0) {
        if (localStorage.getItem("inspira_univ_count") !== String(n)) localStorage.setItem("inspira_univ_count", String(n));
        return n;
      }
      return parseInt(localStorage.getItem("inspira_univ_count"), 10) || 0;
    } catch (e) {
      return n;
    }
  }

  function brandSubtitle(count) {
    return count ? `WebiFairs${SEP}${count} universities` : "WebiFairs";
  }

  function countryName(country) {
    const names = { "U.S.": "United States", "U.K.": "United Kingdom", "Global": "International" };
    return names[country] || country || "";
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
      return { date: "Thu 22 Oct 2026", time: "5:00 PM to 8:00 PM BRT" };
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
   * Injects the official Rede Inspira event brand into the empty header slot.
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
      <a href="#" class="inspira-nav-brand" title="Rede Inspira Virtual University Fair" style="text-decoration: none;">
        <span class="inspira-nav-badge">REDE INSPIRA</span>
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

      // Keep "--" until all four numbers can be read (never show invented numbers)
      if (d == null || h == null || m == null || s == null) return null;
      return {
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        mins: String(m).padStart(2, "0"),
        secs: String(s).padStart(2, "0"),
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
    const initialValues = extractCountdownNumbers();
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
          const fresh = extractCountdownNumbers();
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
        const currentVals = extractCountdownNumbers();
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
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3229_8454_656997001791455840.png",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1913_9109_433953001791455884.png",
      isSupport: true
    },
    {
      name: "Arizona State University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2870_6298_991499001791441452.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1403_7461_847442001791451733.png"
    },
    {
      name: "Cardiff University",
      country: "U.K.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4332_8030_291283001791458599.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1931_5835_256308001791459038.png"
    },
    {
      name: "Carleton University",
      country: "Canada",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2750_7111_967339001791453091.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3502_6982_021225001791454485.png"
    },
    {
      name: "Columbia College Chicago",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4749_8245_516730001791438436.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1910_9789_755265001791450828.jpeg"
    },
    {
      name: "Concordia University Wisconsin - Mequon, WI",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3290_9708_474407001791440985.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3981_6692_253003001791451189.png"
    },
    {
      name: "Creighton University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4806_9352_920827001791442399.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4581_8945_848891001791451954.png"
    },
    {
      name: "Ferris State University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3338_8378_568050001791456682.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4798_5927_150820001791454778.png"
    },
    {
      name: "Full Sail University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2274_5250_548582001791453802.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4228_8447_575055001791454848.png"
    },
    {
      name: "H\u00e4me University of Applied Sciences",
      country: "Finland",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3371_6023_132088001791442586.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1142_9741_201798001791452003.png"
    },
    {
      name: "Illinois Institute of Technology",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3829_8433_138719001791440473.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3117_7024_001444001791451591.png"
    },
    {
      name: "Kansas State University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4012_8958_666423001791453373.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1519_9684_326733001791454944.png"
    },
    {
      name: "Liverpool John Moores University",
      country: "U.K.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1736_5679_208486001791439869.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3627_6645_897969001791451415.png"
    },
    {
      name: "New Jersey Institute of Technology",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4800_9377_722120001791442017.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3554_8006_648338001791452746.jpeg"
    },
    {
      name: "North Central College",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4168_5482_127421001791440803.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2913_8291_076982001791452365.jpeg"
    },
    {
      name: "Ohio University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2026_9093_406167001791441547.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2827_9757_141954001791451782.png"
    },
    {
      name: "Pace University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3644_8030_888944001791453250.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2059_9446_364238001791455048.png"
    },
    {
      name: "Portland State University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4886_8140_648182001791456930.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1027_6532_303792001791455417.png"
    },
    {
      name: "Providence College",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2188_9189_391762001791440247.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3751_9143_392835001791452603.jpeg"
    },
    {
      name: "Stony Brook University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2500_5864_681839001791454556.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4608_5094_845637001791455500.png"
    },
    {
      name: "Syracuse University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1952_8692_138286001791453587.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2581_7109_070294001791455559.png"
    },
    {
      name: "Texas Tech University",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2991_8094_162858001791441122.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2302_7287_899615001791452300.jpeg"
    },
    {
      name: "UCLL University of Applied Sciences",
      country: "Belgium",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2555_7980_476695001791454095.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2730_8012_700790001791456356.png"
    },
    {
      name: "University College Utrecht",
      country: "Netherlands",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3557_8268_142678001791456203.png",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3770_9480_538265001791456150.png"
    },
    {
      name: "University of Alberta",
      country: "Canada",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3441_8436_532443001791450016.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/2207_9504_317547001791456041.png"
    },
    {
      name: "University of Oklahoma",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/3908_7092_254241001791457850.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/1544_6008_591898001791455769.png"
    },
    {
      name: "University of Southern Mississippi",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2299_8295_558320001791441156.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/4829_7032_537040001791452435.png"
    },
    {
      name: "University of the Highlands and Islands",
      country: "U.K.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/1936_8708_196274001791440758.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3757_8663_965450001791451659.png"
    },
    {
      name: "University of West Florida",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/2110_9663_437030001791439302.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3583_7137_630733001791452515.jpeg"
    },
    {
      name: "Washington College",
      country: "U.S.",
      logo: "https://cdn.hubilo.com/exhibitor/3380930/300/4934_5997_340363001791456894.jpg",
      banner: "https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3325_5205_399346001791455675.png"
    },
    {
      name: "WHU \u2013 Otto Beisheim School of Management",
      country: "Germany",
      logo: "https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    },
    {
      name: "York St John University",
      country: "U.K.",
      logo: "https://cdn.hubilo.com/comm_v2/images/profile/exhibitor_default.png",
      banner: "https://cdn.hubilo.com/comm_v2/images/cover/exhibitor_cover.png"
    }
  ];

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
          country = parts[1].trim();
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
              ${escapeHTML(country)}
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
   * 6. DIRECTORY LIVE SEARCH, COUNTRY FILTER & CARD DESIGN SWITCHER
   * Injects an interactive search input, country pills, and design switcher
   * right above the 32 university cards for effortless exploration.
   */
  function initDirectorySearchAndFilter() {
    const section = document.querySelector(SELECTORS.universitiesSection);
    const grid = document.querySelector(SELECTORS.cardGrid);
    if (!section || !grid) return;

    const cardColumns = Array.from(grid.children).filter(c => !c.classList.contains("univ-empty-state"));
    if (!cardColumns.length) return;

    let filterContainer = section.querySelector(".univ-filter-container");
    if (filterContainer) {
      updateFilterCounts(cardColumns, filterContainer);
      return;
    }

    const allCount = cardColumns.length;
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
      <div class="univ-country-filters" role="group" aria-label="Filter universities by region">
        <button type="button" class="univ-filter-pill active" data-filter="all">All <span class="univ-filter-count">(${allCount})</span></button>
        <button type="button" class="univ-filter-pill" data-filter="u.s.">U.S. <span class="univ-filter-count"></span></button>
        <button type="button" class="univ-filter-pill" data-filter="u.k.">U.K. <span class="univ-filter-count"></span></button>
        <button type="button" class="univ-filter-pill" data-filter="canada">Canada <span class="univ-filter-count"></span></button>
        <button type="button" class="univ-filter-pill" data-filter="europe">Europe <span class="univ-filter-count"></span></button>
      </div>
    `;

    grid.parentNode.insertBefore(filterContainer, grid);

    updateFilterCounts(cardColumns, filterContainer);

    const searchInput = filterContainer.querySelector("#univSearchInput");
    const pills = filterContainer.querySelectorAll(".univ-filter-pill");

    let currentFilter = "all";
    let searchQuery = "";

    function applyFilter() {
      let visibleCount = 0;
      const q = searchQuery.toLowerCase().trim();

      cardColumns.forEach((col) => {
        const text = col.textContent.toLowerCase();
        const matchesCountry = inRegion(text, currentFilter);

        const matchesSearch = !q || text.includes(q);

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
            <button type="button" id="resetUnivFilterBtn" class="univ-empty-reset">Show all ${cardColumns.length} universities</button>
          `;
          grid.appendChild(emptyMsg);
          emptyMsg.querySelector("#resetUnivFilterBtn").addEventListener("click", () => {
            searchInput.value = "";
            searchQuery = "";
            currentFilter = "all";
            pills.forEach((p) => p.classList.toggle("active", p.dataset.filter === "all"));
            applyFilter();
          });
        }
        emptyMsg.style.display = "block";
      } else if (emptyMsg) {
        emptyMsg.style.display = "none";
      }
    }

    searchInput.addEventListener("input", function (e) {
      searchQuery = e.target.value;
      applyFilter();
    });

    pills.forEach((pill) => {
      pill.addEventListener("click", function () {
        pills.forEach((p) => p.classList.remove("active"));
        this.classList.add("active");
        currentFilter = this.dataset.filter;
        applyFilter();
      });
    });
  }

  function updateFilterCounts(columns, container) {
    let us = 0, uk = 0, canada = 0, europe = 0;
    columns.forEach((col) => {
      const text = col.textContent.toLowerCase();
      if (inRegion(text, "u.s.")) us++;
      if (inRegion(text, "u.k.")) uk++;
      if (inRegion(text, "canada")) canada++;
      if (inRegion(text, "europe")) europe++;
    });

    const allPill = container.querySelector('[data-filter="all"] .univ-filter-count');
    const usCount = container.querySelector('[data-filter="u.s."] .univ-filter-count');
    const ukCount = container.querySelector('[data-filter="u.k."] .univ-filter-count');
    const canCount = container.querySelector('[data-filter="canada"] .univ-filter-count');
    const eurCount = container.querySelector('[data-filter="europe"] .univ-filter-count');

    if (allPill) allPill.textContent = `(${columns.length})`;
    if (usCount) usCount.textContent = `(${us})`;
    if (ukCount) ukCount.textContent = `(${uk})`;
    if (canCount) canCount.textContent = `(${canada})`;
    if (eurCount) eurCount.textContent = `(${europe})`;
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
          if (!e.target.closest(".MuiDrawer-paper, .MuiDialog-paper, [class*='modalContentStyle'], .MuiModal-root .MuiBox-root[tabindex='-1'], .MuiModal-root:not(.MuiDrawer-root) > div:not(.MuiBackdrop-root)")) {
            e.preventDefault();
            e.stopPropagation();
            dismissModalPopup();
          }
        });
      }
    });

    const drawerPaper = document.querySelector(
      ".MuiDrawer-root .MuiDrawer-paper, .MuiDrawer-paper, .MuiModal-root [class*='modalContentStyle'], .MuiDialog-paper"
    );
    if (!drawerPaper || drawerPaper.offsetHeight === 0) {
      const cached = document.querySelectorAll("[data-inspira-exhibitor-enhanced]");
      cached.forEach((el) => el.removeAttribute("data-inspira-exhibitor-enhanced"));
      document.querySelectorAll(".card-selected").forEach((c) => c.classList.remove("card-selected"));
      return;
    }

    // Hubilo's close button natively dispatches React modal dismissal; no custom listener needed

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
          ${SVG_ICONS.filterPill} ACADEMIC PROGRAMS AND MAJORS
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
      initBackdropDismissal
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
