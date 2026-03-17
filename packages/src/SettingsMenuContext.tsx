import { createContext, useContext, useState } from "react";

const SettingsMenuContext = createContext(null);

export const SettingsMenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SettingsMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SettingsMenuContext.Provider>
  );
};

export const useSettingsMenu = () => useContext(SettingsMenuContext);