import React from 'react'
import type { Patient } from '../../entities/appointment'
import { mockAppointmentModalPatients } from '../../entities/appointment/types'

export interface PatientSearchDropdownProps {
  isOpen: boolean
  onClose: () => void
  searchQuery: string
  onSelectPatient: (patient: Patient) => void
  selectedPatient?: Patient | null
}

export const PatientSearchDropdown: React.FC<PatientSearchDropdownProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSelectPatient,
  selectedPatient,
}) => {
  if (!isOpen) return null

  // Filter patients based on search query
  const filteredPatients = mockAppointmentModalPatients.filter((patient) => {
    if (!searchQuery.trim()) return true // Show all patients when search is empty
    const query = searchQuery.toLowerCase()
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase()
    const patientId = patient.id.toLowerCase()
    const fullFormat = `${patient.firstName} ${patient.lastName} - ${patient.id}`.toLowerCase()
    return fullName.includes(query) || patientId.includes(query) || fullFormat.includes(query)
  })

  const handleSelectPatient = (patient: Patient) => {
    onSelectPatient(patient)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-transparent cursor-default"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className="absolute top-full left-0 mt-2 w-[652px] max-h-60 bg-white rounded-lg border border-neutral-200 shadow-lg z-50 overflow-y-auto p-4">
        {filteredPatients.length === 0 ? (
          <div className="px-5 py-5 text-center text-neutral-500 text-sm">
            No patients found
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => handleSelectPatient(patient)}
              className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-colors mb-2 ${
                selectedPatient?.id === patient.id
                  ? 'bg-purple-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-row items-center gap-3 w-full">
                <div className="text-sm font-semibold text-[#051438]">
                  {patient.firstName} {patient.lastName}
                </div>
                <div className="text-xs text-[#677597]">
                  {patient.id} • {patient.age} yrs • {patient.gender}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </>
  )
}
