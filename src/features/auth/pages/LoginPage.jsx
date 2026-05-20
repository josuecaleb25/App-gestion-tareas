import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('josue@ejemplo.com');
  const [password, setPassword] = useState('mipassword');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    const result = await login(email, password);
    
    if (result.success) {
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setIsLoading(false);
      setError(result.error);
    }
  };

  const getButtonText = () => {
    if (loginSuccess) return '✓ Bienvenido, Josue!';
    if (isLoading) return 'Entrando...';
    return 'Iniciar sesión';
  };

  const getButtonBg = () => {
    if (loginSuccess) return 'var(--color-primary)';
    if (isLoading) return 'var(--color-primary)';
    return 'var(--color-primary)';
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#EDE6D8]" style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
      
      {/* Top decorative blob */}
      <div className="absolute top-0 left-0 right-0 h-[340px] bg-[#D4C9B4] overflow-hidden" style={{ borderRadius: '0 0 60% 60% / 0 0 50px 50px' }}>
        <div className="absolute rounded-full" style={{ width: 180, height: 180, background: 'rgba(168,148,120,.18)', top: -60, left: -50 }}></div>
        <div className="absolute rounded-full" style={{ width: 120, height: 120, background: 'rgba(122,173,170,.13)', top: 20, right: -30 }}></div>
        <div className="absolute rounded-full" style={{ width: 70, height: 70, background: 'rgba(168,155,192,.15)', bottom: 40, left: 30 }}></div>
        <div className="absolute rounded-full" style={{ width: 40, height: 40, background: 'rgba(212,168,152,.2)', top: 60, right: 60 }}></div>
        <div className="absolute rounded-full" style={{ width: 8, height: 8, background: 'rgba(143,175,138,.35)', top: 110, left: 50 }}></div>
        <div className="absolute rounded-full" style={{ width: 5, height: 5, background: 'rgba(168,148,120,.4)', top: 160, right: 80 }}></div>
        <div className="absolute rounded-full" style={{ width: 10, height: 10, background: 'rgba(122,173,170,.25)', bottom: 60, right: 40 }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-6 pt-16 pb-8">
        
        {/* Hero area */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-[88px] h-[88px] rounded-full bg-[#C8BEAC] border-4 border-[#EDE6D8] flex items-center justify-center mb-3.5" style={{ boxShadow: '0 4px 20px rgba(90,70,50,.18)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4A3F34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
              <circle cx="7.5" cy="10" r="1.5" fill="#8FAF8A"/>
              <circle cx="12" cy="7.5" r="1.5" fill="#7AADAA"/>
              <circle cx="16.5" cy="10" r="1.5" fill="#A89BC0"/>
            </svg>
          </div>
          <div className="text-[30px] font-semibold text-[#4A3F34] tracking-tight mb-0.5" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
            serene
          </div>
          <div className="text-xs text-[#8A7E72] tracking-widest uppercase font-semibold">
            Tu espacio de calma productiva
          </div>
        </div>

        {/* Form card */}
        <div className="w-full max-w-sm bg-[#F5F0E6] rounded-[28px] p-6 pt-7" style={{ border: '1.5px solid rgba(168,148,120,.2)', boxShadow: '0 8px 32px rgba(90,70,50,.1), 0 2px 8px rgba(90,70,50,.06)' }}>
          
          {/* Email field */}
          <div className="mb-5">
            <label className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold text-[#8A7E72] tracking-widest uppercase">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A89880" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              Correo
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="tu@correo.com"
                className="w-full py-3.5 px-4 pr-10 rounded-2xl text-sm text-[#4A3F34] outline-none transition-all duration-300"
                style={{
                  fontFamily: 'Nunito Sans, system-ui, sans-serif',
                  background: emailFocused || email ? '#F0EDE3' : '#EDE6D8',
                  border: `2px solid ${emailFocused || email ? '#A8AF8A' : 'transparent'}`,
                  boxShadow: emailFocused 
                    ? '0 0 0 4px rgba(143,175,138,.12), inset 0 2px 4px rgba(90,70,50,.04), 0 4px 12px rgba(143,175,138,.08)' 
                    : 'inset 0 2px 6px rgba(90,70,50,.07)',
                }}
              />
              {email && (
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8FAF8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
          </div>

          {/* Password field */}
          <div className="mb-2">
            <label className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold text-[#8A7E72] tracking-widest uppercase">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A89880" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
                placeholder="••••••••••"
                className="w-full py-3.5 px-4 pr-10 rounded-2xl text-sm text-[#4A3F34] outline-none transition-all duration-300"
                style={{
                  fontFamily: 'Nunito Sans, system-ui, sans-serif',
                  background: passFocused || password ? '#F0EDE3' : '#EDE6D8',
                  border: `2px solid ${passFocused || password ? '#A8AF8A' : 'transparent'}`,
                  boxShadow: passFocused 
                    ? '0 0 0 4px rgba(143,175,138,.12), inset 0 2px 4px rgba(90,70,50,.04), 0 4px 12px rgba(143,175,138,.08)' 
                    : 'inset 0 2px 6px rgba(90,70,50,.07)',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B0A494] hover:text-[#8A7E72] transition-colors"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <path d="m1 1 22 22"/>
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end mb-5">
            <button className="text-xs font-semibold text-[#9A9080] underline underline-offset-2 decoration-[rgba(154,144,128,.35)] hover:text-[#7A6E62] transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="relative w-full py-4 rounded-2xl text-[17px] font-semibold text-white overflow-hidden transition-all duration-150 active:scale-[0.98]"
            style={{
              fontFamily: 'Fredoka, system-ui, sans-serif',
              background: getButtonBg(),
              boxShadow: '0 4px 18px rgba(154,178,155,.35), 0 1px 4px rgba(154,178,155,.2)',
              letterSpacing: '0.03em',
            }}
          >
            <div className="absolute top-0 left-[-60%] w-[40%] h-full bg-white/[.18] skew-x-[-18deg] pointer-events-none"></div>
            {getButtonText()}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2.5 my-5">
            <div className="flex-1 h-px bg-[rgba(168,148,120,.2)]"></div>
            <span className="text-[11px] font-semibold text-[#A89880] tracking-wider whitespace-nowrap">o continúa con</span>
            <div className="flex-1 h-px bg-[rgba(168,148,120,.2)]"></div>
          </div>

          {/* Social buttons */}
          <div className="flex gap-2.5">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-2 bg-[#EDE6D8] rounded-2xl text-xs font-semibold text-[#6A5E52] transition-all duration-200 hover:bg-[#E5DDD0] hover:shadow-md" style={{ border: '1.5px solid rgba(168,148,120,.22)', boxShadow: '0 2px 8px rgba(90,70,50,.07)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-2 bg-[#EDE6D8] rounded-2xl text-xs font-semibold text-[#6A5E52] transition-all duration-200 hover:bg-[#E5DDD0] hover:shadow-md" style={{ border: '1.5px solid rgba(168,148,120,.22)', boxShadow: '0 2px 8px rgba(90,70,50,.07)' }}>
              <svg className="w-4 h-4" viewBox="0 0 814 1000" fill="#4A3F34">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-41.4-150.3-99.8c-52.2-68.3-101.6-181-101.6-287.7 0-170.2 111.4-260.2 220.6-260.2 64.8 0 118.9 42.5 159.7 42.5 39.2 0 100.8-45 174.9-45 28.2 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
              </svg>
              Apple
            </button>
          </div>
        </div>

        {/* Bottom area */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#9A9080] mb-0.5">¿Primera vez aquí?</p>
          <button 
            onClick={() => navigate('/register')}
            className="text-sm font-semibold tracking-wide" 
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif', color: 'var(--color-primary)' }}
          >
            Crear cuenta gratis ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;