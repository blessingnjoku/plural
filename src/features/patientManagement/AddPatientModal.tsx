import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Modal, Icon } from '../../shared/ui'
import { useLayout } from '../../app/hooks/useLayout'
import { useAppointment } from '../../app/hooks/useAppointment'
import {
  validatePatientForm,
  calculateAge,
  generatePatientId,
  clearFieldError,
  type ValidationErrors,
} from '../../entities/patient/patientValidation'
import fingerprintIcon from '../../assets/fingerprint.svg'
import appointmentIcon from '../../assets/appointment.svg'
import '../../shared/styles/datepicker.css'

export interface AddPatientModalProps {
  isOpen: boolean
  onClose: () => void
}


export const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose }) => {
  const { setActiveModal } = useLayout()
  const { addPatient } = useAppointment()
  
  const [formData, setFormData] = useState({
    patientId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    title: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    isNewToHospital: false,
  })

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))

    
    if (validationErrors[name]) {
      setValidationErrors(clearFieldError(validationErrors, name))
    }
  }

  const handleDateChange = (date: Date | null) => {
    const dateString = date ? date.toISOString().split('T')[0] : ''
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: dateString,
    }))
  }

  /**
   * Handles saving and closing the modal
   * Validates all required fields before saving patient to context
   */
  const handleSaveAndClose = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form using utility function
    const errors = validatePatientForm(formData)

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    // Clear previous errors
    setValidationErrors({})

    try {
      // Create patient object with validated data
      const newPatient = {
        id: formData.patientId || generatePatientId(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as 'Male' | 'Female' | 'Other',
        age: calculateAge(formData.dateOfBirth),
        phoneNumber: formData.phoneNumber.trim(),
      }

      // Add patient to context
      addPatient(newPatient)

      console.log('Patient saved successfully:', newPatient)

      // Reset form
      setFormData({
        patientId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        title: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        isNewToHospital: false,
      })

      onClose()
    } catch (error) {
      console.error('Error saving patient:', error)
      setValidationErrors({ submit: 'An error occurred while saving the patient. Please try again.' })
    }
  }

  /**
   * Handles creating an appointment after patient validation
   * Validates form and opens appointment modal with patient data
   */
  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form using utility function
    const errors = validatePatientForm(formData)

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    // Create patient object with validated data
    const newPatient = {
      id: formData.patientId || generatePatientId(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender as 'Male' | 'Female' | 'Other',
      age: calculateAge(formData.dateOfBirth),
      phoneNumber: formData.phoneNumber.trim(),
    }

    // Add patient to context and open appointment modal
    addPatient(newPatient)
    setActiveModal('addAppointment')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Add new patient"
      subTitle="Fill in the patient information in the fields provided below"
      closeButton={true}
    >
      <div className="flex flex-col pt-0 px-6 overflow-visible opacity-100 rounded-[12px] w-full max-w-[1074px] h-[625px] md:max-h-[625px] pb-4">
        {/* Top Section */}
        <div className="flex gap-4 items-start  justify-between mb-4 flex-col md:flex-row">
          <div className="flex gap-8 items-center">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-[100px] md:h-[100px] bg-[#A6AFC2] rounded-full flex items-center justify-center">
                <Icon name="user" size={40} className="text-white-200" />
              </div>
            </div>
            {/* Buttons Section */}
            <div className="flex-1 space-y-4">
              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-3 bg-[#0B0C7D] text-white rounded-[10px] font-semibold leading-4 hover:bg-blue-800 transition-colors flex items-center gap-2 text-sm">
                  Take patient's picture
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="px-4 py-3 bg-[#0B0C7D] text-white rounded-[10px] font-semibold leading-4 hover:bg-blue-800 transition-colors flex items-center gap-2 text-sm">
                  Add fingerprint
                  <img
                    src={fingerprintIcon}
                    alt="fingerprint"
                    className="w-4 h-4"
                  />
                </button>
              </div>
              <p className="text-[#7A90C2]">
                Patient picture should be updated by reception personnel
              </p>
            </div>
          </div>

          {/* Info Box and Patient ID */}
          <div className="space-y-2 flex flex-col items-end">
            <div className=" bg-[#D7E3FC] px-3 py-2 flex  item-center rounded-lg  w-fit">
              <div className="flex-shrink-0 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center pt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <p className="text-[10px] font-semibold text-[#051438] pl-2 w-[200px]">
                If there is an existing Patient ID, input the patient’s existing
                ID into the field
              </p>
            </div>
            <div className="w-full flex items-center ">
              <label className="text-[16px] text-[#677597] mb-1 px-4 ">
                Patient ID
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 pr-8 border border-gray-300 rounded-lg focus:outline-none text-sm"
                  placeholder="HOSP98765433"
                />
                <button className="absolute right-2 p-0.5 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-3 flex-1 flex flex-col overflow-visible">
          {/* Display submit error if exists */}
          {validationErrors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm font-medium">
                {validationErrors.submit}
              </p>
            </div>
          )}

          {/* Name Fields Row - Flex Layout */}
          <div className="flex gap-[20px] flex-wrap">
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First name"
                  className={`w-[265px] px-3 py-[10px] border rounded-lg focus:outline-none h-10 text-sm placeholder-[#A6AFC2] transition-colors ${
                    validationErrors.firstName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                <span className="text-red-500 font-bold text-sm">*</span>
              </div>
              {validationErrors.firstName && (
                <p className="text-red-600 text-xs font-medium">
                  {validationErrors.firstName}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Middle name"
                className=" w-[265px] px-3 py-[10px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 h-10 text-sm placeholder-[#A6AFC2]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last name"
                  className={`w-[265px] px-3 py-[10px] border rounded-lg focus:outline-none h-10 text-sm placeholder-[#A6AFC2] transition-colors ${
                    validationErrors.lastName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                <span className="text-red-500 font-bold text-sm">*</span>
              </div>
              {validationErrors.lastName && (
                <p className="text-red-600 text-xs font-medium">
                  {validationErrors.lastName}
                </p>
              )}
            </div>

            <div className="relative">
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-[100px] border border-gray-300 focus:outline-none  text-sm appearance-none bg-white cursor-pointer placeholder-[#A6AFC2] px-3 py-[10px] rounded-lg"
              >
                <option value="">Title</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Prof">Prof</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none z-10"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Details Fields Row - Flex Layout */}
          <div className="flex gap-[20px] mt-[23px] overflow-visible">
            <div className="relative flex-1 min-w-0 flex flex-col gap-1 overflow-visible">
              <div className="relative w-full overflow-visible z-50 flex gap-1">
                <DatePicker
                  selected={
                    formData.dateOfBirth ? new Date(formData.dateOfBirth) : null
                  }
                  onChange={handleDateChange}
                  placeholderText="Date of birth"
                  dateFormat="yyyy-MM-dd"
                  className={`w-full px-3 py-[10px] pr-10 border rounded-lg h-10 text-sm placeholder-[#A6AFC2] transition-colors ${
                    validationErrors.dateOfBirth
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  required
                />
                <img
                  src={appointmentIcon}
                  alt="calendar"
                  className="absolute right-5 top-1/3 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                />
                <span className="text-red-500 font-bold text-sm">*</span>
              </div>
              {validationErrors.dateOfBirth && (
                <p className="text-red-600 text-xs font-medium">
                  {validationErrors.dateOfBirth}
                </p>
              )}
            </div>

            <div className="relative flex-1 min-w-0 flex flex-col gap-1">
              <div className="relative w-full flex gap-1">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-[10px] border rounded-lg h-10 text-gray-400 appearance-none bg-white cursor-pointer placeholder-[#A6AFC2] transition-colors ${
                    validationErrors.gender
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-red-500 font-bold text-sm">*</span>
              </div>
              {validationErrors.gender && (
                <p className="text-red-600 text-xs font-medium">
                  {validationErrors.gender}
                </p>
              )}
            </div>

            <div className="relative flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex gap-1">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-[10px] border rounded-lg focus:outline-none h-10 text-sm placeholder-[#A6AFC2] transition-colors ${
                    validationErrors.phoneNumber
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Phone number"
                />
                <span className="text-red-500 font-bold text-sm">*</span>
              </div>
              {validationErrors.phoneNumber && (
                <p className="text-red-600 text-xs font-medium">
                  {validationErrors.phoneNumber}
                </p>
              )}
            </div>

            <div className="flex flex-1 min-w-0">
              <label className="flex flex-col gap-2 cursor-pointer w-full">
                <span className="text-[16px] text-[#677597]">
                  Is patient new to the hospital?
                </span>
                <input
                  type="checkbox"
                  name="isNewToHospital"
                  checked={formData.isNewToHospital}
                  onChange={handleChange}
                  className="w-[26px] h-[26px] rounded-full border-[0.5px] border-[#0514380A] accent-blue-700 flex-shrink-0"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-3 justify-end flex-col md:flex-row mt-auto">
          <button
            type="button"
            onClick={handleSaveAndClose}
            className="rounded-[10px] px-[16px] py-[12px]  font-medium text-sm border border-[#6658F4] bg-white text-[#6658F4] hover:bg-purple-50 transition-colors"
          >
            Save & close
          </button>
          <button
            type="button"
            onClick={handleCreateAppointment}
            className="rounded-[10px] px-[16px] py-[12px] font-semibold text-sm border border-[#0B0C7D] bg-[#0B0C7D] text-[#ffff] "
          >
            Create appointment
          </button>
        </div>
      </div>
    </Modal>
  );
}
