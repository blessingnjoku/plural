import React from 'react'
import { Button } from './Button'
import { SearchInput } from './Input'
import { Icon, IconPresets } from './Icon'

interface DashboardHeaderProps {
  onAddPatient?: () => void
  onCreateAppointment?: () => void
  onSearch?: (query: string) => void
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onAddPatient,
  onCreateAppointment,
  onSearch,
}) => {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <PageTitle />

      {/* Search & Actions */}
      <SearchAndActions
        onAddPatient={onAddPatient}
        onCreateAppointment={onCreateAppointment}
        onSearch={onSearch}
      />
    </div>
  )
}

const PageTitle: React.FC = () => (
  <div>
    <h1 className="text-heading-1 text-neutral-900">Appointments</h1>
    <p className="text-body-lg text-neutral-600">
      Manage patient appointments and schedules
    </p>
  </div>
)

interface SearchAndActionsProps {
  onAddPatient?: () => void
  onCreateAppointment?: () => void
  onSearch?: (query: string) => void
}

const SearchAndActions: React.FC<SearchAndActionsProps> = ({
  onAddPatient,
  onCreateAppointment,
  onSearch,
}) => (
  <div className="flex items-end gap-4">
    <div className="flex-1">
      <SearchInput
        placeholder="Find patient ..."
        onSearch={onSearch}
        className="w-full"
      />
    </div>

    <div className="flex gap-3 flex-shrink-0">
      <Button variant="secondary" size="md" onClick={onAddPatient}>
        <div className="flex items-center gap-2">
          Add new patient
          <Icon name="plus-circle" size={IconPresets.sm} alt="Add" />
        </div>
      </Button>

      <Button variant="primary" size="md" onClick={onCreateAppointment}>
        <div className="flex items-center gap-2">
          Create appointment
          <Icon name="plus-circle" size={IconPresets.sm} alt="Create" />
        </div>
      </Button>
    </div>
  </div>
);
