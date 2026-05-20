import { useState } from 'react';
import Icon from '../../../components/icons';
import DatePicker from '../../../components/DatePicker';

const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [priority, setPriority] = useState('med');
  const [deadline, setDeadline] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      project: project.trim() || undefined,
      priority,
      deadline: deadline.trim() || undefined,
    });
    setTitle('');
    setProject('');
    setPriority('med');
    setDeadline('');
    onClose();
  };

  const priorities = [
    { key: 'low', label: 'Baja', color: 'var(--color-primary)', bg: 'var(--color-primary-pale)', border: 'var(--color-primary-light)' },
    { key: 'med', label: 'Media', color: '#A89BC0', bg: '#EEE9F5', border: '#CFC7E0' },
    { key: 'high', label: 'Alta', color: '#D4A898', bg: '#F8EDE9', border: '#E8C8BC' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#FDFAF5] rounded-t-3xl p-5 pb-8 shadow-2xl animate-[slideUp_0.3s_ease-out] max-h-[85vh] overflow-y-auto">
        {/* Handle */}
        <div className="w-9 h-1 bg-[#EDE6D8] rounded-full mx-auto mb-5 sticky top-0"></div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-[#5A5550] mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
          Nueva tarea
        </h2>

        {/* Task title input */}
        <div className="mb-3">
          <label className="text-[11px] font-semibold text-[#8A847C] uppercase tracking-wider mb-1.5 block">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            className="w-full py-3 px-4 rounded-2xl text-sm text-[#5A5550] outline-none border-2 border-transparent focus:border-[var(--color-primary-light)] transition-colors"
            style={{ background: 'var(--color-background)', fontFamily: 'Nunito Sans, sans-serif' }}
            autoFocus
          />
        </div>

        {/* Project input */}
        <div className="mb-3">
          <label className="text-[11px] font-semibold text-[#8A847C] uppercase tracking-wider mb-1.5 block">Proyecto (opcional)</label>
          <input
            type="text"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Ej: Dashboard SENATI"
            className="w-full py-3 px-4 rounded-2xl text-sm text-[#5A5550] outline-none border-2 border-transparent focus:border-[var(--color-primary-light)] transition-colors"
            style={{ background: 'var(--color-background)', fontFamily: 'Nunito Sans, sans-serif' }}
          />
        </div>

        {/* Deadline input */}
        <DatePicker 
          value={deadline} 
          onChange={setDeadline} 
          label="Fecha límite (opcional)" 
        />

        {/* Priority */}
        <div className="mb-5">
          <label className="text-[11px] font-semibold text-[#8A847C] uppercase tracking-wider mb-2 block">Prioridad</label>
          <div className="flex gap-2">
            {priorities.map((p) => (
              <button
                key={p.key}
                onClick={() => setPriority(p.key)}
                className="flex-1 py-2.5 rounded-xl text-[11px] font-semibold text-center border-[1.5px] transition-all"
                style={{
                  background: priority === p.key ? p.bg : '#FDFAF5',
                  borderColor: priority === p.key ? p.border : 'rgba(168,137,108,0.15)',
                  color: priority === p.key ? p.color : '#8A847C',
                  transform: priority === p.key ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-[#8A847C] border border-[rgba(168,137,108,0.15)]"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40 transition-opacity"
            style={{ background: 'var(--color-primary)' }}
          >
            <Icon name="plus" size={16} color="white" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;