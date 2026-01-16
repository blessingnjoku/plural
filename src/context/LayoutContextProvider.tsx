import React, { useState } from 'react'
import { LayoutContext } from './LayoutContext'
import type { LayoutContextType } from './LayoutContext'
import type { Patient } from '../types'

interface LayoutContextProviderProps {
  children: React.ReactNode
}

export function LayoutContextProvider({ children }: LayoutContextProviderProps) {
  const [activeModal, setActiveModal] = useState<'addPatient' | 'addAppointment' | null>(null)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [createdPatient, setCreatedPatient] = useState<Patient | null>(null)

  const value: LayoutContextType = {
    activeModal,
    setActiveModal,
    selectedPatient,
    setSelectedPatient,
    createdPatient,
    setCreatedPatient,
  }

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}
