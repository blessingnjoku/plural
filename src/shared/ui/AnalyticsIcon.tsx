import React, { useState } from 'react'

export const AnalyticsIcon: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-6 left-16 bottom-28 z-40">
      <button
        className="flex items-center transition-all duration-300 ease-out overflow-hidden border-none cursor-pointer bg-transparent rounded-[5px]"
        style={{
          width: isHovered ? '130px' : '39px',
          height: '39px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* SVG Icon - left side with semi-transparent background */}
        <div
          className="flex items-center justify-center flex-shrink-0 w-[39px] h-[39px] bg-[#0B0C7D80]"
          style={{
            borderRadius: isHovered ? '5px 0 0 5px' : '5px',
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 7.4836C0 3.50948 3.09098 0.257293 7 0V4.01904C5.30385 4.26166 4 5.72036 4 7.4836C4 9.41659 5.567 10.9836 7.5 10.9836C8.28618 10.9836 9.01181 10.7244 9.5961 10.2868L12.438 13.1287C11.1188 14.2837 9.39113 14.9836 7.5 14.9836C3.35786 14.9836 0 11.6257 0 7.4836Z"
              fill="white"
            />
            <path
              d="M13.1451 12.4216C14.3001 11.1024 15 9.37472 15 7.4836C15 6.45008 14.7909 5.46539 14.4128 4.5695L10.7552 6.19511C10.9132 6.59389 11 7.0286 11 7.4836C11 8.26976 10.7408 8.99538 10.3032 9.57967L13.1451 12.4216Z"
              fill="white"
            />
            <path
              d="M8 4.01904V0C10.5416 0.167288 12.7373 1.60064 13.9626 3.6753L10.2541 5.32351C9.71063 4.63156 8.91203 4.1495 8 4.01904Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Text container that grows on hover */}
        {isHovered && (
          <div
            className="flex items-center justify-center transition-all duration-300 ease-out w-[91px] h-[39px] bg-[#0B0C7D] px-3"
            style={{
              borderRadius: '0 10px 10px 0',
            }}
          >
            <span className="text-white text-xs font-medium whitespace-nowrap">
              Analytics
            </span>
          </div>
        )}
      </button>
    </div>
  )
}
