import React, { useState, useCallback } from 'react'
import { AppointmentContext } from './AppointmentContext'
import type { AppointmentContextType } from './AppointmentContext'
import type { Patient, Appointment } from '../types'
import { mockPatients, mockAppointments, mockAppointmentModalPatients } from '../types'

interface AppointmentContextProviderProps {
  children: React.ReactNode
}

export function AppointmentContextProvider({ children }: AppointmentContextProviderProps) {
  // Initialize with mock data
  const [patients, setPatients] = useState<Patient[]>([
    ...mockPatients,
    ...mockAppointmentModalPatients,
  ])
  
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  
  const [activeModal, setActiveModal] = useState<'addPatient' | 'addAppointment' | null>(null)
  const [createdPatient, setCreatedPatient] = useState<Patient | null>(null)

  // Patient operations
  const addPatient = useCallback((patient: Patient) => {
    setPatients((prev) => {
      // Check if patient already exists
      if (prev.some((p) => p.id === patient.id)) {
        return prev
      }
      return [...prev, patient]
    })
  }, [])

  const getPatient = useCallback(
    (id: string): Patient | undefined => {
      return patients.find((p) => p.id === id)
    },
    [patients]
  )

  const searchPatients = useCallback(
    (query: string): Patient[] => {
      if (!query.trim()) {
        return patients
      }

      const lowerQuery = query.toLowerCase()
      return patients.filter((patient) => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase()
        const patientId = patient.id.toLowerCase()
        const fullFormat = `${patient.firstName} ${patient.lastName} - ${patient.id}`.toLowerCase()
        return fullName.includes(lowerQuery) || patientId.includes(lowerQuery) || fullFormat.includes(lowerQuery)
      })
    },
    [patients]
  )

  // Appointment operations
  const addAppointment = useCallback((appointment: Appointment) => {
    setAppointments((prev) => {
      // Check if appointment already exists
      if (prev.some((a) => a.id === appointment.id)) {
        return prev
      }
      return [...prev, appointment]
    })
  }, [])

  const getAppointment = useCallback(
    (id: string): Appointment | undefined => {
      return appointments.find((a) => a.id === id)
    },
    [appointments]
  )

  const getPatientAppointments = useCallback(
    (patientId: string): Appointment[] => {
      return appointments.filter((a) => a.patientId === patientId)
    },
    [appointments]
  )

  const value: AppointmentContextType = {
    // Patients
    patients,
    addPatient,
    getPatient,
    searchPatients,

    // Appointments
    appointments,
    addAppointment,
    getAppointment,
    getPatientAppointments,

    // Modal state
    activeModal,
    setActiveModal,

    // Temporary patient creation state
    createdPatient,
    setCreatedPatient,
  }

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  )
}
