/* Innovators custom-code loader.
   Set once in the platform's custom JS field (pinned commit URL) and never changed again.
   Loads the newest innovators/master.css + custom.js from GitHub `main` through jsDelivr's
   commit URLs, because jsDelivr's @main branch cache keeps serving stale commits. */
(function () {
  "use strict";
  if (window.__INSPIRA_LOADER__) return;
  window.__INSPIRA_LOADER__ = true;

  var REPO = "Hpshiva/webifairs-custom-code";
  var FALLBACK_SHA = "4c9e78959709a40e515de4b15243e35da61139f5"; // known-good build if GitHub is unreachable
  var CACHE_KEY = "innovators_code_sha";
  var FRESH_MS = 5 * 60 * 1000;   // reuse a looked-up commit for 5 min (keeps GitHub API calls low)
  var USABLE_MS = 60 * 60 * 1000; // a cached commit up to 1 h old is used straight away
  var TIMEOUT_MS = 2500;
  var SHA_RE = /^[0-9a-f]{40}$/;
  var root = document.documentElement;

  function readCache() {
    try {
      var c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      return c && SHA_RE.test(c.sha) ? c : null;
    } catch (e) { return null; }
  }

  function writeCache(sha) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ sha: sha, at: Date.now() })); } catch (e) {}
  }

  function fetchLatest() {
    return new Promise(function (resolve) {
      var done = false;
      function finish(sha) { if (!done) { done = true; resolve(sha); } }
      setTimeout(function () { finish(null); }, TIMEOUT_MS);
      try {
        fetch("https://api.github.com/repos/" + REPO + "/commits/main", {
          headers: { Accept: "application/vnd.github.sha" },
          cache: "no-store"
        })
          .then(function (r) { return r.ok ? r.text() : null; })
          .then(function (t) { t = (t || "").trim(); finish(SHA_RE.test(t) ? t : null); })
          .catch(function () { finish(null); });
      } catch (e) { finish(null); }
    });
  }

  function reveal() { root.classList.add("inspira-css-ready"); }

  function load(sha) {
    var base = "https://cdn.jsdelivr.net/gh/" + REPO + "@" + sha + "/innovators/";
    root.setAttribute("data-inspira-build", sha.slice(0, 7));

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = base + "master.css";
    link.onload = reveal;
    link.onerror = reveal;
    document.head.appendChild(link);

    var script = document.createElement("script");
    script.src = base + "custom.js";
    script.async = false;
    (document.body || document.head).appendChild(script);
  }

  var cached = readCache();
  var age = cached ? Date.now() - cached.at : Infinity;

  if (cached && age < USABLE_MS) {
    load(cached.sha);
    if (age > FRESH_MS) fetchLatest().then(function (sha) { if (sha) writeCache(sha); });
    return;
  }

  fetchLatest().then(function (sha) {
    if (sha) writeCache(sha);
    load(sha || (cached && cached.sha) || FALLBACK_SHA);
  });
})();
