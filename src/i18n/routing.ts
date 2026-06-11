import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// Định nghĩa ngôn ngữ và ngôn ngữ mặc định
export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en'
});

// Tạo các hàm navigation
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
