(function () {
  // Menu (hamburger)
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function zamknij() {
    nav.classList.remove('otw');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Otwórz menu');
    document.body.style.overflow = '';
  }
  burger.addEventListener('click', function () {
    var otw = nav.classList.toggle('otw');
    burger.setAttribute('aria-expanded', otw ? 'true' : 'false');
    burger.setAttribute('aria-label', otw ? 'Zamknij menu' : 'Otwórz menu');
    document.body.style.overflow = otw ? 'hidden' : '';
  });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') zamknij(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zamknij(); });

  // Dolny pasek na telefonie dopiero po przewinieciu za glowny przycisk w hero
  var cta = document.getElementById('ctaMain');
  var mob = document.getElementById('mob');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (w) {
      var e = w[0];
      mob.classList.toggle('widac', !e.isIntersecting && e.boundingClientRect.top < 0);
    }, { threshold: 0 }).observe(cta);
  } else {
    mob.classList.add('widac');
  }

  // Powiekszanie zdjec z realizacji
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var linki = Array.prototype.slice.call(document.querySelectorAll('#galeria a'));
  var nr = 0;
  function pokaz(i) {
    nr = (i + linki.length) % linki.length;
    lbImg.src = linki[nr].getAttribute('href');
    lbImg.alt = linki[nr].querySelector('img').alt;
  }
  if (lb && typeof lb.showModal === 'function') {
    linki.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); pokaz(i); lb.showModal(); });
    });
    document.getElementById('lbX').addEventListener('click', function () { lb.close(); });
    document.getElementById('lbP').addEventListener('click', function () { pokaz(nr - 1); });
    document.getElementById('lbN').addEventListener('click', function () { pokaz(nr + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') pokaz(nr - 1);
      if (e.key === 'ArrowRight') pokaz(nr + 1);
    });
  }

  // Formularze w wizualizacji niczego nie wysylaja
  Array.prototype.forEach.call(document.querySelectorAll('.js-form'), function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      f.querySelector('.f-info').hidden = false;
    });
  });
})();
