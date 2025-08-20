import React from 'react'

interface CardProps {,
children: React.ReactNode
  className?: string}
export const Card: React.FC<CardProps> = (_{ children,  _className = '' }) => {
return (
    <div className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}
