import React from 'react'

// Import all SVG icons
import PluralLogo from '../../assets/Plural logo.svg'
import DateIcon from '../../assets/date.svg'
import DocIcon from '../../assets/doc.svg'
import FilterIcon from '../../assets/filter.svg'
import FingerprintIcon from '../../assets/fingerprint.svg'
import HeartCircleIcon from '../../assets/heart-circle.svg'
import HospitalIcon from '../../assets/hospital-svgrepo-com 1.svg'
import NotificationBellIcon from '../../assets/notification-bell.svg'
import PlusCircleIcon from '../../assets/plus-circle.svg'
import SearchIcon from '../../assets/search.svg'
import SortIcon from '../../assets/sort.svg'
import TickIcon from '../../assets/tick.svg'
import UserIcon from '../../assets/user.svg'
import VIcon from '../../assets/v.svg'
import CollapseIcon from '../../assets/colapse.svg'
import DoubleCaretRightCircleIcon from '../../assets/double-caret-right-circle.svg'
import MinusCircleIcon from '../../assets/minus-circle.svg'
import HeartIcon from '../../assets/heart-.svg'
import HealthIcon from '../../assets/health.svg'
import HealthPlusIcon from '../../assets/health plus.svg'
import FileXIcon from '../../assets/file-x.svg'
import StarCircleIcon from '../../assets/star-circle.svg'

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
  | 'stroke'
  | 'collapse'
  | 'double-caret-right-circle'
  | 'minus-circle'
  | 'heart'
  | 'health'
  | 'health-plus'
  | 'file-x'
  | 'star-circle'

export interface IconProps {
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
  stroke: 'data:image/svg+xml,%3Csvg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0.750001 0.75L3.95 3.95L7.15 0.75" stroke="%23051438" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E',
  collapse: CollapseIcon,
  'double-caret-right-circle': DoubleCaretRightCircleIcon,
  'minus-circle': MinusCircleIcon,
  heart: HeartIcon,
  health: HealthIcon,
  'health-plus': HealthPlusIcon,
  'file-x': FileXIcon,
  'star-circle': StarCircleIcon,
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

  // Map numeric sizes to Tailwind classes for responsive sizing
  const sizeClassMap: Record<number | string, string> = {
    16: 'w-4 h-4',
    20: 'w-5 h-5',
    24: 'w-6 h-6',
    32: 'w-8 h-8',
    40: 'w-10 h-10',
    48: 'w-12 h-12',
  }

  const sizeClass = typeof size === 'number' 
    ? (sizeClassMap[size] || `w-[${size}px] h-[${size}px]`) 
    : (sizeClassMap[size as string] || 'w-6 h-6')

  return (
    <img
      src={iconSrc}
      alt={alt}
      className={`inline-block ${sizeClass} ${className}`}
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
