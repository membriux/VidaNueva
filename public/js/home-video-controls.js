/* Adds pause/resume without changing random_video.js or its video selection. */
(function () {
  'use strict';
  var video = document.getElementById('vn-home-video');
  var button = document.getElementById('vn-home-video-toggle');
  if (!video || !button) return;

  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var allowPlayback = !motion.matches;
  video.muted = true;
  video.autoplay = allowPlayback;
  if (!allowPlayback) video.pause();
  button.hidden = false;

  function updateLabel() {
    button.textContent = video.paused ? 'Reproducir video' : 'Pausar video';
  }
  function playVideo() {
    var request = video.play();
    if (request && request.catch) request.catch(updateLabel);
  }
  video.addEventListener('play', function () {
    if (!allowPlayback) video.pause();
    updateLabel();
  });
  video.addEventListener('pause', updateLabel);
  video.addEventListener('error', function () { button.hidden = true; });
  video.addEventListener('loadeddata', updateLabel);
  button.addEventListener('click', function () {
    if (video.paused) { allowPlayback = true; playVideo(); }
    else { allowPlayback = false; video.pause(); }
  });
  function onMotionChange() {
    allowPlayback = !motion.matches;
    video.autoplay = allowPlayback;
    if (allowPlayback) playVideo();
    else video.pause();
    updateLabel();
  }
  if (motion.addEventListener) motion.addEventListener('change', onMotionChange);
  else if (motion.addListener) motion.addListener(onMotionChange);
  updateLabel();
}());
