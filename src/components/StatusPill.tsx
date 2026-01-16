import React from 'react'
import type { AppointmentStatus } from '../types'

interface StatusPillProps {
  status: AppointmentStatus
  className?: string
}

const statusConfig: Record<
  AppointmentStatus,
  { bg: string; text: string; icon?: string }
> = {
  Processing: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
  },
  'Not arrived': {
    bg: 'bg-red-100',
    text: 'text-red-800',
  },
  'Awaiting vitals': {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
  },
  'Awaiting doctor': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
  },
  'Admitted to ward': {
    bg: 'bg-green-100',
    text: 'text-green-800',
  },
  'Transferred to A&E': {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
  },
  'Seen doctor': {
    bg: 'bg-green-100',
    text: 'text-green-800',
  },
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  className = '',
}) => {
  const config = statusConfig[status] || statusConfig.Processing

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-body-sm font-medium ${config.bg} ${config.text} ${className}`}
    >
      {status}
    </span>
  )
}
