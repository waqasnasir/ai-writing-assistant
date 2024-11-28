import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from './icons';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

export default function Select({ id, label, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2.5 border border-gray-300 rounded-lg bg-white text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={id}
        >
          <span className="block truncate">{selectedOption?.label}</span>
          <span className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}>
            <ChevronDownIcon />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150 ${
                  option.value === value 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-900'
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span className="block truncate">{option.label}</span>
                {option.value === value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                    <CheckIcon />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        
        {/* Hidden select for form submission */}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 