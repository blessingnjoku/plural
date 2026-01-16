import React, { useState } from 'react'
import { Icon } from '../../shared/ui'

export type ClinicValue = 'accident' | 'neurology' | 'cardiology' | 'gastroenterology' | 'renal'

export interface ClinicSelectionDropdownProps {
  isOpen: boolean
  onClose: () => void
  onSelectClinic: (clinic: ClinicValue) => void
  selectedClinic?: ClinicValue
}

const CLINICS: { label: string; value: ClinicValue }[] = [
  { label: 'Accident and Emergency', value: 'accident' },
  { label: 'Neurology', value: 'neurology' },
  { label: 'Cardiology', value: 'cardiology' },
  { label: 'Gastroenterology', value: 'gastroenterology' },
  { label: 'Renal', value: 'renal' },
]

export const ClinicSelectionDropdown: React.FC<ClinicSelectionDropdownProps> = ({
  isOpen,
  onClose,
  onSelectClinic,
  selectedClinic,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  if (!isOpen) return null

  const filteredClinics = CLINICS.filter((clinic) =>
    clinic.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectClinic = (clinic: ClinicValue) => {
    onSelectClinic(clinic)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal - Centered */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="w-[538px] h-[516px] bg-white rounded-[10px] shadow-lg pointer-events-auto flex flex-col p-8">
          {/* Header */}
          <h3 className="text-lg font-semibold text-[#051438] mb-6">Clinic</h3>

          {/* Search Input */}
          <div className="relative mb-4 flex-shrink-0">
            <input
              type="text"
              placeholder="Search clinic"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-[474px] h-[44px] px-4 py-3 border border-[#E5E7EB] rounded-[10px] bg-white text-sm text-[#051438] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
            />
            {/* Search Icon */}
            <Icon
              name="search"
              size={20}
              className="absolute right-3 top-3 text-neutral-600 pointer-events-none"
            />
          </div>

          {/* Clinics List */}
          <div className="flex-1 overflow-y-auto space-y-1">
            {filteredClinics.length === 0 ? (
              <div className="px-4 py-6 text-center text-neutral-500 text-sm">
                No clinics found
              </div>
            ) : (
              filteredClinics.map((clinic) => (
                <button
                  key={clinic.value}
                  onClick={() => handleSelectClinic(clinic.value)}
                  className={`w-full px-4 py-3 text-left rounded-lg transition-all flex items-center justify-between ${
                    selectedClinic === clinic.value
                      ? 'bg-[#F3F0FF] text-[#6658F4]'
                      : 'text-[#051438] hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium">{clinic.label}</span>
                  {selectedClinic === clinic.value && (
                    <span className="text-[#6658F4] text-lg">✓</span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
