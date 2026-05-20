import useAuthStore from '../../../store/authStore';
import { authService } from '../services/authService';

export function useAuth() {
  const { user, isAuthenticated, hasCompletedOnboarding, login, logout, completeOnboarding } = useAuthStore();

  const handleLogin = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      login(result.user);
    }
    return result;
  };

  const handleLogout = () => {
    logout();
  };

  const handleCompleteOnboarding = () => {
    completeOnboarding();
  };

  return {
    user,
    isAuthenticated,
    hasCompletedOnboarding,
    login: handleLogin,
    logout: handleLogout,
    completeOnboarding: handleCompleteOnboarding,
  };
}