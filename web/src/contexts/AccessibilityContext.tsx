"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type FontSize = "normal" | "large" | "extra-large";
type Contrast = "normal" | "high";
type LayoutMode = "standard" | "simplified";

interface AccessibilityContextData {
  fontSize: FontSize;
  contrast: Contrast;
  layout: LayoutMode;
  setFontSize: (size: FontSize) => void;
  setContrast: (contrast: Contrast) => void;
  setLayout: (layout: LayoutMode) => void;
}

const AccessibilityContext = createContext<AccessibilityContextData>({} as AccessibilityContextData);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>("normal");
  const [contrast, setContrastState] = useState<Contrast>("normal");
  const [layout, setLayoutState] = useState<LayoutMode>("standard");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedFontSize = localStorage.getItem("@seniorEase:fontSize") as FontSize;
    const savedContrast = localStorage.getItem("@seniorEase:contrast") as Contrast;
    const savedLayout = localStorage.getItem("@seniorEase:layout") as LayoutMode;

    if (savedFontSize) setFontSizeState(savedFontSize);
    if (savedContrast) setContrastState(savedContrast);
    if (savedLayout) setLayoutState(savedLayout);
  }, []);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem("@seniorEase:fontSize", size);
  };

  const setContrast = (contrast: Contrast) => {
    setContrastState(contrast);
    localStorage.setItem("@seniorEase:contrast", contrast);
  };

  const setLayout = (mode: LayoutMode) => {
    setLayoutState(mode);
    localStorage.setItem("@seniorEase:layout", mode);
  };

  useEffect(() => {
    if (!isMounted) return;

    const htmlElement = document.documentElement;

    htmlElement.classList.remove(
      "font-normal-mode", "font-large-mode", "font-extra-large-mode",
      "contrast-normal", "contrast-high",
      "layout-standard", "layout-simplified"
    );

    htmlElement.classList.add(
      `font-${fontSize}-mode`,
      `contrast-${contrast}`,
      `layout-${layout}`
    );
  }, [fontSize, contrast, layout, isMounted]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        contrast,
        layout,
        setFontSize,
        setContrast,
        setLayout,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility deve ser usado dentro de um AccessibilityProvider");
  }
  return context;
}