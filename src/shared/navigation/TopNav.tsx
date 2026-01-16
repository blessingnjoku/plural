import React, { useState } from 'react'
import { Icon, IconPresets } from '../ui'
import { UserProfileDropdown } from './UserProfileDropdown'

export interface TopNavProps {}

export const TopNav: React.FC<TopNavProps> = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  })

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <>
      <nav className="h-16 border-b border-neutral-100 flex items-center px-8 sticky top-0 z-10 shadow-sm bg-[#EDF0F8]">
        <BrandSection />
        <CenterSection date={currentDate} time={currentTime} />
        <NavRightSection onOpenProfile={() => setShowProfileDropdown(true)} />
      </nav>
      <UserProfileDropdown
        isOpen={showProfileDropdown}
        onClose={() => setShowProfileDropdown(false)}
      />
    </>
  )
}

const BrandSection: React.FC = () => (
  <div className="flex-shrink-0">
    <Icon name="logo" size={90} alt="Plural logo" />
  </div>
)

const CenterSection: React.FC<{ date: string; time: string }> = ({
  date,
  time,
}) => (
  <div className="hidden md:flex flex-1 items-center justify-center gap-3 ml-8 lg:ml-36">
    <span className="text-base sm:text-lg font-bold font-gilroy text-[#051438]">
      {date}
    </span>
    <span className="text-base sm:text-lg font-semibold font-gilroy text-[#677597]">
      {time}
    </span>
  </div>
)

const NavRightSection: React.FC<{ onOpenProfile: () => void }> = ({ onOpenProfile }) => (
  <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-auto">
    <span className="hidden sm:inline text-base sm:text-lg font-bold font-gilroy text-[#051438]">Hi Mr Daniel</span>
    <NotificationButton />
    <UserMenuButton onOpenProfile={onOpenProfile} />
  </div>
)

const NotificationButton: React.FC = () => (
  <button
    className="p-2 rounded-md text-[#4B5563] hover:bg-neutral-100 hover:text-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
    aria-label="Notifications"
  >
    <Icon name="notification-bell" size={IconPresets.md} alt="Notifications" />
  </button>
)

const UserMenuButton: React.FC<{ onOpenProfile: () => void }> = ({
  onOpenProfile,
}) => (
  <button
    className="w-10 h-10 rounded-full bg-[#A6AFC2] flex items-center justify-center text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
    aria-label="User menu"
    onClick={onOpenProfile}
  >
    <Icon name="user" size={IconPresets.sm} alt="User"   />
  </button>
);
