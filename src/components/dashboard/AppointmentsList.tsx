import React from 'react'
import type { Appointment } from '../../types'
import { AppointmentCard } from './AppointmentCard'

export interface AppointmentsListProps {
  appointments: Appointment[]
  currentPage?: number
  itemsPerPage?: number
}

export const AppointmentsList: React.FC<AppointmentsListProps> = ({ 
  appointments, 
  currentPage = 1, 
  itemsPerPage = 20 
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedAppointments = appointments.slice(startIndex, endIndex)

  return (
    <div className="h-[calc(100vh-220px)] overflow-y-auto z-0 mx-8 scrollbar-hide">
      {/* Column Headers - Flex Layout Matching Card Structure (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-[26px] mb-2 text-base font-bold text-[#A6AFC2] font-gilroy relative sticky top-0 z-[99] bg-[#EDF0F8] py-2">
        {/* Left Accent Bar Space */}
        <div className="absolute left-0 top-0 bottom-0 w-[6px]" />

        {/* Content with padding matching card */}
        <div className="flex items-center gap-[26px] w-full pl-[22px] pr-4">
          {/* Header Group 1: Index + Patient */}
          <div className="w-[346px] flex text-center items-center">
            <span className="text-center"># </span>
            <div className="text-center w-full">Personal Information</div>
          </div>

          {/* Header Group 2: Doc + New */}
          <div className="w-[85px] text-left"></div>

          {/* Header Group 3: Clinic */}
          <div className="flex-[160] text-center">Clinic</div>

          {/* Header Group 4: Wallet */}
          <div className="flex-[104] text-center">Wallet bal. (₦)</div>

          {/* Header Group 5: Time/Date */}
          <div className="flex-[100] text-center flex items-center justify-center gap-1">
            Time/Date
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2H13.5C14.3284 2 15 2.67157 15 3.5V13.5C15 14.3284 14.3284 15 13.5 15H1.5C0.671573 15 0 14.3284 0 13.5V3.5C0 2.67157 0.671573 2 1.5 2H3V0H4V2H11V0H12V2ZM6 8H3V7H6V8ZM12 7H9V8H12V7ZM6 11H3V10H6V11ZM9 11H12V10H9V11Z"
                fill="#0B0C7D"
              />
            </svg>
          </div>

          {/* Header Group 6: Status + Actions */}
          <div className="flex-[192] text-left">Status</div>
        </div>
      </div>

      {/* Appointment Cards List */}
      <div className="flex flex-col gap-2 p-4 md:p-0">
        {paginatedAppointments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm font-medium">No appointments found</p>
          </div>
        ) : (
          paginatedAppointments.map((appointment, index) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              index={startIndex + index}
            />
          ))
        )}
      </div>
    </div>
  );
}
