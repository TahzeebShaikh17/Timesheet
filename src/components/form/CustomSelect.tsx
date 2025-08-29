'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { formStyles } from './styles';

interface CustomSelectProps {
  label?: string;
  error?: string;
  success?: string;
  helper?: string;
  options: { value: string | number; label: string; disabled?: boolean }[];
  icon?: React.ReactNode;
  className?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
}

export function CustomSelect({ 
  label, 
  error, 
  success, 
  helper, 
  options, 
  icon, 
  className, 
  required,
  value,
  onChange,
  placeholder = 'Select an option...'
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(option => option.value === value);

  // Calculate dropdown position and handle clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }

    function updateDropdownPosition() {
      if (buttonRef.current && isOpen) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: buttonRect.bottom + 8, // Just 8px below the button, no scroll offset needed for fixed positioning
          left: buttonRect.left,
          width: buttonRect.width,
        });
      }
    }

    if (isOpen) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', updateDropdownPosition);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setIsFocused(false);
      buttonRef.current?.blur();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  const handleOptionClick = (optionValue: string | number) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setIsFocused(false);
    buttonRef.current?.blur();
  };

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
      
      <div className="relative" ref={dropdownRef}>
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <div className="text-gray-400">
              {icon}
            </div>
          </div>
        )}
        
        {/* Custom Select Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
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
            ${error ? formStyles.select.error : ''}
            ${icon ? 'pl-10' : ''}
            ${isFocused || isOpen ? 'ring-2 ring-blue-500/20 border-blue-500' : ''}
            ${className}
            text-left relative
          `}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </button>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            className={`w-5 h-5 transition-all duration-200 ${
              isOpen ? 'transform rotate-180 text-blue-500' : 'text-gray-400'
            } ${isFocused ? 'text-blue-500' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Portal-based Dropdown Menu */}
        {isOpen && createPortal(
          <div 
            ref={dropdownRef}
            className="fixed z-[10000] bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-auto"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
            }}
          >
            <div className="py-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => !option.disabled && handleOptionClick(option.value)}
                  className={`
                    w-full text-left px-4 py-3 text-sm transition-colors duration-150
                    ${option.disabled 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-900 hover:bg-blue-50 hover:text-blue-700 cursor-pointer'
                    }
                    ${option.value === value 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : ''
                    }
                    focus:outline-none focus:bg-blue-50 focus:text-blue-700
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {option.value === value && (
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>,
          document.body
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