import React from 'react'
import type { Patient } from '../../types'
import { useAppointment } from '../../context/useAppointment'

export interface PatientSearchDropdownProps {
  isOpen: boolean
  onClose: () => void
  searchQuery: string
  onSelectPatient: (patient: Patient) => void
  selectedPatient?: Patient | null
  refreshKey?: number
}

export const PatientSearchDropdown: React.FC<PatientSearchDropdownProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSelectPatient,
  selectedPatient,
  refreshKey,
}) => {
  const { searchPatients } = useAppointment()
  
  if (!isOpen) return null

  // Filter patients based on search query using context
  const filteredPatients = searchPatients(searchQuery)

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
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[652px] max-h-60 bg-white rounded-lg border border-neutral-200 shadow-lg z-50 overflow-y-auto p-4">
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
