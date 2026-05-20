import { useState } from 'react';
import Icon from './icons';

const DAYS_HEADER = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  
  const days = [];
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, otherMonth: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, otherMonth: false });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, otherMonth: true });
  }
  return days;
}

function formatDate(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const DatePicker = ({ value, onChange, label = 'Fecha límite (opcional)' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
  const calendarDays = getCalendarDays(viewYear, viewMonth);

  const handleSelect = (day, otherMonth) => {
    if (otherMonth) return;
    const dateStr = formatDate(viewYear, viewMonth, day);
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
  };

  const handleToday = () => {
    onChange(todayStr);
    setIsOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const displayValue = value 
    ? new Date(value + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="mb-4">
      <label className="text-[11px] font-semibold text-[#8A847C] uppercase tracking-wider mb-1.5 block">{label}</label>
      
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 rounded-2xl text-sm text-left outline-none border-2 transition-colors flex items-center justify-between"
        style={{ 
          background: 'var(--color-background)', 
          fontFamily: 'Nunito Sans, sans-serif',
          borderColor: isOpen ? 'var(--color-primary-light)' : 'transparent',
          color: value ? '#5A5550' : '#8A847C',
        }}
      >
        {displayValue || 'Seleccionar fecha'}
        <Icon name="calendar" size={16} color="#8A847C" />
      </button>

      {/* Quick options */}
      {isOpen && (
        <div className="mt-2 z-50">
          <div className="bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-lg p-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            
            {/* Quick buttons */}
            <div className="flex gap-2 mb-3">
              <button onClick={handleToday} className="flex-1 py-2 rounded-xl text-[11px] font-semibold transition-all" style={{ background: 'var(--color-primary-pale)', color: 'var(--color-primary)' }}>
                Hoy
              </button>
              <button 
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  onChange(formatDate(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()));
                  setIsOpen(false);
                }}
                className="flex-1 py-2 rounded-xl text-[11px] font-semibold border border-[rgba(168,137,108,0.15)] text-[#8A847C]"
              >
                Mañana
              </button>
              <button 
                onClick={() => {
                  const nextWeek = new Date();
                  nextWeek.setDate(nextWeek.getDate() + 7);
                  onChange(formatDate(nextWeek.getFullYear(), nextWeek.getMonth(), nextWeek.getDate()));
                  setIsOpen(false);
                }}
                className="flex-1 py-2 rounded-xl text-[11px] font-semibold border border-[rgba(168,137,108,0.15)] text-[#8A847C]"
              >
                En 1 semana
              </button>
            </div>

            {/* Month navigation */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <div className="flex gap-1">
                <button onClick={prevMonth} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--color-primary-pale)] transition-colors">
                  <Icon name="arrowLeft" size={12} color="#8A847C" />
                </button>
                <button onClick={nextMonth} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--color-primary-pale)] transition-colors">
                  <Icon name="arrowRight" size={12} color="#8A847C" />
                </button>
              </div>
            </div>

            {/* Days header */}
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {DAYS_HEADER.map((d) => (
                <div key={d} className="text-center text-[9px] font-bold text-[#8A847C] uppercase py-1">{d}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {calendarDays.map((item, i) => {
                if (item.otherMonth) {
                  return <div key={i} className="aspect-square"></div>;
                }
                
                const dateStr = formatDate(viewYear, viewMonth, item.day);
                const isSelected = dateStr === value;
                const isToday = dateStr === todayStr;

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(item.day, item.otherMonth)}
                    className="aspect-square flex items-center justify-center text-[11px] rounded-full font-medium transition-all"
                    style={{
                      background: isSelected ? 'var(--color-primary)' : 'transparent',
                      color: isSelected ? 'white' : '#5A5550',
                      fontWeight: isSelected ? 700 : isToday ? 600 : 400,
                      border: isToday && !isSelected ? '1.5px solid var(--color-primary-light)' : '1.5px solid transparent',
                    }}
                  >
                    {item.day}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex justify-between mt-3 pt-2 border-t border-[rgba(168,137,108,0.1)]">
              <button onClick={handleClear} className="text-[11px] font-semibold" style={{ color: 'var(--color-primary)' }}>
                Sin fecha
              </button>
              <button onClick={() => setIsOpen(false)} className="text-[11px] font-semibold text-[#8A847C]">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;