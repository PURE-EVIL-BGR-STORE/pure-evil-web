
// Contract of component props, typescript protections
type ButtonProps = {
  children: React.ReactNode;
};

// React component, can be used in any part of the app, even in other apps if we export it from a shared library
export default function Button({ children }: ButtonProps) {
  return (
    <button className="rounded-lg bg-white px-4 py-2 text-black">
      {children}
    </button>
  );
}