import { InputHTMLAttributes, useState } from 'react';
import { formStyles } from './styles';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function TextInput({ 
  label, 
  error, 
  success, 
  helper, 
  icon, 
  rightIcon, 
  className, 
  required,
  ...props 
}: TextInputProps) {
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
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">
              {icon}
            </div>
          </div>
        )}
        
        <input
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
            ${formStyles.input.base}
            ${formStyles.input.type}
            ${formStyles.input.padding}
            ${formStyles.input.focus}
            ${formStyles.input.disabled}
            ${error ? formStyles.input.error : ''}
            ${icon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${isFocused ? 'ring-2 ring-blue-500/20 border-blue-500' : ''}
            ${className}
          `}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="text-gray-400">
              {rightIcon}
            </div>
          </div>
        )}
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