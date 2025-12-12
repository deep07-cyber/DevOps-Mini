// Basic interactivity for multi-page dashboard

document.addEventListener('DOMContentLoaded', () => {
  // set years
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year2')?.textContent = y;

  // reveal on scroll
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Smooth scroll internal links (on same page)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1 && document.querySelector(href)) {
        ev.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Hamburger menu
  const hamb = document.querySelectorAll('.hamburger');
  hamb.forEach(button => {
    button.addEventListener('click', () => {
      const ul = button.closest('.nav-menu')?.querySelector('ul');
      if (!ul) return;
      const isOpen = ul.style.display === 'flex';
      ul.style.display = isOpen ? 'none' : 'flex';
      button.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Highlight active nav link (based on pathname or hash)
  const navLinks = document.querySelectorAll('.nav-menu a.nav-link');
  function markActive() {
    const path = window.location.pathname.split('/').pop();
    navLinks.forEach(a => {
      a.classList.remove('active');
      const href = a.getAttribute('href');
      if (href === path || (href === window.location.hash && href !== '#')) {
        a.classList.add('active');
      }
      // home fallback
      if ((path === '' || path === 'index.html') && a.getAttribute('href').includes('index.html')) a.classList.add('active');
    });
  }
  markActive();
  window.addEventListener('popstate', markActive);

  // Video unmute toggle
  const video = document.getElementById('introVideo');
  const vt = document.getElementById('videoToggle');
  if (vt && video) {
    let muted = true;
    vt.addEventListener('click', () => {
      try {
        // toggle by setting muted property
        video.muted = !video.muted;
        muted = video.muted;
        vt.textContent = muted ? 'Unmute ▶' : 'Mute ⏸';
      } catch (err) {
        // fallback: reload with mute param changed
        let src = video.src || '';
        if (muted) {
          video.src = src.replace('mute=1', 'mute=0');
          vt.textContent = 'Mute ⏸';
          muted = false;
        } else {
          video.src = src.replace('mute=0', 'mute=1');
          vt.textContent = 'Unmute ▶';
          muted = true;
        }
      }
    });
  }

  // contact form: mailto fallback + toast
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      alert('Please fill all fields.');
      return;
    }

    // mailto fallback
    const subject = encodeURIComponent('Portfolio inquiry from ' + name);
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
    // attempt to open mail client
    window.location.href = `mailto:rupali@example.com?subject=${subject}&body=${body}`;

    // show toast
    showToast('Opening your mail client...');
    form.reset();
  });

  // toast helper
  function showToast(text = 'Message sent') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // expose showToast globally if needed
  window.showToast = showToast;
});
