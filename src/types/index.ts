export type AppointmentStatus =
  | 'Processing'
  | 'Not arrived'
  | 'Awaiting vitals'
  | 'Awaiting doctor'
  | 'Admitted to ward'
  | 'Transferred to A&E'
  | 'Seen doctor'

export interface Patient {
  id: string
  firstName: string
  middleName?: string
  lastName: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  dateOfBirth: string
  phoneNumber?: string
  profileImage?: string
}

export interface Appointment {
  id: string
  patientId: string
  patient: Patient
  clinic: string
  appointmentType: string
  walletBalance: number
  dateTime: string
  status: AppointmentStatus
  isNew?: boolean
}

export const mockPatients: Patient[] = [
  {
    id: 'HOSP2938475',
    firstName: 'Akpopodion',
    lastName: 'Endurance',
    age: 21,
    gender: 'Male',
    dateOfBirth: '2004-01-15',
  },
  {
    id: 'HOSP8765432',
    firstName: 'Boluwatife',
    lastName: 'Olusola',
    age: 30,
    gender: 'Female',
    dateOfBirth: '1995-06-22',
  },
  {
    id: 'HOSP7634892',
    firstName: 'Arlie',
    lastName: 'Mertz',
    age: 23,
    gender: 'Female',
    dateOfBirth: '2002-10-05',
  },
  {
    id: 'HOSP9876543',
    firstName: 'Akuchi',
    lastName: 'Amadi',
    age: 11,
    gender: 'Female',
    dateOfBirth: '2014-08-30',
  },
  {
    id: 'HOSP2345678',
    firstName: 'Omolola',
    lastName: 'Bakare',
    age: 2,
    gender: 'Female',
    dateOfBirth: '2023-11-10',
  },
  {
    id: 'HOSP3456789',
    firstName: 'Ayobami',
    lastName: 'Musa',
    age: 11,
    gender: 'Female',
    dateOfBirth: '2014-05-20',
  },
  {
    id: 'HOSP4567890',
    firstName: 'Ngozi',
    lastName: 'Okeke',
    age: 11,
    gender: 'Female',
    dateOfBirth: '2014-09-15',
  },
  {
    id: 'HOSP5678901',
    firstName: 'Chinwe',
    lastName: 'Azikiwe',
    age: 11,
    gender: 'Female',
    dateOfBirth: '2014-12-03',
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: 'APT001',
    patientId: 'HOSP2938475',
    patient: mockPatients[0],
    clinic: 'Neurology',
    appointmentType: 'New',
    walletBalance: 120000,
    dateTime: '2025-09-22T11:30',
    status: 'Processing',
    isNew: true,
  },
  {
    id: 'APT002',
    patientId: 'HOSP8765432',
    patient: mockPatients[1],
    clinic: 'Ear, Nose & Throat',
    appointmentType: 'New',
    walletBalance: 230500,
    dateTime: '2025-09-22T17:30',
    status: 'Not arrived',
  },
  {
    id: 'APT003',
    patientId: 'HOSP7634892',
    patient: mockPatients[2],
    clinic: 'Neurology',
    appointmentType: 'New',
    walletBalance: 90000,
    dateTime: '2025-09-22T15:45',
    status: 'Awaiting vitals',
  },
  {
    id: 'APT004',
    patientId: 'HOSP9876543',
    patient: mockPatients[3],
    clinic: 'Accident & Emergency',
    appointmentType: 'New',
    walletBalance: 100000,
    dateTime: '2025-09-22T14:00',
    status: 'Not arrived',
  },
  {
    id: 'APT005',
    patientId: 'HOSP2345678',
    patient: mockPatients[4],
    clinic: 'Accident & Emergency',
    appointmentType: 'New',
    walletBalance: 180000,
    dateTime: '2025-09-22T13:15',
    status: 'Awaiting doctor',
  },
  {
    id: 'APT006',
    patientId: 'HOSP3456789',
    patient: mockPatients[5],
    clinic: 'Accident & Emergency',
    appointmentType: 'New',
    walletBalance: 190000,
    dateTime: '2025-09-22T12:45',
    status: 'Admitted to ward',
  },
  {
    id: 'APT007',
    patientId: 'HOSP4567890',
    patient: mockPatients[6],
    clinic: 'Accident & Emergency',
    appointmentType: 'New',
    walletBalance: 200000,
    dateTime: '2025-09-22T10:00',
    status: 'Transferred to A&E',
  },
  {
    id: 'APT008',
    patientId: 'HOSP5678901',
    patient: mockPatients[7],
    clinic: 'Accident & Emergency',
    appointmentType: 'New',
    walletBalance: 210000,
    dateTime: '2025-09-22T08:00',
    status: 'Seen doctor',
  },
]
