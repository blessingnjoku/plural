import React, { useEffect, useRef } from 'react'
import { Icon } from '../ui'
import UserCircleIcon from '../../assets/user-circle.svg'
import GroupUserIcon from '../../assets/group user.svg'
import MessageIcon from '../../assets/message-text-alt.svg'
import UploadIcon from '../../assets/upload.svg'
import StarCircleIcon from '../../assets/star-circle.svg'
import FileXIcon from '../../assets/file-x.svg'
import AppointmentIcon from '../../assets/appointments.svg'
import ThumbUpIcon from '../../assets/thumb-up.svg'
import PowerIcon from '../../assets/power.svg'

export interface UserProfileDropdownProps {
  isOpen: boolean
  onClose: () => void
}

const MENU_ITEMS = [
  { label: 'Profile', icon: UserCircleIcon },
  { label: 'Switch role', icon: GroupUserIcon },
  { label: 'Messages', icon: MessageIcon },
  { label: 'Upload paper records', icon: UploadIcon },
  { label: 'Review paper records', icon: StarCircleIcon },
  { label: 'View rejected paper records', icon: FileXIcon },
  { label: 'Calendar', icon: AppointmentIcon },
  { label: 'Give feedback', icon: ThumbUpIcon },
]

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  isOpen,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[110] bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal - Top-right positioned */}
      <div
        ref={dropdownRef}
        className="fixed top-16 right-4 md:right-6 z-[111] w-[90vw] md:w-[400px] max-h-[80vh] md:h-[528px] bg-white rounded-[10px] border border-[#DFE2E9] shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col"
      >
        {/* Header Section */}
        <div className="px-3 md:px-4 pt-3 md:pt-4 pb-4 md:pb-6 border-b border-[#DFE2E9] flex items-center justify-between gap-2 md:gap-3">
          {/* Left: Avatar */}
          <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-[#A6AFC2] flex items-center justify-center flex-shrink-0">
            <Icon
              name="user"
              size={16}
              alt="User Avatar"
              className="text-white md:hidden"
            />
            <Icon
              name="user"
              size={21}
              alt="User Avatar"
              className="text-white hidden md:block"
            />
          </div>

          {/* Center: User Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#051438] text-xs md:text-sm truncate">
              Gbenga Arakanmi
            </h3>
            <p className="text-xs text-[#677597] mt-0.5 md:mt-1 hidden sm:block">Front Desk Analyst</p>
          </div>

          {/* Right: Primary Tag */}
          <div className="flex-shrink-0">
            <span
              className="text-[10px] md:text-xs font-medium text-[#677597] bg-[#EFF1F4] px-1.5 md:px-2 py-0.5 rounded-full whitespace-nowrap"
            >
              Primary
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-1 md:px-2 pt-1 md:pt-2">
          <div className="space-y-0.5 md:space-y-1">
            {MENU_ITEMS.map((item, index) => (
              <button
                key={index}
                className="w-full px-2 md:px-3 py-2 md:py-3 text-left text-xs md:text-sm text-[#051438] rounded-lg hover:bg-neutral-100 active:bg-neutral-200 transition-colors flex items-center gap-2 md:gap-3"
              >
                <img
                  src={item.icon}
                  alt=""
                  className="w-4 md:w-[18px] h-4 md:h-[18px] text-neutral-600 flex-shrink-0"
                />
                <span className="truncate text-xs md:text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="px-1 md:px-2 pb-2 md:pb-4 pt-2 md:pt-4">
          <button
            onClick={onClose}
            className="w-full px-2 md:px-3 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 active:bg-red-100 transition-colors flex items-center gap-2 md:gap-3"
          >
            <img
              src={PowerIcon}
              alt=""
              className="w-4 md:w-[18px] h-4 md:h-[18px] text-red-600 flex-shrink-0"
            />
            <span>Sign out</span>
          </button>
        </div>
      </div>

    </>
  )
}
