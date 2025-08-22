import { LabelHTMLAttributes } from 'react';
import { formStyles } from './styles';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
  helper?: string;
  className?: string;
}

export function Label({ 
  htmlFor, 
  required = false, 
  helper, 
  className, 
  children,
  ...props 
}: LabelProps) {
  return (
    <div className="space-y-1">
      <label
        {...props}
        htmlFor={htmlFor}
        className={`
          ${formStyles.label.base}
          ${required ? formStyles.label.required : ''}
          ${className}
        `}
      >
        {children}
      </label>
      
      {helper && (
        <p className={formStyles.helper.message}>
          {helper}
        </p>
      )}
    </div>
  );
}