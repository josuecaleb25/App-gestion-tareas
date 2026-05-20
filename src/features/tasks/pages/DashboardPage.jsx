import Icon from '../../../components/icons';
import { useAuth } from '../../auth/hooks/useAuth';
import { useThemeColors } from '../../../hooks/useTheme';
import useTaskStore from '../../../store/taskStore';

const ProgressRing = ({ percentage, color, value, subtitle, label }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className="flex-1 bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-sm p-3.5 flex flex-col items-center gap-1.5">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#EDE6D8" strokeWidth="6"/>
        <circle 
          cx="36" cy="36" r={radius} fill="none" 
          stroke={color} strokeWidth="6" 
          strokeDasharray={strokeDasharray}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round" 
          transform="rotate(-90 36 36)"
        />
        <text x="36" y="33" textAnchor="middle" fill="#5A5550" fontFamily="Fredoka,sans-serif" fontSize="11" fontWeight="600">{value}</text>
        <text x="36" y="44" textAnchor="middle" fill="#8A847C" fontFamily="Nunito Sans,sans-serif" fontSize="7">{subtitle}</text>
      </svg>
      <span className="text-[11px] font-medium text-[#8A847C] text-center" style={{ fontFamily: 'Fredoka, sans-serif' }}>{label}</span>
    </div>
  );
};

const TaskItem = ({ done, name, priority, onToggle }) => {
  const tagStyles = {
    high: 'bg-[#F8EDE9] text-[#D4A898] border-[#E8C8BC]',
    med: 'bg-[#EEE9F5] text-[#A89BC0] border-[#CFC7E0]',
    low: 'bg-[var(--color-primary-pale)] text-[var(--color-primary)] border-[var(--color-primary-light)]',
  };
  const tagLabels = { high: 'Alta', med: 'Media', low: 'Baja' };

  return (
    <div className="flex items-center gap-2.5 py-2.5 border-b border-[rgba(168,137,108,0.15)] last:border-b-0">
      <button 
        onClick={onToggle}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0`}
        style={done ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : { borderColor: 'var(--color-primary-light)' }}
      >
        {done && <Icon name="check" size={10} color="white" />}
      </button>
      <span className={`flex-1 text-[13px] font-medium ${done ? 'line-through text-[#8A847C]' : 'text-[#5A5550]'}`}>
        {name}
      </span>
      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${tagStyles[priority]}`}>
        {tagLabels[priority]}
      </span>
    </div>
  );
};

const DashboardPage = () => {
  const { user } = useAuth();
  const theme = useThemeColors();
  const { tasks, toggleTask, getTaskCount } = useTaskStore();
  const counts = getTaskCount();
  const recentTasks = tasks.slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Scroll content */}
      <div className="px-4 pb-24 pt-6">
        {/* Greeting */}
        <div className="py-2 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[22px] font-semibold text-[#5A5550] leading-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                Buenos días, {user?.name || 'Josue'}
              </h1>
              <p className="text-xs text-[#8A847C] mt-0.5">Lunes, 18 de mayo · 2026</p>
            </div>
            <div className="flex gap-2 items-center">
              <button 
                onClick={() => window.location.href = '/search'}
                className="w-8 h-8 rounded-[10px] bg-[#FDFAF5] border border-[rgba(168,137,108,0.15)] flex items-center justify-center shadow-sm"
              >
                <Icon name="search" size={14} color="#8A847C" />
              </button>
              <button className="w-8 h-8 rounded-[10px] bg-[#FDFAF5] border border-[rgba(168,137,108,0.15)] flex items-center justify-center shadow-sm">
                <Icon name="bell" size={14} color="#8A847C" />
              </button>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-semibold text-white border-2 border-white shadow-md" style={{ fontFamily: 'Fredoka, sans-serif', background: `linear-gradient(135deg, ${theme.primaryLight}, ${theme.primary})` }}>
                {user?.name?.charAt(0) || 'J'}S
              </div>
            </div>
          </div>
        </div>

        {/* Motivational */}
        <div className="bg-gradient-to-r from-[#EEF5EC] to-[#EEE9F5] border border-[#CFC7E0] rounded-2xl p-3 px-3.5 mb-3 relative overflow-hidden">
          <div className="absolute -right-2.5 -top-2.5 w-[60px] h-[60px] rounded-full bg-[#EEE9F5] opacity-60"></div>
          <p className="text-xs italic text-[#A89BC0] leading-relaxed relative z-10">
            "El progreso, no la perfección, es lo que importa en el camino."
          </p>
          <p className="text-[11px] text-[#8A847C] mt-1 font-semibold">— Frase del día</p>
        </div>

        {/* Weather */}
        <div className="bg-gradient-to-br from-[#E8F4F3] to-[#EEF5EC] border border-[#B8D9D7] rounded-2xl p-3.5 px-4 mb-3 flex justify-between items-center">
          <div>
            <div className="text-[28px] font-semibold text-[#7AADAA]" style={{ fontFamily: 'Fredoka, sans-serif' }}>22°C</div>
            <div className="text-xs text-[#7AADAA] font-semibold mt-0.5">Parcialmente nublado</div>
            <div className="text-[11px] text-[#8A847C] mt-0.5">Lima, Perú · Buena jornada</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[rgba(122,173,170,0.2)] flex items-center justify-center">
            <Icon name="cloud" size={22} color="#7AADAA" />
          </div>
        </div>

        {/* Progress Rings */}
        <div className="flex gap-2.5 mb-3">
          <ProgressRing percentage={72} color={theme.primary} value="72%" subtitle="hoy" label="Productividad" />
          <ProgressRing percentage={Math.round((counts.completed / counts.total) * 100)} color="#A8896C" value={`${counts.completed}/${counts.total}`} subtitle="tareas" label="Tareas" />
          <ProgressRing percentage={50} color="#A89BC0" value="7" subtitle="racha" label="Racha" />
        </div>

        {/* Tasks section */}
        <div className="flex items-center gap-1.5 mt-4 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: theme.primary }}></div>
          <span className="text-sm font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Próximas tareas</span>
        </div>
        <div className="bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-sm p-3.5 mb-3">
          {recentTasks.map(task => (
            <TaskItem key={task.id} done={task.status === 'completed'} name={task.title} priority={task.priority} onToggle={() => toggleTask(task.id)} />
          ))}
        </div>

        {/* Focus tree */}
        <div className="flex items-center gap-1.5 mt-4 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A8896C]"></div>
          <span className="text-sm font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Árbol de enfoque</span>
        </div>
        <div className="bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-sm p-4 text-center">
          <Icon name="tree" size={48} color={theme.primary} className="mx-auto mb-2" />
          <div className="text-[13px] font-semibold" style={{ fontFamily: 'Fredoka, sans-serif', color: theme.primary }}>Tu árbol creció hoy</div>
          <div className="text-[11px] text-[#8A847C] mt-1">3h 20min de enfoque · Nivel 7</div>
          <div className="bg-[#EDE6D8] rounded-[10px] h-1.5 mt-2.5 overflow-hidden">
            <div className="h-full w-[68%] rounded-[10px]" style={{ background: `linear-gradient(90deg, ${theme.primaryLight}, ${theme.primary})` }}></div>
          </div>
          <div className="text-[10px] text-[#8A847C] mt-1">68% para siguiente nivel</div>
          <button 
            onClick={() => window.location.href = '/focus'}
            className="mt-3 px-5 py-2 text-white text-xs font-semibold rounded-full shadow-sm hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'Fredoka, sans-serif', background: theme.primary }}
          >
            Iniciar sesión de enfoque
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;