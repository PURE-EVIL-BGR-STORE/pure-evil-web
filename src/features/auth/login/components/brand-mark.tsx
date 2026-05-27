import Image from "next/image";
import Link from "next/link";

interface BrandMarkProps {
  mountedClass: string;
}

export function BrandMark({ mountedClass }: BrandMarkProps) {
  return (
    <div className={`text-center mb-10 login-fade-up duration-1000 ${mountedClass}`}>
      <Link href="/" className="inline-block group text-center">
        <div className="relative w-44 h-44 mx-auto mb-4 transition-all duration-700 group-hover:scale-105 filter drop-shadow-[0_0_15px_rgba(211,0,0,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(255,26,26,0.45)]">
          <Image
            src="/PURE_EVIL_LOGO_3.png"
            alt="PURE EVIL Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <p className="brand-subtitle">
          For the forgotten
        </p>
      </Link>
    </div>
  );
}
