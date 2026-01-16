import { Layout, useLayout, DashboardHeader } from './components'
import './App.css'

function App() {
  return (
    <Layout>
      <AppointmentsDashboard />
    </Layout>
  )
}

const AppointmentsDashboard = () => {
  const { setActiveModal, setSelectedPatient } = useLayout()

  const handleAddPatient = () => {
    setSelectedPatient(null)
    setActiveModal('addPatient')
  }

  const handleCreateAppointment = () => {
    setActiveModal('addAppointment')
  }

  const handleSearch = (query: string) => {
    console.log('Search:', query)
    // TODO: Implement search
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        onAddPatient={handleAddPatient}
        onCreateAppointment={handleCreateAppointment}
        onSearch={handleSearch}
      />

  
    </div>
  )
}

export default App
