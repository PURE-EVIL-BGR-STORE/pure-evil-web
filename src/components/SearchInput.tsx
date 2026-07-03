'use client'

import React from 'react'
import { Search, X } from 'lucide-react'

export interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  badgeText?: string
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'SEARCH ARCHIVE...',
  badgeText = 'PE-ARCHIVE-L07',
  className = ''
}: SearchInputProps): React.ReactElement {
  return (
    <div className={`relative group w-full ${className}`}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
        <Search size={14} className="text-faint group-focus-within:text-red transition-colors duration-300" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#060606] border border-fg/10 text-fg placeholder:text-faint/40 font-mono text-xs tracking-widest py-4 pl-12 pr-28 focus:outline-none focus:border-red/30 focus:shadow-[0_0_25px_rgba(197,20,27,0.06)] transition-all duration-300 rounded-none"
      />
      
      {/* Search Input Controls (Reset / Badge) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
        {value && (
          <button
            onClick={() => onChange('')}
            className="p-1 hover:text-red text-faint transition-colors duration-200 cursor-pointer"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
        <span className="text-[10px] font-mono tracking-widest text-faint/50 bg-[#0c0c0c] border border-fg/5 px-2 py-0.5 rounded-none uppercase select-none">
          {badgeText}
        </span>
      </div>
    </div>
  )
}
