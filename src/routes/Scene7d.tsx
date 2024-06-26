import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";
import { AnswerChecker } from "@/lib/answer";

const SCENE_NAME = "SCENE 7";

const BOARD_HEIGHT = 3;
const BOARD_WIDTH = 1;
const BOARD_RAW: BoardRaw = [
  [" "], // y: 0
  ["B"], // y: 1
  [" "], // y: 2
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 0, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: 1 },
].map(
  vectorToOriginalVector,
);

const U = "ArrowUp";
// const D = "ArrowDown";
// const L = "ArrowLeft";
// const R = "ArrowRight";

const answerChecker: AnswerChecker = (inputChars: InputChar[]): boolean => {
  if (
    inputChars.length >= 2 && inputChars.length <= 6 &&
    inputChars.every((inputChar) => inputChar === U)
  ) {
    return true;
  }
  return false;
};

interface SceneProps {
  baseSize: number;
  containerWidth: number;
}

const Scene = ({ baseSize, containerWidth }: SceneProps) => {
  return (
    <BaseScene
      baseSize={baseSize}
      containerWidth={containerWidth}
      sceneName={SCENE_NAME}
      boardHeight={BOARD_HEIGHT}
      boardWidth={BOARD_WIDTH}
      boardRaw={BOARD_RAW}
      playerHistory={PLAYER_HISTORY}
      answerChecker={answerChecker}
      isDark={true}
    />
  );
};

export default Scene;
