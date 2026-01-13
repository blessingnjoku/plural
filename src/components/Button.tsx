import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'font-label text-label transition-all duration-200 rounded-component focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95'

  const variantStyles = {
    primary: `bg-primary-700 text-neutral-0 hover:bg-primary-800 focus:ring-primary-600 disabled:bg-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed disabled:hover:bg-neutral-200`,
    secondary: `bg-neutral-0 text-primary-700 border-2 border-primary-700 hover:bg-primary-50 focus:ring-primary-600 disabled:border-neutral-200 disabled:text-neutral-600 disabled:cursor-not-allowed disabled:hover:bg-neutral-0`,
  }

  const sizeStyles = {
    sm: 'px-3 py-2 h-9 text-body-sm',
    md: 'px-5 py-2 h-10 text-body-md',
    lg: 'px-6 py-3 h-12 text-body-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
