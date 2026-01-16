import React from 'react'
import { TopNav } from '../navigation'
import { AddAppointmentModal } from '../../features/appointmentManagement'
import { AddPatientModal } from '../../features/patientManagement'
import { LayoutContextProvider } from '../../app/providers/context/LayoutContextProvider'
import { AppointmentContextProvider } from '../../app/providers/context/AppointmentContextProvider'
import { useLayout } from '../../app/hooks/useLayout'
import { AnalyticsIcon } from '../ui/AnalyticsIcon'

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
      <AnalyticsIcon />
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
