import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import SceneBase from "@/components/SceneBase";

const SCENE_NAME = "SCENE 6";

const BOARD_HEIGHT = 5;
const BOARD_WIDTH = 5;
const BOARD_RAW: BoardRaw = [
  [" ", " ", " ", " ", " "],
  ["B", " ", " ", " ", " "],
  ["G", " ", " ", " ", "S"],
  [" ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " "],
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 4, y: 2 },
  { x: 4, y: 1 },
  { x: 4, y: 0 },
  { x: 3, y: 0 },
  { x: 2, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 4, y: 1 },
  { x: 4, y: 2 },
  { x: 4, y: 3 },
  { x: 4, y: 4 },
  { x: 3, y: 4 },
  { x: 2, y: 4 },
  { x: 1, y: 4 },
  { x: 0, y: 4 },
  { x: 0, y: 3 },
  { x: 0, y: 2 },
].map(
  vectorToOriginalVector,
);

const U = "ArrowUp";
const D = "ArrowDown";
const L = "ArrowLeft";
const R = "ArrowRight";

const TERM1: InputChar[] = [U, U, L];
const TERM3: InputChar[] = [R, D, D, D, D, L];
const TERM4: InputChar[] = [L, U, U];

const ANSWER: InputChar[][] = [
  // 上: 全通り, 下: LL固定
  [...TERM1, L, L, R, R, ...TERM3, L, L, ...TERM4],
  //
  [...TERM1, U, U, L, R, ...TERM3, L, L, ...TERM4],
  [...TERM1, U, L, U, R, ...TERM3, L, L, ...TERM4],
  [...TERM1, U, L, R, U, ...TERM3, L, L, ...TERM4],
  [...TERM1, L, U, U, R, ...TERM3, L, L, ...TERM4],
  [...TERM1, L, U, R, U, ...TERM3, L, L, ...TERM4],
  [...TERM1, L, R, U, U, ...TERM3, L, L, ...TERM4],
  [...TERM1, L, R, L, R, ...TERM3, L, L, ...TERM4],

  //
  [...TERM1, U, U, U, U, ...TERM3, L, L, ...TERM4],
  //
  // 上: 全通り, 下: DL固定
  // [...TERM1, L, L, R, R, ...TERM3, D, L, ...TERM4], // 上フル + 下1/2個短縮 → 無理 (マスがぶつかる)
  //
  [...TERM1, U, U, L, R, ...TERM3, D, L, ...TERM4],
  [...TERM1, U, L, U, R, ...TERM3, D, L, ...TERM4],
  [...TERM1, U, L, R, U, ...TERM3, D, L, ...TERM4],
  [...TERM1, L, U, U, R, ...TERM3, D, L, ...TERM4],
  [...TERM1, L, U, R, U, ...TERM3, D, L, ...TERM4],
  [...TERM1, L, R, U, U, ...TERM3, D, L, ...TERM4],
  [...TERM1, L, R, L, R, ...TERM3, D, L, ...TERM4],
  //
  // 上: 全通り, 下: LD固定
  // [...TERM1, L, L, R, R, ...TERM3, L, D, ...TERM4], // 上フル + 下1/2個短縮 → 無理 (マスがぶつかる)
  //
  [...TERM1, U, U, L, R, ...TERM3, L, D, ...TERM4],
  [...TERM1, U, L, U, R, ...TERM3, L, D, ...TERM4],
  [...TERM1, U, L, R, U, ...TERM3, L, D, ...TERM4],
  [...TERM1, L, U, U, R, ...TERM3, L, D, ...TERM4],
  [...TERM1, L, U, R, U, ...TERM3, L, D, ...TERM4],
  [...TERM1, L, R, U, U, ...TERM3, L, D, ...TERM4],
  [...TERM1, L, R, L, R, ...TERM3, L, D, ...TERM4],
  //
  [...TERM1, U, U, U, U, ...TERM3, L, D, ...TERM4],
  //
  // 上: 全通り, 下: DD固定
  // [...TERM1, L, L, R, R, ...TERM3, D, D, ...TERM4], // 上フル + 下1/2個短縮 → 無理 (マスがぶつかる)
  //
  // [...TERM1, U, L, U, R, ...TERM3, D, D, ...TERM4], // 上1個短縮 + 下2個短縮 → 無理 (マスがぶつかる)
  // [...TERM1, U, L, R, U, ...TERM3, D, D, ...TERM4], // 上1個短縮 + 下2個短縮 → 無理 (マスがぶつかる)
  // [...TERM1, L, U, U, R, ...TERM3, D, D, ...TERM4], // 上1個短縮 + 下2個短縮 → 無理 (マスがぶつかる)
  // [...TERM1, L, U, R, U, ...TERM3, D, D, ...TERM4], // 上1個短縮 + 下2個短縮 → 無理 (マスがぶつかる)
  //
  [...TERM1, U, U, U, U, ...TERM3, D, D, ...TERM4],
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
      id={"6"}
      sharedText="Scene 6 Clear!"
    />
  );
};

export default Scene;
