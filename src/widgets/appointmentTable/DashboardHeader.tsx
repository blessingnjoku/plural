import React, { useState, useRef, useEffect } from 'react'
import { Button, Icon, IconPresets, SearchInput } from '../../shared/ui'
import { HamburgerMenu } from '../../shared/navigation'
import { SortModal, type SortOption, ClinicFilterModal, type ClinicType } from '../../shared/components'

export interface DashboardHeaderProps {
  onAddPatient?: () => void
  onCreateAppointment?: () => void
  onSearch?: (query: string) => void
  onSortChange?: (sort: SortOption) => void
  onClinicFilter?: (clinic: ClinicType | null) => void
  totalAppointments?: number
  currentPage?: number
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onAddPatient,
  onCreateAppointment,
  onSearch,
  onSortChange,
  onClinicFilter,
  totalAppointments = 197,
  currentPage = 1,
}) => {
  const [sortOpen, setSortOpen] = useState(false)
  const [clinicOpen, setClinicOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState<SortOption | undefined>()
  const [selectedClinic, setSelectedClinic] = useState<ClinicType | undefined>()
  const sortRef = useRef<HTMLDivElement>(null)
  const clinicRef = useRef<HTMLDivElement>(null)

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false)
      }
      if (clinicRef.current && !clinicRef.current.contains(event.target as Node)) {
        setClinicOpen(false)
      }
    }

    if (sortOpen || clinicOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sortOpen, clinicOpen])

  const handleSortSelect = (sort: SortOption) => {
    setSelectedSort(sort)
    onSortChange?.(sort)
  }

  const handleClinicSelect = (clinic: ClinicType) => {
    setSelectedClinic(clinic)
    onClinicFilter?.(clinic)
  }
  return (
    <div className="space-y-2 mx-8">
      <SearchInput
        placeholder="Find patient"
        onSearch={onSearch}
        className="w-full"
      />
      {/* Top Row: Add Patient Button | Create Appointment Button */}
      <div className="hidden md:flex items-center justify-between gap-4">
        <Button
          variant="primary"
          size="md"
          onClick={onAddPatient}
          className="flex-shrink-0"
        >
          <div className="flex items-center gap-2">
            Add new patient
            <Icon name="plus-circle" size={IconPresets.sm} alt="Add" />
          </div>
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={onCreateAppointment}
          className="flex-shrink-0"
        >
          <div className="flex items-center gap-2">
            Create appointment
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.474 2.13333H12.8657V0H11.7936V2.13333H4.28858V0H3.21643V2.13333H1.60822C0.720023 2.13333 0 2.84968 0 3.73333V14.4C0 15.2837 0.720024 16 1.60822 16H14.474C15.3621 16 16.0822 15.2837 16.0822 14.4V3.73333C16.0822 2.84968 15.3621 2.13333 14.474 2.13333ZM3.75251 9.63333C3.75251 9.90948 3.97636 10.1333 4.25251 10.1333H6.96894V12.8333C6.96894 13.1095 7.1928 13.3333 7.46894 13.3333H8.61323C8.88937 13.3333 9.11323 13.1095 9.11323 12.8333V10.1333H11.8297C12.1058 10.1333 12.3297 9.90948 12.3297 9.63333V8.5C12.3297 8.22386 12.1058 8 11.8297 8H9.11323V5.3C9.11323 5.02386 8.88937 4.8 8.61323 4.8H7.46894C7.1928 4.8 6.96894 5.02386 6.96894 5.3V8H4.25251C3.97636 8 3.75251 8.22386 3.75251 8.5V9.63333Z"
                fill="white"
              />
            </svg>
          </div>
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex justify-end">
        <HamburgerMenu />
      </div>

      {/* Bottom Row: Appointments Title + Filters | Pagination */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 pt-6 pb-[8px]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-[62px] w-full md:w-auto">
          {/* Title - Hidden on Mobile */}
          <h1 className="hidden md:block text-lg lg:text-heading-2 font-bold text-[#051438]">
            Appointments
          </h1>

          {/* Clinic Filter Dropdown - Mobile and Desktop */}
          <div className="relative flex-1 md:flex-none w-full md:w-auto" ref={clinicRef}>
            <button
              onClick={() => setClinicOpen(!clinicOpen)}
              className="flex items-center justify-between gap-2 px-3 md:px-3 py-2 text-xs md:text-base font-semibold font-gilroy text-[#051438] hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700 rounded-md w-full md:w-auto"
            >
              All clinics
              <svg
                className="w-4 h-4 text-neutral-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
            <ClinicFilterModal
              isOpen={clinicOpen}
              onClose={() => setClinicOpen(false)}
              selectedClinic={selectedClinic}
              onSelectClinic={handleClinicSelect}
            />
          </div>

          {/* Sort Button - Mobile and Desktop */}
          <div className="relative flex-1 md:flex-none w-full md:w-auto" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center justify-between gap-2 px-3 md:px-3 py-2 text-xs md:text-base font-semibold font-gilroy text-[#0B0C7D] hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700 rounded-md w-full md:w-auto"
            >
              <Icon name="sort" size={IconPresets.sm} />
              Sort by
            </button>
            <SortModal
              isOpen={sortOpen}
              onClose={() => setSortOpen(false)}
              selectedSort={selectedSort}
              onSelectSort={handleSortSelect}
            />
          </div>
        </div>

        {/* Pagination Info + Navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full md:w-auto">
          <span className="text-xs md:text-body-md text-neutral-600">
            1 - 20 of {totalAppointments}
          </span>
          <div className="flex gap-1">
            <button
              className="p-2 text-[#4B5563] hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="p-2 text-[#4B5563] hover:bg-neutral-100 rounded-md transition-colors"
              aria-label="Next page"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
