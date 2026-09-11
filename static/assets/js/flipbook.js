(function () {
  const LIB_URL = 'https://cdn.jsdelivr.net/npm/page-flip/dist/js/page-flip.browser.min.js';

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.St && window.St.PageFlip) return resolve();
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function makePages(urls) {
    return urls.map((url, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'flipbook-page';
      const img = document.createElement('img');
      img.src = url;
      img.alt = `Brochure page ${index + 1}`;
      img.loading = index < 2 ? 'eager' : 'lazy';
      wrapper.appendChild(img);
      return wrapper;
    });
  }

  function initShell(shell) {
    const configNode = shell.querySelector('.flipbook-config');
    if (!configNode) return;
    const config = JSON.parse(configNode.textContent);
    const canvas = shell.querySelector(`#${config.id}`);
    const prevBtn = shell.querySelector('.flipbook-prev');
    const nextBtn = shell.querySelector('.flipbook-next');
    const currentEl = shell.querySelector('.flipbook-current');
    const totalEl = shell.querySelector('.flipbook-total');
    const thumbsEl = shell.querySelector('.flipbook-thumbs');
    const toggleThumbsBtn = shell.querySelector('.js-toggle-thumbs');
    const fullscreenBtn = shell.querySelector('.js-fullscreen');

    totalEl.textContent = config.pages.length;

    const pageFlip = new window.St.PageFlip(canvas, {
      width: config.aspectWidth,
      height: config.aspectHeight,
      size: 'stretch',
      minWidth: 280,
      maxWidth: config.aspectWidth,
      minHeight: Math.round(config.aspectHeight * 0.45),
      maxHeight: config.aspectHeight,
      showCover: Boolean(config.showCover),
      maxShadowOpacity: 0.35,
      mobileScrollSupport: false,
      usePortrait: true,
      autoSize: true,
      drawShadow: true,
      flippingTime: 850
    });

    pageFlip.loadFromHTML(makePages(config.pages));

    pageFlip.on('flip', (event) => {
      currentEl.textContent = event.data + 1;
      shell.querySelectorAll('.flipbook-thumb').forEach((thumb) => {
        thumb.classList.toggle('is-active', Number(thumb.dataset.page) === event.data + 1);
      });
    });

    prevBtn.addEventListener('click', () => pageFlip.flipPrev());
    nextBtn.addEventListener('click', () => pageFlip.flipNext());

    shell.querySelectorAll('.flipbook-thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        pageFlip.flip(Number(thumb.dataset.page) - 1);
      });
    });

    toggleThumbsBtn.addEventListener('click', () => {
      thumbsEl.hidden = !thumbsEl.hidden;
    });

    fullscreenBtn.addEventListener('click', () => {
      shell.classList.toggle('is-fullscreen');
      setTimeout(() => pageFlip.update(), 80);
    });

    window.addEventListener('resize', () => pageFlip.update());
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const shells = document.querySelectorAll('.flipbook-shell');
    if (!shells.length) return;
    try {
      await loadScript(LIB_URL);
      shells.forEach(initShell);
    } catch (error) {
      console.error('Flipbook library failed to load.', error);
    }
  });
})();
