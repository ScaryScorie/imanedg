// Menu mobile
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Marque le lien de navigation actif selon la page courante
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current) link.classList.add('is-active');
  });

  // Formulaire de contact : simple confirmation locale.
  // NOTE : ce formulaire n'envoie rien tant qu'il n'est pas relié à un
  // service (Formspree, Netlify Forms, etc.) — voir LISEZ-MOI.md
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) note.classList.add('is-visible');
      form.reset();
    });
  }

  // ---------------------------------------------------------------
  // Repli automatique d'extension pour les images de la galerie.
  // Le HTML référence des noms en .jpg par défaut, mais si le
  // fichier réel est un .png, .gif, .webp ou .jpeg, cette fonction
  // essaie chaque extension jusqu'à trouver celle qui fonctionne —
  // aucun renommage de fichier n'est nécessaire côté utilisateur.
  // ---------------------------------------------------------------
  var EXT_CANDIDATES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

  function attachExtensionFallback(img) {
    var src = img.getAttribute('src');
    if (!src || src.indexOf('images/') !== 0) return;

    var match = src.match(/^(.*)\.([a-zA-Z0-9]+)$/);
    var base = match ? match[1] : src;
    var currentExt = match ? match[2].toLowerCase() : '';
    var queue = EXT_CANDIDATES.filter(function (e) { return e !== currentExt; });
    var i = 0;

    img.addEventListener('error', function onError() {
      if (i < queue.length) {
        img.src = base + '.' + queue[i];
        i++;
      } else {
        img.removeEventListener('error', onError);
        img.classList.add('img-missing');
      }
    });
  }

  document.querySelectorAll('img[src^="images/"]').forEach(attachExtensionFallback);

  // ---------------------------------------------------------------
  // Lightbox : clic sur une image de galerie -> affichage plein écran.
  // Navigation précédent/suivant, clavier (flèches, Échap), clic en
  // dehors de l'image pour fermer.
  // ---------------------------------------------------------------
  var triggers = Array.prototype.slice.call(document.querySelectorAll('.gallery-trigger'));
  if (triggers.length) {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<button class="lightbox-close" type="button" aria-label="Fermer">&#10005;</button>' +
      '<button class="lightbox-prev" type="button" aria-label="Image pr\u00e9c\u00e9dente">&#8249;</button>' +
      '<button class="lightbox-next" type="button" aria-label="Image suivante">&#8250;</button>' +
      '<img alt="">' +
      '<p class="lightbox-caption"></p>';
    document.body.appendChild(overlay);

    var lbImg = overlay.querySelector('img');
    var lbCaption = overlay.querySelector('.lightbox-caption');
    var lbClose = overlay.querySelector('.lightbox-close');
    var lbPrev = overlay.querySelector('.lightbox-prev');
    var lbNext = overlay.querySelector('.lightbox-next');
    var currentIndex = -1;
    var lastFocused = null;

    if (triggers.length < 2) {
      lbPrev.style.display = 'none';
      lbNext.style.display = 'none';
    }

    function showIndex(i) {
      currentIndex = (i + triggers.length) % triggers.length;
      var sourceImg = triggers[currentIndex].querySelector('img');
      lbImg.src = sourceImg.src;
      lbImg.alt = sourceImg.alt || '';
      lbCaption.textContent = sourceImg.alt || '';
    }
    function openLightbox(i) {
      lastFocused = document.activeElement;
      showIndex(i);
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }
    function closeLightbox() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      lbImg.src = '';
      if (lastFocused) lastFocused.focus();
    }

    triggers.forEach(function (t, i) {
      t.addEventListener('click', function () { openLightbox(i); });
    });
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', function () { showIndex(currentIndex - 1); });
    lbNext.addEventListener('click', function () { showIndex(currentIndex + 1); });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showIndex(currentIndex - 1);
      else if (e.key === 'ArrowRight') showIndex(currentIndex + 1);
    });
  }

  // ---------------------------------------------------------------
  // Menu latéral des projets (pages galerie) : mise en surbrillance
  // du projet actuellement visible au défilement.
  // ---------------------------------------------------------------
  var sideNav = document.querySelector('.side-nav');
  if (sideNav) {
    var sideLinks = Array.prototype.slice.call(sideNav.querySelectorAll('a'));
    var targets = sideLinks
      .map(function (link) {
        var id = link.getAttribute('href').replace('#', '');
        var el = document.getElementById(id);
        return el ? { link: link, el: el } : null;
      })
      .filter(Boolean);

    if (targets.length && 'IntersectionObserver' in window) {
      var setActive = function (link) {
        sideLinks.forEach(function (l) { l.classList.remove('is-active'); });
        if (link) link.classList.add('is-active');
      };

      var observer = new IntersectionObserver(function (entries) {
        var visible = entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
        if (visible.length) {
          var match = targets.find(function (t) { return t.el === visible[0].target; });
          if (match) setActive(match.link);
        }
      }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

      targets.forEach(function (t) { observer.observe(t.el); });
      setActive(targets[0].link);
    }
  }
});
