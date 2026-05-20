import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const steps = [
  {
    title: "Tu espacio de paz",
    description: "Transforma tu productividad en un ritual de calma y enfoque consciente.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvuHOn6lyivZOlJXvOGc8XQk9pHbTvvMcNy0Vhd8kzkyLGS7a1TFR5d8c8vSeYuXt92IoIrdKkg0CuQDwBs2RUs6hcS_yt9DuzaWLoHM9goPV1To0gyRJOGFrPixovDlMXzTeNKqYUo-Y5L57gHdEfsHB4lIwkkX-bD_zqNsl7EnaJ1cuYh3I5RnmNElVLsKTvFjacS6arUm6vl5wzd71AYqZMBQ0dyneOyLJZVOGgLdcCDSWrnYxInkWvuy-XKnOi3shWU7oPbyc",
    alt: "Zen mascot meditating",
    layout: "organic",
    badge: null,
    blobColor: "radial-gradient(circle at 50% 50%, #d0e9d0 0%, transparent 70%)",
  },
  {
    title: "Encuentra tu enfoque",
    description: "Herramientas diseñadas para eliminar distracciones y cultivar una concentración profunda en lo que realmente importa.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJYvwxVFB6DrmLKVKFbgsLkpsTBog9TCQ5Zk8r3Wrs9zE6yJ9tX5tIYgn6V7tutI2m-Clyn0aVPaWVZKWjP8UavbqdHVG7Aq8Hnr7pCbWSh2l0u1PzcDEKvUtaf4Zu2r72DV7iNb2fcTgXRHcgam5kILuY3kMNGWHj-cyUYXkoyNDMiq3_6o6yq1cEAuy8wTUfkxBuL30ZMHe3S8K9KcuU6yXSNUNzlgdOJNtUy99rqLFRJCtTCLF_6wN3yt4WFDRHey5P7qsee9I",
    alt: "Cozy mascot focused with bonsai",
    layout: "framed",
    badge: { icon: "eco", text: "Estado de Enfoque: Zen" },
    blobColor: "radial-gradient(circle at 50% 50%, #e8bbc3 0%, transparent 70%)",
  },
  {
    title: "Cultiva tus hábitos",
    description: "Registra tus rutinas diarias y observa cómo tu progreso florece día tras día en un ambiente de paz.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAo-H_TJFsn4W33pQQAHapQ31DhESsBFka4oBGsokQYhcrqDrnc7W2EphWbK-dke4ATfzh8AHeE1WOQbhplrWn7TtFKOjmXawU5b8Fo_JQ2jAG0YcSknCn3PrclqD2AlI0R4LwStQCL6XO1BB2Jm-E4oqjwSC8e5XGSO8fIcTBpxtNQI0LryOACsHS0X6vIWoL5d0WCLUiU6bwBNpLy5LQ4SdtX3_DK6xEtLQ0my36qM_kdHMiIseBspxWZ1pmNPHGysyc9soUUKE",
    alt: "Mascot watering a plant",
    layout: "organic-glow",
    badge: null,
    blobColor: "radial-gradient(circle at 50% 50%, #c0ebea 0%, transparent 70%)",
  }
];

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      navigate('/login');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/login');
  };

  const current = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // Renderizar la ilustración según el layout del step
  const renderIllustration = () => {
    switch (current.layout) {
      case 'organic':
        return (
          <div className="relative w-72 h-72 md:w-80 md:h-80 animate-[floating_6s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-[#f5f3f0] rounded-[40px] transform rotate-3 scale-95 opacity-50"></div>
            <div className="absolute inset-0 bg-[#efeeea] rounded-[40px] transform -rotate-2"></div>
            <img 
              alt={current.alt}
              className="relative z-10 w-full h-full object-contain p-8"
              src={current.image}
            />
          </div>
        );

      case 'framed':
        return (
          <div className="relative w-72 h-72 md:w-80 md:h-80 animate-[floating_6s_ease-in-out_infinite]">
            <img 
              alt={current.alt}
              className="w-full h-full object-cover rounded-[48px] shadow-2xl border-8 border-white"
              style={{ boxShadow: '0 25px 50px -12px rgba(78, 100, 80, 0.1)' }}
              src={current.image}
            />
          </div>
        );

      case 'organic-glow':
        return (
          <div className="relative w-full aspect-square max-w-[300px]">
            <div className="absolute inset-0 bg-[#f5f3f0] rounded-[40px] transform rotate-3 scale-95 opacity-50"></div>
            <div className="absolute inset-0 bg-[#efeeea] rounded-[40px] transform -rotate-2"></div>
            <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center mx-auto mt-[10%] animate-[floating_4s_ease-in-out_infinite]">
              <img 
                alt={current.alt}
                className="w-full h-full object-contain rounded-xl"
                src={current.image}
              />
            </div>
            {/* Elementos decorativos brillantes */}
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-[#c0ebea] rounded-full blur-[2px] animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-[#9ab29b] rounded-full blur-[1px] animate-pulse"></div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-[#fbf9f6] text-[#1b1c1a] selection:bg-[#9ab29b] selection:text-[#304533]">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-2 w-full sticky top-0 z-50 bg-[#fbf9f6]/80 backdrop-blur-md">
        <div className="text-[22px] leading-7 tracking-tight font-extrabold text-[#4e6450]" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
          Serene
        </div>
        {!isLastStep && (
          <button 
            onClick={handleSkip}
            className="text-[#434842] text-sm font-bold tracking-wide hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
          >
            Saltar
          </button>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 relative flex flex-col items-center justify-center px-6">
        
        {/* Blobs decorativos */}
        <div 
          className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: current.blobColor,
            filter: 'blur(60px)',
            opacity: isLastStep ? 0.4 : 0.15,
            zIndex: 0,
            transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`
          }}
        />
        <div 
          className="absolute bottom-[10%] right-[-50px] w-[250px] h-[250px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #c0ebea 0%, transparent 70%)',
            filter: 'blur(60px)',
            opacity: isLastStep ? 0.4 : 0.15,
            zIndex: 0,
            transform: `translate(${(mousePos.x - 0.5) * 40}px, ${(mousePos.y - 0.5) * 40}px)`
          }}
        />

        {/* Contenido */}
        <div className="max-w-md w-full flex flex-col items-center text-center relative z-10">
          
          {/* Ilustración */}
          <div className="w-full max-w-sm mb-10 relative flex justify-center items-center">
            <div className="absolute inset-0 bg-[#e3e2df]/20 rounded-full blur-3xl scale-90"></div>
            {renderIllustration()}

            {/* Badge flotante */}
            {current.badge && (
              <div className="absolute -bottom-4 right-4 md:right-8 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-[#e3e2df] flex items-center gap-3 z-20">
                <span 
                  className="material-symbols-outlined text-[#4e6450]" 
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {current.badge.icon}
                </span>
                <span className="text-xs font-semibold text-[#1b1c1a]" style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
                  {current.badge.text}
                </span>
              </div>
            )}
          </div>

          {/* Texto */}
          <div className="space-y-2 px-4 mb-10">
            <h1 
              className="text-[28px] md:text-[32px] leading-9 md:leading-10 font-bold tracking-tight text-[#1b1c1a]"
              style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif', letterSpacing: '-0.02em' }}
            >
              {current.title}
            </h1>
            <p 
              className="text-base md:text-lg leading-6 md:leading-7 text-[#434842]"
              style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
            >
              {current.description}
            </p>
          </div>
        </div>
      </main>

      {/* Footer con controles */}
      <footer className="p-6 flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
        
        {/* Dots de paginación */}
        <div className="flex gap-2 items-center">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'w-8 bg-[#4e6450] shadow-sm' 
                  : 'w-2 bg-[#c3c8c0]'
              }`}
            />
          ))}
        </div>

        {/* Botones de navegación */}
        {isLastStep ? (
          // Último slide: botón full width "Comenzar"
          <div className="w-full">
            <button 
              onClick={handleNext}
              className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-[#4e6450] to-[#3d6565] text-white text-sm font-bold tracking-wide shadow-lg hover:opacity-90 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              style={{ boxShadow: '0 10px 25px rgba(78, 100, 80, 0.2)' }}
            >
              Comenzar
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        ) : (
          // Slides 1 y 2: layout con botón atrás + siguiente centrado
          <div className="w-full flex justify-between items-center">
            {currentStep > 0 ? (
              <button 
                onClick={handleBack}
                className="w-12 h-12 flex items-center justify-center rounded-full text-[#434842] hover:bg-[#e3e2df]/50 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
              </button>
            ) : (
              <div className="w-12"></div>
            )}

            <button 
              onClick={handleNext}
              className="flex-1 max-w-[240px] h-14 bg-gradient-to-r from-[#4e6450] to-[#3d6565] text-white text-sm font-bold tracking-wide rounded-full shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
              style={{ boxShadow: '0 10px 25px rgba(78, 100, 80, 0.2)' }}
            >
              Siguiente
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <div className="w-12"></div>
          </div>
        )}
      </footer>

    </div>
  );
};

export default OnboardingPage;