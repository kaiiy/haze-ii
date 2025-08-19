import { InputChar } from "@/lib/input";
import { OriginalVector, vectorToOriginalVector } from "@/lib/vector";
import { BoardRaw } from "@/lib/board";
import SceneBase from "@/components/SceneBase";

const SCENE_NAME = "SCENE 2";

const BOARD_HEIGHT = 3;
const BOARD_WIDTH = 3;
const BOARD_RAW: BoardRaw = [
    ["1", "G", "1"],
    ["B", "S", "2"],
    ["3", "2", "3"],
] as const;

const PLAYER_HISTORY: OriginalVector[] = [
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: 0 },
    { x: 1, y: 0 },
].map(
    vectorToOriginalVector,
);

const U = "ArrowUp";
const D = "ArrowDown";
const L = "ArrowLeft";
const R = "ArrowRight";

const ANSWER: InputChar[][] = [
    [D, R, U, U, L],
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
            id={"2"}
            sharedText="Scene 2 Clear!"
        />
    );
};

export default Scene;
