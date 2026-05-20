import { useEffect, useState } from 'react';

const SplashPage = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'linear-gradient(160deg, #EEF5EC 0%, #F5F0E8 60%, #E8F4F3 100%)' }}
    >
      {/* Blobs decorativos */}
      <div className="absolute rounded-full opacity-40" style={{ width: 200, height: 200, background: '#C8DFC4', top: -60, left: -60 }}></div>
      <div className="absolute rounded-full opacity-40" style={{ width: 150, height: 150, background: '#B8D9D7', bottom: -40, right: -40 }}></div>
      <div className="absolute rounded-full opacity-40" style={{ width: 80, height: 80, background: '#CFC7E0', top: '40%', right: 20 }}></div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#8FAF8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-5">
          <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>

        <h1 className="text-4xl font-semibold text-[#8FAF8A] text-center" style={{ fontFamily: 'Fredoka, sans-serif' }}>
          Serene
        </h1>
        <p className="text-[13px] text-[#8A847C] mt-2 text-center">
          Tu espacio de calma productiva
        </p>

        {/* Loader dots */}
        <div className="flex gap-1.5 mt-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C8DFC4] animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#B8D9D7] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#CFC7E0] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      {/* Version removed */}
    </div>
  );
};

export default SplashPage;