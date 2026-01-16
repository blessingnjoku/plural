import React from 'react'
import type { AppointmentStatus } from '../../types'
import { Icon, type IconName } from '../ui'

export interface StatusBadgeProps {
  status: AppointmentStatus
}

interface StatusConfig {
  bg: string
  text: string
  icon: IconName
}

const statusConfig: Record<AppointmentStatus, StatusConfig> = {
  'Processing': { bg: 'bg-orange-50', text: 'text-orange-600', icon: 'double-caret-right-circle' },
  'Not arrived': { bg: 'bg-red-50', text: 'text-red-600', icon: 'minus-circle' },
  'Awaiting vitals': { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'heart-circle' },
  'Awaiting doctor': { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'heart' },
  'Admitted to ward': { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'health' },
  'Transferred to A&E': { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'health-plus' },
  'Seen doctor': { bg: 'bg-green-50', text: 'text-green-600', icon: 'tick' },
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status]
  
  return (
    <div
      className={`px-2 lg:px-3 py-1 rounded-lg flex items-center justify-between gap-1.5 lg:gap-2.5 text-xs lg:text-sm font-semibold whitespace-nowrap ${config.bg} ${config.text}`}
    >
      {status}
      <Icon name={config.icon} size={12} className="lg:hidden" />
      <Icon name={config.icon} size={16} className="hidden lg:block" />
    </div>
  )
}
