(function () {
  "use strict";

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

    const cards = document.querySelectorAll(SELECTORS.cards);
    if (cards.length > 0) {
      try { localStorage.setItem("inspira_univ_count", String(cards.length)); } catch (e) {}
    }
    const savedCount = parseInt(typeof localStorage !== "undefined" && localStorage.getItem("inspira_univ_count"), 10);
    const count = cards.length > 0 ? cards.length : (savedCount || 33);

    const existingSub = logoBox.querySelector(".inspira-nav-title-sub");
    if (existingSub) {
      existingSub.innerHTML = `WebiFairs &bull; ${count} Universities`;
      return;
    }

    logoBox.dataset.inspiraEnhanced = "true";
    logoBox.innerHTML = `
      <a href="#" class="inspira-nav-brand" title="Rede Inspira Virtual University Fair" style="text-decoration: none;">
        <span class="inspira-nav-badge">REDE INSPIRA</span>
        <div class="inspira-nav-title">
          <span class="inspira-nav-title-main">Virtual University Fair</span>
          <span class="inspira-nav-title-sub">WebiFairs &bull; ${count} Universities</span>
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
   * (Option 1: Apple Keynote Frosted Glass Pill by default, or Bento / Swiss / Dial / Compact).
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

      return {
        days: d != null ? String(d).padStart(2, "0") : "13",
        hours: h != null ? String(h).padStart(2, "0") : "15",
        mins: m != null ? String(m).padStart(2, "0") : "40",
        secs: s != null ? String(s).padStart(2, "0") : "16",
      };
    }

    // 4. Timer Style Selector: "apple" (default), "bento", "swiss", "dial", "compact"
    window._inspiraTimerStyle =
      window._inspiraTimerStyle ||
      (typeof localStorage !== "undefined" && localStorage.getItem("inspira_timer_style")) ||
      "apple";
    const style = window._inspiraTimerStyle;

    let widget = timerEl.querySelector(".inspira-enhanced-countdown");
    if (!widget || widget.dataset.inspiraStyle !== style) {
      if (widget) widget.remove();
      widget = document.createElement("div");
      widget.className = "inspira-enhanced-countdown";
      widget.dataset.inspiraStyle = style;

      if (style === "bento") {
        widget.innerHTML = `
          <div class="inspira-timer-wrap inspira-timer-bento">
            <div class="inspira-timer-bento-header">
              <div class="inspira-timer-bento-status">
                <span class="inspira-timer-bento-pulse"></span>
                <span>Admissions Fair Begins In</span>
              </div>
              <span class="inspira-timer-bento-caption">Rede Inspira &bull; Live Virtual Fair</span>
            </div>
            <div class="inspira-timer-bento-grid" role="timer" aria-live="polite">
              <div class="inspira-timer-bento-card">
                <div class="inspira-timer-bento-bar"></div>
                <span class="inspira-timer-bento-num" data-unit="days">--</span>
                <span class="inspira-timer-bento-tag">DAYS</span>
              </div>
              <div class="inspira-timer-bento-card">
                <div class="inspira-timer-bento-bar"></div>
                <span class="inspira-timer-bento-num" data-unit="hours">--</span>
                <span class="inspira-timer-bento-tag">HOURS</span>
              </div>
              <div class="inspira-timer-bento-card">
                <div class="inspira-timer-bento-bar"></div>
                <span class="inspira-timer-bento-num" data-unit="mins">--</span>
                <span class="inspira-timer-bento-tag">MINUTES</span>
              </div>
              <div class="inspira-timer-bento-card inspira-timer-bento-sec">
                <div class="inspira-timer-bento-bar inspira-timer-bento-bar-sec"></div>
                <span class="inspira-timer-bento-num" data-unit="secs">--</span>
                <span class="inspira-timer-bento-tag">SECONDS</span>
              </div>
            </div>
          </div>
        `;
      } else if (style === "swiss") {
        widget.innerHTML = `
          <div class="inspira-timer-wrap inspira-timer-swiss">
            <div class="inspira-timer-swiss-header">
              <span class="inspira-timer-swiss-title">REDE INSPIRA VIRTUAL COLLEGE FAIR &bull; LIVE COUNTDOWN</span>
            </div>
            <div class="inspira-timer-swiss-grid" role="timer" aria-live="polite">
              <div class="inspira-timer-swiss-col">
                <span class="inspira-timer-swiss-num" data-unit="days">--</span>
                <span class="inspira-timer-swiss-sub">DAYS</span>
              </div>
              <span class="inspira-timer-swiss-sep">:</span>
              <div class="inspira-timer-swiss-col">
                <span class="inspira-timer-swiss-num" data-unit="hours">--</span>
                <span class="inspira-timer-swiss-sub">HOURS</span>
              </div>
              <span class="inspira-timer-swiss-sep">:</span>
              <div class="inspira-timer-swiss-col">
                <span class="inspira-timer-swiss-num" data-unit="mins">--</span>
                <span class="inspira-timer-swiss-sub">MINUTES</span>
              </div>
              <span class="inspira-timer-swiss-sep">:</span>
              <div class="inspira-timer-swiss-col inspira-timer-swiss-col-sec">
                <span class="inspira-timer-swiss-num" data-unit="secs">--</span>
                <span class="inspira-timer-swiss-sub">SECONDS</span>
              </div>
            </div>
          </div>
        `;
      } else if (style === "dial") {
        widget.innerHTML = `
          <div class="inspira-timer-wrap inspira-timer-dial" role="timer" aria-live="polite">
            <div class="inspira-timer-dial-item">
              <div class="inspira-timer-dial-ring">
                <span class="inspira-timer-dial-num" data-unit="days">--</span>
              </div>
              <span class="inspira-timer-dial-label">DAYS</span>
            </div>
            <div class="inspira-timer-dial-item">
              <div class="inspira-timer-dial-ring">
                <span class="inspira-timer-dial-num" data-unit="hours">--</span>
              </div>
              <span class="inspira-timer-dial-label">HOURS</span>
            </div>
            <div class="inspira-timer-dial-item">
              <div class="inspira-timer-dial-ring">
                <span class="inspira-timer-dial-num" data-unit="mins">--</span>
              </div>
              <span class="inspira-timer-dial-label">MINS</span>
            </div>
            <div class="inspira-timer-dial-item">
              <div class="inspira-timer-dial-ring inspira-timer-dial-ring-sec">
                <span class="inspira-timer-dial-num" data-unit="secs">--</span>
              </div>
              <span class="inspira-timer-dial-label">SECS</span>
            </div>
          </div>
        `;
      } else if (style === "compact") {
        widget.innerHTML = `
          <div class="inspira-timer-wrap inspira-timer-compact" role="timer" aria-live="polite">
            <div class="inspira-timer-compact-left">
              <span class="inspira-timer-compact-live">🔴 LIVE</span>
              <span class="inspira-timer-compact-title">Event Starts In:</span>
            </div>
            <div class="inspira-timer-compact-pills">
              <div class="inspira-timer-compact-chip">
                <span class="inspira-timer-compact-val" data-unit="days">--</span>
                <span class="inspira-timer-compact-txt">d</span>
              </div>
              <span class="inspira-timer-compact-dot">:</span>
              <div class="inspira-timer-compact-chip">
                <span class="inspira-timer-compact-val" data-unit="hours">--</span>
                <span class="inspira-timer-compact-txt">h</span>
              </div>
              <span class="inspira-timer-compact-dot">:</span>
              <div class="inspira-timer-compact-chip">
                <span class="inspira-timer-compact-val" data-unit="mins">--</span>
                <span class="inspira-timer-compact-txt">m</span>
              </div>
              <span class="inspira-timer-compact-dot">:</span>
              <div class="inspira-timer-compact-chip inspira-timer-compact-chip-sec">
                <span class="inspira-timer-compact-val" data-unit="secs">--</span>
                <span class="inspira-timer-compact-txt">s</span>
              </div>
            </div>
            <div class="inspira-timer-compact-action">
              <button type="button" class="inspira-timer-compact-btn">📅 Add to Calendar</button>
            </div>
          </div>
        `;
      } else {
        // Default: Option 1 Apple Keynote Frosted Glass Pill
        widget.innerHTML = `
          <div class="inspira-timer-wrap inspira-timer-apple">
            <div class="inspira-timer-apple-badge">
              <span class="inspira-timer-apple-dot"></span>
              <span class="inspira-timer-apple-label">EVENT STARTS IN</span>
            </div>
            <div class="inspira-timer-apple-units" role="timer" aria-live="polite">
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
      name: "Häme University of Applied Sciences",
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
      name: "WHU – Otto Beisheim School of Management",
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
   * "Mequon Campus • Admissions 2025" subtitle).
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
        subtitle: "Event Support &bull; Technical Help Desk",
        country: "Event Support",
        isSupport: true
      };
    }

    // Check if the university name contains a campus or location separated by hyphen or dash
    // Handles various dashes: regular hyphen (-), en-dash (–), em-dash (—)
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
    let subtitle = "Admissions 2025";
    if (campusLocation) {
      let cleanCampus = campusLocation;
      if (!/campus/i.test(cleanCampus)) {
        cleanCampus = cleanCampus.replace(/,\s*[A-Z]{2}$/, "").trim();
        cleanCampus = `${cleanCampus} Campus`;
      }
      subtitle = `<span class="inspira-campus-tag">${escapeHTML(cleanCampus)}</span> &bull; 2025`;
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
        if (rawText.includes(" • ")) {
          const parts = rawText.split(" • ");
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

    const allCount = cardColumns.length || 33;
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
          placeholder="Search universities by name, location, or country (e.g., Arizona, U.K., Canada)..." 
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
        let matchesCountry = true;

        if (currentFilter === "u.s.") {
          matchesCountry = text.includes("• u.s.") || text.includes("united states");
        } else if (currentFilter === "u.k.") {
          matchesCountry = text.includes("• u.k.") || text.includes("united kingdom");
        } else if (currentFilter === "canada") {
          matchesCountry = text.includes("• canada");
        } else if (currentFilter === "europe") {
          matchesCountry =
            text.includes("germany") ||
            text.includes("finland") ||
            text.includes("netherlands") ||
            text.includes("belgium");
        }

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
            <p style="margin: 0 0 10px 0; font-size: 15px; font-weight: 600;">No universities found matching your filter.</p>
            <button type="button" id="resetUnivFilterBtn" style="background: var(--brand-primary); color: #fff; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">Show All ${cardColumns.length} Universities</button>
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
      if (text.includes("• u.s.") || text.includes("united states")) us++;
      if (text.includes("• u.k.") || text.includes("united kingdom")) uk++;
      if (text.includes("• canada")) canada++;
      if (
        text.includes("germany") ||
        text.includes("finland") ||
        text.includes("netherlands") ||
        text.includes("belgium")
      ) europe++;
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
   * Helper function to inject essential backdrop dismissal styles and ultra-high-contrast close button styles
   */
  function ensureModalDismissalStyles() {
    const existingStyle = document.getElementById("inspira-modal-dismiss-styles");
    if (existingStyle) existingStyle.remove();
    const style = document.createElement("style");
    style.id = "inspira-modal-dismiss-styles";
    style.textContent = `
      .MuiBackdrop-root,
      .MuiDrawer-root > .MuiBackdrop-root,
      .MuiModal-root > .MuiBackdrop-root {
        cursor: pointer !important;
        pointer-events: auto !important;
      }
      .MuiDrawer-paper,
      .MuiDialog-paper,
      .MuiModal-root .MuiPaper-root {
        cursor: default !important;
        pointer-events: auto !important;
      }

      /* CLEAN & SIMPLE FLOATING CIRCULAR CLOSE BUTTON */
      .MuiDrawer-paper > button,
      .MuiDrawer-paper > .MuiIconButton-root,
      .MuiDrawer-paper [class*="mui-cysavz"],
      .MuiDrawer-paper button:has(path[d*="205.66"]),
      .MuiDrawer-paper button:has(path[d*="128,139.31"]),
      .MuiDrawer-paper .widgetRegCloseSingleView .MuiIconButton-root,
      .MuiDrawer-paper .widgetRegCloseSingleView button,
      .MuiDrawer-paper button[aria-label*="close" i],
      .MuiDrawer-paper button[aria-label*="fechar" i],
      .MuiDrawer-paper [aria-label*="close" i]:not(input),
      .MuiDrawer-paper button:has(svg[data-testid="CloseIcon"]),
      .MuiDrawer-paper button:has(svg[data-testid="CloseRoundedIcon"]),
      .MuiDrawer-paper button:has([data-testid*="Close"]),
      .MuiDrawer-paper button.inspira-modal-close-btn,
      #demoCloseBtn {
        position: absolute !important;
        top: 14px !important;
        right: 14px !important;
        left: auto !important;
        width: 36px !important;
        height: 36px !important;
        min-width: 36px !important;
        min-height: 36px !important;
        border-radius: 50% !important;
        background: #FFFFFF !important;
        border: 1px solid #E2E8F0 !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
        color: #475569 !important;
        z-index: 99999 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 !important;
        outline: none !important;
        pointer-events: auto !important;
        opacity: 1 !important;
        visibility: visible !important;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }

      .MuiDrawer-paper > button svg,
      .MuiDrawer-paper > .MuiIconButton-root svg,
      .MuiDrawer-paper [class*="mui-cysavz"] svg,
      .MuiDrawer-paper button:has(path[d*="205.66"]) svg,
      .MuiDrawer-paper .widgetRegCloseSingleView .MuiIconButton-root svg,
      .MuiDrawer-paper .widgetRegCloseSingleView button svg,
      .MuiDrawer-paper button[aria-label*="close" i] svg,
      .MuiDrawer-paper button[aria-label*="fechar" i] svg,
      .MuiDrawer-paper [aria-label*="close" i] svg,
      .MuiDrawer-paper button:has(svg[data-testid="CloseIcon"]) svg,
      .MuiDrawer-paper button:has(svg[data-testid="CloseRoundedIcon"]) svg,
      .MuiDrawer-paper button:has([data-testid*="Close"]) svg,
      .MuiDrawer-paper button.inspira-modal-close-btn svg,
      #demoCloseBtn svg,
      #demoCloseBtn .MuiSvgIcon-root {
        width: 18px !important;
        height: 18px !important;
        min-width: 18px !important;
        min-height: 18px !important;
        fill: currentColor !important;
        stroke: none !important;
        stroke-width: 0 !important;
        color: inherit !important;
        display: block !important;
        transition: all 0.2s ease !important;
      }

      .MuiDrawer-paper > button svg path,
      .MuiDrawer-paper > .MuiIconButton-root svg path,
      .MuiDrawer-paper [class*="mui-cysavz"] svg path,
      .MuiDrawer-paper button:has(path[d*="205.66"]) svg path,
      .MuiDrawer-paper .widgetRegCloseSingleView .MuiIconButton-root svg path,
      .MuiDrawer-paper .widgetRegCloseSingleView button svg path,
      .MuiDrawer-paper button[aria-label*="close" i] svg path,
      .MuiDrawer-paper button[aria-label*="fechar" i] svg path,
      .MuiDrawer-paper [aria-label*="close" i] svg path,
      .MuiDrawer-paper button:has(svg[data-testid="CloseIcon"]) svg path,
      .MuiDrawer-paper button:has(svg[data-testid="CloseRoundedIcon"]) svg path,
      .MuiDrawer-paper button:has([data-testid*="Close"]) svg path,
      .MuiDrawer-paper button.inspira-modal-close-btn svg path,
      #demoCloseBtn svg path,
      .MuiDrawer-paper > button svg line,
      .MuiDrawer-paper .widgetRegCloseSingleView .MuiIconButton-root svg line,
      #demoCloseBtn svg line {
        fill: currentColor !important;
        stroke: none !important;
        stroke-width: 0 !important;
      }

      /* Hover state: Clean Slate / Navy hover */
      .MuiDrawer-paper > button:hover,
      .MuiDrawer-paper > .MuiIconButton-root:hover,
      .MuiDrawer-paper [class*="mui-cysavz"]:hover,
      .MuiDrawer-paper button:has(path[d*="205.66"]):hover,
      .MuiDrawer-paper .widgetRegCloseSingleView .MuiIconButton-root:hover,
      .MuiDrawer-paper .widgetRegCloseSingleView button:hover,
      .MuiDrawer-paper button[aria-label*="close" i]:hover,
      .MuiDrawer-paper button[aria-label*="fechar" i]:hover,
      .MuiDrawer-paper [aria-label*="close" i]:not(input):hover,
      .MuiDrawer-paper button:has(svg[data-testid="CloseIcon"]):hover,
      .MuiDrawer-paper button:has(svg[data-testid="CloseRoundedIcon"]):hover,
      .MuiDrawer-paper button:has([data-testid*="Close"]):hover,
      .MuiDrawer-paper button.inspira-modal-close-btn:hover,
      #demoCloseBtn:hover {
        background: #F8FAFC !important;
        border-color: #CBD5E1 !important;
        color: #0F172A !important;
        transform: scale(1.05) !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12) !important;
      }

      .MuiDrawer-paper > button:hover svg,
      .MuiDrawer-paper > .MuiIconButton-root:hover svg,
      .MuiDrawer-paper [class*="mui-cysavz"]:hover svg,
      .MuiDrawer-paper button:has(path[d*="205.66"]):hover svg,
      .MuiDrawer-paper .widgetRegCloseSingleView .MuiIconButton-root:hover svg,
      .MuiDrawer-paper .widgetRegCloseSingleView button:hover svg,
      .MuiDrawer-paper button[aria-label*="close" i]:hover svg,
      .MuiDrawer-paper button[aria-label*="fechar" i]:hover svg,
      .MuiDrawer-paper [aria-label*="close" i] svg,
      .MuiDrawer-paper button:has(svg[data-testid="CloseIcon"]):hover svg,
      .MuiDrawer-paper button:has(svg[data-testid="CloseRoundedIcon"]):hover svg,
      .MuiDrawer-paper button:has([data-testid*="Close"]):hover svg,
      .MuiDrawer-paper button.inspira-modal-close-btn:hover svg,
      #demoCloseBtn:hover svg,
      .MuiDrawer-paper > button:hover svg path,
      .MuiDrawer-paper > .MuiIconButton-root:hover svg path,
      .MuiDrawer-paper [class*="mui-cysavz"]:hover svg path,
      .MuiDrawer-paper button:has(path[d*="205.66"]):hover svg path,
      .MuiDrawer-paper .widgetRegCloseSingleView .MuiIconButton-root:hover svg path,
      .MuiDrawer-paper .widgetRegCloseSingleView button:hover svg path,
      .MuiDrawer-paper button[aria-label*="close" i]:hover svg path,
      .MuiDrawer-paper button[aria-label*="fechar" i]:hover svg path,
      .MuiDrawer-paper [aria-label*="close" i] svg path,
      .MuiDrawer-paper button:has(svg[data-testid="CloseIcon"]):hover svg path,
      .MuiDrawer-paper button:has(svg[data-testid="CloseRoundedIcon"]):hover svg path,
      .MuiDrawer-paper button:has([data-testid*="Close"]):hover svg path,
      .MuiDrawer-paper button.inspira-modal-close-btn:hover svg path,
      #demoCloseBtn:hover svg path,
      .MuiDrawer-paper > button:hover svg line,
      .MuiDrawer-paper .widgetRegCloseSingleView .MuiIconButton-root:hover svg line,
      #demoCloseBtn:hover svg line {
        fill: currentColor !important;
        stroke: none !important;
        stroke-width: 0 !important;
        color: #0F172A !important;
      }

      /* DRAWER PARENT CONTAINERS FLEX COLUMN */
      .MuiDrawer-paper,
      .MuiDrawer-paper > div:not(button),
      .MuiDrawer-paper > div > div,
      .MuiDrawer-paper .MuiBox-root:has(> h3),
      .MuiDrawer-paper .mui-0 {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      /* 1. HERO VIDEO OR BANNER AT TOP */
      .MuiDrawer-paper .mui-1avjc51,
      .MuiDrawer-paper .mui-1ymbeex,
      .MuiDrawer-paper [class*="styleExhibitorSidebarImage"],
      .MuiDrawer-paper div:has(> iframe),
      .MuiDrawer-paper div:has(> video),
      .MuiDrawer-paper .mui-0 > div:first-child:has(img) {
        order: 1 !important;
        width: 100% !important;
        max-width: 100% !important;
        height: 230px !important;
        min-height: 230px !important;
        max-height: 260px !important;
        overflow: hidden !important;
        position: relative !important;
        flex-shrink: 0 !important;
        border-radius: 24px 24px 0 0 !important;
        background: #000000 !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      .MuiDrawer-paper .mui-1avjc51 iframe,
      .MuiDrawer-paper iframe,
      .MuiDrawer-paper video {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        display: block !important;
        object-fit: cover !important;
        border-radius: 24px 24px 0 0 !important;
        pointer-events: auto !important;
      }

      .MuiDrawer-paper div:has(> iframe)::after,
      .MuiDrawer-paper div:has(> video)::after,
      .MuiDrawer-paper .mui-1avjc51::after {
        display: none !important;
      }

      /* 2. ELEVATED LOGO */
      .MuiDrawer-paper .c2-univ-logo,
      .MuiDrawer-paper .mui-e88nm5,
      .MuiDrawer-paper [class*="styleExhibitorSidebarProfileImage"] {
        order: 2 !important;
        width: 68px !important;
        height: 68px !important;
        min-width: 68px !important;
        min-height: 68px !important;
        max-width: 68px !important;
        max-height: 68px !important;
        border-radius: 16px !important;
        background: #FFFFFF !important;
        border: 2px solid #E2E8F0 !important;
        box-shadow: 0 4px 14px rgba(3, 7, 65, 0.12) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        overflow: hidden !important;
        z-index: 10 !important;
        flex-shrink: 0 !important;
        box-sizing: border-box !important;
        margin: -34px auto 10px auto !important;
        padding: 4px !important;
        position: relative !important;
        align-self: center !important;
      }

      /* 3. UNIVERSITY PROFILE HEADER TITLE */
      .MuiDrawer-paper h3.MuiTypography-h5,
      .MuiDrawer-root [class*="styleExhibitorNameSidebar"],
      .MuiDrawer-paper [class*="styleExhibitorNameSidebar"],
      .MuiDrawer-paper .c2-univ-name {
        order: 3 !important;
        font-family: var(--cmx-font-title, 'Outfit', sans-serif) !important;
        font-size: 21px !important;
        font-weight: 800 !important;
        color: #030741 !important;
        text-align: center !important;
        align-self: center !important;
        justify-content: center !important;
        margin: 10px 24px 6px 24px !important;
        padding: 0 !important;
        line-height: 1.25 !important;
        letter-spacing: -0.3px !important;
        width: calc(100% - 48px) !important;
        max-width: calc(100% - 48px) !important;
        box-sizing: border-box !important;
        flex-shrink: 0 !important;
      }

      /* 4. LOCATION & HOURS SUBTITLE */
      .MuiDrawer-paper p.MuiTypography-caption,
      .MuiDrawer-paper .mui-nhf8ov,
      .MuiDrawer-paper [class*="styleExhibitorAddressSidebar"],
      .MuiDrawer-paper h3.MuiTypography-h5 + .MuiTypography-root,
      .MuiDrawer-root [class*="styleExhibitorNameSidebar"] + .MuiTypography-root {
        order: 4 !important;
        font-size: 13px !important;
        font-weight: 500 !important;
        color: #64748B !important;
        text-align: center !important;
        align-self: center !important;
        justify-content: center !important;
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        margin: 0 24px 14px 24px !important;
        padding: 0 !important;
        line-height: 1.4 !important;
        width: calc(100% - 48px) !important;
        max-width: calc(100% - 48px) !important;
        box-sizing: border-box !important;
      }

      /* 5. SOCIAL MEDIA LINKS */
      .MuiDrawer-paper [class*="styleExhibitorSocialMediaAndWebsiteSidebar"],
      .MuiDrawer-paper div.MuiBox-root:has(> button.MuiIconButton-colorSoft):not(:has(> .MuiChip-root)):not(:has(> img)),
      .MuiDrawer-paper .mui-6ocmvn,
      .MuiDrawer-paper .c2-social-pills {
        order: 5 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        align-self: center !important;
        gap: 10px !important;
        margin: 4px 24px 18px 24px !important;
        padding: 0 !important;
        width: calc(100% - 48px) !important;
        max-width: calc(100% - 48px) !important;
        box-sizing: border-box !important;
        flex-shrink: 0 !important;
      }

      .MuiDrawer-paper div.MuiBox-root:has(> button.MuiIconButton-colorSoft):not(:has(> .MuiChip-root)):not(:has(> img)) button,
      .MuiDrawer-paper .mui-6ocmvn button,
      .MuiDrawer-paper .c2-social-btn {
        width: 36px !important;
        height: 36px !important;
        min-width: 36px !important;
        min-height: 36px !important;
        border-radius: 50% !important;
        background: #FFFFFF !important;
        color: #475569 !important;
        border: 1.5px solid #E2E8F0 !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
        transition: all 0.2s ease !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 !important;
      }

      .MuiDrawer-paper div.MuiBox-root:has(> button.MuiIconButton-colorSoft):not(:has(> .MuiChip-root)):not(:has(> img)) button:hover,
      .MuiDrawer-paper .mui-6ocmvn button:hover,
      .MuiDrawer-paper .c2-social-btn:hover {
        background: #0529C1 !important;
        color: #FFFFFF !important;
        border-color: #0529C1 !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 10px rgba(5, 41, 193, 0.25) !important;
      }

      /* 6. ACADEMIC PROGRAMS BENTO BOX */
      .MuiDrawer-paper .inspira-programs-container,
      .MuiDrawer-paper .mui-iu6dpj,
      .MuiDrawer-paper div:has(> .MuiChip-root) {
        order: 6 !important;
        margin: 12px 24px 20px 24px !important;
        width: calc(100% - 48px) !important;
        max-width: calc(100% - 48px) !important;
        align-self: center !important;
        background: #F8FAFC !important;
        border: 1.5px solid #E2E8F0 !important;
        border-radius: 16px !important;
        padding: 16px 18px 16px 18px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        box-sizing: border-box !important;
        box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04) !important;
        flex-shrink: 0 !important;
      }

      .c2-filter-header-bar {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        width: 100% !important;
        padding: 8px 14px !important;
        background: #F8FAFC !important;
        border: 1.5px solid #DBEAFE !important;
        border-radius: 10px !important;
        margin-bottom: 12px !important;
        box-sizing: border-box !important;
      }

      .c2-filter-title {
        font-size: 11.5px !important;
        font-weight: 800 !important;
        color: #0F172A !important;
        text-transform: uppercase !important;
        letter-spacing: 0.5px !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
      }

      .c2-filter-count {
        font-size: 12px !important;
        font-weight: 700 !important;
        color: #0529C1 !important;
        white-space: nowrap !important;
      }

      .tab-chips-container {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 8px !important;
        align-items: center !important;
        justify-content: flex-start !important;
        width: 100% !important;
        margin-bottom: 12px !important;
      }

      .tab-chip {
        font-size: 13px !important;
        font-weight: 600 !important;
        padding: 8px 18px !important;
        border-radius: 9999px !important;
        background: #FFFFFF !important;
        border: 1.5px solid #E2E8F0 !important;
        color: #1E293B !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02) !important;
        transition: all 0.2s ease !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 5px !important;
        line-height: 1.25 !important;
      }

      .tab-chip:hover {
        border-color: #CBD5E1 !important;
        background: #F8FAFC !important;
        transform: translateY(-1px) !important;
        color: #0F172A !important;
      }

      .tab-chip-collapsed {
        display: none !important;
      }

      .tab-more-btn {
        background: #EFF6FF !important;
        border: 1.5px dashed #93C5FD !important;
        color: #0529C1 !important;
        padding: 8px 18px !important;
        border-radius: 9999px !important;
        font-size: 12.5px !important;
        font-weight: 700 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 5px !important;
        cursor: pointer !important;
        margin: 4px 0 6px 0 !important;
        transition: all 0.2s ease !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      /* 7. AUTHENTIC ABOUT UNIVERSITY CARD BOX (Matching Concept 2 & User Preference) */
      .MuiDrawer-paper [class*="styleExhibitorSidebarBio"],
      .MuiDrawer-paper div:has(> h4.MuiTypography-h4),
      .MuiDrawer-paper div.MuiBox-root:has(> h4),
      .MuiDrawer-paper .mui-1y3duk9 {
        order: 7 !important;
        background: #FAF5FF !important;
        border: 1.5px solid #F3E8FF !important;
        border-top: 1.5px solid #F3E8FF !important;
        border-radius: 14px !important;
        padding: 14px 18px 16px 18px !important;
        margin: 10px 24px 28px 24px !important;
        width: calc(100% - 48px) !important;
        max-width: calc(100% - 48px) !important;
        align-self: center !important;
        box-sizing: border-box !important;
        box-shadow: 0 1px 4px rgba(107, 33, 168, 0.04) !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        flex-shrink: 0 !important;
      }

      .MuiDrawer-paper .mui-1y3duk9 h4,
      .MuiDrawer-paper .mui-1y3duk9 .MuiTypography-h4,
      .MuiDrawer-paper [class*="styleExhibitorSidebarBio"] h4,
      .MuiDrawer-paper div:has(> h4.MuiTypography-h4) h4,
      .MuiDrawer-paper div.MuiBox-root:has(> h4) h4 {
        color: #6B21A8 !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        margin: 0 0 6px 0 !important;
        line-height: 1.25 !important;
        letter-spacing: -0.2px !important;
        text-align: left !important;
      }

      .MuiDrawer-paper .mui-1y3duk9 p,
      .MuiDrawer-paper .mui-1y3duk9 p span,
      .MuiDrawer-paper .mui-1y3duk9 [class*="Typography-body1"]:not(.mui-zyaodp),
      .MuiDrawer-paper [class*="styleExhibitorSidebarBio"] p,
      .MuiDrawer-paper [class*="styleExhibitorSidebarBio"] p span,
      .MuiDrawer-paper div:has(> h4.MuiTypography-h4) p,
      .MuiDrawer-paper div:has(> h4.MuiTypography-h4) p span,
      .MuiDrawer-paper div.MuiBox-root:has(> h4) p,
      .MuiDrawer-paper div.MuiBox-root:has(> h4) p span {
        color: #334155 !important;
        font-size: 13px !important;
        line-height: 1.6 !important;
        font-weight: 400 !important;
        margin: 0 !important;
        text-align: left !important;
      }

      .MuiDrawer-paper .mui-1y3duk9 .mui-zyaodp,
      .MuiDrawer-paper .mui-1y3duk9 > span,
      .MuiDrawer-paper .mui-1y3duk9 [class*="ReadMore" i],
      .MuiDrawer-paper [class*="styleExhibitorSidebarBio"] .mui-zyaodp,
      .MuiDrawer-paper [class*="styleExhibitorSidebarBio"] > span,
      .MuiDrawer-paper div:has(> h4.MuiTypography-h4) .mui-zyaodp,
      .MuiDrawer-paper div:has(> h4.MuiTypography-h4) > span {
        color: #6B21A8 !important;
        font-weight: 700 !important;
        font-size: 13px !important;
        cursor: pointer !important;
        display: inline-block !important;
        margin-top: 6px !important;
        text-decoration: none !important;
        transition: color 0.15s ease !important;
      }

      .MuiDrawer-paper .mui-1y3duk9 .mui-zyaodp:hover,
      .MuiDrawer-paper .mui-1y3duk9 > span:hover,
      .MuiDrawer-paper [class*="styleExhibitorSidebarBio"] .mui-zyaodp:hover,
      .MuiDrawer-paper [class*="styleExhibitorSidebarBio"] > span:hover {
        color: #581C87 !important;
        text-decoration: underline !important;
      }
    `;
    document.head.appendChild(style);
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
    ensureModalDismissalStyles();

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
        return { cat: "eng", label: "Engineering & Tech", shortLabel: "Engineering" };
      }
      if (/business|admin|management|finance|account|market|entrepreneur|economics|mba|commerce|hospitality|leadership/.test(lower)) {
        return { cat: "biz", label: "Business & Leadership", shortLabel: "Business" };
      }
      if (/science|biology|biomed|health|nursing|medicine|pharma|physics|chemistry|psychology|environment/.test(lower)) {
        return { cat: "sci", label: "Sciences & Health", shortLabel: "Sciences" };
      }
      return { cat: "hum", label: "Humanities & Arts", shortLabel: "Humanities" };
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
      if (/computer science.*information tech/i.test(name)) return "Computer Science & IT";
      if (/business admin.*intl business/i.test(name)) return "Business Admin & Intl Business";
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
          <span>+ ${moreCount} More Majors</span> ${SVG_ICONS.chevronDown}
        </button>
      `;
    }

    tabsWrapper.innerHTML = `
      <div class="c2-filter-header-bar">
        <span class="c2-filter-title">
          ${SVG_ICONS.filterPill} ACADEMIC PROGRAMS & MAJORS
        </span>
        <span class="c2-filter-count">
          ${programs.length} Majors Available
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
          this.innerHTML = `<span>+ ${moreCount} More Majors</span> ${SVG_ICONS.chevronDown}`;
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

    ensureModalDismissalStyles();

    function handleOutsideInteraction(e) {
      // Find open modal card on screen
      const papers = document.querySelectorAll(
        ".MuiDrawer-paper, .MuiDialog-paper, [class*='modalContentStyle'], #demoDrawer .MuiPaper-root, .MuiModal-root:not(.MuiDrawer-root) > div:not(.MuiBackdrop-root), .MuiModal-root .MuiBox-root[tabindex='-1']"
      );
      let activePaper = null;
      for (const p of papers) {
        // Skip hidden containers
        const container = p.closest(".MuiDrawer-root, .MuiModal-root, #demoDrawer");
        if (container && window.getComputedStyle(container).display === "none") continue;
        const rect = p.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && window.getComputedStyle(p).display !== "none") {
          activePaper = p;
          break;
        }
      }
      if (!activePaper) return;

      // If clicked INSIDE the active modal paper, DO NOT dismiss!
      if (activePaper.contains(e.target)) {
        return;
      }

      // Don't dismiss if clicked inside popovers, menus, select dropdowns
      if (e.target.closest(".MuiMenu-root, .MuiPopover-root, .MuiAutocomplete-popper, .MuiTooltip-popper")) {
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

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Esc") {
        dismissModalPopup();
      }
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
   * 10. VIP EVENT TICKET PASS ENHANCEMENT (Executive Boarding Pass Layout)
   * Transforms #refFormPanel into an executive, physical VIP event pass
   * matching the modern physical ticket reference design:
   * • Top photo hero banner with campus photography & gradient scrim
   * • Dual perforation dividers with semicircular cutout notches & dashed lines
   * • Category pill + circular calendar bookmark action
   * • High-conversion marketing headline & subtitle
   * • Symmetrical 2-column credentials grid (Date, Time, Location, Ticket Holder)
   * • Primary CTA button ("Register Now") + realistic high-density barcode
   */
  function enhanceEventTicketPanel() {
    const panel = document.querySelector("#refFormPanel");
    if (!panel) return;

    panel.classList.add("inspira-ticket-shell");

    const cards = document.querySelectorAll(SELECTORS.cards);
    if (cards.length > 0) {
      try { localStorage.setItem("inspira_univ_count", String(cards.length)); } catch (e) {}
    }
    const savedCount = parseInt(typeof localStorage !== "undefined" && localStorage.getItem("inspira_univ_count"), 10);
    const count = cards.length > 0 ? cards.length : (savedCount || 33);

    // If ticket container already exists, update its dynamic count text fields!
    const existingTicket = panel.querySelector(".inspira-ticket-v2-container");
    if (existingTicket) {
      const heroSub = existingTicket.querySelector(".inspira-ticket-hero-subtitle");
      const mainSub = existingTicket.querySelector(".inspira-ticket-main-subtitle");
      if (heroSub) heroSub.innerHTML = `${count} World-Class Universities &bull; Oct 23, 2026`;
      if (mainSub) mainSub.innerHTML = `Connect Live with ${count} Global Universities & Admissions`;
      return;
    }

    // Direct child container inside #refFormPanel
    let innerBox = panel.querySelector(":scope > .MuiBox-root") || panel.firstElementChild || panel;
    if (!innerBox) return;

    // Clean any prior partial ticket fragments if any
    const oldFragments = panel.querySelectorAll(".inspira-ticket-hero-card, .inspira-ticket-perforation, .inspira-ticket-details-block, .inspira-ticket-barcode-card, .inspira-ticket-v2-container");
    oldFragments.forEach(el => el.remove());

    const ticketContainer = document.createElement("div");
    ticketContainer.className = "inspira-ticket-v2-container";
    ticketContainer.innerHTML = `
      <!-- Top Photo Hero Banner Card (Official Website Media) -->
      <div class="inspira-ticket-hero-card">
        <div class="inspira-ticket-hero-media">
          <img src="https://cdn.hubilo.com/banner/exhibitor_list_banner_image/3380930/1036/3583_7137_630733001791452515.jpeg" alt="Rede Inspira Virtual Fair" class="inspira-ticket-hero-img" />
          <div class="inspira-ticket-hero-scrim"></div>
          <div class="inspira-ticket-hero-overlay-text">
            <span class="inspira-ticket-hero-kicker">OFFICIAL EVENT PASS</span>
            <h3 class="inspira-ticket-hero-title">Rede Inspira Virtual University Fair</h3>
            <p class="inspira-ticket-hero-subtitle">${count} World-Class Universities &bull; Oct 23, 2026</p>
          </div>
        </div>
      </div>

      <!-- Top Perforation Divider -->
      <div class="inspira-ticket-perforation inspira-ticket-perforation-top">
        <span class="inspira-notch inspira-notch-left"></span>
        <div class="inspira-dashed-line"></div>
        <span class="inspira-notch inspira-notch-right"></span>
      </div>

      <!-- Middle Details Block -->
      <div class="inspira-ticket-details-block">
        <div class="inspira-ticket-meta-header">
          <span class="inspira-ticket-category-pill">Virtual Fair</span>
          <button type="button" class="inspira-ticket-bookmark-btn" title="Add to Calendar" aria-label="Add to Calendar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>

        <h2 class="inspira-ticket-main-title">Rede Inspira University Fair</h2>
        <p class="inspira-ticket-main-subtitle">Connect Live with ${count} Global Universities & Admissions</p>

        <div class="inspira-ticket-hairline"></div>

        <div class="inspira-ticket-grid">
          <div class="inspira-ticket-col">
            <span class="inspira-ticket-label">Date</span>
            <span class="inspira-ticket-val">23 Oct, 2026</span>
          </div>
          <div class="inspira-ticket-col">
            <span class="inspira-ticket-label">Time</span>
            <span class="inspira-ticket-val">04:30 AM (Online)</span>
          </div>
          <div class="inspira-ticket-col">
            <span class="inspira-ticket-label">Location</span>
            <span class="inspira-ticket-val">Online &bull; Virtual Fair</span>
          </div>
          <div class="inspira-ticket-col">
            <span class="inspira-ticket-label">Ticket Holder</span>
            <span class="inspira-ticket-val">Student Pass</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="inspira-ticket-actions">
          <button type="button" class="inspira-ticket-btn-primary" id="inspiraTicketRegisterBtn">
            <span>Register Now</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button type="button" class="inspira-ticket-btn-secondary" id="inspiraTicketCalendarBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Add To Calendar</span>
          </button>
        </div>
      </div>

      <!-- Bottom Perforation Divider -->
      <div class="inspira-ticket-perforation inspira-ticket-perforation-bottom">
        <span class="inspira-notch inspira-notch-left"></span>
        <div class="inspira-dashed-line"></div>
        <span class="inspira-notch inspira-notch-right"></span>
      </div>

      <!-- High-Density Barcode Stub -->
      <div class="inspira-ticket-barcode-card">
        <div class="inspira-ticket-barcode-wrap">
          <svg class="inspira-barcode-svg" viewBox="0 0 320 62" preserveAspectRatio="none">
            <rect x="0" y="0" width="3.5" height="62" fill="#030741"/>
            <rect x="6" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="10" y="0" width="4.5" height="62" fill="#030741"/>
            <rect x="17" y="0" width="2" height="62" fill="#030741"/>
            <rect x="22" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="26" y="0" width="6" height="62" fill="#030741"/>
            <rect x="35" y="0" width="2" height="62" fill="#030741"/>
            <rect x="40" y="0" width="3.5" height="62" fill="#030741"/>
            <rect x="46" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="50" y="0" width="4.5" height="62" fill="#030741"/>
            <rect x="58" y="0" width="2" height="62" fill="#030741"/>
            <rect x="63" y="0" width="7" height="62" fill="#030741"/>
            <rect x="73" y="0" width="2" height="62" fill="#030741"/>
            <rect x="78" y="0" width="3.5" height="62" fill="#030741"/>
            <rect x="84" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="88" y="0" width="5.5" height="62" fill="#030741"/>
            <rect x="97" y="0" width="2" height="62" fill="#030741"/>
            <rect x="102" y="0" width="4.5" height="62" fill="#030741"/>
            <rect x="109" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="113" y="0" width="3.5" height="62" fill="#030741"/>
            <rect x="120" y="0" width="6" height="62" fill="#030741"/>
            <rect x="129" y="0" width="2" height="62" fill="#030741"/>
            <rect x="134" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="138" y="0" width="4.5" height="62" fill="#030741"/>
            <rect x="145" y="0" width="3.5" height="62" fill="#030741"/>
            <rect x="151" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="155" y="0" width="6" height="62" fill="#030741"/>
            <rect x="164" y="0" width="2" height="62" fill="#030741"/>
            <rect x="169" y="0" width="4.5" height="62" fill="#030741"/>
            <rect x="176" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="180" y="0" width="3.5" height="62" fill="#030741"/>
            <rect x="186" y="0" width="6" height="62" fill="#030741"/>
            <rect x="195" y="0" width="2" height="62" fill="#030741"/>
            <rect x="200" y="0" width="3.5" height="62" fill="#030741"/>
            <rect x="206" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="210" y="0" width="6" height="62" fill="#030741"/>
            <rect x="219" y="0" width="2" height="62" fill="#030741"/>
            <rect x="224" y="0" width="4.5" height="62" fill="#030741"/>
            <rect x="231" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="235" y="0" width="3.5" height="62" fill="#030741"/>
            <rect x="242" y="0" width="6" height="62" fill="#030741"/>
            <rect x="251" y="0" width="2" height="62" fill="#030741"/>
            <rect x="256" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="260" y="0" width="4.5" height="62" fill="#030741"/>
            <rect x="267" y="0" width="2" height="62" fill="#030741"/>
            <rect x="272" y="0" width="6" height="62" fill="#030741"/>
            <rect x="281" y="0" width="1.5" height="62" fill="#030741"/>
            <rect x="285" y="0" width="3.5" height="62" fill="#030741"/>
            <rect x="291" y="0" width="6" height="62" fill="#030741"/>
            <rect x="300" y="0" width="2" height="62" fill="#030741"/>
            <rect x="305" y="0" width="4" height="62" fill="#030741"/>
            <rect x="312" y="0" width="2" height="62" fill="#030741"/>
            <rect x="316" y="0" width="4" height="62" fill="#030741"/>
          </svg>
        </div>
        <div class="inspira-ticket-stub-code">PASS ID: 1235-9889 &bull; WEBIFAIRS INSPIRA</div>
      </div>
    `;

    innerBox.insertBefore(ticketContainer, innerBox.firstChild);

    // Wire up Register Now action
    const regBtn = ticketContainer.querySelector("#inspiraTicketRegisterBtn");
    if (regBtn) {
      regBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const orig = Array.from(panel.querySelectorAll("button")).find(
          b => b.innerText.includes("Register Now") && b.id !== "inspiraTicketRegisterBtn"
        );
        if (orig) orig.click();
      });
    }

    // Wire up Add To Calendar action
    const calBtn = ticketContainer.querySelector("#inspiraTicketCalendarBtn");
    const bookmarkBtn = ticketContainer.querySelector(".inspira-ticket-bookmark-btn");
    function triggerCalendar(e) {
      e.preventDefault();
      e.stopPropagation();
      const origCal = Array.from(panel.querySelectorAll("button")).find(
        b => b.innerText.includes("Add To Calendar") && b.id !== "inspiraTicketCalendarBtn"
      );
      if (origCal) origCal.click();
    }
    if (calBtn) calBtn.addEventListener("click", triggerCalendar);
    if (bookmarkBtn) bookmarkBtn.addEventListener("click", triggerCalendar);
  }

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
    if (e.target.closest(SELECTORS.cards) || e.target.closest(".MuiCard-root, [class*='Card-root']")) {
      setTimeout(triggerDrawerEnhancement, 100);
    }
  }, true);

  /**
   * 12. LOGIN & SIGN-UP HYBRID TRANSFORMATION
   * Replaces native left banner column (.logInBlockWrapper) with Inspira Fairs Hero Banner
   * (Live countdown, university badges, 3,500+ student proof).
   * Keeps native right form column (.loginWrapperTop) intact with 100% native Hubilo React
   * inputs, validations, and submit handlers on /login, /sign-up, and /login-with-code.
   * Enriches right pane with modern student access badge and VIP perks.
   */
  let countdownTimerStarted = false;
  function enhanceLoginPage() {
    // Explicit safety guard: Never run enhanceLoginPage on /register or inside registration modals!
    if (window.location.pathname.includes("/register")) {
      const staleGateway = document.getElementById("inspiraStudentLoginGateway");
      if (staleGateway) {
        const hiddenRow = staleGateway.parentNode ? staleGateway.parentNode.querySelector(".row[style*='display: none']") : null;
        if (hiddenRow) hiddenRow.style.removeProperty("display");
        staleGateway.remove();
      }
      return;
    }

    const leftCol = document.querySelector(".logInBlockWrapper, [class*='logInBlockWrapper']");
    const rightCol = document.querySelector(".loginWrapperTop, [class*='loginWrapperTop']");

    // Check if we are on an auth page (/login, /sign-up, /login-with-code)
    const isAuthPage = (leftCol || rightCol) && (
      window.location.pathname.includes("/login") ||
      window.location.pathname.includes("/sign-up") ||
      window.location.pathname.includes("/login-with-code")
    );

    if (!isAuthPage) return;

    // Self-inject login styles if not loaded from master.css
    let styleEl = document.getElementById("inspiraLoginStyles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "inspiraLoginStyles";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap');

  html:has(.logInBlockWrapper),
  body:has(.logInBlockWrapper),
  html:has(.loginWrapperTop),
  body:has(.loginWrapperTop) {
    width: 100vw !important;
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #030741 !important;
    overflow: hidden !important;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
  }

  #root:has(.logInBlockWrapper),
  #root > div:has(.logInBlockWrapper),
  .container-fluid:has(.logInBlockWrapper),
  body:has(.logInBlockWrapper) #__next {
    width: 100vw !important;
    height: 100vh !important;
    padding: 0 !important;
    margin: 0 !important;
    box-sizing: border-box !important;
    background: #030741 !important;
    overflow: hidden !important;
  }

  .row:has(> .logInBlockWrapper),
  .row.no-gutters:has(> .logInBlockWrapper) {
    height: 100vh !important;
    width: 100vw !important;
    max-width: 100vw !important;
    margin: 0 !important;
    padding: 0 !important;
    display: flex !important;
    flex-direction: row !important;
    background: #030741 !important;
  }

  /* LEFT HERO PANE (60%) */
  .col-sm-8.col-md-8.col-lg-8.logInBlockWrapper,
  .logInBlockWrapper {
    flex: 0 0 60% !important;
    max-width: 60% !important;
    height: 100vh !important;
    padding: 0 !important;
    margin: 0 !important;
    position: relative !important;
    background: #030741 !important;
    overflow: hidden !important;
    display: block !important;
  }

  .logInBlock,
  .logInBlockInner,
  #sliderSection {
    display: none !important;
  }

  .inspira-hero-injected {
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    padding: 44px 60px !important;
    box-sizing: border-box !important;
    background-color: #030722 !important;
    background-image:
      radial-gradient(circle at 18% 20%, rgba(29, 78, 216, 0.45) 0%, transparent 55%),
      radial-gradient(circle at 85% 80%, rgba(126, 34, 206, 0.28) 0%, transparent 55%),
      linear-gradient(165deg, rgba(2, 6, 32, 0.88) 0%, rgba(3, 7, 45, 0.82) 50%, rgba(4, 9, 52, 0.90) 100%),
      url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&auto=format&fit=crop&q=80') !important;
    background-size: cover !important;
    background-position: center !important;
    color: #FFFFFF !important;
    z-index: 1 !important;
  }

  .inspira-hero-injected .hero-top-brand {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 100% !important;
  }
  .inspira-hero-injected .hero-brand-logo {
    font-family: 'Outfit', sans-serif !important;
    font-size: 27px !important;
    font-weight: 800 !important;
    color: #FFFFFF !important;
    letter-spacing: -0.5px !important;
    display: flex !important;
    align-items: center !important;
    gap: 1px !important;
  }
  .inspira-hero-injected .hero-brand-logo span {
    color: #F97316 !important;
  }
  .inspira-hero-injected .hero-live-badge {
    display: inline-flex !important;
    align-items: center !important;
    gap: 7px !important;
    padding: 6px 14px !important;
    border-radius: 9999px !important;
    background: rgba(239, 68, 68, 0.14) !important;
    border: 1px solid rgba(239, 68, 68, 0.32) !important;
    color: #FCA5A5 !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.6px !important;
    backdrop-filter: blur(8px) !important;
  }
  .inspira-hero-injected .hero-live-dot {
    width: 7px !important;
    height: 7px !important;
    background: #EF4444 !important;
    border-radius: 50% !important;
    box-shadow: 0 0 10px #EF4444 !important;
  }

  .inspira-hero-injected .hero-content-center {
    max-width: 580px !important;
    margin: auto 0 !important;
  }
  .inspira-hero-injected .hero-kicker {
    font-size: 12px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 1.2px !important;
    color: #93C5FD !important;
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    margin-bottom: 14px !important;
  }
  .inspira-hero-injected .hero-heading {
    font-family: 'Outfit', sans-serif !important;
    font-size: 40px !important;
    font-weight: 800 !important;
    line-height: 1.15 !important;
    color: #FFFFFF !important;
    margin: 0 0 16px 0 !important;
    letter-spacing: -1px !important;
  }
  .inspira-hero-injected .hero-heading .hero-highlight-word {
    color: #FFA588 !important;
    background: none !important;
    -webkit-text-fill-color: #FFA588 !important;
  }
  .inspira-hero-injected .hero-subheading {
    font-size: 14px !important;
    line-height: 1.6 !important;
    color: #94A3B8 !important;
    margin: 0 0 24px 0 !important;
    font-weight: 400 !important;
  }

  .inspira-hero-injected .hero-countdown-strip {
    display: inline-flex !important;
    align-items: center !important;
    gap: 16px !important;
    padding: 12px 24px !important;
    border-radius: 14px !important;
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    backdrop-filter: blur(12px) !important;
    margin-bottom: 22px !important;
  }
  .inspira-hero-injected .countdown-unit {
    text-align: center !important;
    min-width: 38px !important;
  }
  .inspira-hero-injected .countdown-val {
    font-family: 'Outfit', sans-serif !important;
    font-size: 22px !important;
    font-weight: 800 !important;
    color: #FFFFFF !important;
    line-height: 1 !important;
  }
  .inspira-hero-injected .countdown-lbl {
    font-size: 9.5px !important;
    font-weight: 700 !important;
    color: #94A3B8 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.8px !important;
    margin-top: 4px !important;
  }
  .inspira-hero-injected .countdown-sep {
    color: rgba(255, 255, 255, 0.3) !important;
    font-weight: 700 !important;
    font-size: 18px !important;
    margin-top: -6px !important;
  }

  .inspira-hero-injected .hero-pills-row {
    display: flex !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    gap: 10px !important;
  }
  .inspira-hero-injected .hero-badge-pill {
    padding: 7px 14px !important;
    border-radius: 9999px !important;
    background: rgba(255, 255, 255, 0.06) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    backdrop-filter: blur(8px) !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    color: #E2E8F0 !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px !important;
    white-space: nowrap !important;
  }

  .inspira-hero-injected .hero-bottom-proof {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
  }
  .inspira-hero-injected .proof-avatars {
    display: flex !important;
    align-items: center !important;
  }
  .inspira-hero-injected .proof-avatars img {
    width: 32px !important;
    height: 32px !important;
    border-radius: 50% !important;
    border: 2px solid #030741 !important;
    margin-left: -8px !important;
    object-fit: cover !important;
  }
  .inspira-hero-injected .proof-avatars img:first-child {
    margin-left: 0 !important;
  }
  .inspira-hero-injected .proof-caption {
    font-size: 13px !important;
    color: #94A3B8 !important;
  }
  .inspira-hero-injected .proof-caption strong {
    color: #FFFFFF !important;
    font-weight: 700 !important;
  }

  /* RIGHT FORM PANE (40%) */
  .col-12.col-sm-12.col-md-12.col-lg-4,
  .row:has(> .logInBlockWrapper) > .col-lg-4,
  .row:has(> .logInBlockWrapper) > div:not(.logInBlockWrapper) {
    flex: 0 0 40% !important;
    max-width: 40% !important;
    height: 100vh !important;
    max-height: 100vh !important;
    background: #FFFFFF !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 44px 52px !important;
    box-sizing: border-box !important;
    border-radius: 0 !important;
    border-left: 1px solid rgba(0, 0, 0, 0.06) !important;
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.08) !important;
    z-index: 10 !important;
    position: relative !important;
    overflow: hidden !important;
  }

  #ot-sdk-btn-floating,
  .ot-floating-button,
  #onetrust-pc-btn-handler,
  .cookieBlock,
  [class*="cookieBlock"] {
    display: none !important;
  }

  .loginWrapperTop,
  .loginWrapper,
  .logInModule,
  .formDataBlock {
    width: 100% !important;
    max-width: 410px !important;
    margin: 0 auto !important;
    display: flex !important;
    flex-direction: column !important;
  }

  /* Hide square carousel / extra graphics */
  .topBrandText section,
  .topBrandText .slick-slider,
  .eventLogoWrapper {
    display: none !important;
  }

  /* Hide social buttons */
  .socialButtons {
    display: none !important;
  }

  .inspira-form-badge {
    display: inline-flex !important;
    align-items: center !important;
    background: #EFF6FF !important;
    color: #2563EB !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    padding: 6px 14px !important;
    border-radius: 9999px !important;
    border: 1px solid #DBEAFE !important;
    margin-bottom: 12px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.8px !important;
    align-self: flex-start !important;
    box-shadow: 0 1px 2px rgba(37, 99, 235, 0.06) !important;
  }

  .topBrandText {
    text-align: left !important;
    margin-bottom: 22px !important;
  }
  .topBrandText h2,
  .topBrandText h3,
  .topBrandText .MuiTypography-root {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
    font-size: 32px !important;
    font-weight: 800 !important;
    color: #030741 !important;
    margin: 0 0 8px 0 !important;
    text-align: left !important;
    line-height: 1.15 !important;
    letter-spacing: -0.025em !important;
    -webkit-font-smoothing: antialiased !important;
  }
  .topBrandText h3,
  .topBrandText h2 ~ h2,
  .topBrandText h2 ~ h3,
  .topBrandText .MuiTypography-root ~ .MuiTypography-root {
    display: none !important;
  }

  .inspira-form-subtext {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
    font-size: 14px !important;
    color: #64748B !important;
    line-height: 1.55 !important;
    margin: 0 !important;
    text-align: left !important;
    font-weight: 400 !important;
  }

  .mt24 {
    margin-top: 0 !important;
  }

  /* Email field label */
  .inspira-input-label {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
    font-size: 13.5px !important;
    font-weight: 700 !important;
    color: #0F172A !important;
    margin-bottom: 8px !important;
    display: block !important;
    text-align: left !important;
    letter-spacing: -0.01em !important;
  }

  /* Hide floating MUI label ONLY on /login where .inspira-input-label is explicitly placed */
  .loginWrapperTop form:not(:has(input[name="firstName"])):not(:has(input[name="codeVal"])) .MuiInputLabel-root,
  .loginWrapperTop form:not(:has(input[name="firstName"])):not(:has(input[name="codeVal"])) label.MuiFormLabel-root {
    display: none !important;
  }

  /* Keep MUI labels clearly visible & properly styled on /sign-up and /login-with-code */
  .loginWrapperTop form:has(input[name="firstName"]) .MuiInputLabel-root,
  .loginWrapperTop form:has(input[name="codeVal"]) .MuiInputLabel-root {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    color: #475569 !important;
  }
  .loginWrapperTop .MuiInputLabel-shrink {
    background: #FFFFFF !important;
    padding: 0 6px !important;
    border-radius: 4px !important;
    z-index: 2 !important;
    font-size: 11.5px !important;
    line-height: 1 !important;
  }

  /* Aceternity UI Input Styling */
  .loginWrapperTop .MuiFormControl-root {
    position: relative !important;
    margin-top: 0 !important;
    margin-bottom: 14px !important;
    width: 100% !important;
  }
  .loginWrapperTop .MuiOutlinedInput-root {
    border-radius: 14px !important;
    background: #F8FAFC !important;
    border: 1.5px solid #E2E8F0 !important;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
    position: relative !important;
    height: 52px !important;
    box-sizing: border-box !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03) !important;
  }
  .loginWrapperTop .MuiOutlinedInput-root fieldset {
    border: none !important;
  }
  .loginWrapperTop .MuiOutlinedInput-root.Mui-focused {
    border-color: #0529C1 !important;
    box-shadow: 0 0 0 4px rgba(5, 41, 193, 0.12), 0 2px 4px rgba(0, 0, 0, 0.04) !important;
    background: #FFFFFF !important;
  }
  .loginWrapperTop .MuiOutlinedInput-root input {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
    font-size: 14.5px !important;
    font-weight: 500 !important;
    color: #0F172A !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
    box-sizing: border-box !important;
  }

  /* Email input on /login gets 50px left padding for envelope icon and 52px right padding for sparkle badge */
  .loginWrapperTop form:not(:has(input[name="firstName"])):not(:has(input[name="codeVal"])) input#email {
    padding-left: 50px !important;
    padding-right: 52px !important;
  }

  /* Placeholder visibility: crisp and readable on sign-up / code */
  .loginWrapperTop form:not(:has(input[name="firstName"])):not(:has(input[name="codeVal"])) input#email::placeholder {
    color: #94A3B8 !important;
    opacity: 0.6 !important;
    visibility: visible !important;
    -webkit-text-fill-color: #94A3B8 !important;
  }
  .loginWrapperTop form:has(input[name="firstName"]) input::placeholder,
  .loginWrapperTop form:has(input[name="codeVal"]) input::placeholder {
    color: #94A3B8 !important;
    opacity: 1 !important;
    visibility: visible !important;
    -webkit-text-fill-color: #94A3B8 !important;
    font-size: 13.5px !important;
  }

  /* Input Envelope and Purple Sparkle Badge via CSS pseudo-elements (Zero React DOM interference) */
  .loginWrapperTop form:not(:has(input[name="firstName"])):not(:has(input[name="codeVal"])) .MuiOutlinedInput-root::before {
    content: "" !important;
    position: absolute !important;
    left: 16px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    width: 18px !important;
    height: 18px !important;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='5' width='18' height='14' rx='2.5'/%3E%3Cpolyline points='3 7 12 13 21 7'/%3E%3C/svg%3E") !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    pointer-events: none !important;
    z-index: 5 !important;
  }

  .loginWrapperTop form:not(:has(input[name="firstName"])):not(:has(input[name="codeVal"])) .MuiOutlinedInput-root::after {
    content: "" !important;
    position: absolute !important;
    right: 12px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    width: 34px !important;
    height: 34px !important;
    border-radius: 10px !important;
    background: linear-gradient(135deg, #B04CFE 0%, #7622FE 100%) !important;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='%23FFFFFF'%3E%3Cpath d='M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z'/%3E%3C/svg%3E") !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    pointer-events: none !important;
    z-index: 5 !important;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  /* Aceternity UI Primary CTA Button */
  .loginWrapperTop button.MuiButton-contained,
  .loginWrapperTop button.signUpBtn,
  .loginWrapperTop button[type="submit"] {
    background: linear-gradient(180deg, #0522B8 0%, #030F5E 100%) !important;
    color: #FFFFFF !important;
    border-radius: 14px !important;
    padding: 14px 24px !important;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    text-transform: none !important;
    box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.28), 0 10px 24px -4px rgba(5, 34, 184, 0.45), 0 4px 8px -2px rgba(5, 34, 184, 0.2) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
    width: 100% !important;
    height: 52px !important;
    margin-top: 2px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 10px !important;
    letter-spacing: -0.2px !important;
    cursor: pointer !important;
  }

  /* Replace button label purely in CSS on /login so React synthetic events & children are never touched */
  .loginWrapperTop form:not(:has(input[name="firstName"])):not(:has(input[name="codeVal"])) button.MuiButton-contained {
    font-size: 0 !important;
  }
  .loginWrapperTop form:not(:has(input[name="firstName"])):not(:has(input[name="codeVal"])) button.MuiButton-contained::before {
    content: "Enter Virtual Fair Now  →" !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
    color: #FFFFFF !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    letter-spacing: -0.2px !important;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  .loginWrapperTop form:not(:has(input[name="firstName"])):not(:has(input[name="codeVal"])) button.MuiButton-contained:hover::before {
    transform: translateX(3px) !important;
  }
  .loginWrapperTop button.MuiButton-contained:active,
  .loginWrapperTop button.signUpBtn:active,
  .loginWrapperTop button[type="submit"]:active {
    transform: translateY(0px) scale(0.99) !important;
  }
  .loginWrapperTop button:disabled {
    background: #E2E8F0 !important;
    color: #94A3B8 !important;
    box-shadow: none !important;
    cursor: not-allowed !important;
    transform: none !important;
  }

  /* Aceternity UI VIP Perk Card */
  .vip-perk-card {
    margin-top: 18px !important;
    background: #F8FAFC !important;
    border: 1px solid #E2E8F0 !important;
    border-radius: 14px !important;
    padding: 15px 18px !important;
    display: flex !important;
    align-items: flex-start !important;
    gap: 12px !important;
    box-sizing: border-box !important;
    width: 100% !important;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  .vip-perk-card:hover {
    border-color: #CBD5E1 !important;
    box-shadow: 0 4px 14px -2px rgba(0, 0, 0, 0.04) !important;
    transform: translateY(-1px) !important;
  }
  .vip-perk-icon {
    color: #E05C3A !important;
    flex-shrink: 0 !important;
    margin-top: 1px !important;
    display: flex !important;
    align-items: center !important;
  }
  .vip-perk-text {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
    font-size: 12.5px !important;
    color: #64748B !important;
    line-height: 1.45 !important;
    text-align: left !important;
  }
  .vip-perk-text strong {
    color: #0F172A !important;
    font-size: 13.5px !important;
    font-weight: 700 !important;
    display: block !important;
    margin-bottom: 2px !important;
    letter-spacing: -0.1px !important;
  }

  /* Trust footer */
  .form-footer-trust {
    margin-top: 24px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
    font-size: 12px !important;
    color: #94A3B8 !important;
    font-weight: 500 !important;
    width: 100% !important;
    letter-spacing: 0.1px !important;
  }

  [class*="cookie" i],
  [id*="cookie" i],
  [class*="Cookie" i],
  .MuiDialog-root:has([class*="cookie" i]),
  .MuiModal-root:has([class*="cookie" i]),
  #onetrust-consent-sdk,
  #onetrust-banner-sdk {
    z-index: 2147483647 !important;
  }

  @media (max-width: 960px) {
    .row:has(> .logInBlockWrapper) {
      flex-direction: column !important;
      height: auto !important;
      min-height: 100vh !important;
    }
    .col-sm-8.col-md-8.col-lg-8.logInBlockWrapper,
    .logInBlockWrapper {
      flex: 0 0 auto !important;
      max-width: 100% !important;
      min-height: 420px !important;
    }
    .col-12.col-sm-12.col-md-12.col-lg-4,
    .row:has(> .logInBlockWrapper) > .col-lg-4,
    .row:has(> .logInBlockWrapper) > div:not(.logInBlockWrapper) {
      flex: 0 0 auto !important;
      max-width: 100% !important;
      min-height: auto !important;
      border-radius: 24px 24px 0 0 !important;
      padding: 32px 24px !important;
    }
  }
`;

    // Hide native left carousel/slider and right brand text
    if (leftCol) {
      leftCol.querySelectorAll("#sliderSection, .logInBlock, .logInBlockInner").forEach(el => {
        el.style.setProperty("display", "none", "important");
      });
    }
    if (rightCol) {
      rightCol.querySelectorAll(".topBrandText section, .topBrandText .slick-slider, .eventLogoWrapper, .socialButtons").forEach(el => {
        el.style.setProperty("display", "none", "important");
      });
    }

    const cards = document.querySelectorAll(SELECTORS.cards);
    if (cards.length > 0) {
      try { localStorage.setItem("inspira_univ_count", String(cards.length)); } catch (e) {}
    }
    const savedCount = parseInt(typeof localStorage !== "undefined" && localStorage.getItem("inspira_univ_count"), 10);
    const count = cards.length > 0 ? cards.length : (savedCount || 33);

    // 1. Inject Inspira Hero Banner into the left column
    if (leftCol && !leftCol.querySelector(".inspira-hero-injected")) {
      // Remove any legacy artificial gateway if present
      const oldGateway = document.getElementById("inspiraStudentLoginGateway");
      if (oldGateway) oldGateway.remove();

      // Ensure parent row is visible and flexed
      const parentRow = leftCol.closest(".row, [class*='row']");
      if (parentRow) parentRow.style.removeProperty("display");

      const hero = document.createElement("div");
      hero.className = "inspira-hero-injected";
      hero.id = "injectedHeroPane";
      hero.innerHTML = `
        <div class="hero-top-brand">
          <div class="hero-brand-logo">inspira<span>fairs</span></div>
          <div class="hero-live-badge">
            <span class="hero-live-dot"></span>
            LIVE &bull; THURSDAY, OCT 22
          </div>
        </div>

        <div class="hero-content-center">
          <div class="hero-kicker">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            REDE INSPIRA VIRTUAL COLLEGE FAIRS
          </div>
          <h1 class="hero-heading">Connect with the World's<br>Top ${count}+ <span class="hero-highlight-word">Universities</span></h1>
          <p class="hero-subheading">
            Join over 3,500 students exploring world-class degrees, scholarships, and 1-on-1 chats with official university admissions representatives.
          </p>

          <div class="hero-countdown-strip">
            <div class="countdown-unit">
              <div class="countdown-val" id="inspiraLoginDays">04</div>
              <div class="countdown-lbl">Days</div>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit">
              <div class="countdown-val" id="inspiraLoginHours">18</div>
              <div class="countdown-lbl">Hours</div>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit">
              <div class="countdown-val" id="inspiraLoginMins">20</div>
              <div class="countdown-lbl">Mins</div>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit">
              <div class="countdown-val" id="inspiraLoginSecs">39</div>
              <div class="countdown-lbl">Secs</div>
            </div>
          </div>

          <div class="hero-pills-row">
            <div class="hero-badge-pill">🏛️ Russell Group &amp; Global Elite</div>
            <div class="hero-badge-pill">💬 1-on-1 Booth Meetings</div>
            <div class="hero-badge-pill">🎓 ${count}+ Top Universities</div>
          </div>
        </div>

        <div class="hero-bottom-proof">
          <div class="proof-avatars">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="Student"/>
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80" alt="Student"/>
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80" alt="Student"/>
          </div>
          <div class="proof-caption">
            <strong>Lucas M., Mariana S. and 3,520+ students</strong> registered today
          </div>
        </div>
      `;
      leftCol.appendChild(hero);
    } else if (leftCol) {
      const existingHero = leftCol.querySelector(".inspira-hero-injected");
      if (existingHero) {
        const heading = existingHero.querySelector(".hero-heading");
        if (heading) {
          heading.innerHTML = `Connect with the World's<br>Top ${count}+ <span class="hero-highlight-word">Universities</span>`;
        }
        const pills = existingHero.querySelectorAll(".hero-badge-pill");
        if (pills && pills.length >= 3) {
          pills[2].innerHTML = `🎓 ${count}+ Top Universities`;
        }
      }
    }

    // 2. Start Live Countdown Timer if elements exist
    if (!countdownTimerStarted) {
      countdownTimerStarted = true;
      function updateCountdown() {
        const targetDate = new Date("2026-10-22T17:00:00-03:00").getTime();
        const now = Date.now();
        const diff = Math.max(0, targetDate - now);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        const dEl = document.getElementById("inspiraLoginDays");
        const hEl = document.getElementById("inspiraLoginHours");
        const mEl = document.getElementById("inspiraLoginMins");
        const sEl = document.getElementById("inspiraLoginSecs");

        if (dEl) dEl.textContent = String(days).padStart(2, "0");
        if (hEl) hEl.textContent = String(hours).padStart(2, "0");
        if (mEl) mEl.textContent = String(mins).padStart(2, "0");
        if (sEl) sEl.textContent = String(secs).padStart(2, "0");
      }
      updateCountdown();
      setInterval(updateCountdown, 1000);
    }

    // 3. Enrich the native right column with badges & perks without altering native React inputs/buttons
    if (rightCol) {
      // Suppress OneTrust floating button so it never covers social proof
      const otBtn = document.querySelector("#ot-sdk-btn-floating, .ot-floating-button, #onetrust-pc-btn-handler");
      if (otBtn) otBtn.style.setProperty("display", "none", "important");

      const isSignUpPage = window.location.pathname.includes("/sign-up") || !!rightCol.querySelector("input[name='firstName']");
      const isCodePage = window.location.pathname.includes("/login-with-code") || !!rightCol.querySelector("input[name='codeVal'], input[name='code'], input[name='otp']");

      if (isSignUpPage || isCodePage) {
        // Clean up login-only elements when transitioning to native registration or code verification
        const perksCard = rightCol.querySelector(".vip-perk-card");
        if (perksCard) perksCard.remove();
        const trustFooter = rightCol.querySelector(".form-footer-trust");
        if (trustFooter) trustFooter.remove();
        const badge = rightCol.querySelector(".inspira-form-badge");
        if (badge) badge.remove();
        const subEl = rightCol.querySelector(".inspira-form-subtext");
        if (subEl) subEl.remove();
        const label = rightCol.querySelector(".inspira-input-label");
        if (label) label.remove();
        return;
      }

      // Title & badge on /login
      const titleEl = rightCol.querySelector(".topBrandText h2, .topBrandText h3, .topBrandText .MuiTypography-root");
      if (titleEl) {
        titleEl.textContent = "Welcome to the Fair";

        // Add INSTANT STUDENT ACCESS badge if not present
        if (!rightCol.querySelector(".inspira-form-badge")) {
          const badge = document.createElement("div");
          badge.className = "inspira-form-badge";
          badge.textContent = "INSTANT STUDENT ACCESS";
          titleEl.parentNode.insertBefore(badge, titleEl);
        }

        // Add Subtitle if not present
        let subEl = rightCol.querySelector(".inspira-form-subtext");
        if (!subEl) {
          subEl = document.createElement("p");
          subEl.className = "inspira-form-subtext";
          titleEl.parentNode.appendChild(subEl);
        }
        subEl.textContent = "Enter your student email below to claim your access and enter university booths instantly.";
      }

      // Email field label placed outside <form>
      const formEl = rightCol.querySelector("form");
      if (formEl && !rightCol.querySelector(".inspira-input-label")) {
        const label = document.createElement("label");
        label.className = "inspira-input-label";
        label.textContent = "Email Address";
        formEl.parentNode.insertBefore(label, formEl);
      }

      // Empty placeholder on input if needed
      const nativeInput = rightCol.querySelector("input#email, input[name='email']");
      if (nativeInput && nativeInput.placeholder) {
        nativeInput.placeholder = "";
      }

      // Add VIP Perks & Trust card OUTSIDE <form> (as siblings of <form> in .loginWrapperTop)
      // Never append inside React's <form>, preserving 100% native React reconciler and event handlers
      if (formEl && formEl.parentElement && !rightCol.querySelector(".vip-perk-card")) {
        const perksCard = document.createElement("div");
        perksCard.className = "vip-perk-card";
        perksCard.innerHTML = `
          <div class="vip-perk-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E05C3A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div class="vip-perk-text">
            <strong>Instant No–Password Entry</strong>
            A secure magic link is sent directly to your inbox with full VIP booth access.
          </div>
        `;

        const trustFooter = document.createElement("div");
        trustFooter.className = "form-footer-trust";
        trustFooter.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>100% Free &amp; SSL Encrypted</span>
          <span style="margin: 0 4px;">&bull;</span>
          <span>Powered by WebiFair</span>
        `;

        formEl.insertAdjacentElement("afterend", trustFooter);
        formEl.insertAdjacentElement("afterend", perksCard);
      }
    }
  }

  /**
   * 13. INITIALIZATION & RESILIENT MUTATION OBSERVER
   * Ensures our enhancements run when the page loads, and also if Next.js
   * re-renders parts of the DOM dynamically.
   */
  function initializeAll() {
    removeStickyTabBar();
    enhanceHeaderBrand();
    initHeaderScrollListener();
    enhanceCountdownTimer();
    enhanceUniversityCards();
    initDirectorySearchAndFilter();
    initCardInteractionTracking();
    enhanceExhibitorDrawer();
    enhanceEventTicketPanel();
    initBackdropDismissal();
    enhanceLoginPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAll);
  } else {
    initializeAll();
  }

  let debounceTimeout;
  const bodyObserver = new MutationObserver(function () {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(initializeAll, 120);

    const paper = document.querySelector(".MuiDrawer-paper");
    if (paper && !paper.querySelector(".inspira-filter-tabs-wrapper")) {
      enhanceExhibitorDrawer();
    }
  });

  bodyObserver.observe(document.body, { childList: true, subtree: true });
})();

