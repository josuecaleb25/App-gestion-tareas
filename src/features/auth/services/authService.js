// Usuarios de prueba (simula backend)
const DEMO_USERS = [
  { id: '1', name: 'Josue', email: 'josue@ejemplo.com', password: 'mipassword' },
  { id: '2', name: 'Admin', email: 'admin@test.com', password: 'admin123' },
];

export const authService = {
  login: async (email, password) => {
    // Simula delay de red
    await new Promise((resolve) => setTimeout(resolve, 900));

    const user = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'Credenciales inválidas' };
  },

  register: async (name, email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    // TODO: conectar con backend real
    return { success: true, user: { id: Date.now().toString(), name, email } };
  },

  logout: async () => {
    // TODO: invalidar token en backend
    return { success: true };
  },
};