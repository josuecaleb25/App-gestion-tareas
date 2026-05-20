import Icon from '../../../components/icons';

const categories = [
  { label: 'Todo', active: true },
  { label: 'Tareas' },
  { label: 'Notas' },
  { label: 'Hábitos' },
];

const notes = [
  { title: 'Notas — Django REST', preview: 'Configurar JWT auth, revisar serializers para el módulo de usuarios, endpoints pendientes...', date: 'Hace 2 horas · Proyecto', color: '#8FAF8A' },
  { title: 'Ideas UI — Yape Clone', preview: 'Pantalla de transferencia, animación de confirmación, colores del botón principal, manejo de estado...', date: 'Ayer · Diseño', color: '#A89BC0' },
  { title: 'Arduino — Sensor PIR', preview: 'Código del sistema de estacionamiento, lógica de conteo, pantalla LCD 16x2, librerías necesarias...', date: '18 mayo · Electrónica', color: '#7AADAA' },
];

const exploreCategories = [
  { icon: 'bookmark', label: 'Estudio' },
  { icon: 'target', label: 'Proyectos' },
  { icon: 'leaf', label: 'Hábitos' },
  { icon: 'edit', label: 'Diario' },
];

const SearchPage = () => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <div className="px-4 pt-6 pb-3">

        <h1 className="text-lg font-semibold text-[var(--color-text)] mb-3" style={{ fontFamily: 'Fredoka, sans-serif' }}>Buscar</h1>

        {/* Search input */}
        <div className="flex items-center gap-2.5 bg-[var(--color-card)] border-[1.5px] rounded-[14px] px-3.5 shadow-md" style={{ borderColor: 'var(--color-primary-light)' }}>
          <Icon name="search" size={16} color="#8A847C" />
          <input 
            type="text"
            placeholder="Tareas, notas, hábitos..."
            className="flex-1 py-3 text-sm text-[var(--color-text)] bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
            style={{ fontFamily: 'Nunito Sans, sans-serif' }}
          />
          <Icon name="filter" size={14} color="#8A847C" />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 mt-2.5 pb-1">
          {categories.map((cat, i) => (
            <button 
              key={i}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold border-[1.5px] whitespace-nowrap ${
                cat.active 
                  ? 'text-white' 
                  : 'bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-text-muted)]'
              }`}
              style={cat.active ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-24">
        {/* Recent notes */}
        <div className="flex items-center gap-1.5 mt-3 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A8896C]"></div>
          <span className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Recientes</span>
        </div>

        {notes.map((note, i) => (
          <div key={i} className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] shadow-sm p-3.5 mb-2.5 relative overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl" style={{ background: note.color }}></div>
            <div className="pl-2.5">
              <div className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: 'Fredoka, sans-serif' }}>{note.title}</div>
              <div className="text-[11px] text-[var(--color-text-muted)] leading-relaxed mt-1">{note.preview}</div>
              <div className="text-[10px] text-[var(--color-text-muted)] font-semibold mt-2">{note.date}</div>
            </div>
          </div>
        ))}

        {/* Explore categories */}
        <div className="flex items-center gap-1.5 mt-5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4A898]"></div>
          <span className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: 'Fredoka, sans-serif' }}>Explorar categorías</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {exploreCategories.map((cat, i) => (
            <button key={i} className="bg-[var(--color-card)] rounded-[10px] border border-[var(--color-border)] shadow-sm p-2.5 flex items-center gap-2 hover:bg-[#F5F0E8] transition-colors">
              <Icon name={cat.icon} size={18} color="#5A5550" />
              <span className="text-xs font-semibold text-[var(--color-text)]">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;