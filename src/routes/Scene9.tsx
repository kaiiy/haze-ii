import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";
// import { AnswerChecker } from "@/lib/answer";

const SCENE_NAME = "SCENE 9";

const BOARD_HEIGHT = 16;
const BOARD_WIDTH = 6;
const BOARD_RAW: BoardRaw = [
  ["B", "B", "B", "B", "B", "B"], // y: 0
  //
  ["B", "B", "3", "4", "5", "B"], // y: 1
  ["B", "3", "2", "M", "S", "B"], // y: 2
  ["B", "2", "1", "B", "7", "B"], // y: 3
  ["B", "B", "G", "1", "B", "B"], // y: 4
  //
  ["B", "B", "B", "B", "B", "B"], // y: 5
  //
  ["B", "B", "\\", "\\", "\\", "B"], // y: 6
  ["B", "3", "M", "\\", "S", "B"], // y:   7
  ["B", "2", "1", "B", "\\", "B"], // y:   8
  ["B", "B", "G", "1", "B", "B"], // y:    9
  //
  ["B", "B", "B", "B", "B", "B"], // y: 10
  //
  ["B", "B", "3", "4", "5", "B"], // y: 11
  ["B", "M", "2", "3", "S", "B"], // y: 12
  ["B", "2", "1", "B", "5", "B"], // y: 13
  ["B", "B", "G", "1", "B", "B"], // y: 14
  //
  ["B", "B", "B", "B", "B", "B"], // y: 15
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
      isDark={false}
      id={"9"}
      sharedText="Scene 9 Clear!"
    />
  );
};

export default Scene;
