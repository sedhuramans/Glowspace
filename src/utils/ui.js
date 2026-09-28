import confetti from 'canvas-confetti';

export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '✓';
  if (type === 'error') icon = '✕';
  if (type === 'info') icon = 'ℹ';
  if (type === 'warning') icon = '⚠';

  toast.innerHTML = `
    <span style="font-size: 1.1rem; font-weight: bold;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

let activeModalCloseCallback = null;

export function openModal(contentHtml, { onClose, maxWidth = '600px' } = {}) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  activeModalCloseCallback = onClose || null;

  container.innerHTML = `
    <div class="modal-content-wrapper" style="max-width: ${maxWidth};">
      <button class="modal-close-btn" id="global-modal-close" aria-label="Close modal">✕</button>
      <div class="modal-body-inner">
        ${contentHtml}
      </div>
    </div>
  `;

  container.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('global-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Backdrop click closes modal
  container.onclick = (e) => {
    if (e.target === container) {
      closeModal();
    }
  };
}

export function closeModal() {
  const container = document.getElementById('modal-container');
  if (!container) return;

  container.classList.add('hidden');
  container.innerHTML = '';
  document.body.style.overflow = 'auto';

  if (activeModalCloseCallback) {
    activeModalCloseCallback();
    activeModalCloseCallback = null;
  }
}

export function triggerConfetti() {
  try {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#cf9592', '#deb4b1', '#e29578', '#43805f', '#f7ecea']
    });
  } catch (e) {
    console.log('Confetti triggered', e);
  }
}
