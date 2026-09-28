// Formatting and Helper Utilities for Glowspace

export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return '₹' + Number(amount).toLocaleString('en-IN');
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function formatDateTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function renderStars(rating = 5) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let starsHtml = '';

  for (let i = 0; i < fullStars; i++) {
    starsHtml += '★';
  }
  if (hasHalf) {
    starsHtml += '★';
  }
  while (starsHtml.length < 5) {
    starsHtml += '☆';
  }

  return `<span class="stars" title="${rating} out of 5 stars">${starsHtml}</span>`;
}

export function getStatusBadge(status) {
  switch ((status || '').toLowerCase()) {
    case 'delivered':
    case 'paid':
    case 'active':
    case 'in stock':
      return `<span class="badge badge-success">${status}</span>`;
    case 'shipped':
    case 'processing':
    case 'confirmed':
      return `<span class="badge badge-info">${status}</span>`;
    case 'pending':
    case 'low stock':
      return `<span class="badge badge-warning">${status}</span>`;
    case 'cancelled':
    case 'returned':
    case 'out of stock':
    case 'inactive':
      return `<span class="badge badge-danger">${status}</span>`;
    default:
      return `<span class="badge badge-blush">${status}</span>`;
  }
}
