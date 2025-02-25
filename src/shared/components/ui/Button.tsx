import React from 'react'

type ButtonProps = {
  label: string
  variant?: 'primary' | 'secondary'
}

export const Button = ({ label, variant = 'primary' }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded ${
        variant === 'primary'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-300 text-black'
      }`}
    >
      {label}
    </button>
  )
}
