import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_TASKS = [
  { id: '1', title: 'Diseño UI — Módulo de tareas', project: 'Dashboard SENATI', priority: 'high', status: 'pending', deadline: '2026-05-20', estimate: '2h est.', progress: 40, createdAt: '2026-05-18' },
  { id: '2', title: 'Reunión con equipo de QR', project: 'Asistencia Facial', priority: 'high', status: 'pending', deadline: '2026-05-21', createdAt: '2026-05-18' },
  { id: '3', title: 'Revisar migraciones PostgreSQL', project: 'Django Backend', priority: 'med', status: 'pending', deadline: '2026-05-22', createdAt: '2026-05-17' },
  { id: '4', title: 'Estudiar Arduino — Sensores', project: 'Tarea SENATI · Electrónica', priority: 'med', status: 'pending', createdAt: '2026-05-17' },
  { id: '5', title: 'Configurar entorno Django', priority: 'low', status: 'completed', deadline: '2026-05-18', createdAt: '2026-05-16' },
  { id: '6', title: 'Commit — módulo usuarios', priority: 'high', status: 'completed', deadline: '2026-05-18', createdAt: '2026-05-16' },
];

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: INITIAL_TASKS,

      addTask: (task) => {
        const newTask = {
          id: Date.now().toString(),
          status: 'pending',
          progress: 0,
          createdAt: new Date().toISOString().split('T')[0],
          ...task,
        };
        set({ tasks: [newTask, ...get().tasks] });
      },

      toggleTask: (id) => {
        set({
          tasks: get().tasks.map((t) =>
            t.id === id
              ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
              : t
          ),
        });
      },

      deleteTask: (id) => {
        set({ tasks: get().tasks.filter((t) => t.id !== id) });
      },

      updateTask: (id, updates) => {
        set({
          tasks: get().tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        });
      },

      // Getters
      getPendingTasks: () => get().tasks.filter((t) => t.status === 'pending'),
      getCompletedTasks: () => get().tasks.filter((t) => t.status === 'completed'),
      getHighPriority: () => get().tasks.filter((t) => t.priority === 'high' && t.status === 'pending'),
      getMedPriority: () => get().tasks.filter((t) => t.priority === 'med' && t.status === 'pending'),
      getTaskCount: () => ({
        pending: get().tasks.filter((t) => t.status === 'pending').length,
        completed: get().tasks.filter((t) => t.status === 'completed').length,
        total: get().tasks.length,
      }),

      getTasksByDate: (date) => get().tasks.filter((t) => t.deadline === date),
      getDatesWithTasks: () => [...new Set(get().tasks.filter(t => t.deadline).map(t => t.deadline))],
    }),
    { name: 'task-storage' }
  )
);

export default useTaskStore;