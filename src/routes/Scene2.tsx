import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";

const SCENE_NAME = "SCENE 2";

const BOARD_HEIGHT = 4;
const BOARD_WIDTH = 3;
const BOARD_RAW: BoardRaw = [
  ["B", 1, "G"],
  [3, 2, "B"],
  ["B", "S", "B"],
  [5, 4, 5],
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 1, y: 2 },
  { x: 1, y: 3 },
  { x: 0, y: 3 },
  { x: 1, y: 3 },
  { x: 1, y: 2 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
].map(
  vectorToOriginalVector,
);

const ANSWER: InputChar[][] = [
  [
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowRight",
  ],
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
      id={"2"}
    />
  );
};

export default Scene;
