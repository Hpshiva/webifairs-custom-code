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

  /* ---------- helpers ---------- */
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
      if (el.isConnected) { try { el.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    }, 30);
  }
  function onRoomsPage() { return root.classList.contains('bt-rooms'); }

  /* ---------- 1. page flags ---------- */
  function openDrawer() { return $('.sidedrawerWrapper.open:not(.profile)'); }

  function pageFlags() {
    var page = $('.roomPageWrapper');
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

  /* ---------- 2. logo showcase backdrop ---------- */
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

  /* ---------- 3. cards rise in waves ---------- */
  // Cards already on screen when the script starts have played their
  // entrance; giving them a delay now would replay it, so they are skipped.
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

  /* ---------- 4. spotlight ---------- */
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

  /* ---------- 5. full-name tooltips ---------- */
  function nameTips() {
    $$('.roomsCardsList .orgName h6').forEach(function (h) {
      var full = (h.textContent || '').trim();
      var cut = h.scrollHeight > h.clientHeight + 1;
      if (cut && h.getAttribute('title') !== full) h.setAttribute('title', full);
      if (!cut && h.hasAttribute('title') && h.__btTitled) h.removeAttribute('title');
      h.__btTitled = cut;
    });
  }

  /* ---------- 5b. every card joins its room (no popup) ---------- */
  // Hubilo labels the card button "Start" for room hosts and "Enter" for everyone else; both run the
  // same native "join room" handler, so the button is left alone (lobby.css shows "Start" on all).
  // The card image and logo press that same button, so every part of the card opens the room.
  function linkEnterButtons() {
    $$('.roomsCardsList .roomCard').forEach(function (card) {
      var oldOverlay = card.querySelector('a.bt-enter-overlay');
      if (oldOverlay) oldOverlay.remove();

      var btn = card.querySelector('.cardActions .MuiButton-root, .cardActions button');
      if (!btn) return;

      if (btn.classList.contains('Mui-disabled')) btn.classList.remove('Mui-disabled');
      if (btn.hasAttribute('disabled')) btn.removeAttribute('disabled');
      if (btn.getAttribute('aria-disabled') === 'true') btn.removeAttribute('aria-disabled');

      [card.querySelector('.roomCardMedia'), card.querySelector('.orgProfile')].forEach(function (zone) {
        if (!zone) return;
        zone.style.cursor = 'pointer';
        if (zone.__btJoinBound) return;
        zone.__btJoinBound = true;
        zone.addEventListener('click', function (e) {
          if (e.target && e.target.closest && e.target.closest('button, a')) return;
          var joinBtn = card.querySelector('.cardActions .MuiButton-root, .cardActions button');
          if (!joinBtn) return;
          e.preventDefault();
          e.stopPropagation();
          joinBtn.click();
        });
      });
    });
  }


  /* ---------- 6 + 7. keyboard, menus, side panel ---------- */
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
      // Focus inside the key event (its default is prevented), so the "/"
      // itself is never typed into the field; retry once React has rendered.
      if (s.deskInput) { try { s.deskInput.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
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
    catch (e) { return null; }   // browsers without :has() keep the full-screen sheet
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
    // anything interactive (it may open something in the panel)
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
      if (anyModalOpen()) return;                       // the modal handles its own Esc
      if (closeSortMenu() || closeSearch(e.target)) { e.preventDefault(); return; }
      if (isEditable(e.target) && e.target.value) return; // keep a half-typed message
      var d = openDrawer();
      if (d && closeDrawer(d)) e.preventDefault();
      return;
    }

    if (e.key === '/' && CFG.searchShortcut && onRoomsPage()) {
      if (e.altKey || e.ctrlKey || e.metaKey || isEditable(e.target) || anyModalOpen()) return;
      if (focusSearch()) e.preventDefault();
    }
  });

  /* ---------- update loop ---------- */
  function update() {
    var page = pageFlags();
    onScroll();
    if (!page) return;
    [showcase, stagger, nameTips, linkEnterButtons].forEach(function (fn) {
      try { fn(); } catch (err) { if (window.console) console.warn('[rooms-override]', fn.name, err); }
    });
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; update(); });
  }

  // Re-run on React changes (new cards, sort, filter, image swaps).
  var mo = new MutationObserver(schedule);

  function boot() {
    update();
    mo.observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'src'] });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(schedule);
  }

  if (doc.readyState === 'complete') {
    boot();
  } else {
    window.addEventListener('load', boot);
  }
})();
