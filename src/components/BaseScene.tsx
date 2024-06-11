import { useEffect, useState } from "react";
import SceneContainer from "@/components/SceneContainer";
import { InputChar } from "@/lib/input";
import { useNavigate } from "react-router-dom";
import { OriginalVector, originalVectorToModifiedVector } from "@/lib/vector";
import {
  BoardRaw,
  generateBoard,
  getBorderWidthPx,
  vectorToCell,
} from "@/lib/board";
import { BLINK_STYLE, KEYFRAMES_STYLE } from "@/lib/clear";
import { navigateWithDelay } from "@/lib/navigate";

interface BaseSceneProps {
  baseSize: number;
  containerWidth: number;
  sceneName: string;
  boardHeight: number;
  boardWidth: number;
  boardRaw: BoardRaw;
  playerHistory: OriginalVector[];
  answer: InputChar[][];
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
  }: BaseSceneProps,
) => {
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

  const borderLeftWidthResult = getBorderWidthPx(cellSize, cell, board, "Left");
  const borderRightWidthResult = getBorderWidthPx(
    cellSize,
    cell,
    board,
    "Right",
  );
  const borderTopWidthResult = getBorderWidthPx(cellSize, cell, board, "Up");
  const borderBottomWidthResult = getBorderWidthPx(
    cellSize,
    cell,
    board,
    "Down",
  );
  if (!borderLeftWidthResult.success) {
    throw borderLeftWidthResult.error;
  }
  if (!borderRightWidthResult.success) {
    throw borderRightWidthResult.error;
  }
  if (!borderTopWidthResult.success) {
    throw borderTopWidthResult.error;
  }
  if (!borderBottomWidthResult.success) {
    throw borderBottomWidthResult.error;
  }
  const borderLeftWidth = borderLeftWidthResult.value;
  const borderRightWidth = borderRightWidthResult.value;
  const borderTopWidth = borderTopWidthResult.value;
  const borderBottomWidth = borderBottomWidthResult.value;

  const [isBoardFocused, setIsBoardFocused] = useState(true);

  const [inputChars, setInputChars] = useState<InputChar[]>([]);

  const [isClear, setIsClear] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      e.preventDefault();
    } else if (e.key === "Escape") {
      navigateWithDelay(navigate, "/");
    }

    if (!isClear) {
      if (isBoardFocused) {
        if (e.key === "ArrowRight") {
          setHistoryIndex(
            Math.min(historyIndex + 1, playerHistory.length - 1),
          );
        } else if (e.key === "ArrowLeft") {
          setHistoryIndex(Math.max(historyIndex - 1, 0));
        }
      } else {
        const regex = /^[a-z0-9]$/;
        if (
          e.key === "ArrowRight" || e.key === "ArrowLeft" ||
          e.key === "ArrowUp" || e.key === "ArrowDown" ||
          regex.test(e.key)
        ) {
          setInputChars([...inputChars, e.key as InputChar]);
        } else if (e.key === "Backspace" || e.key === "Delete") {
          if (inputChars.length > 0) {
            setInputChars(inputChars.slice(0, inputChars.length - 1));
          }
        } else if (e.key === "Enter") {
          for (let i = 0; i < answer.length; i++) {
            if (inputChars.length === answer[i].length) {
              if (inputChars.every((char, j) => char === answer[i][j])) {
                setIsClear(true);
                break;
              }
            }
          }
        }
      }
      if (e.key === " ") {
        setIsBoardFocused(!isBoardFocused);
      }
    } else {
      if (e.key === " ") {
        navigateWithDelay(navigate, "/");
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
      <SceneContainer containerWidth={containerWidth} navText={sceneName}>
        <div className="w-full h-full">
          <div className="flex justify-center">
            <div
              className={`border-charcoal text-charcoal bg-white flex items-center justify-center ${
                isBoardFocused && !showClear ? "opacity-100" : "opacity-25"
              }`}
              style={{
                width: String(cellSize) + "px",
                height: String(cellSize) + "px",
                fontSize: String(fontSize) + "px",
                borderLeftWidth: String(borderLeftWidth) + "px",
                borderRightWidth: String(borderRightWidth) + "px",
                borderTopWidth: String(borderTopWidth) + "px",
                borderBottomWidth: String(borderBottomWidth) + "px",
              }}
            >
              <span
                className="bg-white font-notoSans"
                style={{
                  marginTop: String(-fontSize / 6) + "px",
                }}
              >
                {cell.type}
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
            <span className="text-charcoal font-notoSans">
              {"*".repeat(inputChars.length)}
            </span>
          </div>

          <div
            className={`flex flex-col font-notoSerif`}
            style={{
              opacity: showClear ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            <div
              className="flex justify-center text-charcoal"
              style={{
                fontSize: String(fontSize * 0.3) + "px",
                fontWeight: 500,
              }}
            >
              Clear!
            </div>
            <style>{KEYFRAMES_STYLE}</style>
            <div
              className="flex justify-center text-charcoal"
              style={{
                fontSize: String(fontSize * 0.25) + "px",
                fontWeight: 500,
                ...BLINK_STYLE,
              }}
            >
              <span
                style={{
                  letterSpacing: "-.2em",
                  width: "2em",
                  marginRight: ".5em",
                }}
              >
                ――
              </span>Press Space
              <span
                style={{
                  letterSpacing: "-.2em",
                  width: "2em",
                  marginLeft: ".5em",
                }}
              >
                ――
              </span>
            </div>
          </div>
        </div>
      </SceneContainer>
    )
  );
};

export default BaseScene;
