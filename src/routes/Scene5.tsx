import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import SceneBase from "@/components/SceneBase";
import { AnswerChecker } from "@/lib/answer";

const SCENE_NAME = "SCENE 5";

const BOARD_HEIGHT = 2;
const BOARD_WIDTH = 5;
const BOARD_RAW: BoardRaw = [
  ["S", " ", " ", " ", "G"],
  ["B", "B", " ", "B", "B"],
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
].map(
  vectorToOriginalVector,
);

const U = "ArrowUp";
const D = "ArrowDown";
const L = "ArrowLeft";
const R = "ArrowRight";

const answerChecker: AnswerChecker = (inputChars: InputChar[]): boolean => {
  if (inputChars.length !== PLAYER_HISTORY.length - 1) return false;

  const required: [number, InputChar][] = [
    [0, R],
    [2, R],
    [3, D],
    [4, U],
    [5, R],
    [7, R],
  ];
  const hasRequired = required.some(([i, ch]) => inputChars[i] === ch);
  const hasForbidden = [1, 6].some((i) => inputChars[i] === L);

  return hasRequired && !hasForbidden;
};

interface SceneProps {
  baseSize: number;
  containerWidth: number;
}

const Scene = ({ baseSize, containerWidth }: SceneProps) => {
  return (
    <SceneBase
      baseSize={baseSize}
      containerWidth={containerWidth}
      sceneName={SCENE_NAME}
      boardHeight={BOARD_HEIGHT}
      boardWidth={BOARD_WIDTH}
      boardRaw={BOARD_RAW}
      playerHistory={PLAYER_HISTORY}
      answerChecker={answerChecker}
      isDark={false}
      id={"5"}
      sharedText="Scene 5 Clear!"
    />
  );
};

export default Scene;
