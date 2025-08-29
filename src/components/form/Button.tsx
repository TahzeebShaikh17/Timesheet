import { ButtonHTMLAttributes } from 'react';
import { formStyles } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  loading = false,
  icon,
  rightIcon,
  className,
  children,
  disabled,
  ...props 
}: ButtonProps) {
  const variantStyles = formStyles.button.variants;
  const sizeStyles = formStyles.button.sizes;

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${formStyles.button.base}
        ${formStyles.button.type}
        ${formStyles.button.focus}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${loading ? 'cursor-wait' : ''}
        ${className}
      `}
    >
      <div className="flex items-center justify-center space-x-2">
        {loading ? (
          <svg 
            className="animate-spin h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        
        {children && (
          <span>{children}</span>
        )}
        
        {rightIcon && !loading && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </div>
    </button>
  );
}