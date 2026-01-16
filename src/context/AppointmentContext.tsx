import { createContext } from 'react'
import type { Patient, Appointment } from '../types'

export interface AppointmentContextType {
  // Patients
  patients: Patient[]
  addPatient: (patient: Patient) => void
  getPatient: (id: string) => Patient | undefined
  searchPatients: (query: string) => Patient[]

  // Appointments
  appointments: Appointment[]
  addAppointment: (appointment: Appointment) => void
  getAppointment: (id: string) => Appointment | undefined
  getPatientAppointments: (patientId: string) => Appointment[]

  // Modal state
  activeModal: 'addPatient' | 'addAppointment' | null
  setActiveModal: (modal: 'addPatient' | 'addAppointment' | null) => void

  // Temporary patient creation state
  createdPatient: Patient | null
  setCreatedPatient: (patient: Patient | null) => void
}

export const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)
