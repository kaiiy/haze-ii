import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import SceneBase from "@/components/SceneBase";

const SCENE_NAME = "SCENE 5";

const BOARD_HEIGHT = 1;
const BOARD_WIDTH = 3;
const BOARD_RAW: BoardRaw = [
  ["S", " ", "G"],
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
].map(
  vectorToOriginalVector,
);

const ANSWER: InputChar[][] = [
  [
    "ArrowRight",
    "ArrowRight",
    "ArrowRight",
  ],
  [
    "ArrowRight",
    "ArrowUp",
    "ArrowRight",
  ],
  [
    "ArrowRight",
    "ArrowDown",
    "ArrowRight",
  ],
];

interface SceneProps {
  baseSize: number;
  containerWidth: number;
}

const Scene = ({ baseSize, containerWidth }: SceneProps) => {
  return (
    <SceneBase
      baseSize={baseSize}
      containerWidth={containerWidth}
      sceneName={SCENE_NAME}
      boardHeight={BOARD_HEIGHT}
      boardWidth={BOARD_WIDTH}
      boardRaw={BOARD_RAW}
      playerHistory={PLAYER_HISTORY}
      answer={ANSWER}
      isDark={false}
      id={"5"}
      sharedText="Scene 5 Clear!"
    />
  );
};

export default Scene;
