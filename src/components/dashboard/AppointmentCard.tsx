import React, { useState } from 'react'
import type { Appointment } from '../../types'
import { StatusBadge } from './StatusBadge'
import { Icon } from '../ui'

export interface AppointmentCardProps {
  appointment: Appointment
  index: number
}

const statusColorMap: Record<string, string> = {
  'Processing': 'text-[#D6AB00]',
  'Not arrived': 'text-[#FF2C2C]',
  'Awaiting vitals': 'text-[#A22CFF]',
  'Awaiting doctor': 'text-[#0B0C7D]',
  'Admitted to ward': 'text-[#FF8B00]',
  'Transferred to A&E': 'text-[#A22CFF]',
  'Seen doctor': 'text-[#27AE60]',
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, index }) => {
  const [isSelected, setIsSelected] = useState(false)

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      time: date.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true }),
      date: date.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
  }

  const formatWallet = (value: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value)

  const { time, date } = formatTime(appointment.dateTime)

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div
          onClick={() => setIsSelected(!isSelected)}
          className={`group relative border border-gray-100 rounded-[10px] mb-2 px-3 py-2 lg:mb-3 lg:p-4 flex items-center gap-2 lg:gap-[32px] shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden ${
            index === 0 ? "bg-[#DFE2E9]" : isSelected ? "bg-[#DFE2E9]" : "bg-white"
          }`}
        >
          {/* Left Accent Bar */}
          <div className="absolute left-0 top-0 bottom-0 w-[6px] rounded-tl-[10px] rounded-bl-[10px] bg-orange-400" />

          {/* Column Group 1: Index + Patient Info */}
          <div className="flex-[2] lg:flex-[346] flex items-center gap-1 lg:gap-2 min-w-0">
            <div className="w-12 flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                {index === 0 && <Icon name="collapse" size={16} />}
                <Icon name="stroke" size={6} />
              </div>
              <span className="text-xs font-medium leading-none flex-1 text-center">
                {index + 1}
              </span>
            </div>
            {/* Patient Information */}
            <div className="flex items-center gap-0.5 lg:gap-2">
              <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {appointment.patient.profileImage ? (
                  <img
                    src={appointment.patient.profileImage}
                    alt={`${appointment.patient.firstName} ${appointment.patient.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Icon name="user" size={12} className="text-gray-400 lg:hidden" />
                    <Icon name="user" size={16} className="text-gray-400 hidden lg:block" />
                  </>
                )}
              </div>

              <div className="min-w-0 hidden sm:block">
                <p className="font-semibold text-xs lg:text-base lg:pb-1 leading-tight lg:leading-4 tracking-normal font-gilroy text-[#051438] truncate">
                  {appointment.patient.firstName}
                </p>
                <p className="text-xs font-bold tracking-normal text-[#677597] hidden lg:block">
                  {appointment.patient.id} • {appointment.patient.gender} •{" "}
                  {appointment.patient.age} yrs
                </p>
              </div>
            </div>
          </div>

          {/* Column Group 2: Doc + New Tag */}
          <div className="flex-[0.1] lg:flex-[85] flex items-center justify-end min-w-0">
            {appointment.isNew && (
              <div className="bg-[#D0D1FB] px-0.5 py-0.5 lg:py-1 rounded text-nowrap hidden lg:block me-3">
                <span className="text-[#0B0C7D] text-[10px] lg:text-[12px] font-semibold px-1 lg:px-2 py-0.5 rounded whitespace-nowrap">
                  New
                </span>
              </div>
            )}

            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded flex items-center justify-center flex-shrink-0 bg-red-100">
              <Icon name="doc" size={12} className="text-red-300 lg:hidden" />
              <Icon name="doc" size={16} className="text-red-300 hidden lg:block" />
            </div>
          </div>

          {/* Column Group 3: Clinic */}
          <div className="flex-[1] lg:flex-[160] flex-shrink-0 text-start gap-1 min-w-0 hidden sm:block">
            <p className="text-[12px] lg:text-[16px] font-semibold text-[#051438] break-words">
              {appointment.clinic}
            </p>
          </div>

          {/* Column Group 4: Wallet Balance */}
          <div className="flex-[0.8] lg:flex-[104] text-xs lg:text-base font-semibold text-[#051438] flex-shrink-0 text-end hidden sm:block">
            {formatWallet(appointment.walletBalance)}
          </div>

          {/* Column Group 5: Time/Date */}
          <div className="flex-[0.8] lg:flex-[100] flex-shrink-0 text-start min-w-0 hidden sm:block">
            <p className={`text-xs lg:text-sm font-semibold ${statusColorMap[appointment.status]} break-words`}>
              {time}
            </p>
            <p className={`text-[10px] lg:text-xs font-semibold ${statusColorMap[appointment.status]} break-words`}>
              . {date}
            </p>
          </div>

          {/* Column Group 6: Status & Actions */}
          <div className="flex-[0.6] lg:flex-[192] flex items-center gap-1 lg:gap-1.5 flex-shrink-0 min-w-0">
            <div className="w-full lg:w-auto">
              <StatusBadge status={appointment.status} />
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 flex-shrink-0">
              <span className="text-sm lg:text-base leading-none">⋮</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className={`border border-gray-100 rounded-[10px] mb-3 p-4 shadow-sm ${
          index === 0 ? "bg-[#DFE2E9]" : "bg-white"
        }`}>
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-orange-400" />

          {/* Patient Information */}
          <div className="flex items-start gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {appointment.patient.profileImage ? (
                <img
                  src={appointment.patient.profileImage}
                  alt={`${appointment.patient.firstName} ${appointment.patient.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="user" size={20} className="text-gray-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base text-[#051438]">
                {appointment.patient.firstName} {appointment.patient.lastName}
              </p>
              <p className="text-xs font-bold text-[#677597]">
                {appointment.patient.id} • {appointment.patient.gender} •{" "}
                {appointment.patient.age} yrs
              </p>
            </div>
          </div>

          {/* Clinic */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 mb-1">Clinic</p>
            <p className="text-sm font-medium text-slate-700">
              {appointment.clinic}
            </p>
          </div>

          {/* Wallet */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              Wallet Balance (₦)
            </p>
            <p className="text-sm font-semibold text-slate-700">
              {formatWallet(appointment.walletBalance)}
            </p>
          </div>

          {/* Time/Date */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              Time/Date
            </p>
            <p className={`text-sm font-bold ${statusColorMap[appointment.status]}`}>{time}</p>
            <p className={`text-xs font-semibold ${statusColorMap[appointment.status]}`}>. {date}</p>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between gap-1">
            <StatusBadge status={appointment.status} />
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-0.5">
              <span className="text-lg leading-none">⋮</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
