import React from 'react'
import { Icon, IconPresets } from './Icon'

export const TopNav: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <nav className="h-16 bg-neutral-0 border-b border-neutral-100 flex items-center px-6 sticky top-0 z-10 shadow-sm">
      <BrandSection />
      <CenterSection date={currentDate} />
      <NavRightSection />
    </nav>
  )
}

const BrandSection: React.FC = () => (
  <div className="flex-shrink-0">

      <Icon name="logo" size={60} alt="Plural logo" />
   
  </div>
)

const CenterSection: React.FC<{ date: string }> = ({ date }) => (
  <div className="flex-1 flex items-center justify-center">
    <span className="text-body-md text-neutral-600">{date}</span>
  </div>
)

const NavRightSection: React.FC = () => (
  <div className="flex items-center gap-4 flex-shrink-0">
    <NotificationButton />
    <UserMenuButton />
  </div>
)

const NotificationButton: React.FC = () => (
  <button
    className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-component transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
    aria-label="Notifications"
  >
    <Icon name="notification-bell" size={IconPresets.md} alt="Notifications" />
  </button>
)

const UserMenuButton: React.FC = () => (
  <button
    className="w-10 h-10 rounded-full bg-primary-700 hover:bg-primary-800 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
    aria-label="User menu"
  >
    <Icon name="user" size={IconPresets.sm} alt="User" />
  </button>
)
