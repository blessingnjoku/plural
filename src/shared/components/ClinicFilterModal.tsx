import React from 'react'

export type ClinicType = 'accident' | 'neurology' | 'cardiology' | 'gastroenterology' | 'renal'

export interface ClinicFilterModalProps {
  isOpen: boolean
  onClose: () => void
  selectedClinic?: ClinicType
  onSelectClinic: (clinic: ClinicType) => void
}

const CLINICS: { label: string; value: ClinicType }[] = [
  { label: 'Accident and Emergency', value: 'accident' },
  { label: 'Neurology', value: 'neurology' },
  { label: 'Cardiology', value: 'cardiology' },
  { label: 'Gastroenterology', value: 'gastroenterology' },
  { label: 'Renal', value: 'renal' },
]

export const ClinicFilterModal: React.FC<ClinicFilterModalProps> = ({
  isOpen,
  onClose,
  selectedClinic,
  onSelectClinic,
}) => {
  if (!isOpen) return null

  const handleSelectClinic = (clinic: ClinicType) => {
    onSelectClinic(clinic)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[110] bg-transparent cursor-default"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className="absolute top-full left-0 mt-2 w-60 max-h-72 bg-white rounded-lg border border-neutral-200 shadow-lg z-[111] overflow-y-auto py-4">
        {CLINICS.map((clinic) => (
          <button
            key={clinic.value}
            onClick={() => handleSelectClinic(clinic.value)}
            className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
              selectedClinic === clinic.value
                ? 'bg-purple-50 text-purple-600'
                : 'text-[#051438] hover:bg-gray-50'
            }`}
          >
            <span>{clinic.label}</span>
            {selectedClinic === clinic.value && (
              <span className="text-purple-600 text-lg ml-2">✓</span>
            )}
          </button>
        ))}
      </div>
    </>
  )
}
