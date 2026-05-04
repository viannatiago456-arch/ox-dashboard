import React from 'react';
import clsx from 'clsx';

const Input = ({ 
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  className = '',
  disabled = false,
  error = '',
  label = '',
  required = false,
  ...props 
}) => {
  const baseClasses = 'input';
  
  const errorClasses = error ? 'border-error focus:ring-error' : '';
  
  const classes = clsx(
    baseClasses,
    errorClasses,
    className
  );

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-text-secondary">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classes}
        {...props}
      />
      {error && (
        <p className="text-xs text-error">{error}</p>
      )}
    </div>
  );
};

export default Input;
