import { SelectHTMLAttributes, useState } from 'react';
import { formStyles } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  options: { value: string | number; label: string; disabled?: boolean }[];
  icon?: React.ReactNode;
  className?: string;
}

export function Select({ 
  label, 
  error, 
  success, 
  helper, 
  options, 
  icon, 
  className, 
  required,
  ...props 
}: SelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1">
      {label && (
        <label className={`
          ${formStyles.label.base}
          ${required ? formStyles.label.required : ''}
        `}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <div className="text-gray-400">
              {icon}
            </div>
          </div>
        )}
        
        <select
          {...props}
          required={required}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            ${formStyles.base.height}
            ${formStyles.base.borderRadius}
            ${formStyles.base.border}
            ${formStyles.base.shadow}
            ${formStyles.base.focusRing}
            ${formStyles.select.base}
            ${formStyles.select.type}
            ${formStyles.select.padding}
            ${formStyles.select.focus}
            ${formStyles.select.disabled}
            ${error ? formStyles.select.error : ''}
            ${icon ? 'pl-10' : ''}
            ${isFocused ? 'ring-2 ring-blue-500/20 border-blue-500' : ''}
            ${className}
          `}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
              className={option.disabled ? 'text-gray-400' : ''}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            className={`w-5 h-5 transition-colors ${isFocused ? 'text-blue-500' : 'text-gray-400'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {error && (
        <p className={formStyles.error.message}>
          <svg className={formStyles.error.icon} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {success && !error && (
        <p className={formStyles.success.message}>
          <svg className={formStyles.success.icon} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </p>
      )}
      
      {helper && !error && !success && (
        <p className={formStyles.helper.message}>
          {helper}
        </p>
      )}
    </div>
  );
}