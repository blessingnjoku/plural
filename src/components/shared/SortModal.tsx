import React from 'react'

export type SortOption = 
  | 'name-asc' | 'name-desc'
  | 'id-asc' | 'id-desc'
  | 'gender-male' | 'gender-female' | 'gender-other'
  | 'age-youngest' | 'age-oldest'
  | 'date-latest' | 'date-oldest'
  | 'status-asc' | 'status-desc'

export interface SortModalProps {
  isOpen: boolean
  onClose: () => void
  selectedSort?: SortOption
  onSelectSort: (sort: SortOption) => void
}

const SORT_SECTIONS = [
  {
    title: 'Patient name',
    items: [
      { label: 'Patient name: A–Z', value: 'name-asc' as const },
      { label: 'Patient name: Z–A', value: 'name-desc' as const },
    ],
  },
  {
    title: 'Patient ID',
    items: [
      { label: 'Patient ID: Ascending', value: 'id-asc' as const },
      { label: 'Patient ID: Descending', value: 'id-desc' as const },
    ],
  },
  {
    title: 'Gender',
    items: [
      { label: 'Gender: Male', value: 'gender-male' as const },
      { label: 'Gender: Female', value: 'gender-female' as const },
      { label: 'Gender: Other', value: 'gender-other' as const },
    ],
  },
  {
    title: 'Age',
    items: [
      { label: 'Age: Youngest', value: 'age-youngest' as const },
      { label: 'Age: Oldest', value: 'age-oldest' as const },
    ],
  },
  {
    title: 'Time / Date',
    items: [
      { label: 'Time/Date: Latest', value: 'date-latest' as const },
      { label: 'Time/Date: Oldest', value: 'date-oldest' as const },
    ],
  },
  {
    title: 'Status',
    items: [
      { label: 'Status: A–Z', value: 'status-asc' as const },
      { label: 'Status: Z–A', value: 'status-desc' as const },
    ],
  },
]

export const SortModal: React.FC<SortModalProps> = ({
  isOpen,
  onClose,
  selectedSort,
  onSelectSort,
}) => {
  if (!isOpen) return null

  const handleSelectSort = (sort: SortOption) => {
    onSelectSort(sort)
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
      <div className="absolute top-full left-0 mt-2 w-60 max-h-72 bg-white rounded-lg border border-neutral-200 shadow-lg z-[111] overflow-y-auto">
        {SORT_SECTIONS.map((section, idx) => (
          <div key={idx}>
            <div className="px-4 py-2.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {section.title}
            </div>
            {section.items.map((item) => (
              <button
                key={item.value}
                onClick={() => handleSelectSort(item.value)}
                className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                  selectedSort === item.value
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-[#051438] hover:bg-gray-50'
                }`}
              >
                <span>{item.label}</span>
                {selectedSort === item.value && (
                  <span className="text-purple-600 text-lg ml-2">✓</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
