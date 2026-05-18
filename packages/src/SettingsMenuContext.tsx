import { createContext, useContext, useState } from "react";

interface SettingsMenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SettingsMenuContext = createContext<SettingsMenuContextType | null>(null);

export const SettingsMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SettingsMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SettingsMenuContext.Provider>
  );
};

export const useSettingsMenu = (): SettingsMenuContextType => {
  const context = useContext(SettingsMenuContext);
  if (!context) throw new Error("useSettingsMenu must be used inside SettingsMenuProvider");
  return context;
};