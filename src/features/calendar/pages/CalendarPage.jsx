import Icon from '../../../components/icons';

const DAYS_HEADER = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

const calendarDays = [
  { day: 28, otherMonth: true }, { day: 29, otherMonth: true }, { day: 30, otherMonth: true },
  { day: 1, otherMonth: true }, { day: 2, hasEvent: true }, { day: 3 }, { day: 4 },
  { day: 5 }, { day: 6, hasEvent: true }, { day: 7 }, { day: 8, hasEvent: true },
  { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 },
  { day: 14 }, { day: 15, hasEvent: true }, { day: 16 }, { day: 17 },
  { day: 18, today: true }, { day: 19 }, { day: 20 }, { day: 21, hasEvent: true },
  { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 },
  { day: 27 }, { day: 28 }, { day: 29 }, { day: 30, hasEvent: true },
  { day: 31 }, { day: 1, otherMonth: true },
];

const timelineEvents = [
  { time: '09:00', title: 'Standup del equipo', subtitle: 'Daily meeting · 15min · Google Meet', color: '#8FAF8A' },
  { time: '11:30', title: 'Entrega reporte SENATI', subtitle: 'Tarea · Sistemas embebidos', color: '#A89BC0' },
  { time: '15:00', title: 'Sesión Pomodoro — Django', subtitle: 'Focus · 2h estimado', color: '#7AADAA' },
];

const heatmapData = [2, 3, 1, 3, 2, 0, 0, 1, 2, 3, 3, 2, 0, 1, 3, 2, 1, 2, 3, 0, 0];

const CalendarPage = () => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Content */}
      <div className="px-4 pb-24 pt-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-3.5">
          <h1 className="text-xl font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Mayo 2026</h1>
          <div className="flex gap-1.5">
            <button className="text-[10px] px-3 py-1.5 rounded-full text-white font-semibold" style={{ background: 'var(--color-primary)' }}>Mes</button>
            <button className="text-[10px] px-3 py-1.5 rounded-full bg-[#FDFAF5] border border-[rgba(168,137,108,0.15)] text-[#8A847C]">Semana</button>
            <button className="text-[10px] px-3 py-1.5 rounded-full bg-[#FDFAF5] border border-[rgba(168,137,108,0.15)] text-[#8A847C]">Día</button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="bg-[#FDFAF5] rounded-2xl border border-[rgba(168,137,108,0.15)] shadow-sm p-3.5 mb-3.5">
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {DAYS_HEADER.map((d) => (
              <div key={d} className="text-center text-[10px] font-bold text-[#8A847C] uppercase tracking-wider py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {calendarDays.map((item, i) => (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center text-[11px] rounded-full relative cursor-pointer font-medium ${
                  item.otherMonth ? 'text-[#8A847C] opacity-40' :
                  'text-[#5A5550]'
                }`}
                style={item.today ? { background: 'var(--color-primary)', color: 'white', fontWeight: 700 } : {}}
              >
                {item.day}
                {item.hasEvent && !item.today && (
                  <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#D4A898]"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Agenda */}
        <div className="flex items-center gap-1.5 mt-4 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }}></div>
          <span className="text-sm font-semibold text-[#5A5550]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Agenda — Hoy 18 mayo</span>
        </div>

        {/* Timeline */}
        {timelineEvents.map((event, i) => (
          <div key={i} className="flex gap-3 mb-3.5 items-start">
            <div className="text-[11px] text-[#8A847C] font-semibold min-w-[36px] text-right pt-2.5">{event.time}</div>
            <div className="flex flex-col items-center pt-2.5">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: event.color }}></div>
              {i < timelineEvents.length - 1 && <div className="w-[1.5px] bg-[rgba(168,137,108,0.15)] flex-1 min-h-[30px] mt-1"></div>}
            </div>
            <div className="flex-1 bg-[#FDFAF5] rounded-[10px] border border-[rgba(168,137,108,0.15)] shadow-sm p-2.5 px-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-[10px]" style={{ background: event.color }}></div>
              <div className="text-xs font-semibold text-[#5A5550] pl-1.5">{event.title}</div>
              <div className="text-[10px] text-[#8A847C] pl-1.5 mt-0.5">{event.subtitle}</div>
            </div>
          </div>
        ))}

        {/* Heatmap */}
        <div className="border border-[var(--color-primary-light)] rounded-2xl p-3.5 flex items-center gap-2.5 mt-2" style={{ background: 'var(--color-primary-pale)' }}>
          <Icon name="flame" size={20} color="var(--color-primary)" />
          <div>
            <div className="text-[11px] font-semibold" style={{ color: 'var(--color-primary)' }}>Heatmap de productividad</div>
            <div className="flex gap-[3px] mt-1.5 flex-wrap">
              {heatmapData.map((level, i) => {
                const colors = ['#EDE6D8', '#EEF5EC', '#C8DFC4', '#8FAF8A'];
                return (
                  <div
                    key={i}
                    className="w-5 h-5 rounded"
                    style={{ 
                      background: colors[level],
                      border: level > 0 ? `1px solid ${level === 1 ? '#C8DFC4' : 'transparent'}` : 'none'
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;