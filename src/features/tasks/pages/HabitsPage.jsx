import Icon from '../../../components/icons';

const moods = [
  { icon: 'moon', label: 'Cansado', color: '#8A847C' },
  { icon: 'cloud', label: 'Neutral', color: '#8A847C' },
  { icon: 'sun', label: 'Bien', color: '#8FAF8A', active: true },
  { icon: 'zap', label: 'Genial', color: '#8A847C' },
  { icon: 'flame', label: 'Ansioso', color: '#8A847C' },
];

const habits = [
  { name: 'Meditación', icon: 'leaf', streak: 7, color: '#8FAF8A', dots: [1,1,1,1,1,1,1] },
  { name: 'Leer 20min', icon: 'bookmark', streak: 5, color: '#7AADAA', dots: [1,1,0,1,1,1,1] },
  { name: 'Tomar agua', icon: 'droplet', streak: 12, color: '#A8896C', dots: [1,1,1,1,1,1,1] },
  { name: 'Ejercicio', icon: 'zap', streak: 2, color: '#A89BC0', dots: [1,0,1,0,0,0,0] },
  { name: 'Diario', icon: 'edit', streak: 3, color: '#D4A898', dots: [1,1,1,0,0,0,0] },
];

const energyBars = [
  { day: 'Lu', height: 50, color: '#C8DFC4' },
  { day: 'Ma', height: 70, color: '#C8DFC4' },
  { day: 'Mi', height: 90, color: '#8FAF8A' },
  { day: 'Ju', height: 100, color: '#7AADAA' },
  { day: 'Vi', height: 80, color: '#B8D9D7' },
  { day: 'Sá', height: 40, color: '#EDE6D8' },
  { day: 'Do', height: 30, color: '#EDE6D8' },
];

const HabitCard = ({ name, icon, streak, color, dots }) => (
  <div className="bg-[#FDFAF5] rounded-[10px] border border-[rgba(168,137,108,0.15)] shadow-sm p-3" style={{ borderLeft: `3px solid ${color}` }}>
    <Icon name={icon} size={18} color={color} className="mb-1.5" />
    <div className="text-[11px] font-semibold text-[#5A5550] mb-1">{name}</div>
    <div className="text-[10px] text-[#A8896C] font-medium flex items-center gap-1">
      <Icon name="flame" size={10} color="#A8896C" />
      {streak} días{streak > 3 ? ' seguidos' : ''}
    </div>
    <div className="flex gap-[3px] mt-1.5">
      {dots.map((d, i) => (
        <div key={i} className="w-2 h-2 rounded-sm" style={{ background: d ? 'var(--color-primary)' : '#EDE6D8' }}></div>
      ))}
    </div>
  </div>
);

const HabitsPage = () => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-5 rounded-b-3xl mb-2" style={{ background: `linear-gradient(160deg, var(--color-primary-pale), var(--color-background))` }}>
        <h1 className="text-xl font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Seguimiento de Hábitos</h1>
        <p className="text-[11px] text-[#8A847C]">5/7 hábitos completados hoy</p>
      </div>

      {/* Content */}
      <div className="px-4 pb-24">
        {/* Mood */}
        <div className="flex items-center gap-1.5 mt-3 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A89BC0]"></div>
          <span className="text-sm font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Estado de ánimo hoy</span>
        </div>
        <div className="bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-sm p-3.5 mb-3">
          <p className="text-[11px] text-[#8A847C] mb-2">¿Cómo te sientes?</p>
          <div className="flex gap-2 justify-center">
            {moods.map((mood, i) => (
              <button 
                key={i} 
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all`}
                style={mood.active ? { background: 'var(--color-primary-pale)' } : {}}
              >
                <Icon name={mood.icon} size={24} color={mood.active ? 'var(--color-primary)' : '#8A847C'} />
                <span className="text-[9px] font-semibold uppercase tracking-wider"
                  style={{ color: mood.active ? 'var(--color-primary)' : '#8A847C' }}
                >
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Habits grid */}
        <div className="flex items-center gap-1.5 mt-4 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }}></div>
          <span className="text-sm font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Mis hábitos</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          {habits.map((habit, i) => (
            <HabitCard key={i} {...habit} />
          ))}
          {/* Add new habit */}
          <button className="bg-[#FDFAF5] rounded-[10px] border border-[rgba(168,137,108,0.15)] border-dashed shadow-sm p-3 opacity-60 flex flex-col items-center justify-center gap-1">
            <Icon name="plus" size={22} color="#8A847C" />
            <span className="text-[11px] font-semibold text-[#8A847C]">Nuevo hábito</span>
          </button>
        </div>

        {/* Energy level */}
        <div className="flex items-center gap-1.5 mt-4 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A8896C]"></div>
          <span className="text-sm font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Nivel de energía</span>
        </div>
        <div className="bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-sm p-3.5">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-[#5A5550] font-semibold flex items-center gap-1.5">
              <Icon name="zap" size={12} color="#A8896C" />
              Hoy: Alta energía
            </div>
            <span className="text-[11px] text-[#A8896C] font-semibold">8/10</span>
          </div>
          <div className="flex gap-[3px] items-end h-10">
            {energyBars.map((bar, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${bar.height}%`, background: bar.color }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {energyBars.map((bar, i) => (
              <span key={i} className="text-[9px] text-[#8A847C] flex-1 text-center">{bar.day}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;