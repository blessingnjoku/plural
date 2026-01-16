import React from 'react'
import { LayoutContext } from './LayoutContext'

export const useLayout = () => {
  const context = React.useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutContextProvider')
  }
  return context
}
