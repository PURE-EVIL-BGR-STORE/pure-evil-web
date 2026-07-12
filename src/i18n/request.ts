import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { headers } from 'next/headers'

// Hàm getRequestConfig xử lý logic i18n, trả về locale và messages tương ứng với từng ngôn ngữ
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as 'en' | 'vi')) {
    locale = routing.defaultLocale
  }

  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || ''

  // 1. Always load common messages for shared layout components (SiteNav, SiteFooter)
  const commonMessages = (await import(`../components/messages/${locale}.json`)).default

  // 2. Load page/feature-specific messages
  let featureMessages = {}

  // Normalize pathname to strip locale prefix for route matching
  // E.g., "/vi/collection" -> "/collection"
  // E.g., "/en" -> "/"
  let normalizedPath = pathname
  if (normalizedPath.startsWith(`/${locale}`)) {
    normalizedPath = normalizedPath.slice(locale.length + 1)
  }
  if (normalizedPath === '') {
    normalizedPath = '/'
  }

  try {
    if (normalizedPath === '/' || normalizedPath === '') {
      featureMessages = (await import(`../features/home/messages/${locale}.json`)).default
    } else if (normalizedPath.startsWith('/collection')) {
      const prodMsgs = (await import(`../features/products/messages/${locale}.json`)).default
      const homeMsgs = (await import(`../features/home/messages/${locale}.json`)).default
      featureMessages = {
        ...prodMsgs,
        ...homeMsgs
      }
    } else if (normalizedPath.startsWith('/login') || normalizedPath.startsWith('/register')) {
      featureMessages = (await import(`../features/auth/messages/${locale}.json`)).default
    } else if (normalizedPath.startsWith('/cart') || normalizedPath.startsWith('/checkout')) {
      featureMessages = (await import(`../features/home/messages/${locale}.json`)).default
    }

    // Fallback: if no feature messages were loaded (e.g. x-pathname header missing
    // during client-side navigation), always include Home messages as a safety net
    if (Object.keys(featureMessages).length === 0) {
      featureMessages = (await import(`../features/home/messages/${locale}.json`)).default
    }
  } catch (error) {
    console.error(`Failed to load messages for pathname: ${pathname} (${normalizedPath}), locale: ${locale}`, error)
  }

  return {
    locale,
    messages: {
      ...commonMessages,
      ...featureMessages
    }
  }
})
