import { useState } from 'react';

const Input = ({
  label,
  icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  showCheck = false,
  className = '',
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const isActive = focused || value;

  return (
    <div className={`mb-5 ${className}`}>
      <label className="flex items-center gap-1.5 mb-2 text-[11px] font-semibold text-[#8A7E72] tracking-widest uppercase">
        {icon}
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full py-3.5 px-4 pr-10 rounded-2xl text-sm text-[#4A3F34] outline-none transition-all duration-300"
          style={{
            fontFamily: 'Nunito Sans, system-ui, sans-serif',
            background: isActive ? '#F0EDE3' : '#EDE6D8',
            border: `2px solid ${isActive ? '#A8AF8A' : 'transparent'}`,
            boxShadow: focused
              ? '0 0 0 4px rgba(143,175,138,.12), inset 0 2px 4px rgba(90,70,50,.04), 0 4px 12px rgba(143,175,138,.08)'
              : 'inset 0 2px 6px rgba(90,70,50,.07)',
          }}
        />

        {/* Check icon para validación */}
        {showCheck && value && !isPassword && (
          <svg className="absolute right-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8FAF8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}

        {/* Toggle password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B0A494] hover:text-[#8A7E72] transition-colors"
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <path d="m1 1 22 22"/>
                <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;