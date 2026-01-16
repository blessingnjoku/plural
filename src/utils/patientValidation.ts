/**
 * Patient Form Validation Utilities
 * Handles all validation logic for patient form submission
 */

export interface PatientFormData {
  patientId: string
  firstName: string
  middleName: string
  lastName: string
  title: string
  dateOfBirth: string
  gender: string
  phoneNumber: string
  isNewToHospital: boolean
}

export interface ValidationErrors {
  [key: string]: string
}

/**
 * Validates all required patient form fields
 * @param formData - The form data object to validate
 * @returns Object containing field names and error messages
 *
 * @example
 * const errors = validatePatientForm(formData)
 * if (Object.keys(errors).length > 0) {
 *   setValidationErrors(errors)
 * }
 */
export const validatePatientForm = (formData: PatientFormData): ValidationErrors => {
  const errors: ValidationErrors = {}

  // Validate First Name
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required'
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters'
  }

  // Validate Last Name
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required'
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters'
  }

  // Validate Date of Birth
  if (!formData.dateOfBirth.trim()) {
    errors.dateOfBirth = 'Date of birth is required'
  } else {
    const dobDate = new Date(formData.dateOfBirth)
    const today = new Date()
    
    // Reset time to compare only dates
    today.setHours(0, 0, 0, 0)
    dobDate.setHours(0, 0, 0, 0)
    
    if (dobDate > today) {
      errors.dateOfBirth = 'Date of birth cannot be in the future'
    }
  }

  // Validate Gender
  if (!formData.gender.trim()) {
    errors.gender = 'Gender is required'
  }

  // Validate Phone Number
  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required'
  } else if (formData.phoneNumber.trim().length < 10) {
    errors.phoneNumber = 'Phone number must be at least 10 digits'
  }

  return errors
}

/**
 * Calculates patient age from date of birth
 * @param dateOfBirth - The patient's date of birth (YYYY-MM-DD format)
 * @returns The calculated age
 *
 * @example
 * const age = calculateAge('1990-05-15')
 * console.log(age) // 35 or 34 depending on current date
 */
export const calculateAge = (dateOfBirth: string): number => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

/**
 * Generates a unique patient ID if not provided
 * @returns A generated patient ID in format PLAT-S/XXXXXXX
 *
 * @example
 * const id = generatePatientId()
 * console.log(id) // PLAT-S/1234567
 */
export const generatePatientId = (): string => {
  return `PLAT-S/${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(7, '0')}`
}

/**
 * Clears a specific error from validation errors object
 * @param errors - Current validation errors object
 * @param fieldName - The field name to clear error for
 * @returns Updated validation errors object
 *
 * @example
 * const updated = clearFieldError(errors, 'firstName')
 */
export const clearFieldError = (
  errors: ValidationErrors,
  fieldName: string
): ValidationErrors => {
  const updated = { ...errors }
  delete updated[fieldName]
  return updated
}
