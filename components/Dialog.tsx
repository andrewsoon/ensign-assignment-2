import React from "react"

interface DialogProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  children: React.ReactNode
}

export default function Dialog({ open, onClose, onSubmit, title, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full max-w-md rounded-xl bg-zinc-50 p-6 shadow-xl mx-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        {title && (
          <h2 id="dialog-title" className="mb-4 text-lg font-semibold text-zinc-900">
            {title}
          </h2>
        )}

        <div className="text-zinc-700">
          {children}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            role="button"
            className="rounded-md px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            role="button"
            className="rounded-md bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-800 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
