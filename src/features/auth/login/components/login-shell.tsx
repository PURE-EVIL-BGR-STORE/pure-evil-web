interface LoginShellProps {
  children: React.ReactNode;
}

export function LoginShell({ children }: LoginShellProps) {
  return (
    <main className="min-h-screen bg-bg-primary relative overflow-hidden flex items-center justify-center">
      {children}
    </main>
  );
}
