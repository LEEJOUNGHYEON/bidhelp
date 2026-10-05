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
  const playLabel = videoPlay.querySelector('strong');

  const hideVideoPlay = () => {
    videoPlay.hidden = true;
    videoPlay.classList.add('is-hidden');
  };

  const showVideoPlay = (label = '영상 재생') => {
    if (playLabel) playLabel.textContent = label;
    videoPlay.hidden = false;
    videoPlay.classList.remove('is-hidden');
  };

  videoPlay.addEventListener('click', async () => {
    video.controls = true;
    hideVideoPlay();

    try {
      await video.play();
    } catch (_) {
      showVideoPlay('영상 재생');
    }
  });

  // 재생이 시작되면 커스텀 오버레이를 완전히 치워
  // 브라우저 기본 컨트롤(일시정지/탐색/볼륨)을 사용할 수 있게 합니다.
  video.addEventListener('play', hideVideoPlay);
  video.addEventListener('playing', hideVideoPlay);

  // 영상이 끝났을 때만 다시 재생 버튼을 보여줍니다.
  video.addEventListener('ended', () => {
    showVideoPlay('다시 재생');
  });
}
