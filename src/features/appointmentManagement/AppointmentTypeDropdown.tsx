import React from 'react'

export type AppointmentTypeValue =
  | 'walk-in' | 'referral' | 'consult'
  | 'follow-up'
  | 'medical-exam'

export interface AppointmentTypeDropdownProps {
  isOpen: boolean
  onClose: () => void
  onSelectType: (type: AppointmentTypeValue) => void
  selectedType?: AppointmentTypeValue
}

const APPOINTMENT_TYPES = [
  {
    section: 'New (Walk-in, Referral, Consult)',
    items: [
      { label: 'Walk-in', value: 'walk-in' as const },
      { label: 'Referral', value: 'referral' as const },
      { label: 'Consult', value: 'consult' as const },
    ],
  },
  {
    section: 'Follow-up',
    items: [{ label: 'Follow-up', value: 'follow-up' as const }],
  },
  {
    section: 'For Medical Exam',
    items: [{ label: 'For Medical Exam', value: 'medical-exam' as const }],
  },
]

export const AppointmentTypeDropdown: React.FC<AppointmentTypeDropdownProps> = ({
  isOpen,
  onClose,
  onSelectType,
  selectedType,
}) => {
  if (!isOpen) return null

  const handleSelectType = (type: AppointmentTypeValue) => {
    onSelectType(type)
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
        <div className="w-[538px] max-h-[516px] bg-white rounded-[13.94px] shadow-lg pointer-events-auto flex flex-col overflow-y-auto">
          {APPOINTMENT_TYPES.map((section, idx) => (
            <div key={idx}>
              <div className="px-4 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                {section.section}
              </div>
              {section.items.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleSelectType(item.value)}
                  className={`w-full px-4 py-3 text-left flex items-center justify-between transition-all ${
                    selectedType === item.value
                      ? 'bg-[#F3F0FF] text-[#6658F4]'
                      : 'text-[#051438] hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                  {selectedType === item.value && (
                    <span className="text-[#6658F4] text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
