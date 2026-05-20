// ─── Class Name Utilities ─────────────────────────────────────────────────────
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ─── Date Utilities ───────────────────────────────────────────────────────────
export function formatDate(date, format = 'short') {
  const d = new Date(date);
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    case 'long':
      return d.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    case 'time':
      return d.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    default:
      return d.toLocaleDateString('es-ES');
  }
}

// ─── String Utilities ─────────────────────────────────────────────────────────
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str, length) {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

// ─── ID Generation ────────────────────────────────────────────────────────────
export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}