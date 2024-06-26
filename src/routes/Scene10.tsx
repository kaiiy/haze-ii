import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import BaseScene from "@/components/BaseScene";

const SCENE_NAME = "SCENE 10";

const BOARD_HEIGHT = 3;
const BOARD_WIDTH = 9;
const BOARD_RAW: BoardRaw = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "], // y: 0
    //
    [" ", "S", " ", "G", " ", "RS", " ", "RG", " "], // y: 1
    //
    [" ", " ", " ", " ", " ", " ", " ", " ", " "], // y: 2
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
    { x: 1, y: 1 }, // S
    { x: 7, y: 1 }, // RG
    { x: 2, y: 1 },
    { x: 2, y: 1 },
    { x: 5, y: 1 }, // RS
    { x: 3, y: 1 }, // G
].map(
    vectorToOriginalVector,
);

const U = "ArrowUp";
const D = "ArrowDown";
const L = "ArrowLeft";
const R = "ArrowRight";

// 1. 中央3つにRとLは同時に存在しない
// 2. 最初はUかD
// 3. 2番目は1番目以外の方向
// 4. 中央3つ内でUとDは連続しない
// 5. 1番目と5番目は逆の方向 (逆操作)
const ANSWER: InputChar[][] = [
    [U, R, R, R, D],
    [U, U, R, D, D],
    [U, L, L, L, D],
    [U, U, L, D, D],
    //
    [D, R, R, R, U],
    [D, D, R, U, U],
    [D, L, L, L, U],
    [D, D, L, U, U],
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
