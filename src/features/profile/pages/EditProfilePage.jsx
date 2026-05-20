import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/icons';
import { useAuth } from '../../auth/hooks/useAuth';
import useAuthStore from '../../../store/authStore';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const updateUser = useAuthStore((s) => s.login);
  
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // Simula método de registro (email, google, discord)
  const loginMethod = 'email'; // En producción vendría del store

  const handleSaveName = () => {
    if (!name.trim()) return;
    // Actualizar en el store
    useAuthStore.setState({ user: { ...user, name: name.trim() } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePassword = () => {
    setError('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Completa todos los campos');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (newPassword.length < 6) {
      setError('Mínimo 6 caracteres');
      return;
    }
    // Simular cambio
    setSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <Icon name="arrowLeft" size={16} color="var(--color-text)" />
        </button>
        <h1 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Editar perfil</h1>
      </div>

      <div className="px-4 pb-24">
        {/* Avatar section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-[28px] font-semibold text-white border-[3px] border-white shadow-lg overflow-hidden" style={{ background: 'var(--color-primary)' }}>
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                name.charAt(0) || 'U'
              )}
            </div>
            <label className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md cursor-pointer" style={{ background: 'var(--color-primary)' }}>
              <Icon name="edit" size={12} color="white" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      useAuthStore.setState({ user: { ...user, avatar: reader.result } });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
          <p className="text-[11px] mt-2" style={{ color: 'var(--color-text-muted)' }}>Toca para cambiar foto</p>
        </div>

        {/* Success message */}
        {saved && (
          <div className="mb-4 p-3 rounded-xl text-center" style={{ background: 'var(--color-primary-pale)', border: '1px solid var(--color-primary-light)' }}>
            <p className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>Cambios guardados</p>
          </div>
        )}

        {/* Name */}
        <div className="rounded-2xl p-4 mb-3" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <label className="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-muted)' }}>Nombre</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 py-2.5 px-3 rounded-xl text-sm outline-none border-2 border-transparent focus:border-[var(--color-primary-light)] transition-colors"
              style={{ background: 'var(--color-background)', color: 'var(--color-text)' }}
            />
            <button 
              onClick={handleSaveName}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              Guardar
            </button>
          </div>
        </div>

        {/* Email (read only) */}
        <div className="rounded-2xl p-4 mb-3" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <label className="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-muted)' }}>Correo electrónico</label>
          <div className="py-2.5 px-3 rounded-xl text-sm" style={{ background: 'var(--color-background)', color: 'var(--color-text-muted)' }}>
            {email}
          </div>
          <p className="text-[10px] mt-1.5" style={{ color: 'var(--color-text-muted)' }}>El correo no se puede cambiar</p>
        </div>

        {/* Login method */}
        <div className="rounded-2xl p-4 mb-3" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <label className="text-[11px] font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--color-text-muted)' }}>Método de inicio de sesión</label>
          <div className="flex items-center gap-2 py-2">
            {loginMethod === 'email' && (
              <>
                <Icon name="lock" size={16} color="var(--color-text)" />
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>Email y contraseña</span>
              </>
            )}
            {loginMethod === 'google' && (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>Google</span>
              </>
            )}
            {loginMethod === 'discord' && (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#5865F2">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>Discord</span>
              </>
            )}
          </div>
        </div>

        {/* Change password (only for email users) */}
        {loginMethod === 'email' && (
          <div className="rounded-2xl p-4 mb-3" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
            <label className="text-[11px] font-semibold uppercase tracking-wider mb-3 block" style={{ color: 'var(--color-text-muted)' }}>Cambiar contraseña</label>
            
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Contraseña actual"
              className="w-full py-2.5 px-3 rounded-xl text-sm outline-none border-2 border-transparent focus:border-[var(--color-primary-light)] transition-colors mb-2"
              style={{ background: 'var(--color-background)', color: 'var(--color-text)' }}
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
              className="w-full py-2.5 px-3 rounded-xl text-sm outline-none border-2 border-transparent focus:border-[var(--color-primary-light)] transition-colors mb-2"
              style={{ background: 'var(--color-background)', color: 'var(--color-text)' }}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar nueva contraseña"
              className="w-full py-2.5 px-3 rounded-xl text-sm outline-none border-2 border-transparent focus:border-[var(--color-primary-light)] transition-colors mb-3"
              style={{ background: 'var(--color-background)', color: 'var(--color-text)' }}
            />

            {error && (
              <p className="text-xs text-[#D4A898] mb-2 font-semibold">{error}</p>
            )}

            <button 
              onClick={handleChangePassword}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              Actualizar contraseña
            </button>
          </div>
        )}

        {loginMethod !== 'email' && (
          <div className="rounded-2xl p-4 mb-3" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2">
              <Icon name="shield" size={16} color="var(--color-text-muted)" />
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Tu contraseña es gestionada por {loginMethod === 'google' ? 'Google' : 'Discord'}. No puedes cambiarla desde aquí.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;