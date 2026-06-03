/* ==========================================
   AMABINI SOLUTIONS - CORE INTERACTIVE DRIVER
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollSpy();
  initHeroCanvas();
  initHumanCentricCanvas();
  initTestimonials();
  initPreviews();
});

/* ==========================================
   NAVIGATION CONTROL
   ========================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================
   SCROLL SPY / NAV INDICATORS
   ========================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === currentId) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================
   HERO CANVAS (QUIET NETWORK DRIFT)
   ========================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const particleCount = 28;
  const connectionDistance = 110;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#7aa2f7' : '#bb9af3'
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 4;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.strokeStyle = 'rgba(86, 95, 137, 0.12)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================
   HUMAN CENTRIC FOCUS CANVAS (TECTONIC FIELD)
   ========================================== */
function initHumanCentricCanvas() {
  const canvas = document.getElementById('hex-canvas');
  const overlay = document.getElementById('hex-overlay');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  let mouse = { x: null, y: null, active: false };

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Orbital Nodes representing manual work factors
  const nodes = [
    { label: 'EXCEL_DREAD', angle: 0, radius: 125, speed: 0.007, color: '#e06c75' },
    { label: 'MEETING_FATIGUE', angle: Math.PI / 3, radius: 130, speed: 0.005, color: '#f0ad4e' },
    { label: 'COFFEE_LEVEL', angle: (Math.PI * 2) / 3, radius: 120, speed: 0.008, color: '#50fa7b' },
    { label: 'AI_HYPE', angle: Math.PI, radius: 135, speed: 0.004, color: '#f0989e' },
    { label: 'BUG_COUNT', angle: (Math.PI * 4) / 3, radius: 125, speed: 0.006, color: '#e06c75' },
    { label: 'LEGACY_HELL', angle: (Math.PI * 5) / 3, radius: 140, speed: 0.005, color: '#9cdef2' }
  ];

  let centralPulse = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.strokeStyle = 'rgba(86, 95, 137, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
    ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 180, centerY);
    ctx.lineTo(centerX + 180, centerY);
    ctx.moveTo(centerX, centerY - 180);
    ctx.lineTo(centerX, centerY + 180);
    ctx.stroke();

    nodes.forEach(node => {
      node.angle += node.speed;
      let targetX = centerX + Math.cos(node.angle) * node.radius;
      let targetY = centerY + Math.sin(node.angle) * node.radius;

      if (mouse.active) {
        const pullStrength = 0.28;
        const distToMouse = Math.hypot(mouse.x - targetX, mouse.y - targetY);
        if (distToMouse < 180) {
          const factor = (180 - distToMouse) / 180;
          targetX += (mouse.x - targetX) * factor * pullStrength;
          targetY += (mouse.y - targetY) * factor * pullStrength;
        }
      }

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(targetX, targetY);
      ctx.strokeStyle = 'rgba(86, 95, 137, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(targetX, targetY, 6, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = node.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = '500 10px "Fira Code", monospace';
      ctx.fillStyle = 'rgba(169, 177, 214, 0.8)';
      ctx.fillText(node.label, targetX + 12, targetY + 4);
    });

    centralPulse += 0.045;
    const pulseSize = 14 + Math.sin(centralPulse) * 3;

    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseSize + 10, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(115, 218, 202, 0.04)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
    ctx.fillStyle = '#73daca';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#73daca';
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.font = 'bold 11px "Outfit", sans-serif';
    ctx.fillStyle = '#111111';
    ctx.textAlign = 'center';
    ctx.fillText('SANITY', centerX, centerY + 4);
    ctx.textAlign = 'left';

    if (mouse.active) {
      const stability = Math.max(10, Math.round(100 - Math.hypot(mouse.x - centerX, mouse.y - centerY) / 3.5));
      overlay.textContent = `TELEMETRY: DYNAMIC // EXCEL DREAD: HIGH // COFFEE: 45% // SANITY: ${stability}%`;
      overlay.style.color = stability > 70 ? '#50fa7b' : '#e06c75';
    } else {
      overlay.textContent = 'TELEMETRY: STABLE // COFFEE LEVEL: 100% // STATUS: OPTIMAL';
      overlay.style.color = '#50fa7b';
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================
   CONSOLE INTAKE FORM COMPILER
   ========================================== */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('client-name').value;
  const email = document.getElementById('client-email').value;
  const scope = document.getElementById('service-scope').value.toUpperCase();

  const submitBtn = document.getElementById('submit-btn');
  const statusDiv = document.getElementById('form-status');

  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  statusDiv.style.display = 'block';
  statusDiv.className = 'form-status';
  statusDiv.style.backgroundColor = 'rgba(255, 158, 100, 0.08)';
  statusDiv.style.borderColor = 'rgba(255, 158, 100, 0.2)';
  statusDiv.style.color = 'var(--accent-orange)';

  let step = 0;
  const compilationSteps = [
    `> INTAKE_DAEMON: CONNECTING SECURE GATEWAY...`,
    `> PARSING BUSINESS GOALS FOR [${name}]...`,
    `> ROUTING PARAMETER: ${scope}...`,
    `> GENERATING FREE CUSTOM DIGITAL scaling MAP...`,
    `> PIPELINE TRANSMISSION COMPLETE.`
  ];

  function printTerminalSteps() {
    if (step < compilationSteps.length) {
      statusDiv.innerHTML += `<div>${compilationSteps[step]}</div>`;
      step++;
      feedScrollBottom();
      setTimeout(printTerminalSteps, 350);
    } else {
      setTimeout(() => {
        statusDiv.style.backgroundColor = 'rgba(115, 218, 202, 0.08)';
        statusDiv.style.borderColor = 'rgba(115, 218, 202, 0.2)';
        statusDiv.style.color = 'var(--accent-teal)';
        statusDiv.innerHTML = `
          <div style="font-weight: 600; margin-bottom: 8px;">[FREE AUDIT SCHEDULED // VERIFIED]</div>
          <div>Outstanding, ${name}. Your consultation parameters have been securely compiled. We are preparing your custom Digital Scaling Map and will reach out at <strong>${email}</strong> within 12 hours to lock in your free call calendar link.</div>
          <div style="margin-top: 6px; font-size: 0.7rem; color: var(--text-muted);">ROUTING CODE: AMABINI-SME-0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}</div>
        `;
        document.getElementById('intake-form').reset();
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        feedScrollBottom();
      }, 300);
    }
  }

  function feedScrollBottom() {
    // Scroll the document slightly to keep console output in view if required
    const element = document.getElementById('contact');
    if (element) {
      const rect = statusDiv.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        window.scrollBy({ top: rect.bottom - window.innerHeight + 20, behavior: 'smooth' });
      }
    }
  }

  statusDiv.innerHTML = '';
  printTerminalSteps();
}

/* ==========================================
   TERMINAL CARD DRIVERS
   ========================================== */
function minimizeTerminal() {
  const term = document.getElementById('origin-terminal');
  if (term) term.classList.toggle('term-min');
}
function closeTerminal() {
  const term = document.getElementById('origin-terminal');
  if (term) term.classList.add('term-closed');
  const reopenBtn = document.getElementById('term-reopen');
  if (reopenBtn) reopenBtn.classList.add('show');
}
function reopenTerminal() {
  const term = document.getElementById('origin-terminal');
  if (term) {
    term.classList.remove('term-closed');
    term.classList.remove('term-min');
  }
  const reopenBtn = document.getElementById('term-reopen');
  if (reopenBtn) reopenBtn.classList.remove('show');
}

/* ==========================================
   TESTIMONIAL CAROUSEL DRIVERS
   ========================================== */
let currentTestimonialIndex = 0;
const totalTestimonials = 4;
let testimonialInterval;

function initTestimonials() {
  resetTestimonialTimer();
}

function setTestimonial(index) {
  currentTestimonialIndex = (index + totalTestimonials) % totalTestimonials;
  
  const cards = document.querySelectorAll('.tcard');
  cards.forEach((card, idx) => {
    card.classList.remove('active');
    card.classList.remove('shake');
    if (idx === currentTestimonialIndex) {
      card.classList.add('active');
      if (card.dataset.shake === '1') {
        setTimeout(() => {
          card.classList.add('shake');
        }, 50);
      }
    }
  });

  const dots = document.querySelectorAll('.tdot');
  dots.forEach((dot, idx) => {
    if (idx === currentTestimonialIndex) {
      dot.classList.add('on');
    } else {
      dot.classList.remove('on');
    }
  });

  resetTestimonialTimer();
}

function nextTestimonial() {
  setTestimonial(currentTestimonialIndex + 1);
}

function prevTestimonial() {
  setTestimonial(currentTestimonialIndex - 1);
}

function resetTestimonialTimer() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(nextTestimonial, 8000);
}

/* ==========================================
   PREVIEWS / INTERACTIVE WIDGET DRIVERS
   ========================================== */
function initPreviews() {
  const panels = document.querySelectorAll('.preview-panel');
  panels.forEach(panel => {
    panel.addEventListener('click', () => {
      panels.forEach(p => p.classList.remove('active'));
      panel.classList.add('active');
    });
  });
}
