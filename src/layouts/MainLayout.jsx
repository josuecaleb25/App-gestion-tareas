import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Inicio', icon: 'home' },
  { path: '/tasks', label: 'Tareas', icon: 'tasks' },
  { path: '/habits', label: 'Hábitos', icon: 'leaf' },
  { path: '/calendar', label: 'Calendario', icon: 'calendar' },
  { path: '/profile', label: 'Perfil', icon: 'profile' },
];

const NavIcon = ({ name, active }) => {
  const color = active ? 'var(--color-primary)' : '#8A847C';
  
  const icons = {
    home: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    tasks: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    leaf: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    calendar: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    profile: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  };

  return icons[name] || null;
};

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative pb-20" style={{ background: 'var(--color-background)', fontFamily: 'Fredoka, sans-serif' }}>
      {/* Contenido de la página */}
      <Outlet />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#FDFAF5] border-t border-[rgba(168,137,108,0.15)] px-4 pt-2 pb-4 flex justify-around items-center z-40">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
              style={isActive ? { background: 'var(--color-primary-pale)' } : {}}
            >
              <NavIcon name={item.icon} active={isActive} />
              <span className={`text-[9px] font-semibold tracking-wide ${
                isActive ? '' : 'text-[#8A847C]'
              }`} style={isActive ? { color: 'var(--color-primary)' } : {}}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default MainLayout;