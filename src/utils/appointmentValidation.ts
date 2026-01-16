/**
 * Appointment Form Validation and Creation Utilities
 * Handles validation and creation of appointment objects
 */

import type { Patient, Appointment, AppointmentStatus } from '../types'
import type { ClinicValue } from '../components/modals/ClinicSelectionDropdown'
import type { AppointmentTypeValue } from '../components/modals/AppointmentTypeDropdown'

export interface AppointmentFormData {
  patient: Patient | null
  clinic: ClinicValue | undefined
  appointmentType: AppointmentTypeValue | undefined
  date: Date
}

export interface AppointmentValidationErrors {
  [key: string]: string
}

/**
 * Validates all required appointment fields
 * @param formData - The appointment form data to validate
 * @returns Object containing field names and error messages
 *
 * @example
 * const errors = validateAppointmentForm(formData)
 * if (Object.keys(errors).length > 0) {
 *   // Show errors
 * }
 */
export const validateAppointmentForm = (formData: AppointmentFormData): AppointmentValidationErrors => {
  const errors: AppointmentValidationErrors = {}

  // Validate Patient
  if (!formData.patient) {
    errors.patient = 'Please select or create a patient'
  }

  // Validate Clinic
  if (!formData.clinic) {
    errors.clinic = 'Please select a clinic'
  }

  // Validate Appointment Type
  if (!formData.appointmentType) {
    errors.appointmentType = 'Please select an appointment type'
  }

  // Validate Date (must be in the future)
  if (!formData.date) {
    errors.date = 'Please select a date and time'
  } else {
    const selectedDateTime = new Date(formData.date)
    const now = new Date()

    if (selectedDateTime < now) {
      errors.date = 'Appointment date and time must be in the future'
    }
  }

  return errors
}

/**
 * Generates a unique appointment ID
 * @returns A generated appointment ID in format APT-XXXXXXX
 *
 * @example
 * const id = generateAppointmentId()
 * console.log(id) // APT-1234567
 */
export const generateAppointmentId = (): string => {
  return `APT-${Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, '0')}`
}

/**
 * Formats a date and time into the required appointment dateTime format
 * @param date - The date object to format
 * @returns Formatted datetime string (ISO format: YYYY-MM-DDTHH:mm)
 *
 * @example
 * const dateTime = formatAppointmentDateTime(new Date('2025-09-22T11:30'))
 * console.log(dateTime) // 2025-09-22T11:30
 */
export const formatAppointmentDateTime = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}

/**
 * Creates an appointment object from form data
 * @param formData - The validated appointment form data
 * @returns Complete appointment object ready to be saved
 *
 * @example
 * const appointment = createAppointment(validatedFormData)
 * context.addAppointment(appointment)
 */
export const createAppointment = (formData: AppointmentFormData): Appointment => {
  if (!formData.patient || !formData.clinic || !formData.appointmentType) {
    throw new Error('Invalid appointment data: missing required fields')
  }

  return {
    id: generateAppointmentId(),
    patientId: formData.patient.id,
    patient: formData.patient,
    clinic: formData.clinic,
    appointmentType: formData.appointmentType,
    walletBalance: 0, // Can be updated with actual wallet balance from patient
    dateTime: formatAppointmentDateTime(formData.date),
    status: 'Processing' as AppointmentStatus,
    isNew: true,
  }
}
