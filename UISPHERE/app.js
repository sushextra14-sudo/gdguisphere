/**
 * Cyber Bento DevFest - Tekno Krraft 2026
 * Interactive Logic, 3D Particle Engine & Multi-Profile Audio Synthesizer
 * Google Developer Group (GDG) ITER Chapter
 */

// ==========================================================================
// 1. Advanced Multi-Profile Procedural Web Audio API Synthesizer
// ==========================================================================
class CyberAudioEngine {
  constructor() {
    this.enabled = false;
    this.ctx = null;
    this.currentProfile = 'cyberpunk'; // 'cyberpunk', 'quantum', 'matrix'
    this.volume = 0.08;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.playFanfare();
    }
    return this.enabled;
  }

  setProfile(profile) {
    this.currentProfile = profile;
    if (this.enabled) {
      this.playBlip(750, 0.08);
    }
  }

  playBlip(freq = 880, duration = 0.04) {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (this.currentProfile === 'cyberpunk') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.8, now + duration);
        gain.gain.setValueAtTime(this.volume * 0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      } else if (this.currentProfile === 'quantum') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.5);
      } else {
        // Matrix
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq * 1.2, now);
        osc.frequency.setValueAtTime(freq, now + duration * 0.5);
        gain.gain.setValueAtTime(this.volume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration * (this.currentProfile === 'quantum' ? 1.5 : 1));
    } catch (e) {}
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      if (this.currentProfile === 'quantum') {
        // Deep sub punch
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.12);
        gain.gain.setValueAtTime(this.volume * 1.5, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (this.currentProfile === 'matrix') {
        // Digital data burst
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.setValueAtTime(800, now + 0.02);
        gain.gain.setValueAtTime(this.volume * 0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else {
        // Cyberpunk crisp tech click
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1020, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.07);
        gain.gain.setValueAtTime(this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      }
    } catch (e) {}
  }

  playKeypress() {
    if (!this.enabled || !this.ctx) return;
    const baseFreq = this.currentProfile === 'matrix' ? 950 : (this.currentProfile === 'quantum' ? 420 : 640);
    const randFreq = baseFreq + (Math.random() - 0.5) * 120;
    this.playBlip(randFreq, 0.03);
  }

  playShockwave() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = this.currentProfile === 'cyberpunk' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.45);

      gain.gain.setValueAtTime(this.volume * 1.6, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }

  playFanfare() {
    if (!this.enabled || !this.ctx) return;
    try {
      let notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      if (this.currentProfile === 'quantum') {
        notes = [440, 554.37, 659.25, 880, 1108.73]; // A major 9th
      } else if (this.currentProfile === 'matrix') {
        notes = [392, 523.25, 659.25, 783.99, 1046.50, 1318.51];
      }

      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playBlip(freq, 0.14);
        }, idx * 65);
      });
    } catch (e) {}
  }
}

const synth = new CyberAudioEngine();

// ==========================================================================
// 2. High-Octane 3D Particle & Horizon Mesh Engine (3 Modes + Shockwave)
// ==========================================================================
class Dynamic3DHeroEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.mode = 'neural'; // 'neural', 'grid', 'quantum'
    this.particles = [];
    this.shockwaves = [];
    this.particleCount = 65;
    this.mouse = { x: -1000, y: -1000, z: 0, radius: 180, isDown: false };
    this.dpr = window.devicePixelRatio || 1;
    this.fov = 550; // 3D focal length
    this.gridOffset = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse movement
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left - this.width / 2;
      this.mouse.y = e.clientY - rect.top - this.height / 2;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    // Shockwave click effect anywhere in hero
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('pointerdown', (e) => {
        // Prevent triggering when clicking buttons/inputs
        if (e.target.closest('button, a, input, select')) return;

        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        this.addShockwave(clickX, clickY);
        synth.playShockwave();
      });
    }

    this.createParticles();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  setMode(mode) {
    this.mode = mode;
    this.createParticles();
    synth.playClick();
  }

  createParticles() {
    this.particles = [];
    const colors = [
      '#10B981', // Electric Emerald
      '#38BDF8', // Neon Cyan
      '#4edea3', // Neon Mint
      '#818CF8', // Violet
      '#FBBF24', // Amber
      '#FFFFFF'  // Specular White
    ];

    if (this.mode === 'neural') {
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: (Math.random() - 0.5) * this.width * 1.2,
          y: (Math.random() - 0.5) * this.height * 1.2,
          z: (Math.random() - 0.5) * 800,
          vx: (Math.random() - 0.5) * 1.1,
          vy: (Math.random() - 0.5) * 1.1,
          vz: (Math.random() - 0.5) * 1.4,
          radius: Math.random() * 2.8 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    } else if (this.mode === 'quantum') {
      // 3 concentric 3D orbital rings
      const rings = [140, 260, 380];
      for (let i = 0; i < 75; i++) {
        const ringRadius = rings[i % rings.length];
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.015 + Math.random() * 0.02) * (i % 2 === 0 ? 1 : -1);
        const inclination = (i % 3 - 1) * 0.45;

        this.particles.push({
          radiusBase: ringRadius + (Math.random() - 0.5) * 35,
          angle: angle,
          speed: speed,
          inclination: inclination,
          size: Math.random() * 3 + 1.5,
          color: colors[i % colors.length],
          z: 0
        });
      }
    } else if (this.mode === 'grid') {
      // 3D wireframe particles hovering on grid junctions
      for (let i = 0; i < 40; i++) {
        this.particles.push({
          x: (Math.random() - 0.5) * this.width,
          y: Math.random() * (this.height * 0.4) + (this.height * 0.1),
          z: Math.random() * 600 + 50,
          vz: -(Math.random() * 1.8 + 1),
          size: Math.random() * 2.5 + 1.5,
          color: colors[i % 2 === 0 ? 0 : 1]
        });
      }
    }
  }

  addShockwave(x, y) {
    this.shockwaves.push({
      x: x,
      y: y,
      radius: 5,
      maxRadius: Math.min(this.width, this.height) * 0.65,
      alpha: 1,
      speed: 7.5
    });

    // Also push 12 burst sparks
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const speed = Math.random() * 4 + 3;
      this.particles.push({
        x: x - this.width / 2,
        y: y - this.height / 2,
        z: (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        vz: (Math.random() - 0.5) * 3,
        radius: Math.random() * 3 + 2,
        color: i % 2 === 0 ? '#10B981' : '#38BDF8',
        life: 1.0,
        isSpark: true
      });
    }
  }

  renderShockwaves() {
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const s = this.shockwaves[i];
      s.radius += s.speed;
      s.alpha = Math.max(0, 1 - s.radius / s.maxRadius);

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(56, 189, 248, ${s.alpha * 0.7})`;
      this.ctx.lineWidth = 2.5;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = '#10B981';
      this.ctx.stroke();

      // Secondary inner ring
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius * 0.8, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(16, 185, 129, ${s.alpha * 0.4})`;
      this.ctx.lineWidth = 1.2;
      this.ctx.stroke();
      this.ctx.restore();

      if (s.radius >= s.maxRadius) {
        this.shockwaves.splice(i, 1);
      }
    }
  }

  renderNeuralMode() {
    const cx = this.width / 2;
    const cy = this.height / 2;

    const projected = [];

    // Project 3D particles into 2D canvas
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Handle sparks life
      if (p.isSpark) {
        p.life -= 0.02;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
      } else {
        // Bounds wrapping in 3D volume
        const halfW = this.width * 0.6;
        const halfH = this.height * 0.6;
        if (p.x < -halfW) p.x = halfW;
        if (p.x > halfW) p.x = -halfW;
        if (p.y < -halfH) p.y = halfH;
        if (p.y > halfH) p.y = -halfH;
        if (p.z < -400) p.z = 400;
        if (p.z > 400) p.z = -400;

        // Mouse 3D gravitational attraction/repulsion
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius && dist > 1) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
        }
      }

      // 3D perspective projection formula
      const scale = this.fov / (this.fov + p.z + 400);
      const projX = cx + p.x * scale;
      const projY = cy + p.y * scale;
      const projRadius = Math.max(0.8, p.radius * scale);
      const alpha = Math.min(1, Math.max(0.15, scale * (p.isSpark ? p.life : 0.85)));

      projected.push({
        x: projX,
        y: projY,
        radius: projRadius,
        color: p.color,
        alpha: alpha,
        scale: scale
      });

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(projX, projY, projRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = alpha;
      this.ctx.shadowBlur = scale > 0.8 ? 10 : 0;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
      this.ctx.globalAlpha = 1;
    }

    // Connect constellation lines in 3D depth
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const p1 = projected[i];
        const p2 = projected[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const lineAlpha = (1 - dist / 115) * 0.25 * ((p1.scale + p2.scale) / 2);
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }
  }

  renderCyberGridMode() {
    const cx = this.width / 2;
    const horizonY = this.height * 0.38;
    this.gridOffset = (this.gridOffset + 1.2) % 40;

    this.ctx.save();
    // Glowing Horizon Line
    this.ctx.beginPath();
    this.ctx.moveTo(0, horizonY);
    this.ctx.lineTo(this.width, horizonY);
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    this.ctx.lineWidth = 1.5;
    this.ctx.shadowBlur = 12;
    this.ctx.shadowColor = '#38BDF8';
    this.ctx.stroke();

    // Perspective Grid Lines
    const numVertical = 18;
    for (let i = -numVertical; i <= numVertical; i++) {
      const xBottom = cx + i * (this.width / 12);
      const xTop = cx + i * 14;

      this.ctx.beginPath();
      this.ctx.moveTo(xTop, horizonY);
      this.ctx.lineTo(xBottom, this.height);
      this.ctx.strokeStyle = 'rgba(16, 185, 129, 0.18)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    // Horizontal Depth Lines (Exponential perspective spacing)
    for (let d = 20; d < this.height - horizonY; d += 28) {
      const y = horizonY + Math.pow((d + this.gridOffset) / (this.height - horizonY), 1.6) * (this.height - horizonY);
      if (y > this.height) continue;
      const lineAlpha = Math.min(0.35, ((y - horizonY) / (this.height - horizonY)) * 0.4);

      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
    this.ctx.restore();

    // Floating data packets along grid
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.z += p.vz;
      if (p.z < 20) p.z = 600;

      const scale = this.fov / (this.fov + p.z);
      const projX = cx + p.x * scale;
      const projY = horizonY + p.y * scale;

      this.ctx.beginPath();
      this.ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }
  }

  renderQuantumMode() {
    const cx = this.width / 2;
    const cy = this.height / 2;

    this.ctx.save();
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.angle += p.speed;

      // 3D Orbital math
      const baseRadius = p.radiusBase;
      const x3d = Math.cos(p.angle) * baseRadius;
      const y3d = Math.sin(p.angle) * baseRadius * Math.cos(p.inclination);
      const z3d = Math.sin(p.angle) * baseRadius * Math.sin(p.inclination);

      const scale = this.fov / (this.fov + z3d + 200);
      const projX = cx + x3d * scale;
      const projY = cy + y3d * scale;
      const alpha = Math.min(1, Math.max(0.2, scale * 0.9));

      this.ctx.beginPath();
      this.ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = alpha;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
    }
    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.mode === 'neural') {
      this.renderNeuralMode();
    } else if (this.mode === 'grid') {
      this.renderCyberGridMode();
    } else if (this.mode === 'quantum') {
      this.renderQuantumMode();
    }

    this.renderShockwaves();

    requestAnimationFrame(() => this.animate());
  }
}

// Global particle engine reference
let hero3DEngine = null;

// ==========================================================================
// 3. 3D Holographic Attendee Pass Studio (Interactive Tilt & Customizer)
// ==========================================================================
class HolographicPassStudio {
  constructor() {
    this.card = document.getElementById('passCard3D');
    this.nameInput = document.getElementById('customAttendeeName');
    this.displayAttendee = document.getElementById('passAttendeeName');
    this.displayRole = document.getElementById('passRoleTag');
    this.displayTrack = document.getElementById('passTrackTitle');
    this.displayBadgeId = document.getElementById('passBadgeId');
    this.roleChips = document.querySelectorAll('.role-chip');

    this.init();
  }

  init() {
    if (!this.card) return;

    // 3D Perspective Tilt on Mouse Movement
    this.card.addEventListener('mousemove', (e) => {
      const rect = this.card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -18;
      const rotateY = ((x - centerX) / centerX) * 18;

      this.card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;

      const pctX = ((x / rect.width) * 100).toFixed(1) + '%';
      const pctY = ((y / rect.height) * 100).toFixed(1) + '%';
      this.card.style.setProperty('--mouse-x', pctX);
      this.card.style.setProperty('--mouse-y', pctY);
    });

    this.card.addEventListener('mouseleave', () => {
      this.card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      this.card.style.setProperty('--mouse-x', '50%');
      this.card.style.setProperty('--mouse-y', '50%');
    });

    // Real-time Name Customizer with Keypress SFX
    if (this.nameInput && this.displayAttendee) {
      this.nameInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        this.displayAttendee.innerText = val.length > 0 ? val : 'Alex Chen';
        synth.playKeypress();
      });
    }

    // Role Switchers with Sound
    this.roleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.roleChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const role = chip.getAttribute('data-role');
        const track = chip.getAttribute('data-track');

        if (this.displayRole) this.displayRole.innerText = role;
        if (this.displayTrack) this.displayTrack.innerText = track;

        if (this.displayBadgeId) {
          const randHex = Math.floor(1000 + Math.random() * 9000);
          this.displayBadgeId.innerText = `#TK26-${randHex}`;
        }

        synth.playClick();
        showToast(`Pass role updated: ${role}`);
      });
    });
  }
}

// ==========================================================================
// 4. Live Real-Time Event Countdown Clock
// ==========================================================================
class CountdownEngine {
  constructor() {
    this.daysEl = document.getElementById('countDays');
    this.hoursEl = document.getElementById('countHours');
    this.minsEl = document.getElementById('countMins');
    this.secsEl = document.getElementById('countSecs');

    this.targetDate = new Date('2026-10-16T09:00:00+05:30').getTime();
    this.start();
  }

  start() {
    const update = () => {
      const now = new Date().getTime();
      let diff = this.targetDate - now;

      if (diff <= 0) {
        diff = (4 * 24 * 3600 + 13 * 3600 + 55 * 60 + 35) * 1000;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (this.daysEl) this.daysEl.innerText = String(days).padStart(2, '0');
      if (this.hoursEl) this.hoursEl.innerText = String(hours).padStart(2, '0');
      if (this.minsEl) this.minsEl.innerText = String(minutes).padStart(2, '0');
      if (this.secsEl) this.secsEl.innerText = String(seconds).padStart(2, '0');
    };

    update();
    setInterval(update, 1000);
  }
}

// ==========================================================================
// 5. Terminal Telemetry Typewriter Engine
// ==========================================================================
class TerminalTypewriter {
  constructor(elId) {
    this.el = document.getElementById(elId);
    if (!this.el) return;

    this.phrases = [
      'tekno --status=live --track=gen-ai [OCT.16-18]',
      'gemini-1.5-pro --multimodal=active --tokens=2M',
      'cloud-run --containers=scaled --zones=asia-south1',
      'hackathon --teams=forming --bounty=₹2,50,000+',
      'vertex-ai --credits=$50 --students=eligible'
    ];

    this.phraseIdx = 0;
    this.charIdx = 0;
    this.isDeleting = false;
    this.typeSpeed = 65;
    this.deleteSpeed = 35;
    this.pauseDelay = 2200;

    this.tick();
  }

  tick() {
    const current = this.phrases[this.phraseIdx];

    if (this.isDeleting) {
      this.charIdx--;
      this.el.innerText = current.substring(0, this.charIdx);
    } else {
      this.charIdx++;
      this.el.innerText = current.substring(0, this.charIdx);
      if (Math.random() > 0.4) synth.playKeypress();
    }

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIdx === current.length) {
      delay = this.pauseDelay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIdx === 0) {
      this.isDeleting = false;
      this.phraseIdx = (this.phraseIdx + 1) % this.phrases.length;
      delay = 400;
    }

    setTimeout(() => this.tick(), delay);
  }
}

// ==========================================================================
// 6. Interactive Multi-Day Schedule & Calendar Integration (Exact Client Dataset)
// ==========================================================================
const SCHEDULE_DATABASE = {
  1: [
    {
      id: 'd1-1',
      day: 1,
      time: '09:00 AM - 10:30 AM',
      category: 'Keynote',
      badgeClass: 'keynote',
      level: 'All Levels',
      title: 'Grand Opening & Keynote: The Future of Developer Ecosystems',
      desc: 'Inauguration by GDG Leads & University Officials followed by a visionary keynote on AI-driven software development.',
      speaker: 'Dr. Ananya Patnaik',
      role: 'Lead Cloud Architect & GDG Mentor',
      company: 'Google Developer Student Clubs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      venue: 'Main Auditorium (Auditorium 101)',
      trackId: 'gen-ai'
    },
    {
      id: 'd1-2',
      day: 1,
      time: '11:00 AM - 01:00 PM',
      category: 'Workshop',
      badgeClass: 'workshop',
      level: 'Intermediate',
      title: 'Hands-on Workshop: Building Multimodal AI Agents with Gemini',
      desc: 'Step-by-step workshop constructing context-aware AI agents utilizing Gemini Pro API, Function Calling, and Python.',
      speaker: 'Rohan Samal',
      role: 'Senior AI Engineer',
      company: 'Google Cloud Ecosystem',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      venue: 'Bansuri Guru Computer Lab 3',
      trackId: 'gen-ai',
      prerequisites: 'Python installed, Google AI Studio API Key'
    },
    {
      id: 'd1-3',
      day: 1,
      time: '02:00 PM - 04:00 PM',
      category: 'Workshop',
      badgeClass: 'workshop',
      level: 'All Levels',
      title: 'Serverless Web Apps with Next.js & Google Cloud Run',
      desc: 'Deploy production-grade full-stack Next.js applications directly to Google Cloud Run with zero server management.',
      speaker: 'Subhashree Mohanty',
      role: 'Principal Frontend Engineer',
      company: 'Vercel / GDG Core',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      venue: 'Seminar Hall B',
      trackId: 'web-cloud'
    },
    {
      id: 'd1-4',
      day: 1,
      time: '04:30 PM - 06:00 PM',
      category: 'Talk',
      badgeClass: 'talk',
      level: 'Intermediate',
      title: 'Web3 & Cloud Security Tech Talk',
      desc: 'Deep dive into secure cloud credentials, OAuth2, and decentralized trust systems.',
      speaker: 'Vikramaditya Dash',
      role: 'Cybersecurity Architect',
      company: 'Fortinet',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      venue: 'Main Auditorium',
      trackId: 'web-cloud'
    }
  ],
  2: [
    {
      id: 'd2-1',
      day: 2,
      time: '09:30 AM - 10:30 AM',
      category: 'Hackathon',
      badgeClass: 'hackathon',
      level: 'All Levels',
      title: 'AI/ML Hack Sprint Kickoff & Problem Statement Reveal',
      desc: 'Unveiling the 24-Hour Hack Sprint challenges across Healthcare, FinTech, Smart Cities, and Sustainability.',
      speaker: 'Tekno Krraft Jury Panel',
      role: 'Hackathon Mentors',
      company: 'GDG ITER Chapter',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
      venue: 'Innovation Hub & Hack Zone',
      trackId: 'gen-ai'
    },
    {
      id: 'd2-2',
      day: 2,
      time: '11:00 AM - 01:00 PM',
      category: 'Workshop',
      badgeClass: 'workshop',
      level: 'Advanced',
      title: 'System Design Bootcamp: Scalable Distributed Systems',
      desc: 'Learn how to design systems handling millions of concurrent requests using Redis, Kafka, and GCP Load Balancers.',
      speaker: 'Amitabh Swain',
      role: 'Staff Engineer',
      company: 'Atlassian',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      venue: 'Conference Room 204',
      trackId: 'devops-opensource'
    },
    {
      id: 'd2-3',
      day: 2,
      time: '02:00 PM - 04:00 PM',
      category: 'Workshop',
      badgeClass: 'workshop',
      level: 'Beginner',
      title: 'Cross-Platform Flutter Bootcamp: Beautiful UIs with Firebase',
      desc: 'Build an interactive real-time chat application with Flutter 3 and Firebase Cloud Firestore in 2 hours.',
      speaker: 'Priyanka Mishra',
      role: 'GDE Flutter & Mobile Lead',
      company: 'Google Developer Expert',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      venue: 'Bansuri Guru Computer Lab 1',
      trackId: 'mobile-dev'
    },
    {
      id: 'd2-4',
      day: 2,
      time: '07:00 PM - 09:00 PM',
      category: 'Gaming/Fun',
      badgeClass: 'gaming',
      level: 'All Levels',
      title: 'Tekno Gaming Night & LAN Valorant Showdown',
      desc: 'Relax, unwind, and participate in esports battles, arcade VR stations, and fun mini-games with fellow builders.',
      speaker: 'GDG Gaming Guild',
      role: 'Event Hosts',
      company: 'ITER Esports Club',
      avatar: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=150&auto=format&fit=crop&q=80',
      venue: 'Student Activity Center (SAC)',
      trackId: 'web-cloud'
    }
  ],
  3: [
    {
      id: 'd3-1',
      day: 3,
      time: '09:30 AM - 12:30 PM',
      category: 'Competition',
      badgeClass: 'competition',
      level: 'Advanced',
      title: 'Competitive Coding Championship Finals (KrraftCode 2026)',
      desc: 'The top 50 shortlisted coders solve complex algorithmic problems under speed and memory constraints.',
      speaker: 'Algorithm Jury',
      role: 'CP Lead Judges',
      company: 'Codeforces / GDG',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      venue: 'Central Computing Center',
      trackId: 'devops-opensource'
    },
    {
      id: 'd3-2',
      day: 3,
      time: '10:00 AM - 01:00 PM',
      category: 'Hackathon',
      badgeClass: 'hackathon',
      level: 'All Levels',
      title: 'Hack Sprint Project Pitching & Live Demo Stage',
      desc: 'Top 12 finalist teams pitch their working AI & Cloud prototypes to venture investors and tech leaders.',
      speaker: 'Venture & Tech Jury',
      role: 'Judges & VCs',
      company: 'Techstars & GDG',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      venue: 'Main Auditorium Stage',
      trackId: 'gen-ai'
    },
    {
      id: 'd3-3',
      day: 3,
      time: '02:30 PM - 05:00 PM',
      category: 'Keynote',
      badgeClass: 'keynote',
      level: 'All Levels',
      title: 'Grand Valedictory, Awards & Closing Ceremony',
      desc: 'Celebration of winners across Hackathon and Coding contests, distribution of certificates, swags, and closing remarks.',
      speaker: 'Prof. (Dr.) Pradeep Kumar Sahoo',
      role: 'Dean & GDG Faculty Advisor',
      company: 'SOA, ITER Chapter',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      venue: 'Main Campus Grounds / Open Air Theatre',
      trackId: 'gen-ai'
    }
  ]
};

class ScheduleManager {
  constructor() {
    this.currentDay = 1;
    this.currentCategory = 'All';
    this.searchQuery = '';
    this.container = document.getElementById('timelineContainer');
    this.dayButtons = document.querySelectorAll('.day-tab-btn');
    this.filterButtons = document.querySelectorAll('.filter-pill');
    this.searchInput = document.getElementById('scheduleSearchInput');

    this.init();
  }

  init() {
    if (!this.container) return;

    this.dayButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dayButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentDay = parseInt(btn.getAttribute('data-day'), 10);
        synth.playClick();
        this.render();
      });
    });

    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.getAttribute('data-filter') || 'All';
        synth.playClick();
        this.render();
      });
    });

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    this.render();
  }

  render() {
    const sessions = SCHEDULE_DATABASE[this.currentDay] || [];
    const filtered = sessions.filter(s => {
      const matchesCategory = (this.currentCategory === 'All') || (s.category.toLowerCase() === this.currentCategory.toLowerCase());
      const matchesSearch = !this.searchQuery ||
        s.title.toLowerCase().includes(this.searchQuery) ||
        s.desc.toLowerCase().includes(this.searchQuery) ||
        s.speaker.toLowerCase().includes(this.searchQuery) ||
        s.venue.toLowerCase().includes(this.searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="cyber-glass" style="padding: 2.5rem; text-align: center;">
          <p style="font-family: var(--font-mono); color: var(--text-muted);">
            // No sessions found matching "${this.searchQuery || this.currentCategory}" on Day 0${this.currentDay}
          </p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = filtered.map((s) => `
      <div class="timeline-item">
        <div class="timeline-node-pin"></div>
        <div class="cyber-glass timeline-card">
          <div class="timeline-card-top">
            <span class="timeline-time">${s.time}</span>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <span class="cat-badge ${s.badgeClass || 'general'}">${s.category.toUpperCase()}</span>
              <span class="kicker-badge cyan" style="font-size: 0.65rem; padding: 0.15rem 0.5rem;">
                ${s.level}
              </span>
            </div>
          </div>
          <h3 class="timeline-session-title">${s.title}</h3>
          <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5;">${s.desc}</p>
          ${s.prerequisites ? `
            <div class="session-prereq-pill">
              <span>⚠️ Prerequisite:</span>
              <span>${s.prerequisites}</span>
            </div>
          ` : ''}
          <div class="timeline-card-footer">
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <div class="timeline-speaker-avatar-box">
                <img src="${s.avatar}" alt="${s.speaker}" loading="lazy" />
              </div>
              <div>
                <div style="font-size: 0.82rem; font-family: var(--font-display); font-weight: 700; color: var(--text-primary);">
                  ${s.speaker}
                </div>
                <div style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--text-muted);">
                  ${s.company} • <span style="color: var(--secondary-cyan);">${s.venue}</span>
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn btn-secondary btn-sm btn-mono" onclick="exportCalendarEvent('${encodeURIComponent(s.title)}', '${encodeURIComponent(s.time)}', '${encodeURIComponent(s.venue)}', '${encodeURIComponent(s.desc)}', '${encodeURIComponent(s.speaker)}', '${encodeURIComponent(s.company)}')">
                📅 Add to Cal
              </button>
              <button class="btn btn-primary btn-sm btn-mono" onclick="reserveSessionSeat('${encodeURIComponent(s.title)}')">
                Reserve Seat →
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

window.exportCalendarEvent = function(titleEnc, timeEnc, venueEnc, descEnc, speakerEnc, companyEnc) {
  synth.playFanfare();
  const title = decodeURIComponent(titleEnc || 'Tekno Krraft 2026 Session');
  const time = decodeURIComponent(timeEnc || 'Day Session');
  const venue = decodeURIComponent(venueEnc || 'ITER SOA Campus');
  const desc = decodeURIComponent(descEnc || 'Tekno Krraft 2026 developer fest session');
  const speaker = decodeURIComponent(speakerEnc || 'GDG Mentor');
  const company = decodeURIComponent(companyEnc || 'GDG ITER Chapter');

  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tekno Krraft 2026//GDG ITER Chapter//EN',
    'BEGIN:VEVENT',
    `SUMMARY:Tekno Krraft 2026: ${title}`,
    `DESCRIPTION:${desc} - Speaker: ${speaker} (${company})`,
    `LOCATION:${venue}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Downloaded calendar invite for "${title.substring(0, 24)}..."`);
};

window.reserveSessionSeat = function(titleEnc) {
  const title = decodeURIComponent(titleEnc);
  synth.playClick();
  showToast(`Seat Confirmed for "${title.substring(0, 25)}..."! Check-in with your pass.`);
};

// ==========================================================================
// 7. Track Deep Dive Simulator (Exact Client Tracks: mf)
// ==========================================================================
const TRACKS_DATABASE = {
  'gen-ai': {
    level: '▲ INTERMEDIATE // 8 SESSIONS',
    title: 'Generative AI & Machine Learning',
    desc: 'Dive deep into the world of Artificial Intelligence. Learn hands-on how to leverage Gemini 1.5 Pro, build Retrieval-Augmented Generation (RAG) pipelines, multimodal AI agents, and deploy models on Google Cloud Vertex AI.',
    mentor: 'Rohan Samal (Senior AI Engineer, Google Cloud Ecosystem)',
    room: 'Bansuri Guru Computer Lab 3',
    prereq: 'Basic Python knowledge, Understanding of REST APIs',
    keyTopics: 'Gemini API & Prompt Engineering • LangChain & Vector Databases • Vertex AI Studio • Fine-tuning Small Language Models',
    code: `# Multimodal Gemini 1.5 Pro Python Pipeline
import google.generativeai as genai

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro-latest",
    tools=[search_database, execute_code]
)

chat = model.start_chat(enable_automatic_function_calling=True)
response = chat.send_message("Analyze system logs and suggest scaling action")
print(response.text)`
  },
  'web-cloud': {
    level: '● BEGINNER // 10 SESSIONS',
    title: 'Full-Stack Web & Cloud Architecture',
    desc: 'Modern web engineering requires resilient cloud infrastructure. Explore modern web architectures, SSR/SSG patterns, serverless microservices on GCP, Kubernetes fundamentals, and edge computing.',
    mentor: 'Dr. Ananya Patnaik (Principal Cloud Architect)',
    room: 'Main Auditorium & Seminar Hall B',
    prereq: 'HTML/CSS/JavaScript basics, Git fundamentals',
    keyTopics: 'Next.js App Router & Server Actions • Google Cloud Run & Cloud SQL • GraphQL & RESTful Microservices • CI/CD with GitHub Actions',
    code: `// Next.js App Router Server Action with Cloud Run
export async function POST(request) {
  const { sessionToken, query } = await request.json();
  const dbResult = await cloudSqlPool.query(
    'SELECT * FROM user_workspaces WHERE token = $1',
    [sessionToken]
  );
  return Response.json({ status: 'connected', data: dbResult.rows });
}`
  },
  'mobile-dev': {
    level: '● BEGINNER // 6 SESSIONS',
    title: 'Mobile & Cross-Platform Development',
    desc: 'Learn to build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Flutter and Dart, integrating Firebase backend services effortlessly.',
    mentor: 'Priyanka Mishra (Google Developer Expert - GDE)',
    room: 'Bansuri Guru Computer Lab 1',
    prereq: 'Object-Oriented Programming (OOP) concepts',
    keyTopics: 'Flutter State Management (Riverpod / Bloc) • Firebase Authentication & Firestore • Native Platform Channels • UI/UX Micro-animations',
    code: `// Cross-Platform Flutter Riverpod State Provider
class FestScheduleNotifier extends StateNotifier<AsyncValue<List<Session>>> {
  FestScheduleNotifier(this._firestore) : super(const AsyncValue.loading()) {
    _firestore.collection('sessions').snapshots().listen((snapshot) {
      state = AsyncValue.data(snapshot.docs.map(Session.fromFirestore).toList());
    });
  }
  final FirebaseFirestore _firestore;
}`
  },
  'devops-opensource': {
    level: '◆ ADVANCED // 7 SESSIONS',
    title: 'Open Source & DevOps Engineering',
    desc: 'Unlock the secrets of cloud-native infrastructure and open-source software development. Master Docker containers, Infrastructure as Code, Kubernetes clusters, and GSoC preparation.',
    mentor: 'Amitabh Swain (Staff Engineer, Atlassian)',
    room: 'Conference Room 204',
    prereq: 'Linux CLI commands, Basic networking concepts',
    keyTopics: 'Docker & Container Orchestration • Terraform & IaC on GCP • GitOps & ArgoCD • Navigating Open Source Codebases',
    code: `# Terraform Cloud Run & IAM Security Policy
resource "google_cloud_run_v2_service" "tekno_service" {
  name     = "tekno-krraft-api"
  location = "asia-south1"

  template {
    containers {
      image = "asia-south1-docker.pkg.dev/tekno-2026/core/api:v1.0"
      resources { limits = { cpu = "2", memory = "4Gi" } }
    }
  }
}`
  }
};

class TrackExplorer {
  constructor() {
    this.buttons = document.querySelectorAll('.track-tab-btn');
    this.levelEl = document.getElementById('trackLevelDisplay');
    this.titleEl = document.getElementById('trackTitleDisplay');
    this.descEl = document.getElementById('trackDescDisplay');
    this.mentorEl = document.getElementById('trackMentorDisplay');
    this.roomEl = document.getElementById('trackRoomDisplay');
    this.prereqEl = document.getElementById('trackPrereqDisplay');
    this.codeEl = document.getElementById('trackCodeDisplay');

    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.getAttribute('data-track');
        this.update(key);
      });
    });
  }

  update(key) {
    const data = TRACKS_DATABASE[key];
    if (!data) return;

    synth.playClick();
    if (this.levelEl) this.levelEl.innerText = data.level;
    if (this.titleEl) this.titleEl.innerText = data.title;
    if (this.descEl) this.descEl.innerText = data.desc;
    if (this.mentorEl) this.mentorEl.innerText = data.mentor;
    if (this.roomEl) this.roomEl.innerText = data.room;
    if (this.prereqEl) this.prereqEl.innerText = data.prereq;
    if (this.codeEl) this.codeEl.innerText = data.code;
  }
}

// ==========================================================================
// 8. FAQ Accordion & Quick Filter
// ==========================================================================
class FaqAccordion {
  constructor() {
    this.items = document.querySelectorAll('.faq-item');
    this.searchInput = document.getElementById('faqSearchInput');

    this.init();
  }

  init() {
    this.items.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          this.items.forEach(i => i.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
            synth.playClick();
          }
        });
      }
    });

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        synth.playKeypress();
        this.items.forEach(item => {
          const text = item.innerText.toLowerCase();
          item.style.display = text.includes(query) ? 'block' : 'none';
        });
      });
    }
  }
}

// ==========================================================================
// 9. Modal & Registration System
// ==========================================================================
class ModalManager {
  constructor() {
    this.modal = document.getElementById('registrationModal');
    this.openBtns = document.querySelectorAll('[data-open-modal="registration"]');
    this.closeBtn = document.getElementById('closeModalBtn');
    this.form = document.getElementById('registrationForm');

    this.init();
  }

  init() {
    if (!this.modal) return;

    this.openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  open() {
    this.modal.classList.add('active');
    synth.playFanfare();
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    synth.playClick();
    document.body.style.overflow = '';
  }

  handleSubmit() {
    const name = document.getElementById('regName').value || 'Alex Chen';
    const track = document.getElementById('regTrack').value || 'Generative AI';

    const passName = document.getElementById('passAttendeeName');
    const passTrack = document.getElementById('passTrackTitle');
    if (passName) passName.innerText = name;
    if (passTrack) passTrack.innerText = track;

    this.close();
    synth.playFanfare();

    // Trigger celebratory particle shockwave from center of canvas!
    if (hero3DEngine) {
      hero3DEngine.addShockwave(hero3DEngine.width / 2, hero3DEngine.height / 2);
    }

    showToast(`🎉 Registration Confirmed for ${name}! Welcome to Tekno Krraft 2026.`);
  }
}

// ==========================================================================
// 10. Code of Conduct Modal Manager
// ==========================================================================
class ConductModalManager {
  constructor() {
    this.modal = document.getElementById('conductModal');
    this.openBtns = document.querySelectorAll('[data-open-modal="conduct"]');
    this.closeBtns = document.querySelectorAll('[data-close-modal="conduct"]');

    this.init();
  }

  init() {
    if (!this.modal) return;

    this.openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    this.closeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('active');
    synth.playClick();
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    synth.playClick();
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// 11. Global Toast Feedback System
// ==========================================================================
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="ping-beacon">
      <span class="ping-wave"></span>
      <span class="ping-core"></span>
    </span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================================================
// 12. Interactive Audio & Particle HUD Controller
// ==========================================================================
function setupCyberFXControls() {
  // Particle 3D Mode Selector Buttons
  const particleModeBtns = document.querySelectorAll('[data-particle-mode]');
  particleModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      particleModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-particle-mode');
      if (hero3DEngine) {
        hero3DEngine.setMode(mode);
        showToast(`3D Particle Mode: ${mode.toUpperCase()} ✨`);
      }
    });
  });

  // Sound Profile Selector Buttons
  const soundProfileBtns = document.querySelectorAll('[data-sound-profile]');
  soundProfileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      soundProfileBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const profile = btn.getAttribute('data-sound-profile');
      synth.setProfile(profile);
      showToast(`Audio Profile: ${profile.toUpperCase()} 🔊`);
    });
  });

  // Hover sound on buttons
  const interactiveElements = document.querySelectorAll('button, .btn, .nav-links a, .role-chip, .filter-pill, .track-tab-btn, .footer-text-link');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      synth.playBlip(980, 0.02);
    });
  });
}

// ==========================================================================
// 13. App Initialization on DOM Load
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Init 3D Particle Hero Engine
  hero3DEngine = new Dynamic3DHeroEngine('heroCanvas');

  // Init 3D Holographic Pass Studio
  new HolographicPassStudio();

  // Init Real-time Countdown Clock
  new CountdownEngine();

  // Init Terminal Telemetry Typewriter
  new TerminalTypewriter('terminalTypewriter');

  // Init Schedule Timeline
  new ScheduleManager();

  // Init Track Simulator
  new TrackExplorer();

  // Init FAQ Accordion
  new FaqAccordion();

  // Init Modal
  new ModalManager();

  // Init Conduct Modal
  new ConductModalManager();

  // Init Cyber FX & Sound Controls
  setupCyberFXControls();

  // SFX Audio Toggle Button
  const sfxBtn = document.getElementById('sfxToggleBtn');
  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      const active = synth.toggle();
      sfxBtn.classList.toggle('active', active);
      sfxBtn.innerHTML = active ? '<span>🔊</span> SFX: ON' : '<span>🔇</span> SFX: OFF';
      showToast(active ? 'Cyber Synth Audio Activated ⚡' : 'Cyber Audio Muted');
    });
  }

  // Live Marquee Ticker Attendant incrementer
  const liveCountEl = document.getElementById('liveCountText');
  if (liveCountEl) {
    let count = 842;
    setInterval(() => {
      if (Math.random() > 0.6) {
        count++;
        liveCountEl.innerText = `${count}+ builders registered across 60+ univs`;
      }
    }, 4500);
  }

  // Init Aceternity Spotlight Cards
  initSpotlightCards();

  // Init Cyber Scramble Headings
  initCyberScramble();

  // Init Interactive Cyber Cursor
  initCyberCursor();

  // Init Command Palette (Ctrl + K)
  initCommandPalette();

  // Init Track Quiz
  initTrackQuiz();
});

// ==========================================================================
// 14. Aceternity Spotlight Cards & Glowing Borders
// ==========================================================================
function initSpotlightCards() {
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ==========================================================================
// 15. Cyber Scramble / Decoder Text Animation on Scroll
// ==========================================================================
function initCyberScramble() {
  const scrambleEls = document.querySelectorAll('.cyber-scramble');
  const glyphs = '0123456789ABCDEF_<>{}/*~$#!?%';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetText = el.getAttribute('data-scramble') || el.innerText;
        let iteration = 0;
        const maxIterations = targetText.length;

        clearInterval(el._scrambleInterval);
        el._scrambleInterval = setInterval(() => {
          el.innerText = targetText
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return targetText[index];
              }
              if (char === ' ') return ' ';
              return glyphs[Math.floor(Math.random() * glyphs.length)];
            })
            .join('');

          if (iteration >= maxIterations) {
            clearInterval(el._scrambleInterval);
            el.innerText = targetText;
          }
          iteration += 1 / 2;
        }, 22);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  scrambleEls.forEach(el => observer.observe(el));
}

// ==========================================================================
// 16. Interactive Cyber Cursor with Magnetic Snap
// ==========================================================================
function initCyberCursor() {
  const dot = document.getElementById('cyberCursorDot');
  const ring = document.getElementById('cyberCursorRing');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover expansion & magnetic pull
  const hoverTargets = document.querySelectorAll('button, a, .role-chip, .filter-pill, .day-tab-btn, .track-tab-btn, .prize-card, .quiz-option-btn, .command-item');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });

  window.addEventListener('mousedown', () => ring.classList.add('cursor-active'));
  window.addEventListener('mouseup', () => ring.classList.remove('cursor-active'));
}

// ==========================================================================
// 17. Quick Command Palette / Hacker Terminal (Ctrl + K)
// ==========================================================================
function initCommandPalette() {
  const modal = document.getElementById('commandPaletteModal');
  const triggerBtn = document.getElementById('cmdKTriggerBtn');
  const input = document.getElementById('commandInput');
  const list = document.getElementById('commandList');
  if (!modal || !input || !list) return;

  function openPalette() {
    modal.classList.add('active');
    input.value = '';
    filterCommands('');
    input.focus();
    synth.playBlip(880, 0.03);
  }

  function closePalette() {
    modal.classList.remove('active');
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openPalette);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('active')) closePalette();
      else openPalette();
    }
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closePalette();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });

  function filterCommands(query) {
    const q = query.toLowerCase().trim();
    const items = list.querySelectorAll('.command-item');
    items.forEach(item => {
      const text = item.innerText.toLowerCase();
      const cmd = item.getAttribute('data-cmd') || '';
      if (!q || text.includes(q) || cmd.includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  input.addEventListener('input', (e) => filterCommands(e.target.value));

  list.addEventListener('click', (e) => {
    const item = e.target.closest('.command-item');
    if (!item) return;
    const cmd = item.getAttribute('data-cmd');
    executeCommand(cmd);
    closePalette();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const visible = list.querySelector('.command-item:not([style*="display: none"])');
      if (visible) {
        const cmd = visible.getAttribute('data-cmd');
        executeCommand(cmd);
        closePalette();
      }
    }
  });

  function executeCommand(cmd) {
    switch (cmd) {
      case 'schedule':
        document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
        showToast('Navigated to Schedule 📅');
        break;
      case 'speakers':
        document.getElementById('speakers')?.scrollIntoView({ behavior: 'smooth' });
        showToast('Navigated to Speakers 🎤');
        break;
      case 'tracks':
        document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' });
        showToast('Navigated to Tracks ⚡');
        break;
      case 'prizes':
        document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' });
        showToast('Navigated to Prize Pool 🏆');
        break;
      case 'quiz':
        openTrackQuiz();
        break;
      case 'register':
        document.getElementById('registrationModal')?.classList.add('active');
        break;
      case 'matrix':
        startMatrixRain();
        break;
      case 'theme-matrix':
        setTheme('matrix');
        break;
      case 'theme-synthwave':
        setTheme('synthwave');
        break;
      case 'theme-default':
        setTheme('default');
        break;
      case 'sfx':
        const sfxBtn = document.getElementById('sfxToggleBtn');
        if (sfxBtn) sfxBtn.click();
        break;
    }
  }
}

// Theme Switcher Engine
function setTheme(themeName) {
  if (themeName === 'default') {
    document.body.removeAttribute('data-theme');
    showToast('Theme: Obsidian Cyber 💙');
  } else {
    document.body.setAttribute('data-theme', themeName);
    showToast(`Theme: ${themeName.toUpperCase()} ✨`);
  }
}
window.setTheme = setTheme;

// ==========================================================================
// 18. Digital Matrix Rain Animation Engine
// ==========================================================================
let matrixInterval = null;
function startMatrixRain() {
  const overlay = document.getElementById('matrixOverlay');
  const canvas = document.getElementById('matrixCanvas');
  const exitBtn = document.getElementById('matrixExitBtn');
  if (!overlay || !canvas) return;

  overlay.classList.add('active');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/*';
  const alphabet = katakana + latin;

  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const rainDrops = Array.from({ length: columns }).fill(1);

  function render() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF66';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }
      rainDrops[i]++;
    }
  }

  clearInterval(matrixInterval);
  matrixInterval = setInterval(render, 33);
  showToast('Entered Digital Matrix Rain 🟢 [Press ESC to Exit]');

  function stop() {
    clearInterval(matrixInterval);
    overlay.classList.remove('active');
  }

  if (exitBtn) exitBtn.onclick = stop;
  window.addEventListener('keydown', function onEsc(e) {
    if (e.key === 'Escape') {
      stop();
      window.removeEventListener('keydown', onEsc);
    }
  });
}
window.startMatrixRain = startMatrixRain;

// ==========================================================================
// 19. Celebratory Neon Confetti Burst Layer
// ==========================================================================
function triggerConfetti(e) {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const originX = (e && e.clientX) ? e.clientX : window.innerWidth / 2;
  const originY = (e && e.clientY) ? e.clientY : window.innerHeight / 2;

  const colors = ['#38BDF8', '#10B981', '#FBBF24', '#EA4335', '#A855F7', '#FF2A85'];
  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: originX,
      y: originY,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 16 - 4,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      decay: Math.random() * 0.02 + 0.015,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.life > 0) {
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.life -= p.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
  synth.playBlip(1200, 0.05);
}
window.triggerConfetti = triggerConfetti;

// ==========================================================================
// 20. Interactive "Which Track Fits You?" Quiz Mini-Widget
// ==========================================================================
const QUIZ_QUESTIONS = [
  {
    title: "What technology domain excites you most right now?",
    options: [
      { letter: "A", text: "Training LLMs, Prompt Engineering & Multimodal AI Agents", track: "Generative AI & Machine Learning" },
      { letter: "B", text: "High-performance Web Apps, Edge APIs & Cloud Architecture", track: "Full-Stack Web & Cloud Architecture" },
      { letter: "C", text: "Cross-platform mobile apps for iOS & Android with Flutter", track: "Mobile & Cross-Platform Development" },
      { letter: "D", text: "Docker containers, Kubernetes GitOps & Linux Automation", track: "Open Source & DevOps Engineering" }
    ]
  },
  {
    title: "Which toolset would you pick for a 24-Hour Hackathon?",
    options: [
      { letter: "A", text: "Python, PyTorch, Gemini 1.5 Pro & Vertex AI", track: "Generative AI & Machine Learning" },
      { letter: "B", text: "TypeScript, Next.js 15, Turbopack & PostgreSQL", track: "Full-Stack Web & Cloud Architecture" },
      { letter: "C", text: "Flutter 3.x, Dart & Firebase Cloud Firestore", track: "Mobile & Cross-Platform Development" },
      { letter: "D", text: "Go, Kubernetes, ArgoCD, GitHub Actions & Helm", track: "Open Source & DevOps Engineering" }
    ]
  },
  {
    title: "What is your primary goal at Tekno Krraft 2026?",
    options: [
      { letter: "A", text: "Deploy intelligent AI pipelines that can analyze multimodal data", track: "Generative AI & Machine Learning" },
      { letter: "B", text: "Build scalable distributed architectures that handle millions of users", track: "Full-Stack Web & Cloud Architecture" },
      { letter: "C", text: "Create responsive 60fps applications for millions of mobile devices", track: "Mobile & Cross-Platform Development" },
      { letter: "D", text: "Contribute to open-source infrastructure and streamline CI/CD", track: "Open Source & DevOps Engineering" }
    ]
  }
];

const TRACK_RECOMMENDATIONS = {
  "Generative AI & Machine Learning": {
    emoji: "🧠",
    desc: "You are driven to build autonomous agents, neural architectures, and intelligent tools. Vertex AI, Gemini 1.5, and RAG pipelines are your ultimate playground."
  },
  "Full-Stack Web & Cloud Architecture": {
    emoji: "🌐",
    desc: "You thrive on speed, distributed backends, and modern client interfaces. Next.js 15, Turbopack, and Google Cloud Run will elevate your full-stack journey."
  },
  "Mobile & Cross-Platform Development": {
    emoji: "📱",
    desc: "You want your code in everyone's pocket. Flutter 3 masterclasses and Firebase backend sync will accelerate your native mobile apps across iOS and Android."
  },
  "Open Source & DevOps Engineering": {
    emoji: "🌿",
    desc: "You are the foundation builder of modern software. Kubernetes orchestration, GitOps, and open-source contribution sessions will supercharge your career."
  }
};

let quizStep = 0;
let quizVotes = {};

function initTrackQuiz() {
  const openBtn = document.getElementById('openQuizBtn');
  const modal = document.getElementById('quizModal');
  const closeBtn = document.getElementById('closeQuizBtn');
  const claimBtn = document.getElementById('claimQuizPassBtn');
  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      openTrackQuiz();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      const regModal = document.getElementById('registrationModal');
      const trackSelect = document.getElementById('regTrack');
      const winner = getQuizWinner();
      if (trackSelect && winner) {
        trackSelect.value = winner;
      }
      if (regModal) regModal.classList.add('active');
      showToast(`Selected Track: ${winner} ⚡`);
    });
  }
}

function openTrackQuiz() {
  const modal = document.getElementById('quizModal');
  if (!modal) return;
  quizStep = 0;
  quizVotes = {
    "Generative AI & Machine Learning": 0,
    "Full-Stack Web & Cloud Architecture": 0,
    "Mobile & Cross-Platform Development": 0,
    "Open Source & DevOps Engineering": 0
  };
  renderQuizQuestion();
  document.getElementById('quizQuestionStage').style.display = 'block';
  document.getElementById('quizResultStage').style.display = 'none';
  modal.classList.add('active');
  synth.playBlip(750, 0.03);
}
window.openTrackQuiz = openTrackQuiz;

function renderQuizQuestion() {
  const q = QUIZ_QUESTIONS[quizStep];
  const titleEl = document.getElementById('quizQuestionTitle');
  const progressEl = document.getElementById('quizProgress');
  const container = document.getElementById('quizOptionsContainer');
  if (!titleEl || !container) return;

  titleEl.innerText = q.title;
  progressEl.innerText = `Question ${quizStep + 1} of ${QUIZ_QUESTIONS.length}`;
  container.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `
      <span class="quiz-option-letter">${opt.letter}</span>
      <span>${opt.text}</span>
    `;
    btn.addEventListener('click', () => {
      quizVotes[opt.track] = (quizVotes[opt.track] || 0) + 1;
      synth.playBlip(900 + quizStep * 150, 0.03);
      quizStep++;
      if (quizStep < QUIZ_QUESTIONS.length) {
        renderQuizQuestion();
      } else {
        showQuizResult();
      }
    });
    container.appendChild(btn);
  });
}

function getQuizWinner() {
  let winner = "Generative AI & Machine Learning";
  let maxVotes = -1;
  for (const track in quizVotes) {
    if (quizVotes[track] > maxVotes) {
      maxVotes = quizVotes[track];
      winner = track;
    }
  }
  return winner;
}

function showQuizResult() {
  const winner = getQuizWinner();
  const info = TRACK_RECOMMENDATIONS[winner] || TRACK_RECOMMENDATIONS["Generative AI & Machine Learning"];

  document.getElementById('quizQuestionStage').style.display = 'none';
  document.getElementById('quizResultStage').style.display = 'block';

  document.getElementById('quizResultEmoji').innerText = info.emoji;
  document.getElementById('quizResultTrackName').innerText = winner;
  document.getElementById('quizResultDesc').innerText = info.desc;

  triggerConfetti();
}


