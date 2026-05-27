"use client";

import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
  labelRightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, rightElement, labelRightElement, ...props }, ref) => {
    return (
      <div className="space-y-3 group w-full">
        {(label || labelRightElement) && (
          <div className="flex items-center justify-between">
            {label && (
              <label 
                htmlFor={props.id} 
                className="block text-[10px] tracking-[0.2em] text-text-muted uppercase transition-colors duration-300 group-focus-within:text-brand-red"
              >
                {label}
              </label>
            )}
            {labelRightElement}
          </div>
        )}
        <div className="relative w-full">
          <input
            ref={ref}
            className={`
              w-full px-4 py-3.5 bg-bg-primary/40 border text-sm
              text-text-primary placeholder:text-text-muted/30 placeholder:text-xs placeholder:tracking-wider
              transition-all duration-300 tracking-wide rounded-none
              focus:outline-none focus:border-brand-red focus:shadow-[0_0_10px_rgba(211,0,0,0.15)]
              disabled:opacity-40 disabled:cursor-not-allowed
              ${error 
                ? "border-danger/40 hover:border-danger/60 focus:border-danger" 
                : "border-border-soft hover:border-brand-red/50"
              }
              ${rightElement ? "pr-12" : ""}
              ${className}
            `}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p className="text-[10px] text-danger-soft tracking-wider">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
