/* Extracted from public/article-7.html inline scripts */
window.addEventListener('scroll', function() {
  var h = document.documentElement;
  var p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  var bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = p + '%';
});
