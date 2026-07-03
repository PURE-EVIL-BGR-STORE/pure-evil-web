import React from 'react'

export interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  fluid?: boolean
}

export function SectionContainer({
  children,
  className = '',
  fluid = false,
  ...props
}: SectionContainerProps): React.ReactElement {
  return (
    <div
      className={`${fluid ? 'w-full' : 'section-container'} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
