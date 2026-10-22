(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var meta = document.querySelector('meta[name="theme-color"]');
  var colors = { light: '#cebe80', dark: '#6e767b' };

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', colors[theme]);
    btn.setAttribute('aria-pressed', theme === 'dark');
    btn.setAttribute('title', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
  }

  applyTheme(root.getAttribute('data-theme') || 'light');

  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Подсветка пункта меню по прокрутке
  var links = document.querySelectorAll('.nav a');
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute('href'));
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(function (s) { if (s) io.observe(s); });
  }
})();
