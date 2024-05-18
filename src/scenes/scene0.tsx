import { Failure, Result, Success } from "@/lib/result";

type Vector = {
  x: number;
  y: number;
};

// number は G までの距離
type CellType = "S" | "B" | "G" | "W" | number;

const BOARD_HEIGHT = 1;
const BOARD_WIDTH = 4;
type BoardRaw = readonly (readonly CellType[])[];
const BOARD_RAW: BoardRaw = [
  ["S", 2, 1, "G"],
] as const;

// Check if the board size is valid
const isBoardSizeValid = (board: BoardRaw) => {
  return board.length === BOARD_HEIGHT &&
    board.every((row) => row.length === BOARD_WIDTH);
};

type Cell = {
  position: Vector;
  type: CellType;
};

// Cell Position のユニーク性は保証
type Board = {
  cells: Cell[];
  height: number;
  width: number;
};

const generateBoard = (
  raw: BoardRaw,
  height: number,
  width: number,
): Board => {
  if (!isBoardSizeValid(raw)) {
    throw new Error("Invalid board size");
  }

  const cells: Cell[] = [];
  raw.forEach((row, y) => {
    row.forEach((type, x) => {
      cells.push({ position: { x, y }, type });
    });
  });
  return { cells, height, width };
};

// 指定したセルタイプの position を返却
const findCell = (board: Board, type: CellType): Cell[] | null => {
  return board.cells.filter((cell) => cell.type === type);
};
// vector の一致性を確認
const isVectorEqual = (a: Vector, b: Vector) => {
  return a.x === b.x && a.y === b.y;
};

// Check if the player is on the start cell
const isPlayerOnStartCell = (board: Board, player: Vector): boolean => {
  const startCells = findCell(board, "S");
  if (!startCells) {
    return false;
  }
  if (startCells.length !== 1) {
    return false;
  }
  const startCell = startCells[0];
  return isVectorEqual(player, startCell.position);
};

type Action = "UP" | "DOWN" | "LEFT" | "RIGHT";
const ACTION_HISTORY: Action[] = [
  "RIGHT",
  "RIGHT",
  "RIGHT",
];

// スタートのセルの position を取得
const getStartPosition = (board: Board): Result<Vector> => {
  const startCells = findCell(board, "S");
  if (!startCells) {
    return new Failure("Start cell not found");
  }
  if (startCells.length !== 1) {
    return new Failure("Multiple start cells found");
  }
  return new Success(startCells[0].position);
};

const Sense1 = () => {
  const board = generateBoard(BOARD_RAW, BOARD_HEIGHT, BOARD_WIDTH);
  const startPositionResult = getStartPosition(board);
  if (!startPositionResult.success) {
    throw startPositionResult.error;
  }
  const player = startPositionResult.value;

  return (
    <div>
      <h1>Scene1</h1>
    </div>
  );
};

export default Sense1;
