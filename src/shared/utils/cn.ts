// Tiện ích gộp nhiều class CSS lại với nhau, giúp code gọn gàng hơn
// Sử dụng trong các component UI
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
