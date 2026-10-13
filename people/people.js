/*!
 * Rede Inspira Virtual University Fair: People page UI/UX behaviour
 * Page:   https://redeinspira.webifairs.com/people
 * Pairs:  css/people-override.css
 * Design: same system as ../redeinspira-booth-theme
 *
 * What it does (all additive; platform code is untouched):
 *  1. Page flags on <html>: bt-people, bt-mobile, bt-scrolled, bt-drawer-open
 *  2. Cards fade up in small waves as each batch loads (infinite scroll)
 *  3. "/" focuses the people search (opens it first on desktop)
 *  4. Esc closes, in order: phone filter / profile sheet, the filter
 *     dropdown, the sort menu, the open search field, the side panel.
 *     Focus goes back to the control that opened it.
 *  5. On phones the filter sheet and profile card (made smaller by the
 *     CSS) close on a tap on the dimmed area
 *  6. The side panel (Live Chat, Team, Q&A, Poll) closes on a click on
 *     empty page space, like on the booth page
 *  7. A "Back to top" button appears once the list is long
 *
 * Rules kept:
 *  - Only adds bt-* classes, attributes and small bt-* elements.
 *    React-owned text is never edited.
 *  - Everything is idempotent and re-applied through one rAF-batched
 *    MutationObserver, so React re-renders, sorting, filtering and
 *    infinite scroll are handled.
 *  - Safe next to js/booth-override.js: shared shortcuts check
 *    event.defaultPrevented, so an action never runs twice.
 *
 * Options (set before this file loads):
 *   window.BT_PEOPLE_CONFIG = { closeDrawerOnOutside: true, searchShortcut: true,
 *                               backToTop: true, staggerCards: true };
 */
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

  /* ---------- helpers ---------- */
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
      if (el.isConnected) { try { el.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    }, 30);
  }
  function onPeoplePage() { return root.classList.contains('bt-people'); }

  /* ---------- 1. page flags ---------- */
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

  /* ---------- 2. cards fade up in waves ---------- */
  // Cards already on screen when the script starts have played their
  // entrance; giving them a delay now would replay it, so they are skipped.
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

  /* ---------- 3. "/" focuses the search ---------- */
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
      // Focus inside the key event (its default is prevented), so the "/"
      // itself is never typed into the field; retry once React has rendered.
      if (s.deskInput) { try { s.deskInput.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      focusLater(s.deskInput);
      return true;
    }
    return false;
  }

  /* ---------- 4 + 5. closing things: Esc, outside taps ---------- */
  // Phone sheets made smaller by the CSS (profile card, filter sheet).
  function phoneSheet() {
    try { return $('.bottom-sheet__wrapper.open .bottom-sheet__container:has(.mobDelegateSidebar, .mobileFilterDrawer)'); }
    catch (e) { return null; }   // browsers without :has() keep the full-screen sheet
  }
  function closeSheet(c) {
    var btn = c && $('.drawerCloseButton button', c);
    if (!btn) return false;
    btn.click();
    return true;
  }

  var lastChip = null;     // filter chip that opened the dropdown
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

  // Side panel (same behaviour as the booth page)
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
    // anything interactive (it may open something in the panel)
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
    // Phone: a tap on the dimmed area around a sheet closes it
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
    // Desktop: a click on empty page space closes the side panel
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
      if (closeFilterDropdown() || closeSortMenu() || closeSearch(e.target)) { e.preventDefault(); return; }
      if (isEditable(e.target) && e.target.value) return; // keep a half-typed message
      var d = openDrawer();
      if (d && closeDrawer(d)) e.preventDefault();
      return;
    }

    if (e.key === '/' && CFG.searchShortcut && onPeoplePage()) {
      if (e.altKey || e.ctrlKey || e.metaKey || isEditable(e.target) || anyModalOpen()) return;
      if (focusSearch()) e.preventDefault();
    }
  });

  /* ---------- 7. back to top ---------- */
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

  /* ---------- update loop ---------- */
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
