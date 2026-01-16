import React, { type ReactNode } from 'react'

type ModalSize = 'sm' | 'md' | 'lg'

export interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  closeButton?: boolean
  size?: ModalSize
  children: ReactNode
}

const MODAL_SIZES: Record<ModalSize, string> = {
  sm: 'max-w-[400px] h-auto max-h-[80vh]',
  md: 'max-w-[716px] h-auto max-h-[80vh]',
  lg: 'max-w-[900px] h-auto max-h-[90vh]',
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  closeButton = false,
  size = 'md',
  children,
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className={`bg-white rounded-lg shadow-xl pointer-events-auto overflow-hidden ${MODAL_SIZES[size]}`}>
          {/* Header */}
          {(title || closeButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              {title && <h2 className="text-lg font-semibold text-[#051438]">{title}</h2>}
              {closeButton && (
                <button
                  onClick={onClose}
                  className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
