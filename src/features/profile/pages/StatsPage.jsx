import Icon from '../../../components/icons';

const StatCard = ({ icon, iconBg, value, label }) => (
  <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-3.5">
    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-2" style={{ background: iconBg }}>
      <Icon name={icon} size={16} color="#5A5550" />
    </div>
    <div className="text-[22px] font-semibold text-[var(--color-text)] leading-none" style={{ fontFamily: 'Fredoka, sans-serif' }}>{value}</div>
    <div className="text-[10px] text-[var(--color-text-muted)] font-semibold mt-1">{label}</div>
  </div>
);

const barData = [
  { day: 'Lu', height: 45, color: '#C8DFC4' },
  { day: 'Ma', height: 80, color: '#8FAF8A' },
  { day: 'Mi', height: 60, color: '#C8DFC4' },
  { day: 'Ju', height: 95, color: '#7AADAA' },
  { day: 'Vi', height: 70, color: '#8FAF8A' },
  { day: 'Sá', height: 30, color: '#EDE6D8' },
  { day: 'Do', height: 20, color: '#EDE6D8' },
];

const StatsPage = () => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-6 rounded-b-[28px] mb-4" style={{ background: 'var(--color-card)' }}>
        <h1 className="text-[22px] font-semibold text-[var(--color-text)] mb-1" style={{ fontFamily: 'Fredoka, sans-serif' }}>Tus Estadísticas</h1>
        <p className="text-xs text-[var(--color-text-muted)]">Semana del 12–18 mayo · Buen trabajo!</p>
      </div>

      {/* Content */}
      <div className="px-4 pb-24">
        {/* Stat cards grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <StatCard icon="target" iconBg="#EEF5EC" value="24" label="Tareas completadas" />
          <StatCard icon="clock" iconBg="#E8F4F3" value="18h" label="Tiempo en focus" />
          <StatCard icon="flame" iconBg="#EEE9F5" value="7" label="Racha de días" />
          <StatCard icon="zap" iconBg="#F2ECE3" value="340" label="XP ganado" />
        </div>

        {/* Bar chart */}
        <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-3.5 mb-3">
          <div className="text-[13px] font-semibold text-[var(--color-text)] mb-3" style={{ fontFamily: 'Fredoka, sans-serif' }}>Productividad semanal</div>
          <div className="flex items-end gap-1.5 h-20">
            {barData.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full rounded-t-md rounded-b-sm min-h-[4px]" style={{ height: `${bar.height}%`, background: bar.color }}></div>
                <span className="text-[9px] text-[var(--color-text-muted)] font-semibold">{bar.day}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2.5 mt-2.5 justify-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-[#8FAF8A]"></div>
              <span className="text-[9px] text-[var(--color-text-muted)]">Laboral</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-[#EDE6D8]"></div>
              <span className="text-[9px] text-[var(--color-text-muted)]">Descanso</span>
            </div>
          </div>
        </div>

        {/* Donut chart */}
        <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-3.5">
          <div className="text-[13px] font-semibold text-[var(--color-text)] mb-3" style={{ fontFamily: 'Fredoka, sans-serif' }}>Distribución de categorías</div>
          <div className="flex gap-3 items-center">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#8FAF8A" strokeWidth="16" strokeDasharray="94 188" strokeDashoffset="0" transform="rotate(-90 40 40)"/>
              <circle cx="40" cy="40" r="30" fill="none" stroke="#7AADAA" strokeWidth="16" strokeDasharray="56 188" strokeDashoffset="-94" transform="rotate(-90 40 40)"/>
              <circle cx="40" cy="40" r="30" fill="none" stroke="#A89BC0" strokeWidth="16" strokeDasharray="38 188" strokeDashoffset="-150" transform="rotate(-90 40 40)"/>
            </svg>
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-[#8FAF8A]"></div>
                  <span className="text-[11px] text-[var(--color-text)]">Estudio</span>
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-text)]">50%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-[#7AADAA]"></div>
                  <span className="text-[11px] text-[var(--color-text)]">Proyectos</span>
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-text)]">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-[#A89BC0]"></div>
                  <span className="text-[11px] text-[var(--color-text)]">Personal</span>
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-text)]">20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;