import { useState, useMemo } from 'react'
import {
  Layout,
  useLayout,
  DashboardHeader,
  AppointmentsTable,
  type SortOption,
  type ClinicType,
} from './components'
import { useAppointment } from './context/useAppointment'
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
  const { appointments } = useAppointment()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption | undefined>()
  const [selectedClinic, setSelectedClinic] = useState<ClinicType | undefined>()

  // Apply search, sort, and filter
  const filteredAppointments = useMemo(() => {
    let result = [...appointments]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((apt) => {
        const fullName = `${apt.patient.firstName} ${apt.patient.lastName}`.toLowerCase()
        const patientId = apt.patient.id.toLowerCase()
        return fullName.includes(query) || patientId.includes(query)
      })
    }

    // Clinic filter
    if (selectedClinic) {
      const clinicMap: Record<ClinicType, string> = {
        accident: 'Accident & Emergency',
        neurology: 'Neurology',
        cardiology: 'Cardiology',
        gastroenterology: 'Gastroenterology',
        renal: 'Renal',
      }
      result = result.filter((apt) => apt.clinic === clinicMap[selectedClinic])
    }

    // Sort
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return `${a.patient.firstName} ${a.patient.lastName}`.localeCompare(
              `${b.patient.firstName} ${b.patient.lastName}`
            )
          case 'name-desc':
            return `${b.patient.firstName} ${b.patient.lastName}`.localeCompare(
              `${a.patient.firstName} ${a.patient.lastName}`
            )
          case 'id-asc':
            return a.patient.id.localeCompare(b.patient.id)
          case 'id-desc':
            return b.patient.id.localeCompare(a.patient.id)
          case 'gender-male':
            return a.patient.gender === 'Male' ? -1 : 1
          case 'gender-female':
            return a.patient.gender === 'Female' ? -1 : 1
          case 'gender-other':
            return a.patient.gender === 'Other' ? -1 : 1
          case 'age-youngest':
            return a.patient.age - b.patient.age
          case 'age-oldest':
            return b.patient.age - a.patient.age
          case 'date-latest':
            return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
          case 'date-oldest':
            return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
          case 'status-asc':
            return a.status.localeCompare(b.status)
          case 'status-desc':
            return b.status.localeCompare(a.status)
          default:
            return 0
        }
      })
    } else {
      // Default: Sort by date descending (latest first)
      result.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
    }

    return result
  }, [appointments, searchQuery, sortBy, selectedClinic])

  /**
   * Delete an appointment from the list
   * @param id - The appointment ID to delete
   */
  const handleDeleteAppointment = (id: string) => {
    // TODO: Implement appointment deletion via context when delete is added
    console.log('Delete appointment:', id)
  }

  /**
   * Edit an appointment
   * @param id - The appointment ID to edit
   */
  const handleEditAppointment = (id: string) => {
    // TODO: Open edit modal with appointment data
    console.log('Edit appointment:', id)
  }

  /**
   * Open add patient modal
   */
  const handleAddPatient = () => {
    setSelectedPatient(null)
    setActiveModal('addPatient')
  }

  /**
   * Open create appointment modal
   */
  const handleCreateAppointment = () => {
    setActiveModal('addAppointment')
  }

  /**
   * Handle search query change
   * @param query - The search query string
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  /**
   * Handle sort option change
   * @param sort - The sort option selected
   */
  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
  }

  /**
   * Handle clinic filter change
   * @param clinic - The clinic type to filter by, or null to clear filter
   */
  const handleClinicFilter = (clinic: ClinicType | null) => {
    setSelectedClinic(clinic || undefined)
  }

  return (
    <div className="space-y-8 w-full  bg-[#EDF0F8] min-h-screen">
      <DashboardHeader
        onAddPatient={handleAddPatient}
        onCreateAppointment={handleCreateAppointment}
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        onClinicFilter={handleClinicFilter}
      />

      <AppointmentsTable
        appointments={filteredAppointments}
        onEdit={handleEditAppointment}
        onDelete={handleDeleteAppointment}
      />
    </div>
  )
}

export default App
