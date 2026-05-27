interface AuthCardProps {
  children: React.ReactNode;
  mountedClass: string;
}

export function AuthCard({ children, mountedClass }: AuthCardProps) {
  return (
    <div className={`relative transition-all duration-1000 delay-200 login-fade-up ${mountedClass}`}>
      <div className="auth-card-glow" />
      <div className="auth-card-container">
        <div className="auth-card-decorator top-0" />
        {children}
        <div className="auth-card-decorator bottom-0" />
      </div>
    </div>
  );
}
