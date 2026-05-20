import { useState } from 'react';
import Icon from '../../../components/icons';
import useTaskStore from '../../../store/taskStore';
import AddTaskModal from '../components/AddTaskModal';

const CategoryPill = ({ label, active, color, bgColor, borderColor, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold border-[1.5px] whitespace-nowrap transition-all ${
      active ? 'text-white' : ''
    }`} 
    style={active ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : { color, background: bgColor, borderColor }}
  >
    {label}
  </button>
);

const TaskCard = ({ task, onToggle, onDelete }) => {
  const priorityStyles = {
    high: { bg: '#F8EDE9', color: '#D4A898', border: '#E8C8BC', label: 'Alta' },
    med: { bg: '#EEE9F5', color: '#A89BC0', border: '#CFC7E0', label: 'Media' },
    low: { bg: 'var(--color-primary-pale)', color: 'var(--color-primary)', border: 'var(--color-primary-light)', label: 'Baja' },
  };
  const p = priorityStyles[task.priority];
  const done = task.status === 'completed';

  return (
    <div className="flex items-start gap-2.5 py-3 border-b border-[var(--color-border)] last:border-b-0">
      <button 
        onClick={() => onToggle(task.id)}
        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
        style={done ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : { borderColor: 'var(--color-primary-light)' }}
      >
        {done && <Icon name="check" size={10} color="white" />}
      </button>
      <div className="flex-1">
        <div className={`text-[13px] font-medium ${done ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text)]'}`}>{task.title}</div>
        {task.project && <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{task.project}</div>}
        <div className="flex gap-1.5 mt-1.5 flex-wrap">
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border" style={{ background: p.bg, color: p.color, borderColor: p.border }}>
            {p.label}
          </span>
          {task.deadline && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border flex items-center gap-1" style={{ background: '#F2ECE3', color: '#A8896C', borderColor: '#D4BFA0' }}>
              <Icon name="clock" size={9} color="#A8896C" />
              {task.deadline}
            </span>
          )}
        </div>
      </div>
      <button onClick={() => onDelete(task.id)} className="p-1 opacity-40 hover:opacity-100 transition-opacity">
        <Icon name="trash" size={14} color="#D4A898" />
      </button>
    </div>
  );
};

const TasksPage = () => {
  const { tasks, addTask, toggleTask, deleteTask, getTaskCount } = useTaskStore();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const counts = getTaskCount();

  const filteredTasks = () => {
    switch (filter) {
      case 'high': return tasks.filter(t => t.priority === 'high' && t.status === 'pending');
      case 'today': return tasks.filter(t => t.deadline && t.status === 'pending');
      default: return tasks;
    }
  };

  const pendingHigh = tasks.filter(t => t.priority === 'high' && t.status === 'pending');
  const pendingMed = tasks.filter(t => t.priority === 'med' && t.status === 'pending');
  const pendingLow = tasks.filter(t => t.priority === 'low' && t.status === 'pending');
  const completed = tasks.filter(t => t.status === 'completed');

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-5 rounded-b-3xl mb-2" style={{ background: 'var(--color-card)' }}>
        <div className="flex justify-between items-center mb-3.5">
          <div>
            <h1 className="text-xl font-semibold text-[var(--color-text)]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Mis Tareas</h1>
            <p className="text-[11px] text-[var(--color-text-muted)]">{counts.pending} pendientes · {counts.completed} completadas</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowModal(true)}
              className="w-8 h-8 rounded-[10px] flex items-center justify-center shadow-sm"
              style={{ background: 'var(--color-primary)' }}
            >
              <Icon name="plus" size={14} color="white" />
            </button>
            <button className="w-8 h-8 rounded-[10px] bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center shadow-sm">
              <Icon name="filter" size={14} color="#8A847C" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          <CategoryPill label="Todas" active={filter === 'all'} onClick={() => setFilter('all')} />
          <CategoryPill label="Alta prioridad" active={filter === 'high'} onClick={() => setFilter('high')} color="#D4A898" bgColor="#F8EDE9" borderColor="#E8C8BC" />
          <CategoryPill label="Hoy" active={filter === 'today'} onClick={() => setFilter('today')} color="#8A847C" bgColor="#FDFAF5" borderColor="rgba(168,137,108,0.15)" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-24 overflow-y-auto">
        {filter !== 'all' ? (
          // Filtered view
          <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-4">
            {filteredTasks().length === 0 ? (
              <p className="text-center text-sm text-[var(--color-text-muted)] py-6">No hay tareas en esta categoría</p>
            ) : (
              filteredTasks().map(task => (
                <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
              ))
            )}
          </div>
        ) : (
          // Full view by priority
          <>
            {pendingHigh.length > 0 && (
              <>
                <div className="flex items-center gap-1.5 mt-4 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4A898]"></div>
                  <span className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Alta prioridad</span>
                </div>
                <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-4 mb-2.5">
                  {pendingHigh.map(task => (
                    <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                  ))}
                </div>
              </>
            )}

            {pendingMed.length > 0 && (
              <>
                <div className="flex items-center gap-1.5 mt-4 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#A89BC0]"></div>
                  <span className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Prioridad media</span>
                </div>
                <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-4 mb-2.5">
                  {pendingMed.map(task => (
                    <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                  ))}
                </div>
              </>
            )}

            {pendingLow.length > 0 && (
              <>
                <div className="flex items-center gap-1.5 mt-4 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }}></div>
                  <span className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Prioridad baja</span>
                </div>
                <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-4 mb-2.5">
                  {pendingLow.map(task => (
                    <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                  ))}
                </div>
              </>
            )}

            {completed.length > 0 && (
              <>
                <div className="flex items-center gap-1.5 mt-4 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }}></div>
                  <span className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Completadas</span>
                </div>
                <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-4">
                  {completed.map(task => (
                    <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onAdd={addTask} 
      />
    </div>
  );
};

export default TasksPage;