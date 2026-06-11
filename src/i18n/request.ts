import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';


// Hàm getRequestConfig xử lý logic i18n, trả về locale và messages tương ứng với từng ngôn ngữ
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
