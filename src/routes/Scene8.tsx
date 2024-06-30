import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";

const SCENE_NAME = "SCENE 8";

const BOARD_HEIGHT = 13;
const BOARD_WIDTH = 6;
const BOARD_RAW: BoardRaw = [
  [" ", " ", " ", " ", " ", " "], // y: 0
  //
  [" ", "4", "3", "2", "B", " "], // y: 1
  [" ", "S", "B", "1", "G", "B"], // y: 2
  [" ", "4", "3", "2", "B", " "], // y: 3
  //
  [" ", " ", " ", " ", " ", " "], // y: 4
  //
  [" ", "4", "B", "2", "B", " "], // y: 5
  [" ", "S", "2", "1", "G", "B"], // y: 6
  [" ", "4", "3", "2", "B", " "], // y: 7
  //
  [" ", " ", " ", " ", " ", " "], // y: 8
  //
  [" ", "4", "3", "B", "B", " "], // y: 9
  [" ", "S", "2", "1", "G", "B"], // y: 10
  [" ", "4", "3", "2", "B", " "], // y: 11
  //
  [" ", " ", " ", " ", " ", " "], // y: 12
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 1, y: 2 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
  { x: 3, y: 3 },
  { x: 2, y: 3 },
  // 黒マスを上に押す
  { x: 2, y: 6 },
  { x: 1, y: 6 }, // S
  { x: 1, y: 5 }, // 4
  // 黒マスを右に押す
  { x: 2, y: 9 },
  { x: 2, y: 10 },
  { x: 3, y: 10 },
  { x: 4, y: 10 },
].map(
  vectorToOriginalVector,
);

const U = "ArrowUp";
const D = "ArrowDown";
const L = "ArrowLeft";
const R = "ArrowRight";

const ANSWER: InputChar[][] = [
  [D, R, R, L, U, L, U, R, D, R, R],
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
      id={"8"}
    />
  );
};

export default Scene;
