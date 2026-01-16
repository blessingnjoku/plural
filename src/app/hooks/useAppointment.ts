import { useContext } from 'react'
import { AppointmentContext } from '../providers/context/AppointmentContext'

export function useAppointment() {
  const context = useContext(AppointmentContext)
  
  if (context === undefined) {
    throw new Error('useAppointment must be used within an AppointmentContextProvider')
  }
  
  return context
}
