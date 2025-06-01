"use client";
import { useEffect, useState } from "react";
import FancyColorPicker from "./FancyColorPicker";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bgColor, setBgColor] = useState<string | null>(null);
  const [activePicker, setActivePicker] = useState<"bg" | null>(null);

  useEffect(() => {
    const storedBg = sessionStorage.getItem("bgColor");
    setBgColor(storedBg || "black"); // fallback to default
  }, []);

  useEffect(() => {
    if (bgColor) {
      sessionStorage.setItem("bgColor", bgColor);
    }
  }, [bgColor]);

  if (!bgColor) return null;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        padding: "3rem 1.5rem",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}

      <button
        onClick={() => setActivePicker(activePicker === "bg" ? null : "bg")}
        className="mt-14 px-6 py-2 rounded-xl font-medium 
             border border-white/40 
             backdrop-blur-md 
             bg-white/10 dark:bg-white/5 
             text-gray-500 dark:text-white 
             shadow-md dark:shadow-lg 
             hover:shadow-xl hover:scale-105 
             transition-all duration-300 ease-in-out 
             "
      >
        Customise
      </button>

      {activePicker === "bg" && (
        <FancyColorPicker
          color={bgColor}
          onChange={setBgColor}
          label="Background Color"
          onClose={() => setActivePicker(null)} // <-- close when clicking outside
        />
      )}
    </div>
  );
}
