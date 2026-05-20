import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/icons';
import useThemeStore from '../../../store/themeStore';

const ThemePage = () => {
  const navigate = useNavigate();
  const { currentTheme, setTheme, getThemes } = useThemeStore();
  const themes = getThemes();

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-10 pb-4">
        <button onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full bg-[#FDFAF5] border border-[rgba(168,137,108,0.15)] flex items-center justify-center shadow-sm">
          <Icon name="arrowLeft" size={16} color="#5A5550" />
        </button>
        <h1 className="text-lg font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Tema de color</h1>
      </div>

      {/* Theme options */}
      <div className="px-4 pb-24">
        <p className="text-xs text-[#8A847C] mb-4 px-1">Elige el color que mejor represente tu estilo. Se aplicará en toda la app.</p>

        <div className="space-y-2.5">
          {Object.entries(themes).map(([key, theme]) => {
            const isActive = currentTheme === key;
            return (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border transition-all ${
                  isActive 
                    ? 'bg-white border-2 shadow-md' 
                    : 'bg-[#FDFAF5] border-[rgba(168,137,108,0.15)] shadow-sm'
                }`}
                style={isActive ? { borderColor: theme.primary } : {}}
              >
                {/* Color preview */}
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 rounded-full" style={{ background: theme.primaryPale }}>
                    <div className="absolute inset-1.5 rounded-full" style={{ background: theme.primaryLight }}>
                      <div className="absolute inset-1.5 rounded-full" style={{ background: theme.primary }}></div>
                    </div>
                  </div>
                </div>

                {/* Label */}
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-[#5A5550]">{theme.name}</div>
                  <div className="text-[11px] text-[#8A847C] mt-0.5">{theme.primary}</div>
                </div>

                {/* Check */}
                {isActive && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: theme.primary }}>
                    <Icon name="check" size={12} color="white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Preview */}
        <div className="mt-6">
          <p className="text-xs text-[#8A847C] mb-2 px-1 font-semibold">Vista previa</p>
          <div className="bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: themes[currentTheme]?.primaryPale }}>
                <Icon name="leaf" size={14} color={themes[currentTheme]?.primary} />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#5A5550]">Tarea de ejemplo</div>
                <div className="text-[10px] text-[#8A847C]">Así se verán tus elementos</div>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold text-white" style={{ background: themes[currentTheme]?.primary }}>
                Activo
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold border" style={{ background: themes[currentTheme]?.primaryPale, color: themes[currentTheme]?.primary, borderColor: themes[currentTheme]?.primaryLight }}>
                Tag
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: themes[currentTheme]?.primaryPale }}>
              <div className="h-full w-[65%] rounded-full" style={{ background: themes[currentTheme]?.primary }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePage;