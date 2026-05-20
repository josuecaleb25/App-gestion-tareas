// ─── Constants y validaciones ─────────────────────────────────────────────────

// Task priorities
export const TASK_PRIORITIES = ['low', 'medium', 'high'];
export const TASK_STATUSES = ['pending', 'in_progress', 'completed'];

// User roles
export const USER_ROLES = ['admin', 'user'];

// API endpoints
export const API_ENDPOINTS = {
  AUTH: '/auth',
  TASKS: '/tasks',
  USERS: '/users',
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  EMAIL: 'Ingresa un email válido',
  MIN_LENGTH: 'Mínimo {min} caracteres',
  MAX_LENGTH: 'Máximo {max} caracteres',
};