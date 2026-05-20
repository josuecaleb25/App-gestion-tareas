import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    // Simula registro
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsLoading(false);
    setSuccess(true);

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const getButtonText = () => {
    if (success) return '✓ Cuenta creada';
    if (isLoading) return 'Creando cuenta...';
    return 'Crear cuenta';
  };

  const getButtonBg = () => {
    if (success) return '#8FBF8A';
    if (isLoading) return '#9DC898';
    return '#A8D4A2';
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#EDE6D8]" style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
      
      {/* Top decorative blob */}
      <div className="absolute top-0 left-0 right-0 h-[280px] bg-[#D4C9B4] overflow-hidden" style={{ borderRadius: '0 0 60% 60% / 0 0 50px 50px' }}>
        <div className="absolute rounded-full" style={{ width: 180, height: 180, background: 'rgba(168,148,120,.18)', top: -60, left: -50 }}></div>
        <div className="absolute rounded-full" style={{ width: 120, height: 120, background: 'rgba(122,173,170,.13)', top: 20, right: -30 }}></div>
        <div className="absolute rounded-full" style={{ width: 70, height: 70, background: 'rgba(168,155,192,.15)', bottom: 40, left: 30 }}></div>
        <div className="absolute rounded-full" style={{ width: 40, height: 40, background: 'rgba(212,168,152,.2)', top: 60, right: 60 }}></div>
        <div className="absolute rounded-full" style={{ width: 8, height: 8, background: 'rgba(143,175,138,.35)', top: 110, left: 50 }}></div>
        <div className="absolute rounded-full" style={{ width: 5, height: 5, background: 'rgba(168,148,120,.4)', top: 160, right: 80 }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-6 pt-12 pb-8">
        
        {/* Hero area */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-[76px] h-[76px] rounded-full bg-[#C8BEAC] border-4 border-[#EDE6D8] flex items-center justify-center mb-3" style={{ boxShadow: '0 4px 20px rgba(90,70,50,.18)' }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#4A3F34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
          </div>
          <div className="text-[26px] font-semibold text-[#4A3F34] tracking-tight mb-0.5" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
            Únete a serene
          </div>
          <div className="text-xs text-[#8A7E72] tracking-widest uppercase font-semibold">
            Crea tu espacio personal
          </div>
        </div>

        {/* Form card */}
        <div className="w-full max-w-sm bg-[#F5F0E6] rounded-[28px] p-6 pt-7" style={{ border: '1.5px solid rgba(168,148,120,.2)', boxShadow: '0 8px 32px rgba(90,70,50,.1), 0 2px 8px rgba(90,70,50,.06)' }}>
          
          {/* Name field */}
          <div className="mb-4">
            <label className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold text-[#8A7E72] tracking-widest uppercase">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A89880" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Nombre
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                placeholder="Tu nombre"
                className="w-full py-3.5 px-4 pr-10 rounded-2xl text-sm text-[#4A3F34] outline-none transition-all duration-300"
                style={{
                  fontFamily: 'Nunito Sans, system-ui, sans-serif',
                  background: nameFocused || name ? '#F0EDE3' : '#EDE6D8',
                  border: `2px solid ${nameFocused || name ? '#A8AF8A' : 'transparent'}`,
                  boxShadow: nameFocused
                    ? '0 0 0 4px rgba(143,175,138,.12), inset 0 2px 4px rgba(90,70,50,.04), 0 4px 12px rgba(143,175,138,.08)'
                    : 'inset 0 2px 6px rgba(90,70,50,.07)',
                }}
              />
              {name && (
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8FAF8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
          </div>

          {/* Email field */}
          <div className="mb-4">
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
              {email && email.includes('@') && (
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8FAF8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
          </div>

          {/* Password field */}
          <div className="mb-4">
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
                placeholder="Mínimo 6 caracteres"
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

          {/* Confirm password field */}
          <div className="mb-5">
            <label className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold text-[#8A7E72] tracking-widest uppercase">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A89880" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmFocused(true)}
                onBlur={() => setConfirmFocused(false)}
                placeholder="Repite tu contraseña"
                className="w-full py-3.5 px-4 pr-10 rounded-2xl text-sm text-[#4A3F34] outline-none transition-all duration-300"
                style={{
                  fontFamily: 'Nunito Sans, system-ui, sans-serif',
                  background: confirmFocused || confirmPassword ? '#F0EDE3' : '#EDE6D8',
                  border: `2px solid ${confirmFocused || confirmPassword ? (passwordsMatch ? '#A8AF8A' : '#D4A898') : 'transparent'}`,
                  boxShadow: confirmFocused
                    ? '0 0 0 4px rgba(143,175,138,.12), inset 0 2px 4px rgba(90,70,50,.04), 0 4px 12px rgba(143,175,138,.08)'
                    : 'inset 0 2px 6px rgba(90,70,50,.07)',
                }}
              />
              {passwordsMatch && (
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8FAF8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
              {confirmPassword && !passwordsMatch && (
                <svg className="absolute right-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A898" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              )}
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-[#fef2f2] border border-[#fecaca] text-center">
              <p className="text-xs font-semibold text-[#dc2626]">{error}</p>
            </div>
          )}

          {/* Register button */}
          <button
            onClick={handleRegister}
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
            <span className="text-[11px] font-semibold text-[#A89880] tracking-wider whitespace-nowrap">o regístrate con</span>
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
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#5865F2">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Discord
            </button>
          </div>
        </div>

        {/* Bottom area */}
        <div className="mt-5 text-center">
          <p className="text-xs text-[#9A9080] mb-0.5">¿Ya tienes una cuenta?</p>
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-semibold text-[#8FAF8A] tracking-wide" 
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            Iniciar sesión ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;