import React, { createContext, useState } from 'react'
import { TopNav } from './TopNav'
import type { Patient } from '../types'

interface LayoutContextType {
  activeModal: 'addPatient' | 'addAppointment' | null
  setActiveModal: (modal: 'addPatient' | 'addAppointment' | null) => void
  selectedPatient: Patient | null
  setSelectedPatient: (patient: Patient | null) => void
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined
)

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<
    'addPatient' | 'addAppointment' | null
  >(null)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  return (
    <LayoutContext.Provider
      value={{ activeModal, setActiveModal, selectedPatient, setSelectedPatient }}
    >
      <div className="min-h-screen bg-neutral-0">
        <TopNav />
        <MainContent>{children}</MainContent>
      </div>
    </LayoutContext.Provider>
  )
}

interface MainContentProps {
  children: React.ReactNode
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <main className="p-6">{children}</main>
}

export const useLayout = () => {
  const context = React.useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a Layout provider')
  }
  return context
}
