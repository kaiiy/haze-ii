import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";
import { AnswerChecker } from "@/lib/answer";

const SCENE_NAME = "SCENE 6";

const BOARD_HEIGHT = 7;
const BOARD_WIDTH = 1;
const BOARD_RAW: BoardRaw = [
  ["S"], // y: 0
  ["B"], // y: 1
  ["\\"], // y: 2
  [" "], // y: 3
  ["B"], // y: 4
  ["G"], // y: 5
  [" "], // y: 6
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 0, y: 0 }, // S
  { x: 0, y: 2 },
  { x: 0, y: 2 },
  { x: 0, y: 2 },
  { x: 0, y: 2 },
  { x: 0, y: 2 },
  { x: 0, y: 5 }, // G
].map(
  vectorToOriginalVector,
);

const U = "ArrowUp";
// const D = "ArrowDown";
const L = "ArrowLeft";
const R = "ArrowRight";

const answerChecker: AnswerChecker = (inputChars: InputChar[]): boolean => {
  const answerLength = PLAYER_HISTORY.length - 1;
  if (inputChars.length !== answerLength) {
    return false;
  }

  if (inputChars[0] !== U && inputChars[answerLength - 1] !== U) {
    return false;
  }
  for (const inputChar of inputChars.slice(1, -1)) {
    if (inputChar !== U && inputChar !== L && inputChar !== R) {
      return false;
    }
  }

  return true;
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
    />
  );
};

export default Scene;
