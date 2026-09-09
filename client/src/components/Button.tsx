import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-full gap-2',
    lg: 'text-base px-7 py-3 rounded-full gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#163829] hover:bg-[#0f281d] text-white shadow-sm hover:shadow-md border border-[#23533c] focus-visible:ring-[#2d6a4f]',
    secondary:
      'bg-[#f4f7ee]/90 hover:bg-white text-[#163829] border border-[#c5d5ad] hover:border-[#9db87e] shadow-sm backdrop-blur-sm focus-visible:ring-[#2d6a4f]',
    outline:
      'bg-transparent hover:bg-[#eef3e5] text-[#163829] border border-[#c5d5ad] hover:border-[#2d6a4f] focus-visible:ring-[#2d6a4f]',
    ghost:
      'bg-transparent hover:bg-[#eef3e5] text-[#212a1c] hover:text-[#163829] focus-visible:ring-[#2d6a4f]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};
