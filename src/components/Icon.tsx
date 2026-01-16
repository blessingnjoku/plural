import React from 'react'

// Import all SVG icons
import PluralLogo from '../assets/Plural logo.svg'
import DateIcon from '../assets/date.svg'
import DocIcon from '../assets/doc.svg'
import FilterIcon from '../assets/filter.svg'
import FingerprintIcon from '../assets/fingerprint.svg'
import HeartCircleIcon from '../assets/heart-circle.svg'
import HospitalIcon from '../assets/hospital-svgrepo-com 1.svg'
import NotificationBellIcon from '../assets/notification-bell.svg'
import PlusCircleIcon from '../assets/plus-circle.svg'
import SearchIcon from '../assets/search.svg'
import SortIcon from '../assets/sort.svg'
import TickIcon from '../assets/tick.svg'
import UserIcon from '../assets/user.svg'
import VIcon from '../assets/v.svg'

export type IconName =
  | 'logo'
  | 'date'
  | 'doc'
  | 'filter'
  | 'fingerprint'
  | 'heart-circle'
  | 'hospital'
  | 'notification-bell'
  | 'plus-circle'
  | 'search'
  | 'sort'
  | 'tick'
  | 'user'
  | 'v'

interface IconProps {
  name: IconName
  size?: number | string
  className?: string
  alt?: string
}

const iconMap: Record<IconName, string> = {
  logo: PluralLogo,
  date: DateIcon,
  doc: DocIcon,
  filter: FilterIcon,
  fingerprint: FingerprintIcon,
  'heart-circle': HeartCircleIcon,
  hospital: HospitalIcon,
  'notification-bell': NotificationBellIcon,
  'plus-circle': PlusCircleIcon,
  search: SearchIcon,
  sort: SortIcon,
  tick: TickIcon,
  user: UserIcon,
  v: VIcon,
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = '',
  alt = name,
}) => {
  const iconSrc = iconMap[name]

  if (!iconSrc) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  const sizeStyle =
    typeof size === 'number' ? { width: size, height: size } : { width: size, height: size }

  return (
    <img
      src={iconSrc}
      alt={alt}
      className={`inline-block ${className}`}
      style={sizeStyle}
    />
  )
}

// Preset icon sizes for consistency
export const IconPresets = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
} as const
