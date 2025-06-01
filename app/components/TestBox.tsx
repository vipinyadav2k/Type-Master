"use client";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { FaArrowRotateRight } from "react-icons/fa6";
import WORDS from "@/app/Words";

const generateCharList = (count: number) => {
  const shuffled = [...WORDS].sort(() => 0.5 - Math.random()).slice(0, count);
  const fullText = shuffled.join(" ");
  return fullText.split("").map((char) => ({ char, status: "untyped" }));
};

interface TestBoxProps {
  mode: number;
}

const ROW_WORD_COUNT = 10; // Number of words per row
const VISIBLE_ROWS = 3; // Number of rows visible at a time

const TestBox = ({ mode }: TestBoxProps) => {
  const [charList, setCharList] = useState<{ char: string; status: string }[]>(
    []
  );
  const [charIndex, setCharIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [started, setStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [visibleRowStart, setVisibleRowStart] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCharList(generateCharList(500));
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

  const restartTest = () => {
    setCharList(generateCharList(12000));
    setCharIndex(0);
    setInputValue("");
    setStarted(false);
    setTestEnded(false);
    setTimeLeft(mode);
    setWpm(0);
    setAccuracy(100);
    setStartTime(null);
    setVisibleRowStart(0);
    inputRef.current?.focus();
  };

  useEffect(() => {
    restartTest();
  }, [mode]);

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

  // Returns array of words with chars & info
  const getWordSpans = () => {
    const words: {
      chars: { char: string; status: string }[];
      incorrect: boolean;
      startIndex: number;
    }[] = [];
    let currentWord: { char: string; status: string }[] = [];
    let currentStartIndex = 0;

    for (let i = 0; i < charList.length; i++) {
      const char = charList[i];
      if (currentWord.length === 0) {
        currentStartIndex = i;
      }

      currentWord.push(char);

      if (char.char === " " || i === charList.length - 1) {
        const hasError = currentWord.some((c) => c.status === "incorrect");
        words.push({
          chars: [...currentWord],
          incorrect: hasError,
          startIndex: currentStartIndex,
        });
        currentWord = [];
      }
    }

    return words;
  };

  // Handle scrolling to next rows smartly
  useEffect(() => {
    const words = getWordSpans();

    // Find current word index based on charIndex
    let currentWordIdx = 0;
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (charIndex < w.startIndex + w.chars.length) {
        currentWordIdx = i;
        break;
      }
    }

    // Calculate visible window in words
    // Each row has ROW_WORD_COUNT words
    // visibleRowStart represents the starting word index for visible rows

    // Calculate current visible row number (relative)
    const currentRowNumber = Math.floor((currentWordIdx - visibleRowStart) / ROW_WORD_COUNT);

    // If user reaches end of second visible row (index 1), scroll down by one row
    if (currentRowNumber >= 2) {
      setVisibleRowStart((prev) => prev + ROW_WORD_COUNT);
    }
  }, [charIndex]);

  // Slice words to show only visible rows (3 rows)
  const visibleWords = getWordSpans().slice(
    visibleRowStart,
    visibleRowStart + ROW_WORD_COUNT * VISIBLE_ROWS
  );

  return (
    <>
      <div
        className="text-white mt-15 py-8 flex flex-col items-center"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="relative left-0 font-bold text-3xl text-[#b6a4a4] py-8">
          {timeLeft}
        </div>

        {/* Container with fixed height to show exactly 3 rows */}
        <div
          className="max-w-7xl w-full text-3xl font-mono leading-tight flex flex-wrap gap-x-1 gap-y-2 justify-center mb-6 relative overflow-hidden"
          style={{ maxHeight: "7.5em" /* approx 3 rows * 2.5em line-height */ }}
        >
          {visibleWords.map((word, wordIdx) => (
            <span
              key={visibleRowStart + wordIdx}
              className={classNames("inline-block", {
                "underline decoration-[#ce6464]": word.incorrect,
              })}
            >
              {word.chars.map((charObj, idx) => {
                const globalIdx = word.startIndex + idx;
                return (
                  <span
                    key={globalIdx}
                    className={classNames("relative", {
                      "text-gray-500": charObj.status === "untyped",
                      "text-[#d6cfcf]": charObj.status === "correct",
                      "text-[#ce6464]": charObj.status === "incorrect",
                    })}
                  >
                    {charObj.char === " " ? "\u00A0" : charObj.char}
                    {globalIdx === charIndex && (
                      <span className="absolute left-[-3px] -top-[-6px] w-[3px] h-8 bg-orange-400 animate-pulse" />
                    )}
                  </span>
                );
              })}
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

      <button
        className="relative  py-1 text-gray-500 hover:scale-110 cursor-pointer hover:text-cyan-500"
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

export default TestBox;
