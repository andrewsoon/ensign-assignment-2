import React from "react"

interface QuantityControlProps {
  quantity: number
  handleDecrease: () => void
  handleIncrease: () => void
}

function QuantityControlComponent({ quantity, handleDecrease, handleIncrease }: QuantityControlProps) {
  return (
    <div className="flex items-center gap-2 bg-zinc-100 w-max">
      <button
        onClick={handleDecrease}
        className="px-2 py-1 bg-zinc-200 rounded hover:bg-zinc-300 cursor-pointer disabled:cursor-not-allowed"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="px-2">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="px-2 py-1 bg-zinc-200 rounded hover:bg-zinc-300 cursor-pointer"
      >
        +
      </button>
    </div>
  )
}

const QuantityControl = React.memo(QuantityControlComponent)

export default QuantityControl