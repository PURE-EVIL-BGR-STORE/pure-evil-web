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
      className={`${fluid ? 'w-full' : 'mx-auto max-w-[1400px] px-5 md:px-10 w-full'} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
