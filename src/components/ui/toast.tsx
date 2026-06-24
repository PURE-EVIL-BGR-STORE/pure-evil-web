"use client";

import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      theme="light"
      position="top-right"
      toastOptions={{
        style: {
          background: "#fdfdfb", // Nền giấy da sáng (light parchment)
          border: "1px solid #1a1a1a", // Viền kim loại đen sắc cạnh
          borderRadius: "0px", // Không bo góc (sharp gothic)
          color: "#1a1a1a",
          fontFamily: "var(--font-inter)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.6)",
          position: "relative",
          overflow: "hidden",
        },
        classNames: {
          toast: "group-[.toaster]:p-4 border-l-[4px] !border-l-stone-800",
          title: "font-cinzel font-bold text-stone-900 tracking-widest text-xs uppercase",
          description: "text-stone-600 font-mono text-[10px] tracking-tight mt-1",
          success: "!border-l-emerald-700 !bg-[#fcfdfa]", 
          error: "!border-l-rose-800 !bg-[#fdfbfa]",
          info: "!border-l-amber-700 !bg-[#fdfcfa]",
          warning: "!border-l-amber-700 !bg-[#fdfcfa]",
        }
      }}
    />
  );
}

// Wrapper utility giúp dev gọi nhanh và thống nhất
export const toast = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, { description });
  },
  error: (message: string, description?: string) => {
    sonnerToast.error(message, { description });
  },
  info: (message: string, description?: string) => {
    sonnerToast.info(message, { description });
  },
  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, { description });
  },
  // Custom toast phong cách Gothic đặc biệt (có nút close tuỳ chỉnh)
  custom: (title: string, description?: string) => {
    sonnerToast.custom((t) => (
      <div className="w-[356px] bg-[#fdfdfb] border border-[#1a1a1a] p-4 shadow-[0_10px_30px_rgba(0, 0, 0, 0.15)] flex items-center gap-4 relative overflow-hidden border-l-[4px] border-l-rose-900">
        <div className="flex-1">
          <h3 className="font-cinzel font-bold text-stone-900 tracking-widest text-xs uppercase">
            {title}
          </h3>
          {description && (
            <p className="text-stone-600 font-mono text-[10px] tracking-tight mt-1">
              {description}
            </p>
          )}
        </div>
        <button 
          onClick={() => sonnerToast.dismiss(t)}
          className="text-stone-400 hover:text-stone-900 text-[10px] font-mono"
        >
          [X]
        </button>
      </div>
    ));
  }
};
