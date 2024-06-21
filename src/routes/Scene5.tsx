import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";
import { AnswerChecker } from "@/lib/answer";

const SCENE_NAME = "SCENE 5";

const BOARD_HEIGHT = 3;
const BOARD_WIDTH = 8;
const BOARD_RAW: BoardRaw = [
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", "S", "4", " ", " ", "1", "G", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
  { x: 5, y: 1 },
  { x: 6, y: 1 },
].map(
  vectorToOriginalVector,
);

const answerChecker: AnswerChecker = (inputChars: InputChar[]): boolean => {
  if (inputChars.length !== PLAYER_HISTORY.length - 1) {
    return false;
  }

  const inputCharsSet = new Set(inputChars);
  if (inputCharsSet.size >= 3) {
    return false;
  }

  if (inputCharsSet.has("ArrowLeft") && inputCharsSet.has("ArrowRight")) {
    return false;
  }
  if (inputCharsSet.has("ArrowUp") && inputCharsSet.has("ArrowDown")) {
    return false;
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
