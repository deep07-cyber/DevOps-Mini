// Basic interactivity for multi-page dashboard

document.addEventListener('DOMContentLoaded', () => {
  // set years
  const y = new Date().getFullYear(); 
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  const yearEl2 = document.getElementById('year2');
  if (yearEl2) yearEl2.textContent = y;


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

// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Highlight active nav link
const navLinks = document.querySelectorAll('.nav-menu a');

function markActive() {
  const current = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    link.classList.remove('active');

    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
}

markActive();

// Close menu on link click (mobile UX)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});



   
const box = document.getElementById("floating-video");
const handle = document.getElementById("dragHandle");
const closeBtn = document.getElementById("closeVideo");

if (!box || !handle || !closeBtn) {
  console.error("Floating video elements not found");
} else {
  
  const box = document.getElementById("floating-video");
  const video = document.getElementById("videoPlayer");
  const closeBtn = document.getElementById("closeVideo");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

box.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = box.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  box.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  box.style.left = e.clientX - offsetX + "px";
  box.style.top = e.clientY - offsetY + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  box.style.cursor = "grab";
});

/* TOUCH */
box.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  const rect = box.getBoundingClientRect();
  offsetX = t.clientX - rect.left;
  offsetY = t.clientY - rect.top;
  isDragging = true;
}, { passive: false });

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const t = e.touches[0];
  box.style.left = t.clientX - offsetX + "px";
  box.style.top = t.clientY - offsetY + "px";
}, { passive: false });

document.addEventListener("touchend", () => {
  isDragging = false;
});

/* CLOSE */
if (box && video && closeBtn) {
  closeBtn.addEventListener("click", () => {
    video.pause();
    video.currentTime = 0;
    box.style.display = "none";
  });
}

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
