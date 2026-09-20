/* Progressive enhancement: ordinary YouTube links also work without JavaScript. */
(function () {
  'use strict';
  var root = document.querySelector('.vn-messages');
  if (!root) return;
  var stage = root.querySelector('#vn-msg-stage');
  var title = root.querySelector('#vn-msg-featured-title');
  var label = root.querySelector('#vn-msg-featured-label');
  var youtubeLink = root.querySelector('#vn-msg-youtube-link');
  var status = root.querySelector('#vn-msg-player-status');
  var restore = root.querySelector('#vn-msg-restore');
  var feature = root.querySelector('#vn-msg-featured');
  if (!stage || !title || !youtubeLink || !label || !status) return;

  root.addEventListener('click', function (event) {
    var link = event.target.closest('a[data-video-id]');
    if (!link || !root.contains(link) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var id = link.getAttribute('data-video-id');
    if (!/^[A-Za-z0-9_-]{11}$/.test(id || '')) return;
    event.preventDefault();

    var messageTitle = link.getAttribute('data-video-title') || 'Mensaje de Vida Nueva';
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
    iframe.title = messageTitle;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    // Replacing the previous iframe also stops the previous message.
    while (stage.firstChild) stage.removeChild(stage.firstChild);
    stage.appendChild(iframe);
    title.textContent = messageTitle;
    var isFeatured = feature && feature.getAttribute('data-featured-id') === id;
    label.textContent = isFeatured ? 'Mensaje destacado' : 'Mensaje seleccionado';
    if (restore) restore.hidden = isFeatured;
    youtubeLink.href = 'https://www.youtube.com/watch?v=' + id;
    status.textContent = 'Mensaje seleccionado: ' + messageTitle;

    Array.prototype.forEach.call(root.querySelectorAll('.vn-msg-card-link'), function (cardLink) {
      var selected = cardLink.getAttribute('data-video-id') === id;
      cardLink.classList.toggle('is-selected', selected);
      if (selected) cardLink.setAttribute('aria-current', 'true');
      else cardLink.removeAttribute('aria-current');
      cardLink.querySelector('.vn-msg-card-action').textContent = selected ? 'Mensaje seleccionado' : 'Escuchar mensaje →';
    });
    stage.focus({ preventScroll: true });
    stage.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  });
}());
