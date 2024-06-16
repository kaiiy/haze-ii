import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";
// import { AnswerChecker } from "@/lib/answer";

const SCENE_NAME = "SCENE 8";

const BOARD_HEIGHT = 16;
const BOARD_WIDTH = 6;
const BOARD_RAW: BoardRaw = [
  [" ", " ", " ", " ", " ", " "], // y: 0
  //
  [" ", "B", "3", "4", "5", " "], // y: 1
  [" ", "3", "2", "B", "S", " "], // y: 2
  [" ", "2", "1", "B", "7", "B"], // y: 3
  [" ", "B", "G", "1", "B", " "], // y: 4
  //
  [" ", " ", " ", " ", " ", " "], // y: 5
  //
  [" ", "B", "\\", "\\", "\\", " "], // y: 6
  [" ", "3", "B", "\\", "S", " "], // y:   7
  [" ", "2", "1", "B", "\\", "B"], // y:   8
  [" ", "B", "G", "1", "B", " "], // y:    9
  //
  [" ", " ", " ", " ", " ", " "], // y: 10
  //
  [" ", "B", "3", "4", "5", " "], // y: 11
  [" ", "B", "2", "3", "S", " "], // y: 12
  [" ", "2", "1", "B", "5", "B"], // y: 13
  [" ", "B", "G", "1", "B", " "], // y: 14
  //
  [" ", " ", " ", " ", " ", " "], // y: 15
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 4, y: 2 }, // S
  { x: 4, y: 3 }, // 7
  { x: 4, y: 2 }, // S
  { x: 4, y: 1 }, // 5
  { x: 4, y: 2 }, // S
  // 黒マスを左に押す
  { x: 3, y: 7 }, // \
  // 黒マスを左に押す
  { x: 2, y: 12 },
  { x: 2, y: 13 },
  { x: 2, y: 14 },
].map(
  vectorToOriginalVector,
);

const U = "ArrowUp";
const D = "ArrowDown";
const L = "ArrowLeft";
// const R = "ArrowRight";

const ANSWER: InputChar[][] = [
  [D, U, U, D, L, L, D, D],
];

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
      answer={ANSWER}
    />
  );
};

export default Scene;
