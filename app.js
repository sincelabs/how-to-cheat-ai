// How to Cheat in This AI Era — deck navigation
(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var current = 0;
  var counter = document.getElementById('counter');
  var progressBar = document.getElementById('progressBar');
  var materials = document.getElementById('materials');

  function render() {
    slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
    counter.textContent = (current + 1) + ' / ' + slides.length;
    progressBar.style.width = (((current + 1) / slides.length) * 100) + '%';
    if (location.hash !== '#' + (current + 1)) {
      try { history.replaceState(null, '', '#' + (current + 1)); } catch (e) {}
    }
  }

  function nav(dir) {
    if (materials && !materials.hidden) return; // ignore deck keys while materials open
    var next = Math.min(Math.max(current + dir, 0), slides.length - 1);
    if (next !== current) { current = next; render(); }
  }

  function goTo(n) {
    current = Math.min(Math.max(n, 0), slides.length - 1);
    render();
  }

  // keyboard
  document.addEventListener('keydown', function (e) {
    if (materials && !materials.hidden) {
      if (e.key === 'Escape') toggleMaterials();
      return;
    }
    switch (e.key) {
      case 'ArrowRight': case ' ': case 'PageDown': case 'Enter':
        e.preventDefault(); nav(1); break;
      case 'ArrowLeft': case 'PageUp':
        e.preventDefault(); nav(-1); break;
      case 'Home': e.preventDefault(); goTo(0); break;
      case 'End': e.preventDefault(); goTo(slides.length - 1); break;
      case 'm': case 'M': toggleMaterials(); break;
    }
  });

  // touch / swipe
  var touchX = null, touchY = null;
  document.addEventListener('touchstart', function (e) {
    touchX = e.touches[0].clientX; touchY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) nav(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  // deep link (#N)
  var fromHash = parseInt(location.hash.replace('#', ''), 10);
  if (!isNaN(fromHash) && fromHash >= 1 && fromHash <= slides.length) current = fromHash - 1;
  window.addEventListener('hashchange', function () {
    var n = parseInt(location.hash.replace('#', ''), 10);
    if (!isNaN(n) && n >= 1 && n <= slides.length && n - 1 !== current) goTo(n - 1);
  });

  render();

  // expose for inline onclick handlers
  window.nav = nav;
})();

function toggleMaterials() {
  var m = document.getElementById('materials');
  m.hidden = !m.hidden;
  document.body.style.overflow = m.hidden ? 'hidden' : '';
  if (!m.hidden) m.scrollTop = 0;
}

function copyPrompt(id, btn) {
  var text = document.getElementById(id).textContent;
  function done() {
    var old = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(function () { btn.textContent = old; btn.classList.remove('copied'); }, 1600);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done, function () { fallback(); });
  } else { fallback(); }
  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(ta);
  }
}
