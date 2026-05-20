import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/icons';
import { useAuth } from '../../auth/hooks/useAuth';
import useThemeStore from '../../../store/themeStore';

const achievements = [
  { icon: 'trophy', label: 'Primera semana' },
  { icon: 'flame', label: 'Racha de 7 días' },
  { icon: 'leaf', label: 'Árbol plantado' },
  { icon: 'award', label: '30 días seguidos', locked: true },
];

const SettingsItem = ({ icon, iconBg, label, trailing, onClick, toggleOn }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-3 px-3.5 py-3 w-full text-left transition-colors"
    style={{ borderBottom: '1px solid var(--color-border)' }}
  >
    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
      <Icon name={icon} size={14} color="var(--color-text)" />
    </div>
    <span className="flex-1 text-[13px] font-medium" style={{ color: 'var(--color-text)' }}>{label}</span>
    {trailing === 'toggle' ? (
      <div className="w-9 h-5 rounded-full relative" style={{ background: toggleOn ? 'var(--color-primary)' : '#d4d0cc' }}>
        <div className="absolute w-3.5 h-3.5 rounded-full bg-white top-[3px] shadow-sm transition-all" style={{ right: toggleOn ? '3px' : 'auto', left: toggleOn ? 'auto' : '3px' }}></div>
      </div>
    ) : trailing ? (
      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{trailing}</span>
    ) : (
      <Icon name="chevronRight" size={12} color="var(--color-text-muted)" />
    )}
  </button>
);

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useThemeStore();

  const iconBg = darkMode ? 'rgba(255,255,255,0.08)' : undefined;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-8 flex flex-col items-center rounded-b-[32px]" style={{ background: 'var(--color-card)' }}>
        {/* Avatar */}
        <button onClick={() => navigate('/profile/edit')} className="w-20 h-20 rounded-full flex items-center justify-center text-[28px] font-semibold text-white border-[3px] border-white shadow-lg mb-3" style={{ fontFamily: 'Fredoka, sans-serif', background: `linear-gradient(135deg, var(--color-primary-light), var(--color-primary))`, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          {user?.name?.charAt(0) || 'J'}S
        </button>

        <h1 className="text-xl font-semibold mb-0.5" style={{ fontFamily: 'Fredoka, sans-serif', color: 'var(--color-text)' }}>
          {user?.name || 'Josue'} S.
        </h1>
        <p className="text-[11px] mb-2" style={{ color: 'var(--color-text-muted)' }}>{user?.email || 'josue@estudiante.pe'}</p>

        {/* Level badge */}
        <div className="text-[11px] font-semibold text-[#A8896C] bg-[#F2ECE3] px-3 py-1 rounded-full border border-[#D4BFA0] mb-4 flex items-center gap-1">
          <Icon name="leaf" size={12} color="#A8896C" />
          Nivel 7 · Explorador Enfocado
        </div>

        {/* XP bar */}
        <div className="w-full max-w-[240px]">
          <div className="bg-[#EDE6D8] rounded-full h-2 overflow-hidden mb-1">
            <div className="h-full bg-gradient-to-r from-[#D4BFA0] to-[#A8896C] rounded-full" style={{ width: '68%' }}></div>
          </div>
          <p className="text-[10px] text-[var(--color-text-muted)] text-center">340 / 500 XP para Nivel 8</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-24">
        {/* Achievements */}
        <div className="flex items-center gap-1.5 mt-5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A8896C]"></div>
          <span className="text-sm font-semibold" style={{ fontFamily: 'Fredoka, sans-serif', color: 'var(--color-text)' }}>Logros</span>
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {achievements.map((ach, i) => (
            <div key={i} className={`flex-shrink-0 w-[70px] rounded-[10px] p-2.5 text-center shadow-sm ${ach.locked ? 'opacity-40' : ''}`} style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
              <Icon name={ach.icon} size={20} color={ach.locked ? 'var(--color-text-muted)' : '#A8896C'} className="mx-auto mb-1" />
              <div className="text-[9px] font-semibold leading-tight" style={{ color: 'var(--color-text-muted)' }}>{ach.label}</div>
            </div>
          ))}
        </div>

        {/* Personalización */}
        <div className="flex items-center gap-1.5 mt-4 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }}></div>
          <span className="text-sm font-semibold" style={{ fontFamily: 'Fredoka, sans-serif', color: 'var(--color-text)' }}>Personalización</span>
        </div>
        <div className="rounded-2xl shadow-sm overflow-hidden mb-3" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <SettingsItem icon="moon" iconBg={iconBg || '#EEF5EC'} label="Modo oscuro" trailing="toggle" toggleOn={darkMode} onClick={toggleDarkMode} />
          <SettingsItem icon="palette" iconBg={iconBg || '#EEE9F5'} label="Tema de color" trailing="Verde Salvia ›" onClick={() => navigate('/profile/theme')} />
          <SettingsItem icon="leaf" iconBg={iconBg || '#F2ECE3'} label="Mascota" trailing="Hoja ›" />
        </div>

        {/* Cuenta */}
        <div className="flex items-center gap-1.5 mt-4 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#7AADAA]"></div>
          <span className="text-sm font-semibold" style={{ fontFamily: 'Fredoka, sans-serif', color: 'var(--color-text)' }}>Cuenta</span>
        </div>
        <div className="rounded-2xl shadow-sm overflow-hidden" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
          <SettingsItem icon="stats" iconBg={iconBg || '#E8F4F3'} label="Mis estadísticas" onClick={() => navigate('/stats')} />
          <SettingsItem icon="cloudSync" iconBg={iconBg || '#E8F4F3'} label="Sincronización" trailing="toggle" />
          <SettingsItem icon="bell" iconBg={iconBg || '#F8EDE9'} label="Notificaciones" />
          <SettingsItem icon="shield" iconBg={iconBg || '#EDE6D8'} label="Privacidad" />
          <SettingsItem icon="logout" iconBg={iconBg || '#F8EDE9'} label="Cerrar sesión" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;