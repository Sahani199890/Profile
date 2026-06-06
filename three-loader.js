/* ============================================================
   Shared Three.js loader
   Loads the global Three.js build exactly once and hands the
   namespace to every queued callback. Used by scene3d.js (hero)
   and projects3d.js so the library is downloaded a single time.
   ============================================================ */
window.ThreeLoader = (function () {
  'use strict';
  var URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  var loading = false;
  var queue = [];

  function flush() {
    var cbs = queue;
    queue = [];
    cbs.forEach(function (cb) {
      try { cb(window.THREE); } catch (e) { /* one bad consumer shouldn't kill the rest */ }
    });
  }

  function load(cb) {
    if (typeof cb !== 'function') return;
    if (window.THREE) { cb(window.THREE); return; }
    queue.push(cb);
    if (loading) return;
    loading = true;
    var s = document.createElement('script');
    s.src = URL;
    s.async = true;
    s.onload = function () { if (window.THREE) flush(); };
    s.onerror = function () { queue = []; }; // CDN unreachable — consumers keep their fallbacks
    document.head.appendChild(s);
  }

  return { load: load };
})();
