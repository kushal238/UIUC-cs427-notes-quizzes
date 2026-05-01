/**
 * index.html：iframe 切换周次。周次数据在 study-weeks-config.js，侧栏 DOM 在 study-sidebar.js。
 */
(function () {
  var DEFAULT_ID = 'week-8';

  function $(sel) {
    return document.querySelector(sel);
  }

  function findWeekById(id) {
    if (!id || !window.STUDY_WEEKS) return null;
    var clean = String(id).replace(/^#/, '');
    for (var i = 0; i < window.STUDY_WEEKS.length; i++) {
      if (window.STUDY_WEEKS[i].id === clean) return window.STUDY_WEEKS[i];
    }
    return null;
  }

  function setCurrentNav(activeId) {
    var links = document.querySelectorAll('.study-nav-list a[data-week-id]');
    links.forEach(function (a) {
      var isCurrent = a.getAttribute('data-week-id') === activeId;
      a.classList.toggle('current', isCurrent);
      if (isCurrent) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  var mobileMQ = window.matchMedia('(max-width: 960px)');
  var resizeObserver = null;

  function isMobile() { return mobileMQ.matches; }

  function syncFrameHeight() {
    var frame = $('#study-frame');
    if (!frame) return;
    if (!isMobile()) { frame.style.height = ''; return; }
    var doc;
    try { doc = frame.contentDocument && frame.contentDocument.documentElement; } catch (e) { return; }
    if (!doc) return;
    var h = doc.scrollHeight;
    if (h && Math.abs(parseInt(frame.style.height, 10) - h) > 1) {
      frame.style.height = h + 'px';
    }
  }

  function attachFrameObserver() {
    var frame = $('#study-frame');
    if (!frame) return;
    if (resizeObserver) { try { resizeObserver.disconnect(); } catch (e) {} resizeObserver = null; }
    var doc;
    try { doc = frame.contentDocument && frame.contentDocument.documentElement; } catch (e) { return; }
    if (!doc) return;
    syncFrameHeight();
    if (typeof ResizeObserver === 'function') {
      resizeObserver = new ResizeObserver(syncFrameHeight);
      try { resizeObserver.observe(doc); } catch (e) {}
    }
  }

  function loadWeek(week) {
    if (!week || !week.file) return;
    var frame = $('#study-frame');
    if (!frame) return;
    var f = window.getWeekFile ? window.getWeekFile(week) : week.file;
    frame.src = f + '?embed=1';
    setCurrentNav(week.id);
    try {
      history.replaceState(null, '', '#' + week.id);
    } catch (e) {}
    document.title = 'CS 427 Study · ' + window.formatWeekLabel(week);
    try { window.scrollTo(0, 0); } catch (e) {}
  }

  function hashToWeekId() {
    var h = (location.hash || '').replace(/^#/, '');
    return h || null;
  }

  function pickInitialWeek() {
    var fromHash = findWeekById(hashToWeekId());
    if (fromHash && fromHash.file) return fromHash;
    var def = findWeekById(DEFAULT_ID);
    if (def && def.file) return def;
    if (!window.STUDY_WEEKS) return null;
    for (var j = 0; j < window.STUDY_WEEKS.length; j++) {
      if (window.STUDY_WEEKS[j].file) return window.STUDY_WEEKS[j];
    }
    return null;
  }

  function setNavOpen(open) {
    var toggle = document.getElementById('study-nav-toggle');
    var backdrop = document.getElementById('study-nav-backdrop');
    document.body.classList.toggle('nav-open', open);
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (backdrop) backdrop.hidden = !open;
  }

  function initNavToggle() {
    var toggle = document.getElementById('study-nav-toggle');
    var backdrop = document.getElementById('study-nav-backdrop');
    var navList = document.getElementById('study-nav-list');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      setNavOpen(!document.body.classList.contains('nav-open'));
    });
    if (backdrop) backdrop.addEventListener('click', function () { setNavOpen(false); });
    if (navList) navList.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNavOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) setNavOpen(false);
    });
  }

  function init() {
    var initial = pickInitialWeek();
    if (typeof window.renderStudyNavList === 'function') {
      window.renderStudyNavList($('#study-nav-list'), {
        useHash: true,
        currentId: initial ? initial.id : '',
        onWeekClick: loadWeek
      });
    }
    if (initial) loadWeek(initial);

    window.addEventListener('hashchange', function () {
      var w = findWeekById(hashToWeekId());
      if (w && w.file) loadWeek(w);
    });

    initNavToggle();
    initScrollToTop();

    var frame = $('#study-frame');
    if (frame) {
      frame.addEventListener('load', attachFrameObserver);
    }
    mobileMQ.addEventListener ? mobileMQ.addEventListener('change', syncFrameHeight) : mobileMQ.addListener(syncFrameHeight);
    window.addEventListener('resize', syncFrameHeight);
  }

  function initScrollToTop() {
    var btn = document.getElementById('scroll-to-top');
    if (!btn) return;
    btn.hidden = false;
    var threshold = 400;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset || 0;
      btn.classList.toggle('visible', y > threshold);
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    btn.addEventListener('click', function () {
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); }
      catch (e) { window.scrollTo(0, 0); }
    });
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
