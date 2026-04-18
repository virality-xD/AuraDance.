// Premium Custom Cursor Logic
const setupCursor = () => {
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  
  if (!dot || !outline) return;

  // Trailing logic parameters
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Snap dot instantly
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Animate outline smoothly
  const animateOutline = () => {
    // Easing factor (lower = smoother/slower)
    const ease = 0.15;
    outlineX += (mouseX - outlineX) * ease;
    outlineY += (mouseY - outlineY) * ease;

    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateOutline);
  };
  animateOutline();

  // Hover states for interactive elements
  const interactivElements = document.querySelectorAll('a, button, input, select, textarea');
  interactivElements.forEach((el) => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovering'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
  });
};

// Preloader Logic
const setupPreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      // Small artificial delay to show off the brand preloader
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
          // Trigger reveals after preloader is hidden
          reveal();
        }, 800); 
      }, 500); // 500ms delay for visual impact
    });
  } else {
    // Trigger once on load if no preloader
    window.addEventListener('load', reveal);
    reveal();
  }
};

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
      hamburger.innerHTML = '<i class="ph ph-x"></i>';
    } else {
      hamburger.innerHTML = '<i class="ph ph-list"></i>';
    }
  });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
if(navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Scroll Reveal Animation (Cubic Bezier upgraded inside CSS)
function reveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100; // Trigger slightly earlier
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}
window.addEventListener('scroll', reveal);

// Forms Handling Simulation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = 'Message Sent Successfully!';
      btn.style.background = '#25d366';
      btn.style.color = '#fff';
      form.reset();
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.className = 'btn btn-primary';
        btn.style = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
});

// Initialize Premium Addons
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupCursor);
} else {
  setupCursor();
}
setupPreloader();
