"use client";
import React, { useEffect, useState } from "react";

interface Props {
  color: string;
  onChange: (color: string) => void;
  label: string;
  onClose?: () => void;
}

export default function FancyColorPicker({ color, onChange, label, onClose }: Props) {
  const [currentColor, setCurrentColor] = useState<string>(() => {
    return sessionStorage.getItem("selectedColor") || color;
  });

  useEffect(() => {
    sessionStorage.setItem("selectedColor", currentColor);
    onChange(currentColor);
  }, [currentColor]);

  return (
    <div
      onClick={onClose} // click outside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside modal
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "20px",
          padding: "2rem",
          width: "320px",
          textAlign: "center",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 1)",
          transform: "scale(1)",
          animation: "fadeScale 0.4s ease-out",
        }}
      >
        <h3 style={{ marginBottom: "1rem", fontSize: "1.25rem" }}>{label}</h3>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
          style={{
            width: "100%",
            height: "60px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        />
        {!onClose && (
          <button
            onClick={onClose}
            style={{
              marginTop: "1rem",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              color: "#fff",
              transition: "background 0.3s",
            }}
          >
            Close
          </button>
        )}
      </div>

      <style>
        {`
          @keyframes fadeScale {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}
