import { useState, useEffect } from "react";

type Mode = "standard" | "kids";

export function useMode() {
  const [currentMode, setCurrentMode] = useState<Mode>("standard");
  
  // Load mode from localStorage on initial render
  useEffect(() => {
    const savedMode = localStorage.getItem("readerMode") as Mode | null;
    if (savedMode && (savedMode === "standard" || savedMode === "kids")) {
      setCurrentMode(savedMode);
      document.documentElement.classList.toggle("kids-mode", savedMode === "kids");
    }
  }, []);
  
  // Toggle between standard and kids mode
  const toggleMode = () => {
    const newMode = currentMode === "standard" ? "kids" : "standard";
    setCurrentMode(newMode);
    localStorage.setItem("readerMode", newMode);
    
    // Add or remove kids-mode class from html element for global styling
    document.documentElement.classList.toggle("kids-mode", newMode === "kids");
  };
  
  // Check if currently in kids mode
  const isKidsMode = currentMode === "kids";
  
  return { currentMode, isKidsMode, toggleMode };
}
