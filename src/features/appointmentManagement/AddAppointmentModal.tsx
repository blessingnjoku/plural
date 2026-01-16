import React, { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useLayout } from '../../app/hooks/useLayout'
import { useAppointment } from '../../app/hooks/useAppointment'
import { Modal, SearchInput } from '../../shared/ui'
import { PatientSearchDropdown } from './PatientSearchDropdown'
import { ClinicSelectionDropdown } from './ClinicSelectionDropdown'
import { AppointmentTypeDropdown } from './AppointmentTypeDropdown'
import {
  validateAppointmentForm,
  createAppointment,
  type AppointmentValidationErrors,
} from '../../entities/appointment/appointmentValidation'
import type { Patient } from '../../entities/appointment'
import type { ClinicValue } from './ClinicSelectionDropdown'
import type { AppointmentTypeValue } from './AppointmentTypeDropdown'
import '../../shared/styles/datepicker.css'

export interface AddAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({ isOpen, onClose }) => {
  const { createdPatient, setCreatedPatient } = useLayout()
  const { addAppointment } = useAppointment()
  
  const [patientSearchQuery, setPatientSearchQuery] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(createdPatient)
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 8, 25))
  const [selectedClinic, setSelectedClinic] = useState<ClinicValue | undefined>()
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<AppointmentTypeValue | undefined>()
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date')
  const [validationErrors, setValidationErrors] = useState<AppointmentValidationErrors>({})
  
  const [showPatientSearch, setShowPatientSearch] = useState(false)
  const [showClinicDropdown, setShowClinicDropdown] = useState(false)
  const [showAppointmentTypeDropdown, setShowAppointmentTypeDropdown] = useState(false)
  
  const patientSearchRef = useRef<HTMLDivElement>(null)
  const clinicRef = useRef<HTMLDivElement>(null)
  const appointmentTypeRef = useRef<HTMLDivElement>(null)

  // Handle date picker change
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (patientSearchRef.current && !patientSearchRef.current.contains(event.target as Node)) {
        setShowPatientSearch(false)
      }
      if (clinicRef.current && !clinicRef.current.contains(event.target as Node)) {
        setShowClinicDropdown(false)
      }
      if (appointmentTypeRef.current && !appointmentTypeRef.current.contains(event.target as Node)) {
        setShowAppointmentTypeDropdown(false)
      }
    }

    if (showPatientSearch || showClinicDropdown || showAppointmentTypeDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPatientSearch, showClinicDropdown, showAppointmentTypeDropdown])

  // Update selected patient when created patient changes
  useEffect(() => {
    if (createdPatient) {
      setSelectedPatient(createdPatient)
    }
  }, [createdPatient])

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient)
    setPatientSearchQuery(`${patient.firstName} ${patient.lastName} - ${patient.id}`)
    setShowPatientSearch(false)
  }

  const handleCreateAppointment = () => {
    // Validate all appointment fields
    const errors = validateAppointmentForm({
      patient: selectedPatient,
      clinic: selectedClinic,
      appointmentType: selectedAppointmentType,
      date: selectedDate,
    })

    // If validation errors exist, display them and return early
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    // Clear previous validation errors
    setValidationErrors({})

    // Create appointment object with validated data
    const appointment = createAppointment({
      patient: selectedPatient!,
      clinic: selectedClinic!,
      appointmentType: selectedAppointmentType!,
      date: selectedDate!,
    })

    // Add appointment to context
    addAppointment(appointment)

    // Reset form state and close modal
    setCreatedPatient(null)
    setSelectedPatient(null)
    setPatientSearchQuery('')
    setShowPatientSearch(false)
    setShowClinicDropdown(false)
    setShowAppointmentTypeDropdown(false)
    setSelectedClinic(undefined)
    setSelectedAppointmentType(undefined)
    setSelectedDate(new Date())
    setValidationErrors({})

    onClose()
  }

  const formatDisplayDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = selectedDate.getDate()
    const month = months[selectedDate.getMonth()].substring(0, 3)
    const year = selectedDate.getFullYear()
    const date = `${day} ${month} ${year}`
    
    const minutes = String(selectedDate.getMinutes()).padStart(2, '0')
    const period = selectedDate.getHours() >= 12 ? 'PM' : 'AM'
    const displayHours = selectedDate.getHours() % 12 || 12
    const time = `${displayHours}:${minutes} ${period}`
    
    return { date, time }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title="Add new appointment"
      closeButton
    >
      <div className="w-full max-w-[716px] bg-[#EDF0F8] pt-0 pb-6 rounded-none flex flex-col gap-0 max-h-[80vh] overflow-auto  scrollbar-hide">
        {/* Error Banner */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="bg-red-50 border-b-2 border-red-300 px-4 md:px-6 py-3">
            <p className="text-red-700 font-medium text-sm">Please fix the following errors:</p>
            <ul className="text-red-600 text-xs md:text-sm mt-1 space-y-1">
              {Object.entries(validationErrors).map(([field, message]) => (
                <li key={field}>• {message}</li>
              ))}
            </ul>
          </div>
        )}
        <form className="space-y-0 flex flex-col flex-1 pt-1">
          {/* Find Patient Search with Dropdown */}
          <div
            className="pb-3 mb-1 relative"
            ref={patientSearchRef}
          >
            <SearchInput
              value={patientSearchQuery}
              onChange={(e) => {
                setPatientSearchQuery(e.target.value);
                setShowPatientSearch(true);
              }}
              onFocus={() => setShowPatientSearch(true)}
              placeholder="Find patient"
            />
            <PatientSearchDropdown
              isOpen={showPatientSearch}
              onClose={() => setShowPatientSearch(false)}
              searchQuery={patientSearchQuery}
              onSelectPatient={handlePatientSelect}
              selectedPatient={selectedPatient}
            />
          </div>

          {/* Clinic Row */}
          <div
            className="flex items-center px-4 md:px-6 justify-between py-3 border-b border-gray-300 relative"
            ref={clinicRef}
          >
            <span className="font-medium px-2 py-0.5 text-sm md:text-base text-[#677597]">
              Clinic
            </span>
            <div
              className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-75"
              onClick={() => {
                setShowClinicDropdown(!showClinicDropdown);
                setShowPatientSearch(false);
                setShowAppointmentTypeDropdown(false);
              }}
            >
              <span className="font-medium text-gray-900 text-sm md:text-base">
                {selectedClinic
                  ? selectedClinic.charAt(0).toUpperCase() +
                    selectedClinic.slice(1)
                  : "Clinic"}
              </span>
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-gray-600"
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
            </div>
            <ClinicSelectionDropdown
              isOpen={showClinicDropdown}
              onClose={() => setShowClinicDropdown(false)}
              onSelectClinic={setSelectedClinic}
              selectedClinic={selectedClinic}
            />
          </div>

          {/* Title Row */}
          <div
            className="flex items-center px-4 md:px-6 justify-between py-3 border-b border-gray-300 relative"
            ref={appointmentTypeRef}
          >
            <span className="font-medium px-2 py-0.5 text-sm md:text-base text-[#677597]">
              Title
            </span>
            <div
              className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-75"
              onClick={() => {
                setShowAppointmentTypeDropdown(!showAppointmentTypeDropdown);
                setShowPatientSearch(false);
                setShowClinicDropdown(false);
              }}
            >
              <span className="font-medium text-gray-900 text-sm md:text-base">
                {selectedAppointmentType
                  ? selectedAppointmentType
                      .replace("-", " ")
                      .charAt(0)
                      .toUpperCase() +
                    selectedAppointmentType.slice(1).replace("-", " ")
                  : "Appointment type"}
              </span>
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-gray-600"
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
            </div>
            <AppointmentTypeDropdown
              isOpen={showAppointmentTypeDropdown}
              onClose={() => setShowAppointmentTypeDropdown(false)}
              onSelectType={setSelectedAppointmentType}
              selectedType={selectedAppointmentType}
            />
          </div>

          {/* Time Row */}
          <div className="flex px-4 md:px-6 items-center justify-between py-3 border-b border-gray-300">
            <span className="font-medium px-2 py-0.5 text-sm md:text-base text-[#677597]">
              Time
            </span>
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-900 text-sm md:text-base">
                {formatDisplayDate().date}
              </span>
              <span className="font-medium text-gray-900 text-sm md:text-base">
                {formatDisplayDate().time}
              </span>
            </div>
          </div>

          {/* Calendar Picker */}
          <div className="w-full mt-6 md:mt-8 bg-[#677597] text-white">
            {/* Header Row: Menu Icon, Calendar/Time Display, Time Icon */}
            <div className="flex justify-between gap-5 px-6 py-4 items-start">
              {/* Left: Menu Icon - Switch to Date */}
              <button
                type="button"
                onClick={() => setPickerMode("date")}
                className="p-1 hover:opacity-75"
                aria-label="Switch to calendar"
              >
                <svg
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.26667 4.79999H16M0 4.79999H2.13333M4.26667 0.533325H16M0 0.533325H2.13333M4.26667 9.06666H16M0 9.06666H2.13333"
                    stroke="white"
                    stroke-width="1.06667"
                  />
                </svg>
              </button>

              {/* Center: Calendar/Time display */}
              <div className="flex">
                <div className="react-datepicker-wrapper">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    // dateFormat={pickerMode === 'date' ? 'MMMM d, yyyy' : 'h:mm aa'}
                    inline
                    showTimeInput={pickerMode === "time"}
                    showTimeSelectOnly={pickerMode === "time"}
                    timeIntervals={15}
                    wrapperClassName="w-full"
                    formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
                    dateFormat="MM/dd/yyyy h:mm aa"
                  />
                </div>
              </div>

              {/* Right: Time Icon - Switch to Time */}
              <button
                type="button"
                onClick={() => setPickerMode("time")}
                className="p-1 hover:opacity-75 flex-shrink-0 text-blue-300"
                aria-label="Switch to time picker"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM7.46667 7.99991V3.2H8.53333V7.77909L11.5771 10.8229L10.8229 11.5771L7.62288 8.37712C7.51874 8.27298 7.46667 8.1364 7.46667 7.99991Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Repeat Field */}
          <div className="flex items-center justify-between py-3  mt-4 md:mt-6 px-4 md:px-6">
            <span className="text-gray-600 font-medium text-sm md:text-base">
              Repeat
            </span>
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:opacity-75">
              <span className="font-medium text-gray-900 text-sm md:text-base">
                Does not repeat
              </span>
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-gray-600"
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex px-4 md:px-6 gap-2 pt-4 md:pt-6 mt-auto  justify-end flex-col md:flex-row">
            <button
              type="button"
              onClick={handleCreateAppointment}
              className=" px-[16px] py-[12px]  rounded-[10px] text-sm border border-[#6658F4] bg-white text-[#6658F4] font-medium hover:bg-purple-50 transition-colors"
            >
              Save & Close
            </button>
            <button
              type="button"
              onClick={() => {
                setPatientSearchQuery('')
                setShowPatientSearch(false)
                onClose()
              }}
              className=" px-[16px] py-[12px] rounded-[10px] text-sm border border-[#0B0C7D] bg-[#0B0C7D] text-white font-medium hover:bg-blue-900 transition-colors"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
