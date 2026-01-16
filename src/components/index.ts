//  Foundational UI Components
export { Button, type ButtonProps } from './ui'
export { Input, Select, SearchInput, type InputProps, type SelectProps } from './ui'
export { Icon, IconPresets, type IconName, type IconProps } from './ui'
export { Modal, BaseModal, type BaseModalProps, type ModalProps } from './ui'

//  Shared/Reusable Components
export { SortModal, type SortOption } from './shared'
export { ClinicFilterModal, type ClinicType } from './shared'
export { PatientSearchDropdown } from './shared'

//  Navigation Components
export { TopNav, type TopNavProps } from './navigation'
export { HamburgerMenu, type HamburgerMenuProps } from './navigation'
export { UserProfileDropdown, type UserProfileDropdownProps } from './navigation'

//  Dashboard Components
export { DashboardHeader, type DashboardHeaderProps } from '../widgets/appointmentTable'
export { StatusBadge, type StatusBadgeProps } from '../widgets/appointmentTable'
export { AppointmentCard, type AppointmentCardProps } from '../widgets/appointmentTable'
export { AppointmentsList, type AppointmentsListProps } from '../widgets/appointmentTable'
export { AppointmentsTable, type AppointmentsTableProps } from '../widgets/appointmentTable'

//  Modal Components
export { AddPatientModal, type AddPatientModalProps } from './modals'
export { AddAppointmentModal, type AddAppointmentModalProps } from './modals'
export { ClinicSelectionDropdown, type ClinicSelectionDropdownProps } from './modals'
export { AppointmentTypeDropdown, type AppointmentTypeDropdownProps } from './modals'

//  Layout Component
export { Layout, type LayoutProps } from './layout'

// Context & Hooks
export { useLayout } from '../context/useLayout'
