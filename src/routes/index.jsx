import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import OnboardingPage from '../features/auth/pages/OnboardingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';

// Placeholder para el dashboard (se creará después)
function DashboardPage() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-4">Bienvenido, {user?.name || 'Usuario'}</p>
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

// Ruta protegida
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

// Ruta de auth (redirige si ya está logueado)
function AuthRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function AppRouter() {
  const { hasCompletedOnboarding } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding */}
        <Route
          path="/"
          element={
            hasCompletedOnboarding
              ? <Navigate to="/login" replace />
              : <OnboardingPage />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />

        {/* Dashboard (protegido) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}