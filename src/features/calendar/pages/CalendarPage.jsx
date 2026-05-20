import { useState } from 'react';
import Icon from '../../../components/icons';
import useTaskStore from '../../../store/taskStore';

const DAYS_HEADER = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  // Adjust for Monday start (0=Mon, 6=Sun)
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  
  const days = [];
  
  // Previous month days
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, otherMonth: true });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, otherMonth: false });
  }
  
  // Next month days to fill grid
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, otherMonth: true });
  }
  
  return days;
}

function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
}

const CalendarPage = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(formatDate(today.getFullYear(), today.getMonth(), today.getDate()));
  
  const { getTasksByDate, getDatesWithTasks, toggleTask } = useTaskStore();
  
  const calendarDays = getCalendarDays(currentYear, currentMonth);
  const datesWithTasks = getDatesWithTasks();
  const selectedTasks = getTasksByDate(selectedDate);
  
  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day, otherMonth) => {
    if (otherMonth) return;
    setSelectedDate(formatDate(currentYear, currentMonth, day));
  };

  const priorityStyles = {
    high: { color: '#D4A898', bg: '#F8EDE9', border: '#E8C8BC' },
    med: { color: '#A89BC0', bg: '#EEE9F5', border: '#CFC7E0' },
    low: { color: 'var(--color-primary)', bg: 'var(--color-primary-pale)', border: 'var(--color-primary-light)' },
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Content */}
      <div className="px-4 pb-24 pt-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-3.5">
          <h1 className="text-xl font-semibold text-[var(--color-text)]" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            {MONTHS[currentMonth]} {currentYear}
          </h1>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="w-8 h-8 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center shadow-sm">
              <Icon name="arrowLeft" size={14} color="#8A847C" />
            </button>
            <button onClick={nextMonth} className="w-8 h-8 rounded-full bg-[var(--color-card)] border border-[var(--color-border)] flex items-center justify-center shadow-sm">
              <Icon name="arrowRight" size={14} color="#8A847C" />
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-3.5 mb-4">
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {DAYS_HEADER.map((d) => (
              <div key={d} className="text-center text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {calendarDays.map((item, i) => {
              const dateStr = !item.otherMonth ? formatDate(currentYear, currentMonth, item.day) : '';
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDate;
              const hasTask = datesWithTasks.includes(dateStr);

              return (
                <button
                  key={i}
                  onClick={() => handleDayClick(item.day, item.otherMonth)}
                  className="aspect-square flex items-center justify-center text-[11px] rounded-full relative font-medium transition-all"
                  style={{
                    background: isSelected ? 'var(--color-primary)' : isToday ? 'var(--color-primary-pale)' : 'transparent',
                    color: isSelected ? 'white' : item.otherMonth ? '#8A847C' : '#5A5550',
                    opacity: item.otherMonth ? 0.4 : 1,
                    fontWeight: isToday || isSelected ? 700 : 500,
                  }}
                >
                  {item.day}
                  {hasTask && !isSelected && (
                    <div className="absolute bottom-0.5 w-1 h-1 rounded-full" style={{ background: 'var(--color-primary)' }}></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Agenda for selected day */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }}></div>
          <span className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            {selectedDate === todayStr ? 'Hoy' : formatDisplayDate(selectedDate)}
          </span>
        </div>

        {selectedTasks.length === 0 ? (
          <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-6 text-center">
            <Icon name="calendar" size={32} color="#8A847C" className="mx-auto mb-2 opacity-40" />
            <p className="text-sm text-[var(--color-text-muted)]">No hay tareas para este día</p>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-1 opacity-60">Agrega una tarea con fecha desde la sección de Tareas</p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedTasks.map((task) => {
              const p = priorityStyles[task.priority];
              const done = task.status === 'completed';
              return (
                <div key={task.id} className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-3.5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl" style={{ background: p.color }}></div>
                  <div className="flex items-center gap-2.5 pl-2">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                      style={done ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : { borderColor: 'var(--color-primary-light)' }}
                    >
                      {done && <Icon name="check" size={10} color="white" />}
                    </button>
                    <div className="flex-1">
                      <div className={`text-[13px] font-semibold ${done ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text)]'}`}>{task.title}</div>
                      {task.project && <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{task.project}</div>}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border" style={{ background: p.bg, color: p.color, borderColor: p.border }}>
                      {task.priority === 'high' ? 'Alta' : task.priority === 'med' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;