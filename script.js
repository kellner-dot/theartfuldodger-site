/* ============================================================
   THE ARTFUL DODGER — interactions
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Spectrum canvas (fake analyzer) ---------- */
  var canvas = document.getElementById('spectrum');
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext('2d');
    var W, H, bars, particles;
    var CYAN = '0, 229, 255', MAG = '255, 45, 120';

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(48, Math.floor(W / 14));
      bars = [];
      for (var i = 0; i < n; i++) {
        bars.push({ v: Math.random(), target: Math.random(), speed: 0.02 + Math.random() * 0.06, hue: Math.random() });
      }
      particles = [];
      for (var j = 0; j < 60; j++) {
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          r: 0.6 + Math.random() * 1.8,
          vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
          c: Math.random() < 0.5 ? CYAN : MAG, a: 0.15 + Math.random() * 0.4
        });
      }
    }

    function beat(t) {
      // slow 128bpm-ish pulse for the low end
      return 0.5 + 0.5 * Math.sin(t * 0.0042);
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      var bw = W / bars.length;
      var b = beat(t);

      for (var i = 0; i < bars.length; i++) {
        var bar = bars[i];
        if (Math.random() < 0.06) bar.target = Math.random();
        bar.v += (bar.target - bar.v) * bar.speed;
        // low-end emphasis on the left, pulsing with the beat
        var pos = i / bars.length;
        var amp = bar.v * (1 - pos * 0.55) * (0.35 + b * 0.65);
        var h = Math.max(3, amp * H * 0.52);
        var x = i * bw + bw * 0.22, w = bw * 0.56;
        var y = H - h;
        var col = bar.hue < 0.72 ? CYAN : MAG;
        var grad = ctx.createLinearGradient(0, y, 0, H);
        grad.addColorStop(0, 'rgba(' + col + ',0.85)');
        grad.addColorStop(1, 'rgba(' + col + ',0.03)');
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, w, h);
        // peak cap
        ctx.fillStyle = 'rgba(' + col + ',0.9)';
        ctx.fillRect(x, y, w, 2);
      }

      for (var p = 0; p < particles.length; p++) {
        var pt = particles[p];
        pt.x += pt.vx; pt.y += pt.vy;
        if (pt.x < 0) pt.x = W; if (pt.x > W) pt.x = 0;
        if (pt.y < 0) pt.y = H; if (pt.y > H) pt.y = 0;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + pt.c + ',' + pt.a + ')';
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
  }

  /* ---------- Hero glitch bursts ---------- */
  var title = document.querySelector('.glitch');
  if (title && !reduceMotion) {
    setInterval(function () {
      title.classList.add('glitching');
      setTimeout(function () { title.classList.remove('glitching'); }, 480);
    }, 4200);
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Stat count-up ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var dur = 1400, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
