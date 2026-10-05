const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.count');
const progress = document.getElementById('scrollProgress');
const video = document.getElementById('introVideo');
const videoPlay = document.getElementById('videoPlay');
const systemTabs = document.querySelectorAll('.system-tab');
const systemPanels = document.querySelectorAll('.system-panel');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((el) => {
  if (!el.classList.contains('is-visible')) revealObserver.observe(el);
});

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target || 0);
    const duration = 1200;
    const start = performance.now();
    const animate = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('ko-KR');
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach((el) => counterObserver.observe(el));

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  if (progress) progress.style.width = `${Math.min(ratio * 100, 100)}%`;
}, { passive: true });

systemTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.system;
    systemTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    systemPanels.forEach((panel) => {
      const active = panel.dataset.panel === key;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  });
});

if (video && videoPlay) {
  videoPlay.addEventListener('click', async () => {
    try {
      video.controls = true;
      await video.play();
      videoPlay.hidden = true;
    } catch (_) {
      video.controls = true;
    }
  });

  video.addEventListener('ended', () => { videoPlay.hidden = false; });
}
