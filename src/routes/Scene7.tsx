import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";
import { AnswerChecker } from "@/lib/answer";

const SCENE_NAME = "SCENE 7";

const BOARD_HEIGHT = 9;
const BOARD_WIDTH = 1;
const BOARD_RAW: BoardRaw = [
  ["M"], // y: 0
  ["S"], // y: 1
  ["B"], // y: 2
  ["M"], // y: 3
  ["\\"], // y: 4
  [" "], // y: 5
  ["M"], // y: 6
  ["G"], // y: 7
  [" "], // y: 8
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 0, y: 1 }, // S
  { x: 0, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 7 }, // G
].map(
  vectorToOriginalVector,
);

const U = "ArrowUp";
const D = "ArrowDown";
// const L = "ArrowLeft";
// const R = "ArrowRight";

const answerChecker: AnswerChecker = (inputChars: InputChar[]): boolean => {
  const answerLength = PLAYER_HISTORY.length - 1;
  if (inputChars.length !== answerLength) {
    return false;
  }

  // 最初と最後は必ずU
  if (inputChars.at(0) !== U || inputChars.at(-1) !== U) {
    return false;
  }

  // 途中はULRのどれかならOK
  for (const inputChar of inputChars.slice(1, -1)) {
    if (inputChar === D) {
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
      isDark={false}
      id={"7"}
      sharedText="Scene 7 Clear!"
    />
  );
};

export default Scene;
