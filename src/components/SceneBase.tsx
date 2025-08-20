import { useEffect, useState } from "react";
import SceneContainer from "@/components/SceneContainer";
import { InputChar, isInputChar } from "@/lib/input";
import {
  AnswerChecker,
  isCorrectAnswer,
  validateAnswerLength,
} from "@/lib/answer";
import { useNavigate } from "react-router-dom";
import { OriginalVector, originalVectorToModifiedVector } from "@/lib/vector";
import {
  BoardRaw,
  cellTypeToSymbol,
  generateBoard,
  getAllBorderColorCss,
  getAllBorderStyleCss,
  getAllBorderWidthCss,
  vectorToCell,
} from "@/lib/board";
import { navigateWithDelay } from "@/lib/navigate";
import Clear from "@/components/Clear";
import { SceneId, vStorage } from "@/lib/storage";
import Arrows from "@/components/SceneArrows";
import { Button } from "@/components/ui/button";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaBackspace,
} from "react-icons/fa";
import { FaArrowTurnDown } from "react-icons/fa6";
import { TbSpace } from "react-icons/tb";
import { useIsMdOrBelow } from "@/lib/window";

interface SceneBaseProps {
  baseSize: number;
  containerWidth: number;
  sceneName: string;
  boardHeight: number;
  boardWidth: number;
  boardRaw: BoardRaw;
  playerHistory: OriginalVector[];
  answer?: InputChar[][];
  answerChecker?: AnswerChecker;
  isDark: boolean;
  id: SceneId;
  sharedText: string;
}

const SceneBase = (
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
    id,
    sharedText,
  }: SceneBaseProps,
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

  const isMdOrBelow = useIsMdOrBelow();
  const cellSize = baseSize * 6 * (isMdOrBelow ? 2 : 1);
  const fontSize = cellSize / 2;

  const borderStyle = {
    ...getAllBorderWidthCss(cellSize, cell, board, isDark),
    ...getAllBorderStyleCss(cell, board),
    ...getAllBorderColorCss(cell, board, isDark),
  };

  const [isBoardFocused, setIsBoardFocused] = useState(true);

  const [inputChars, setInputChars] = useState<InputChar[]>([]);

  const [isClear, setIsClear] = useState(false);

  const handleViewMode = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setHistoryIndex(
        Math.min(historyIndex + 1, playerHistory.length - 1),
      );
    } else if (e.key === "ArrowLeft") {
      setHistoryIndex(Math.max(historyIndex - 1, 0));
    }
  };

  const handleInputMode = (e: KeyboardEvent) => {
    if (isInputChar(e.key)) {
      setInputChars([...inputChars, e.key]);
    } else if (e.key === "Backspace" || e.key === "Delete") {
      if (inputChars.length > 0) {
        setInputChars(inputChars.slice(0, inputChars.length - 1));
      }
    } // 正誤判定
    else if (e.key === "Enter") {
      const isCorrect = isCorrectAnswer(
        inputChars,
        answer,
        answerChecker,
      );
      if (isCorrect) {
        setIsClear(true);
        vStorage.overwriteChecked(id, true);

        const loaded = vStorage.load();
        const prevId = loaded.currentScene;
        vStorage.updateCurrentSceneToNext(prevId, id);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      e.preventDefault();
    } else if (e.key === "Escape") {
      navigateWithDelay(navigate, "/");
    }

    if (isClear) {
      // クリア時
      if (e.key === " ") {
        navigateWithDelay(navigate, "/");
      }
    } else {
      // 未クリア時
      if (isBoardFocused) {
        handleViewMode(e);
      } else {
        handleInputMode(e);
      }

      // モードの切り替え
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

  // クリアの表示を遅らせる
  useEffect(() => {
    if (isClear) {
      const timer = setTimeout(() => {
        setShowClear(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isClear]);

  const simulateKey = (key: string) => {
    const syntheticEvent = {
      key,
      preventDefault: () => {},
    } as unknown as KeyboardEvent;
    handleKeyDown(syntheticEvent);
  };

  const preventKeyboardActivation: React.KeyboardEventHandler = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
    }
  };

  const btnProps = {
    tabIndex: -1,
    onMouseDown: (e: React.MouseEvent) => e.preventDefault(),
    onKeyDown: preventKeyboardActivation,
  };

  return (
    (
      <SceneContainer
        containerWidth={containerWidth}
        navText={sceneName}
        isDark={isDark}
        id={id}
      >
        <div className="w-full h-full">
          <div className="flex justify-center relative w-full">
            <span
              className={`absolute font-sawarabi ${
                !isDark ? "text-charcoal" : "text-lime"
              } ${isBoardFocused && !showClear ? "opacity-100" : "opacity-25"}`}
              style={{
                lineHeight: String(fontSize * 0.2) + "px",
                height: String(fontSize * 0.2) + "px",
                fontSize: String(fontSize * 0.2) + "px",
                width: String(fontSize * 0.25) + "px",
                left: "50%",
                transform: "translateX(-550%)",
                top: "-18%",
              }}
            >
              {historyIndex}
            </span>

            <div
              className={`${
                !isDark && "bg-white"
              } text-charcoal flex items-center justify-center ${
                isBoardFocused && !showClear ? "opacity-100" : "opacity-25"
              } ${
                cell.type === "RS" || cell.type === "RG" ? "rotate-180" : ""
              }`}
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
                {cellTypeToSymbol(cell.type)}
              </span>
            </div>
          </div>

          <Arrows
            isMdOrBelow={isMdOrBelow}
            baseSize={baseSize}
            isDark={isDark}
            inputChars={inputChars}
            showClear={showClear}
            isBoardFocused={isBoardFocused}
            fontSize={fontSize}
          />

          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-2">
              <Button
                variant={isBoardFocused ? "disabled" : "default"}
                size="icon"
                className="size-16"
                onClick={() => simulateKey("ArrowUp")}
                {...btnProps}
              >
                <FaArrowUp size={24} />
              </Button>
              <Button
                variant={isBoardFocused ? "disabled" : "default"}
                size="icon"
                className="size-16"
                onClick={() => simulateKey("ArrowDown")}
                {...btnProps}
              >
                <FaArrowDown size={24} />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="size-16"
                onClick={() => simulateKey("ArrowLeft")}
                {...btnProps}
              >
                <FaArrowLeft size={24} />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="size-16"
                onClick={() => simulateKey("ArrowRight")}
                {...btnProps}
              >
                <FaArrowRight size={24} />
              </Button>
            </div>
            <div className="flex justify-center gap-2">
              <Button
                variant={isBoardFocused ? "disabled" : "default"}
                size="icon"
                className="size-16"
                onClick={() => simulateKey("Backspace")}
                {...btnProps}
              >
                <FaBackspace size={24} />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="size-16"
                onClick={() => simulateKey(" ")}
                {...btnProps}
              >
                <TbSpace size={24} />
              </Button>
              <Button
                variant={isBoardFocused ? "disabled" : "default"}
                size="icon"
                className="size-16"
                onClick={() => simulateKey("Enter")}
                {...btnProps}
              >
                <FaArrowTurnDown className="transform rotate-90" size={24} />
              </Button>
            </div>
          </div>

          <Clear
            showClear={showClear}
            fontSize={fontSize}
            isDark={isDark}
            sharedText={sharedText}
          />
        </div>
      </SceneContainer>
    )
  );
};

export default SceneBase;
