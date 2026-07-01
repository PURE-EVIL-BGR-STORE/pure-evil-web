export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export const MEDIA_QUERIES = {
  /** Mobile: < 768px */
  mobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  /** Tablet: 768px – 1023px */
  tablet: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  /** Desktop: ≥ 1024px */
  desktop: `(min-width: ${BREAKPOINTS.lg}px)`,
  /** Narrow desktop: 768px – 1279px */
  narrowDesktop: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`,
  /** Below desktop: < 1024px (mobile + tablet) */
  belowDesktop: `(max-width: ${BREAKPOINTS.lg - 1}px)`,
} as const
