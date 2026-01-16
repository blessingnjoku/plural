import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-label text-neutral-900 mb-2 font-medium">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        className={`w-full h-10 px-3 py-2 text-body-md border-2 rounded-component bg-neutral-0 border-neutral-100 text-neutral-900 placeholder-neutral-400 transition-colors focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100 disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed ${error ? 'border-error focus:border-error focus:ring-error/10' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-body-sm text-error mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-body-sm text-neutral-600 mt-1">{helperText}</p>
      )}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: Array<{ value: string | number; label: string }>
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-label text-neutral-900 mb-2 font-medium">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <select
        className={`w-full h-10 px-3 py-2 text-body-md border-2 rounded-component bg-neutral-0 border-neutral-100 text-neutral-900 appearance-none transition-colors focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100 disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed ${error ? 'border-error focus:border-error focus:ring-error/10' : ''} ${className}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-body-sm text-error mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-body-sm text-neutral-600 mt-1">{helperText}</p>
      )}
    </div>
  )
}

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  onSearch?: (value: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  label,
  onSearch,
  className = '',
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onSearch?.(e.target.value)
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-label text-neutral-900 mb-2 font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          className={`w-full h-10 px-3 py-2 text-body-md border-2 rounded-component bg-neutral-0 border-neutral-100 text-neutral-900 placeholder-neutral-400 transition-colors focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100 ${className}`}
          onChange={handleChange}
          {...props}
        />
      </div>
    </div>
  )
}
