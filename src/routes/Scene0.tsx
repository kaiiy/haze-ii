import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";

const SCENE_NAME = "SCENE 0";

const BOARD_HEIGHT = 1;
const BOARD_WIDTH = 4;
const BOARD_RAW: BoardRaw = [
  ["S", 2, 1, "G"],
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
].map(
  vectorToOriginalVector,
);

const ANSWER: InputChar[][] = [
  ["ArrowRight", "ArrowRight", "ArrowRight"],
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
