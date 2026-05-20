import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/icons';

const FocusPage = () => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(true);
  const [seconds, setSeconds] = useState(24 * 60 + 35); // 24:35
  const [currentSession, setCurrentSession] = useState(2);
  const totalSessions = 4;

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - seconds) / (25 * 60)) * 100;
  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #1E2420 0%, #1A1C1A 100%)' }}>
      
      {/* Background circles */}
      <div className="absolute rounded-full opacity-[0.06]" style={{ width: 300, height: 300, background: '#C8DFC4', top: -100, left: -100 }}></div>
      <div className="absolute rounded-full opacity-[0.06]" style={{ width: 200, height: 200, background: '#B8D9D7', bottom: 100, right: -80 }}></div>

      {/* Status bar */}
      <div className="flex justify-between items-center w-full px-5 pt-6 pb-0 text-[11px] font-semibold text-[#8A9A85]">
      </div>

      {/* Label */}
      <div className="text-[13px] tracking-[0.15em] uppercase font-semibold mt-4 mb-6" style={{ fontFamily: 'Fredoka, sans-serif', color: 'var(--color-primary-light)' }}>
        Modo Enfoque Profundo
      </div>

      {/* Timer ring */}
      <div className="relative w-[200px] h-[200px] mb-6">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10"/>
          <circle 
            cx="100" cy="100" r={radius} fill="none" 
            stroke="var(--color-primary)" strokeWidth="10" 
            strokeDasharray={strokeDasharray}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round" 
            transform="rotate(-90 100 100)"
            opacity="0.85"
          />
          {/* Dot indicator */}
          <circle 
            cx="100" cy="100" r={radius} fill="none" 
            stroke="var(--color-primary-light)" strokeWidth="4" 
            strokeDasharray={`10 ${circumference - 10}`}
            strokeDashoffset={circumference * 0.25 - (progress / 100) * circumference}
            strokeLinecap="round" 
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-[40px] font-semibold text-[#C8DFC4] leading-none" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            {formatTime(seconds)}
          </div>
          <div className="text-[11px] text-[#7A9A75] mt-1">Pomodoro {currentSession}/{totalSessions}</div>
        </div>
      </div>

      {/* Current task */}
      <div className="w-[calc(100%-48px)] bg-[rgba(255,255,255,0.05)] border border-[rgba(200,223,196,0.1)] rounded-2xl px-4 py-3 flex items-center gap-2.5 mb-5">
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--color-primary)' }}></div>
        <span className="flex-1 text-[13px] text-[#B8CEB4] font-medium">Diseño UI — Módulo de tareas</span>
        <span className="text-[10px] text-[#5A6A55] bg-[rgba(143,175,138,0.15)] px-2 py-0.5 rounded-lg font-semibold">Django</span>
      </div>

      {/* Controls */}
      <div className="flex gap-4 items-center mb-6">
        <button className="w-11 h-11 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(200,223,196,0.12)] flex items-center justify-center">
          <Icon name="skipBack" size={16} color="#8A9A85" />
        </button>
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-primary)', boxShadow: '0 0 30px rgba(0,0,0,0.15)' }}
        >
          <Icon name={isRunning ? 'pause' : 'play'} size={24} color="white" />
        </button>
        <button className="w-11 h-11 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(200,223,196,0.12)] flex items-center justify-center">
          <Icon name="skipForward" size={16} color="#8A9A85" />
        </button>
      </div>

      {/* Session dots */}
      <div className="flex gap-1.5 mb-2">
        {Array.from({ length: totalSessions }).map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: i < currentSession ? 'var(--color-primary)' : 'rgba(255,255,255,0.12)' }}></div>
        ))}
      </div>
      <div className="text-[11px] text-[#5A7A55] tracking-[0.1em] uppercase mb-5">
        Sesión {currentSession} · {totalSessions - currentSession} descansos restantes
      </div>

      {/* Ambient sound */}
      <div className="w-[calc(100%-48px)] bg-[rgba(255,255,255,0.04)] border border-[rgba(200,223,196,0.08)] rounded-xl px-4 py-2.5 flex items-center justify-between mb-5">
        <div>
          <div className="text-xs text-[#7A9A75] flex items-center gap-1.5">
            <Icon name="music" size={12} color="#7A9A75" />
            Sonido ambiental
          </div>
          <div className="text-[11px] text-[#5A6A55] mt-0.5">Lluvia suave + Café</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-1 bg-[rgba(143,175,138,0.4)] rounded-sm overflow-hidden">
            <div className="h-full w-[60%] bg-[#8FAF8A] rounded-sm"></div>
          </div>
          <Icon name="volume" size={14} color="#5A7A55" />
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2.5 w-[calc(100%-48px)]">
        <button className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(200,223,196,0.08)] rounded-xl py-2.5 flex flex-col items-center gap-1">
          <Icon name="edit" size={14} color="#7A9A75" />
          <span className="text-[10px] text-[#5A6A55]">Nota rápida</span>
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(200,223,196,0.08)] rounded-xl py-2.5 flex flex-col items-center gap-1"
        >
          <Icon name="x" size={14} color="#7A9A75" />
          <span className="text-[10px] text-[#5A6A55]">Salir</span>
        </button>
      </div>
    </div>
  );
};

export default FocusPage;