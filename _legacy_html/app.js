/* ═══════════════════════════════════════════
   HARE KRISHNA MARWAR — App Logic
   Multi-page support | Aarti Ticker | FAQ
═══════════════════════════════════════════ */

// ─── Aarti Schedule (real data from harekrishnamarwar.org) ─── 
const aartiSchedule = [
  { name: 'Mangala Aarti', hour: 4, minute: 30 },
  { name: 'Darshan Aarti', hour: 7, minute: 0 },
  { name: 'Raj Bhog Aarti', hour: 12, minute: 0 },
  { name: 'Utthapan Aarti', hour: 16, minute: 0 },
  { name: 'Sandhya Aarti', hour: 19, minute: 30 },
  { name: 'Shayan Aarti', hour: 20, minute: 30 },
];

// ─── Navbar scroll behavior ───
const navbar = document.getElementById('navbar');
if (navbar) {
  // Only add scroll behavior on home page (non-scrolled header)
  const isHomePage = !navbar.classList.contains('scrolled');
  if (isHomePage) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
}

// ─── Hamburger Menu ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ─── Scroll to Top ───
const scrollTopBtn = document.getElementById('scroll-top-btn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Scroll Reveal ───
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

// ─── Aarti Countdown Ticker ───
function updateAartiTicker() {
  const nameEl = document.getElementById('next-aarti-name');
  const countdownEl = document.getElementById('next-aarti-countdown');
  if (!nameEl || !countdownEl) return;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let nextAarti = null;
  for (const aarti of aartiSchedule) {
    const aartiMinutes = aarti.hour * 60 + aarti.minute;
    if (aartiMinutes > currentMinutes) {
      nextAarti = aarti;
      break;
    }
  }
  // If no upcoming aarti today, show first one tomorrow
  if (!nextAarti) nextAarti = aartiSchedule[0];

  nameEl.textContent = nextAarti.name;

  const nextTime = new Date(now);
  nextTime.setHours(nextAarti.hour, nextAarti.minute, 0, 0);
  if (nextTime <= now) nextTime.setDate(nextTime.getDate() + 1);

  const diff = nextTime - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start ticker if elements exist
if (document.getElementById('next-aarti-name')) {
  updateAartiTicker();
  setInterval(updateAartiTicker, 1000);
}

// ─── FAQ Accordion ───
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    // Close all others
    document.querySelectorAll('.faq-item.active').forEach(other => {
      if (other !== item) {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = '0';
      }
    });

    // Toggle current
    item.classList.toggle('active', !isActive);
    answer.style.maxHeight = isActive ? '0' : answer.scrollHeight + 'px';
  });
});

// ─── Donation Handler ───
function initDonation(sevaName, amount) {
  alert(`Thank you for choosing ${sevaName}!\n\nAmount: ₹${amount.toLocaleString()}\n\nPayment gateway integration coming soon.\nFor now, please donate via UPI or contact us at +91 99287 66773.`);
}

function initCustomDonation() {
  const amount = document.getElementById('custom-amount');
  const currency = document.getElementById('currency-select');
  if (!amount || !amount.value || amount.value <= 0) {
    alert('Please enter a valid amount.');
    return;
  }
  const symbol = { INR: '₹', USD: '$', GBP: '£', EUR: '€' }[currency.value] || '₹';
  alert(`Thank you for your generous donation of ${symbol}${parseFloat(amount.value).toLocaleString()}!\n\nPayment gateway integration coming soon.\nFor now, please contact us at +91 99287 66773.`);
}

// ─── Contact Form Handler ───
function handleContact(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('[name="name"]').value;
  alert(`Thank you ${name}! Your message has been sent.\nWe'll get back to you within 24 hours.`);
  form.reset();
}

// ─── Newsletter Handler ───
function handleNewsletter(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  alert(`Thank you for subscribing with ${email}!\nYou'll receive updates on festivals and events. Hare Krishna! 🙏`);
  event.target.reset();
}

// ─── Smooth scroll for same-page hash links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
