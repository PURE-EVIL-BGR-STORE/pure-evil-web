interface ManifestoProps {
  mountedClass: string;
}

export function Manifesto({ mountedClass }: ManifestoProps) {
  return (
    <div className={`text-center mt-16 login-fade-in duration-1000 delay-700 ${mountedClass}`}>
      <p className="manifesto-text">
        We wear the curse
      </p>
    </div>
  );
}
