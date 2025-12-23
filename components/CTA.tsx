import React from "react"

interface CTAProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

function CTAComponent({ label, onClick, disabled = false }: CTAProps) {
  return (
    <button
      onClick={onClick}
      className="
        bg-red-600
        active:bg-red-800 
        text-white 
        font-semibold
        px-6 
        py-3 
        rounded-lg 
        shadow-md 
        hover:shadow-lg 
        transition 
        duration-200 
        ease-in-out 
        transform 
        hover:scale-105
        cursor-pointer"
      disabled={disabled}
    >
      {label}
    </button>
  )
}

const CTA = React.memo(CTAComponent)

export default CTA