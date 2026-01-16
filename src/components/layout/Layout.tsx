import React from 'react'
import { TopNav } from '../navigation'
import { AddPatientModal, AddAppointmentModal } from '../modals'
import { LayoutContextProvider } from '../../context/LayoutContextProvider'
import { AppointmentContextProvider } from '../../context/AppointmentContextProvider'
import { useLayout } from '../../context/useLayout'

export interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppointmentContextProvider>
      <LayoutContextProvider>
        <LayoutContent>{children}</LayoutContent>
      </LayoutContextProvider>
    </AppointmentContextProvider>
  )
}

interface LayoutContentProps {
  children: React.ReactNode
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const { activeModal, setActiveModal } = useLayout()

  return (
    <div className="min-h-screen bg-[#EDF0F8]">
      <TopNav />
      <MainContent>{children}</MainContent>
      <AddPatientModal
        isOpen={activeModal === 'addPatient'}
        onClose={() => setActiveModal(null)}
      />
      <AddAppointmentModal
        isOpen={activeModal === 'addAppointment'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  )
}

interface MainContentProps {
  children: React.ReactNode
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <main className="p-6">{children}</main>
}
