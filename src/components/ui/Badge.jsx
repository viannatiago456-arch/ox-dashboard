import React from 'react';
import clsx from 'clsx';

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'sm', 
  className = '',
  ...props 
}) => {
  const baseClasses = 'badge font-medium';
  
  const variantClasses = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    secondary: 'bg-text-secondary bg-opacity-20 text-text-secondary'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;
