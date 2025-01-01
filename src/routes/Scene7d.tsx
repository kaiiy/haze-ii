import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";
import { AnswerChecker } from "@/lib/answer";

const SCENE_NAME = "SCENE 7";

const BOARD_HEIGHT = 6;
const BOARD_WIDTH = 3;
const BOARD_RAW: BoardRaw = [
  [" ", " ", " "], // y: 0
  ["B", "B", "B"], // y: 1
  [" ", " ", " "], // y: 2
  [" ", "B", " "], // y: 3
  ["B", "B", "B"], // y: 4
  [" ", " ", " "], // y: 5
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 4 },
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
      id={"7d"}
      sharedText="Scene 7D Clear!"
    />
  );
};

export default Scene;
