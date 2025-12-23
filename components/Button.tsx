import React from "react"

type ButtonVariant = "contained" | "outlined"

interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  variant?: ButtonVariant
}

function ButtonComponent({ label, onClick, disabled = false, variant = 'contained' }: ButtonProps) {

  const baseStyle = `
    font-semibold
    px-6 
    py-3 
    rounded-lg 
    transition 
    duration-200 
    ease-in-out 
    cursor-pointer
    disabled:opacity-50
    disabled:cursor-not-allowed
  `;

  const buttonStyle: Record<ButtonVariant, string> = {
    contained: `
      bg-red-600 
      text-white
      active:bg-red-800
      shadow-md 
      hover:shadow-lg 
      transform 
      hover:scale-105
    `,
    outlined: `
      border
      border-zinc-300
      text-zinc-700
      bg-transparent
      hover:bg-zinc-100
      hover:border-zinc-400
      active:bg-zinc-200
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${buttonStyle[variant]}`}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

const Button = React.memo(ButtonComponent)

export default Button