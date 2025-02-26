import React from 'react'

type ButtonProps = {
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
}

export const Button = ({
  label,
  variant = 'primary',
  className = '',
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-black font-semibold transition-all
        ${variant === 'primary' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}
        ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
