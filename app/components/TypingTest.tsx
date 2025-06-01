"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import TestBox from "./TestBox";

const TIME_MODES = [15, 30, 60, 120];
const DEFAULT_MODE = 30;

const TypingTest = () => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("typingMode");
    return saved && TIME_MODES.includes(Number(saved)) ? Number(saved) : DEFAULT_MODE;
  });

  useEffect(() => {
    localStorage.setItem("typingMode", mode.toString());
    console.log("Changed to", mode);
  }, [mode]);

  return (
    <>
      <Header />
      <div className="absolute top-20 right-50 flex gap-4">
        {TIME_MODES.map((t) => (
          <button
            key={t}
            onClick={() => setMode(t)}
            className={`cursor-pointer px-4 py-2 rounded-lg font-semibold backdrop-blur-md bg-white/10 border border-white/20 text-gray-500 shadow-md transition-transform hover:scale-105 ${
              mode === t ? "bg-white/10 text-gray-500 border-yellow-500" : ""
            }`}
          >
            {t}s
          </button>
        ))}
      </div>
      <TestBox mode={mode} />
    </>
  );
};

export default TypingTest;
