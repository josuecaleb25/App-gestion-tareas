import Icon from '../../../components/icons';

const CategoryPill = ({ label, active, color, bgColor, borderColor }) => (
  <button className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold border-[1.5px] whitespace-nowrap transition-all ${
    active 
      ? 'text-white' 
      : ''
  }`} style={active ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : { color, background: bgColor, borderColor }}>
    {label}
  </button>
);

const TaskCard = ({ title, project, priority, deadline, estimate, progress, notes, subtasks }) => {
  const priorityStyles = {
    high: { bg: '#F8EDE9', color: '#D4A898', border: '#E8C8BC', label: 'Alta' },
    med: { bg: '#EEE9F5', color: '#A89BC0', border: '#CFC7E0', label: 'Media' },
    low: { bg: '#EEF5EC', color: '#8FAF8A', border: '#C8DFC4', label: 'Baja' },
  };
  const p = priorityStyles[priority];

  return (
    <div className="bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-sm p-4 mb-2.5">
      <div className="flex items-start gap-2.5">
        <button className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors" style={{ borderColor: 'var(--color-primary-light)' }}></button>
        <div className="flex-1">
          <div className="text-[13px] font-semibold text-[#5A5550]">{title}</div>
          {project && <div className="text-[10px] text-[#8A847C] mt-0.5">{project}</div>}
          
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border" style={{ background: p.bg, color: p.color, borderColor: p.border }}>
              {p.label}
            </span>
            {deadline && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1" style={{ background: '#F2ECE3', color: '#A8896C', borderColor: '#D4BFA0' }}>
                <Icon name="clock" size={10} color="#A8896C" />
                {deadline}
              </span>
            )}
            {estimate && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1" style={{ background: '#E8F4F3', color: '#7AADAA', borderColor: '#B8D9D7' }}>
                <Icon name="target" size={10} color="#7AADAA" />
                {estimate}
              </span>
            )}
          </div>

          {progress !== undefined && (
            <>
              <div className="bg-[#EDE6D8] rounded-md h-1 mt-2 overflow-hidden">
                <div className="h-full bg-[#D4A898] rounded-md" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-[9px] text-[#8A847C] mt-1">{progress}% completado</div>
            </>
          )}
        </div>
      </div>

      {(notes || subtasks) && (
        <div className="border-t border-[rgba(168,137,108,0.15)] mt-2.5 pt-2 flex gap-3">
          {notes && (
            <div className="text-[10px] text-[#8A847C] flex items-center gap-1">
              <Icon name="message" size={12} color="#8A847C" />
              {notes} notas
            </div>
          )}
          {subtasks && (
            <div className="text-[10px] text-[#8A847C] flex items-center gap-1">
              <Icon name="tasks" size={12} color="#8A847C" />
              {subtasks} subtareas
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SimpleTaskItem = ({ done, title, project, priority }) => {
  const priorityStyles = {
    high: { bg: '#F8EDE9', color: '#D4A898', border: '#E8C8BC', label: 'Alta' },
    med: { bg: '#EEE9F5', color: '#A89BC0', border: '#CFC7E0', label: 'Media' },
    low: { bg: '#EEF5EC', color: '#8FAF8A', border: '#C8DFC4', label: 'Baja' },
  };
  const p = priorityStyles[priority];

  return (
    <div className="flex items-center gap-2.5 py-2.5 border-b border-[rgba(168,137,108,0.15)] last:border-b-0">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0`}
        style={done ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : { borderColor: 'var(--color-primary-light)' }}
      >
        {done && <Icon name="check" size={10} color="white" />}
      </div>
      <div className="flex-1">
        <div className={`text-[13px] font-medium ${done ? 'line-through text-[#8A847C]' : 'text-[#5A5550]'}`}>{title}</div>
        {project && <div className="text-[10px] text-[#8A847C] mt-0.5">{project}</div>}
      </div>
      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border" style={{ background: p.bg, color: p.color, borderColor: p.border }}>
        {p.label}
      </span>
    </div>
  );
};

const TasksPage = () => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-5 rounded-b-3xl mb-2" style={{ background: `linear-gradient(160deg, var(--color-primary-pale), var(--color-background))` }}>
        <div className="flex justify-between items-center mb-3.5">
          <div>
            <h1 className="text-xl font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Mis Tareas</h1>
            <p className="text-[11px] text-[#8A847C]">4 pendientes · 2 completadas</p>
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-[10px] bg-[#FDFAF5] border border-[rgba(168,137,108,0.15)] flex items-center justify-center shadow-sm">
              <Icon name="filter" size={14} color="#8A847C" />
            </button>
            <button className="w-8 h-8 rounded-[10px] bg-[#FDFAF5] border border-[rgba(168,137,108,0.15)] flex items-center justify-center shadow-sm">
              <Icon name="dots" size={14} color="#8A847C" />
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <CategoryPill label="Todas" active={true} />
          <CategoryPill label="Alta prioridad" color="#D4A898" bgColor="#F8EDE9" borderColor="#E8C8BC" />
          <CategoryPill label="Proyectos" color="#8A847C" bgColor="#FDFAF5" borderColor="rgba(168,137,108,0.15)" />
          <CategoryPill label="Hoy" color="#8A847C" bgColor="#FDFAF5" borderColor="rgba(168,137,108,0.15)" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-24 overflow-y-auto">
        {/* Alta prioridad */}
        <div className="flex items-center gap-1.5 mt-4 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4A898]"></div>
          <span className="text-sm font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Alta prioridad</span>
        </div>

        <TaskCard 
          title="Diseño UI — Módulo de tareas"
          project="Proyecto: Dashboard SENATI"
          priority="high"
          deadline="Hoy 18:00"
          estimate="2h est."
          progress={40}
          notes={2}
          subtasks="3/5"
        />

        <TaskCard 
          title="Reunión con equipo de QR"
          project="Proyecto: Asistencia Facial"
          priority="high"
          deadline="Mañana"
        />

        {/* Media prioridad */}
        <div className="flex items-center gap-1.5 mt-4 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A89BC0]"></div>
          <span className="text-sm font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Prioridad media</span>
        </div>

        <div className="bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-sm p-4 mb-2.5">
          <SimpleTaskItem title="Revisar migraciones PostgreSQL" project="Proyecto: Django Backend" priority="med" />
          <SimpleTaskItem title="Estudiar Arduino — Sensores" project="Tarea SENATI · Electrónica" priority="med" />
        </div>

        {/* Completadas */}
        <div className="flex items-center gap-1.5 mt-4 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }}></div>
          <span className="text-sm font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Completadas</span>
        </div>

        <div className="bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-sm p-4">
          <SimpleTaskItem done={true} title="Configurar entorno Django" priority="low" />
          <SimpleTaskItem done={true} title="Commit — módulo usuarios" priority="high" />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;