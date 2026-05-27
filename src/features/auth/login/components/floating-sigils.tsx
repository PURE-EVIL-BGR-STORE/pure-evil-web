import { Sigil } from "@/shared/ui/sigil/Sigil";

interface FloatingSigilsProps {
  mountedClass: string;
}

export function FloatingSigils({ mountedClass }: FloatingSigilsProps) {
  return (
    <div className="floating-sigils-container">
      <Sigil variant="berserk" className={`floating-sigil floating-sigil-1 login-fade-up ${mountedClass}`} />
      <Sigil variant="celestial" className={`floating-sigil floating-sigil-2 login-fade-up ${mountedClass}`} />
      <Sigil variant="gothic-cross" className={`floating-sigil floating-sigil-3 login-fade-up ${mountedClass}`} />
      <Sigil variant="eclipse" className={`floating-sigil floating-sigil-4 login-fade-up ${mountedClass}`} />
    </div>
  );
}
