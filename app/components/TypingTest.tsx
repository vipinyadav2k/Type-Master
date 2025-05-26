"use client";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { FaArrowRotateRight } from "react-icons/fa6";
import Header from "./Header";

const WORDS = [
  "hello",
  "world",
  "react",
  "typescript",
  "tailwind",
  "keyboard",
  "monkey",
  "typing",
  "clone",
  "speed",
  "test",
  "code",
  "developer",
  "project",
  "random",
  "challenge",
  "input",
  "function",
  "compare",
  "text",
  "timer",
  "start",
  "game",
  "logic",
  "syntax",
  "loop",
  "event",
  "state",
  "render",
  "node",
];

const TIME_MODES = [15, 30, 60, 120];

const generateCharList = (count: number) => {
  const shuffled = [...WORDS].sort(() => 0.5 - Math.random()).slice(0, count);
  const fullText = shuffled.join(" ");
  return fullText.split("").map((char) => ({ char, status: "untyped" }));
};

const TypingTest = () => {
  const [charList, setCharList] = useState<{ char: string; status: string }[]>(
    []
  );
  const [charIndex, setCharIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [started, setStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [mode, setMode] = useState(30);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCharList(generateCharList(50));
  }, []);

  useEffect(() => {
    if (started && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setTestEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [started]);

  useEffect(() => {
    if (testEnded && startTime) {
      const elapsedTime = (Date.now() - startTime) / 60000;
      const correctChars = charList.filter(
        (c) => c.status === "correct"
      ).length;
      const totalTyped = charList.filter((c) => c.status !== "untyped").length;
      setWpm(Math.round(correctChars / 5 / elapsedTime));
      setAccuracy(
        totalTyped ? Math.round((correctChars / totalTyped) * 100) : 100
      );
    }
  }, [testEnded]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (testEnded) return;

    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }

    if (e.key === "Backspace") {
      if (charIndex > 0) {
        const updatedList = [...charList];
        updatedList[charIndex - 1].status = "untyped";
        setCharList(updatedList);
        setCharIndex(charIndex - 1);
      }
      return;
    }

    if (charIndex >= charList.length) return;

    const updatedList = [...charList];
    const expected = updatedList[charIndex].char;
    const typed = e.key;

    updatedList[charIndex].status =
      typed === expected ? "correct" : "incorrect";
    setCharList(updatedList);
    setCharIndex(charIndex + 1);
  };

  const restartTest = () => {
    setCharList(generateCharList(50));
    setCharIndex(0);
    setInputValue("");
    setStarted(false);
    setTestEnded(false);
    setTimeLeft(mode);
    setWpm(0);
    setAccuracy(100);
    setStartTime(null);
    inputRef.current?.focus();
  };

  return (
    <>
      <Header />
      <div className=" absolute top-30 right-50 flex gap-4">
        {TIME_MODES.map((t) => (
          <button
            key={t}
            onClick={() => {
              setMode(t);
              setTimeLeft(t);
              restartTest();
            }}
            className={`px-4 py-2 rounded-lg font-semibold backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-md transition-transform hover:scale-105 ${
              mode == t
                ? "bg-yellow-400/30 text-yellow-200 border-yellow-500"
                : ""
            }`}
          >
            {t}s
          </button>
        ))}
      </div>
      {testEnded ? (
        <div className="skeleton"></div>
      ) : (
        <div
          className="text-white mt-50 py-8 flex flex-col items-center"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="max-w-7xl w-full text-3xl font-mono leading-tight flex flex-wrap gap-x-1 gap-y-2 justify-center mb-6 relative ">
            {charList.map((charObj, idx) => (
              <span
                key={idx}
                className={classNames("relative", {
                  "text-gray-500": charObj.status === "untyped",
                  "text-cyan-400": charObj.status === "correct",
                  "text-[#ce6464] underline": charObj.status === "incorrect",
                })}
              >
                {charObj.char === " " ? "\u00A0" : charObj.char}
                {idx === charIndex && (
                  <span className="absolute left-[-3] -top-[-6] w-[3px] h-8 bg-orange-400 animate-pulse" />
                )}
              </span>
            ))}
          </div>

          <input
            ref={inputRef}
            className="absolute opacity-0"
            onKeyDown={handleKeyDown}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
        </div>
      )}
      <button
        className="relative left-1/2 mx-6 px-4 py-2 text-gray-500 hover:scale-110 cursor-pointer hover:text-cyan-500"
        onClick={restartTest}
      >
        <FaArrowRotateRight className="text-xl" />
      </button>
      {testEnded && (
        <div className="relative mt-6 text-center">
          <p className="text-2xl font-bold text-gray-400">
            Test Finished! WPM: {wpm} | Accuracy: {accuracy}%
          </p>
        </div>
      )}
    </>
  );
};

export default TypingTest;
