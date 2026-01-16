import React from 'react'
import type { Appointment } from '../../entities/appointment'
import { AppointmentsList } from './AppointmentsList'

export interface AppointmentsTableProps {
  appointments: Appointment[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  isLoading?: boolean
}

export const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
  isLoading = false,
}) => {
  if (isLoading) {
    return <div className="text-center py-12 text-neutral-600">Loading...</div>
  }

  return <AppointmentsList appointments={appointments}/>
}