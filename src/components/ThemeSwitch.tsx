"use client";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [ready, setReady] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const shouldLight = saved ? saved === "light" : false; 
    setIsLight(shouldLight);
    document.documentElement.classList.toggle("light", shouldLight);
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  if (!ready) return null;
  return (
    <button onClick={toggle} className="btn-ghost" aria-label="Tema değiştir" title="Tema değiştir">
      {isLight ? "🌞" : "🌙"}
    </button>
  );
}
