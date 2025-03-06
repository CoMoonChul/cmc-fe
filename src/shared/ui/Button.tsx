import React from 'react'

type ButtonProps = {
  label: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  label,
  variant = 'primary',
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded-md text-black font-semibold transition duration-200'
  const variantStyles =
    variant === 'primary'
      ? 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300'
      : 'bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300'

  return (
    <button
      className={`${baseStyles} ${variantStyles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
