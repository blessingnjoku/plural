import React, { useState } from 'react'

export interface HamburgerMenuProps {
  onClose?: () => void
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    'Create appointment',
    'Create invoice',
    'View patient profile',
    'View next of kin',
    'Add demographic info',
    'Update insurance details',
    'Scan paper records',
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuItemClick = (item: string) => {
    console.log('Clicked:', item)
    setIsOpen(false)
    onClose?.()
  }

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700"
        aria-label="Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg border border-[#DFE2E9] shadow-lg z-50">
          <div className="py-3 max-h-64 overflow-y-auto">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item)}
                className="w-full px-4 py-2 text-left text-sm text-[#051438] hover:bg-gray-50 active:bg-gray-100 transition-colors border-l-2 border-l-transparent hover:border-l-[#DFE2E9]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
