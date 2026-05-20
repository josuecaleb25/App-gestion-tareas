import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import OnboardingPage from '../features/auth/pages/OnboardingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../features/tasks/pages/DashboardPage';
import TasksPage from '../features/tasks/pages/TasksPage';
import CalendarPage from '../features/calendar/pages/CalendarPage';
import StatsPage from '../features/profile/pages/StatsPage';
import ProfilePage from '../features/profile/pages/ProfilePage';
import ThemePage from '../features/profile/pages/ThemePage';
import HabitsPage from '../features/tasks/pages/HabitsPage';
import SearchPage from '../features/tasks/pages/SearchPage';

import { useNavigate } from 'react-router-dom';

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

        {/* Auth */}
        <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />

        {/* App (protegida con layout) */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/theme" element={<ThemePage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}