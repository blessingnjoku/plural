import { createContext } from 'react'
import type { Patient } from '../../../entities/appointment'

export interface LayoutContextType {
  activeModal: 'addPatient' | 'addAppointment' | null
  setActiveModal: (modal: 'addPatient' | 'addAppointment' | null) => void
  selectedPatient: Patient | null
  setSelectedPatient: (patient: Patient | null) => void
  createdPatient: Patient | null
  setCreatedPatient: (patient: Patient | null) => void
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined)
