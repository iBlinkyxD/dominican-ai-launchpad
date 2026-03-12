export const SidebarSection = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="py-2 border-b border-gray-200/50 last:border-0">
      {children}
    </div>
  );
};