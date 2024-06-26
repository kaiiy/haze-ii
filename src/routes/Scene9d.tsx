import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";
import { AnswerChecker } from "@/lib/answer";

const SCENE_NAME = "SCENE 9";

const BOARD_HEIGHT = 9;
const BOARD_WIDTH = 3;
const BOARD_RAW: BoardRaw = [
  [" ", " ", " "], // y: 0
  [" ", "B", " "], // y: 1
  [" ", "B", " "], // y: 2
  [" ", " ", " "], // y: 3
  [" ", "B", " "], // y: 4
  [" ", " ", " "], // y: 5
  [" ", "B", " "], // y: 6
  ["B", "B", " "], // y: 7
  [" ", " ", " "], // y: 8
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  //
  { x: 1, y: 4 },
  //
  { x: 1, y: 7 },
  { x: 1, y: 7 },
  { x: 1, y: 7 },
].map(
  vectorToOriginalVector,
);

// const U = "ArrowUp";
// const D = "ArrowDown";
const L = "ArrowLeft";
// const R = "ArrowRight";

const answerChecker: AnswerChecker = (inputChars: InputChar[]): boolean => {
  if (
    inputChars.length === 2 &&
    inputChars[0] === L &&
    inputChars[1] === L
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
