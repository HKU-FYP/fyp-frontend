import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [selectedStockGlobal, setSelectedStockGlobal] = useState(null);

  return (
    <GlobalContext.Provider
      value={{ selectedStockGlobal, setSelectedStockGlobal }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
