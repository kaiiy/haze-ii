import { useEffect, useState } from "react";
import SceneContainer from "@/components/SceneContainer";
import { InputChar, isInputChar } from "@/lib/input";
import { AnswerChecker, validateAnswerLength } from "@/lib/answer";
import { useNavigate } from "react-router-dom";
import { OriginalVector, originalVectorToModifiedVector } from "@/lib/vector";
import {
  BoardRaw,
  generateBoard,
  getAllBorderWidthCss,
  vectorToCell,
} from "@/lib/board";
import { navigateWithDelay } from "@/lib/navigate";
import Clear from "@/components/Clear";

interface BaseSceneProps {
  baseSize: number;
  containerWidth: number;
  sceneName: string;
  boardHeight: number;
  boardWidth: number;
  boardRaw: BoardRaw;
  playerHistory: OriginalVector[];
  answer?: InputChar[][];
  answerChecker?: AnswerChecker;
  isDark?: boolean;
}

const BaseScene = (
  {
    baseSize,
    containerWidth,
    sceneName,
    boardHeight,
    boardWidth,
    boardRaw,
    playerHistory,
    answer,
    answerChecker,
    isDark,
  }: BaseSceneProps,
) => {
  if (answerChecker === undefined && answer !== undefined) {
    validateAnswerLength(answer, playerHistory);
  }

  const navigate = useNavigate();
  const board = generateBoard(boardRaw, boardHeight, boardWidth);
  const [historyIndex, setHistoryIndex] = useState(0);
  const cellResult = vectorToCell(
    originalVectorToModifiedVector(playerHistory[historyIndex]),
    board,
  );
  if (!cellResult.success) {
    throw cellResult.error;
  }
  const cell = cellResult.value;

  const cellSize = baseSize * 6;
  const fontSize = cellSize / 2;

  const borderStyle = getAllBorderWidthCss(cellSize, cell, board, isDark);

  const [isBoardFocused, setIsBoardFocused] = useState(true);

  const [inputChars, setInputChars] = useState<InputChar[]>([]);

  const [isClear, setIsClear] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      e.preventDefault();
    } else if (e.key === "Escape") {
      navigateWithDelay(navigate, "/");
    }

    // クリア時
    if (isClear) {
      if (e.key === " ") {
        navigateWithDelay(navigate, "/");
      }
    } else {
      // 未クリア時
      if (isBoardFocused) {
        // View mode
        if (e.key === "ArrowRight") {
          setHistoryIndex(
            Math.min(historyIndex + 1, playerHistory.length - 1),
          );
        } else if (e.key === "ArrowLeft") {
          setHistoryIndex(Math.max(historyIndex - 1, 0));
        }
      } else {
        // Input mode
        if (isInputChar(e.key)) {
          setInputChars([...inputChars, e.key]);
        } else if (e.key === "Backspace" || e.key === "Delete") {
          if (inputChars.length > 0) {
            setInputChars(inputChars.slice(0, inputChars.length - 1));
          }
        } else if (e.key === "Enter") {
          // 正誤判定

          // answer配列をもとに正誤判定
          if (answerChecker === undefined && answer !== undefined) {
            for (let i = 0; i < answer.length; i++) {
              if (inputChars.length === answer[i].length) {
                if (inputChars.every((char, j) => char === answer[i][j])) {
                  setIsClear(true);
                  break;
                }
              }
            }
          } else {
            // answerChecker関数をもとに正誤判定
            if (answerChecker === undefined) {
              throw new Error("answerChecker is undefined");
            }
            if (answerChecker(inputChars)) {
              setIsClear(true);
            }
          }
        }
      }
      if (e.key === " ") {
        setIsBoardFocused(!isBoardFocused);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [historyIndex, isBoardFocused, inputChars, isClear]);

  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    if (isClear) {
      const timer = setTimeout(() => {
        setShowClear(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isClear]);

  return (
    (
      <SceneContainer
        containerWidth={containerWidth}
        navText={sceneName}
        isDark={isDark}
      >
        <div className="w-full h-full">
          <div className="flex justify-center relative">
            {/* historyIndexの位置がずれるバグあり  */}
            <span
              className={`absolute font-sawarabi ${
                !isDark ? "text-charcoal" : "text-lime"
              }`}
              style={{
                lineHeight: String(fontSize * 0.2) + "px",
                height: String(fontSize * 0.2) + "px",
                fontSize: String(fontSize * 0.2) + "px",
                left: "0%",
                top: "-18%",
              }}
            >
              {historyIndex}
            </span>

            <div
              className={`${
                !isDark ? "border-charcoal bg-white" : "border-lime"
              } text-charcoal flex items-center justify-center ${
                isBoardFocused && !showClear ? "opacity-100" : "opacity-25"
              }
              ${cell.type === "RS" || cell.type === "RG" ? "rotate-180" : ""}
              `}
              style={{
                width: String(cellSize) + "px",
                height: String(cellSize) + "px",
                fontSize: String(fontSize) + "px",
                ...borderStyle,
              }}
            >
              <span
                className={`${
                  cell.type === "B" ? "bg-black" : "bg-white"
                } font-notoSans`}
                style={{
                  marginTop: String(-fontSize / 6) + "px",
                }}
              >
                {cell.type === "RS"
                  ? "S"
                  : cell.type === "RG"
                  ? "G"
                  : cell.type === "B"
                  ? ""
                  : cell.type}
              </span>
            </div>
          </div>
          <div
            className={`flex justify-center ${
              !isBoardFocused && !showClear ? "opacity-100" : "opacity-25"
            }`}
            style={{
              marginTop: String(fontSize * 0.3) + "px",
              fontSize: String(fontSize * 0.85) + "px",
              height: String(fontSize * 0.6) + "px",
              lineHeight: String(fontSize * 0.8) + "px",
            }}
          >
            <span
              className={`${
                !isDark ? "text-charcoal" : "text-lime"
              } font-notoSans`}
            >
              {"*".repeat(inputChars.length)}
            </span>
          </div>

          <Clear showClear={showClear} fontSize={fontSize} isDark={isDark} />
        </div>
      </SceneContainer>
    )
  );
};

export default BaseScene;
