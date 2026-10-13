(function () {
  'use strict';

  if (window.__BT_BOOTH__) return;
  window.__BT_BOOTH__ = true;

  var CFG = Object.assign({
    closeDrawerOnOutside: true,
    escapeClosesDrawer: true,
    keyboardBoothNav: true,
    tagRows: 3,          // rows of programme tags shown before "+N more"
    minHiddenTags: 4,    // only collapse when it hides at least this many
    aboutLines: 8,
    reveal: true
  }, window.BT_CONFIG || {});

  var doc = document;
  var root = doc.documentElement;
  var mql = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduceMotion = mql('(prefers-reduced-motion: reduce)');

  /* ---------- helpers ---------- */
  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  // Only touch the DOM when something actually changes (keeps the observer quiet).
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

  /* ---------- live region for short announcements ---------- */
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

  /* ---------- 1. page flags ---------- */
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

  /* ---------- 2. reveal on scroll ---------- */
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
        // React may rewrite className; restore the finished state.
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

  /* ---------- 3. programme tags: "+N more" ---------- */
  function tags(booth) {
    var wrap = $('.sponsorsDetails .tagsWrapper', booth);
    if (!wrap) return;
    var btn = wrap.nextElementSibling && wrap.nextElementSibling.classList.contains('bt-tags-toggle')
      ? wrap.nextElementSibling : null;
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
    // Animate the expand to the real height, then release it.
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
          // Collapse from the current height so the transition runs.
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

  /* ---------- 4. About: "Read more" ---------- */
  function about(booth) {
    var p = $('.aboutSponsors .aboutText', booth);
    if (!p) return;
    var btn = p.nextElementSibling && p.nextElementSibling.classList.contains('bt-more')
      ? p.nextElementSibling : null;
    var lh = parseFloat(getComputedStyle(p).lineHeight) || 24;
    var expanded = !!p.__btExpanded;

    // scrollHeight is the full text height even while line-clamped.
    var lines = Math.round(p.scrollHeight / lh);
    var needs = lines > CFG.aboutLines + 1;   // never hide just one line

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

  /* ---------- 5. contact: copy + tap-to-call ---------- */
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
      try { if (doc.execCommand('copy')) done(); } catch (e) { /* ignore */ }
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
        // Tap the row to call (touch screens only; the copy button stays the
        // keyboard / screen-reader route, so no nested interactive roles).
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

  /* ---------- 6. previous / next university ---------- */
  function arrows(booth) {
    [['prev', 'Previous university'], ['next', 'Next university']].forEach(function (a) {
      var el = $('.exibitorNavigation .arrowNav.' + a[0], booth);
      if (!el) return;
      setAttr(el, 'aria-label', a[1]);
      setAttr(el, 'title', a[1]);
      // The platform nests a second button inside; keep it out of the tab order.
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

  /* ---------- 7. side panel: Esc + click outside ---------- */
  // Remember the control that opened the panel, so focus can return to it.
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
      try { opener.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }
    return true;
  }

  var IGNORE_OUTSIDE = [
    '.miniSidedrawer', '.headerWrapper', '.ReactModalPortal', '.MuiPopover-root',
    '.MuiModal-root', '.MuiPopper-root', '[role="dialog"]', '[role="menu"]',
    '[role="listbox"]', '.toastWrapper', '.bottom-drawer',
    // anything interactive (it may open something in the panel)
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
    if (String(window.getSelection ? window.getSelection() : '') !== '') return; // user selected text
    var d = openDrawer();
    if (d && !d.contains(e.target)) closeDrawer(d);
  }, true);

  /* ---------- 8. phone profile card: tap outside / Esc closes ---------- */
  // On phones the profile opens as a full-screen sheet; the CSS turns it into
  // a centred card, so the dimmed area around it needs to close it.
  function profileSheet() {
    try { return $('.bottom-sheet__wrapper.open .bottom-sheet__container:has(.mobDelegateSidebar)'); }
    catch (e) { return null; }   // browsers without :has() keep the full-screen sheet
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
      if (anyModalOpen()) return;                      // the modal handles its own Esc
      if (isEditable(e.target) && e.target.value) return; // keep a half-typed message
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

  // Tap-to-call (touch devices only; the row gets .bt-tel there)
  doc.addEventListener('click', function (e) {
    var row = e.target.closest && e.target.closest('.bt-tel');
    var tel = row && row.getAttribute('data-bt-tel');
    if (tel && !e.target.closest('.bt-copy')) window.location.href = 'tel:' + tel;
  });

  /* ---------- update loop ---------- */
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

  // Nodes this script created (marked data-bt) or that live inside them.
  function own(node) {
    var el = node && (node.nodeType === 1 ? node : node.parentNode);
    return !!(el && el.closest && el.closest('[data-bt]'));
  }
  // Re-run on any change React makes; ignore the changes this script makes.
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
    // Fonts change chip widths; re-measure once they are ready.
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(schedule);
  }

  if (doc.readyState === 'complete') {
    boot();
  } else {
    window.addEventListener('load', boot);
  }
})();
