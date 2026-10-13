(function () {
  'use strict';

  if (window.__BT_EMBED__) return;
  window.__BT_EMBED__ = true;

  var CFG = Object.assign({
    closeDrawerOnOutside: true
  }, window.BT_EMBED_CONFIG || {});

  var doc = document;
  var root = doc.documentElement;

  /* ---------- helpers ---------- */
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
      if (el.isConnected) { try { el.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    }, 30);
  }
  function onEmbedPage() { return root.classList.contains('bt-embed'); }

  /* ---------- 1. page flags ---------- */
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

  /* ---------- 2. side panel ---------- */
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
    // anything interactive (it may open something in the panel)
    'button', 'a', 'input', 'textarea', 'select', 'label', '[role="button"]',
    '[role="tab"]', '[role="link"]', '[contenteditable]', '[tabindex]'
  ].join(',');

  /* ---------- 3. phone profile card ---------- */
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
    if (anyModalOpen()) return;                        // the modal handles its own Esc
    if (isEditable(e.target) && e.target.value) return;  // keep a half-typed message
    var d = openDrawer();
    if (d && closeDrawer(d)) e.preventDefault();
  });

  /* ---------- update loop ---------- */
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
