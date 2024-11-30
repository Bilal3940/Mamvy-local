import React, { createContext, useContext, ReactNode } from "react";
import { palette as staticPalette } from "@/theme/constants";

interface PaletteContextProps {
  palette: Record<string, string>;
}

const PaletteContext = createContext<PaletteContextProps>({
  palette: staticPalette,
});

export const PaletteProvider = ({
  children,
  templateColors,
}: {
  children: ReactNode;
  templateColors?: Record<string, string>;
}) => {
  const dynamicPalette = {
    ...(templateColors || {}),
  };
  // console.log("I am the dynamic palette",dynamicPalette)
  // console.log("i am the template", templateColors)

  return (
    <PaletteContext.Provider value={{ palette: dynamicPalette }}>
      {children}
    </PaletteContext.Provider>
  );
};

export const usePalette = () => useContext(PaletteContext);
