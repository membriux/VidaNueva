(function () {
  'use strict';
  var root = document.querySelector('.vn-events');
  if (!root) return;
  Array.prototype.forEach.call(root.querySelectorAll('.vn-evt-poster'), function (image) {
    function showFallback() { image.parentNode.classList.add('is-missing'); image.hidden = true; }
    image.addEventListener('error', showFallback);
    if (image.complete && image.naturalWidth === 0) showFallback();
  });
  var frame = root.querySelector('#vn-evt-calendar-frame');
  var controls = root.querySelector('.vn-evt-calendar-controls');
  if (!frame || !controls) return;
  var base = frame.getAttribute('data-calendar-base');
  var media = window.matchMedia('(max-width: 700px)');
  var hasChosenView = false;
  function setView(mode) {
    if (mode !== 'MONTH' && mode !== 'AGENDA') return;
    var url = base + '&mode=' + mode;
    if (frame.getAttribute('src') !== url) frame.setAttribute('src', url);
    Array.prototype.forEach.call(controls.querySelectorAll('button'), function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-calendar-mode') === mode));
    });
  }
  controls.hidden = false;
  setView('AGENDA');
  controls.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-calendar-mode]');
    if (!button || !controls.contains(button)) return;
    hasChosenView = true;
    setView(button.getAttribute('data-calendar-mode'));
  });
  function resizeView() { if (!hasChosenView) setView('AGENDA'); }
  if (media.addEventListener) media.addEventListener('change', resizeView);
  else if (media.addListener) media.addListener(resizeView);
}());
