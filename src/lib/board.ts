import {
  isVectorEqual,
  ModifiedVector,
  vectorToModifiedVector,
} from "@/lib/vector";
import { Failure, Result, Success } from "@/lib/result";

// number は G までの距離
type CellType = "S" | "B" | "G" | " " | number;
interface Cell {
  position: ModifiedVector;
  type: CellType;
}

// vector から Cell を取得
const vectorToCell = (vector: ModifiedVector, board: Board): Result<Cell> => {
  const cell = board.cells.find((cell) => isVectorEqual(cell.position, vector));
  if (!cell) {
    return new Failure("Cell not found: " + JSON.stringify(vector));
  }
  return new Success(cell);
};

type BoardRaw = readonly (readonly CellType[])[];

// Cell Position のユニーク性は保証
type Board = {
  cells: Cell[];
  height: number;
  width: number;
};

// Check if the board size is valid
const isBoardSizeValid = (
  board: BoardRaw,
  BOARD_HEIGHT: number,
  BOARD_WIDTH: number,
) => {
  return board.length === BOARD_HEIGHT &&
    board.every((row) => row.length === BOARD_WIDTH);
};

// 手動で設定した盤面から内部用の盤面を生成
const generateBoard = (
  raw: BoardRaw,
  height: number,
  width: number,
): Board => {
  if (!isBoardSizeValid(raw, height, width)) {
    throw new Error("Invalid board size");
  }

  const cells: Cell[] = [];
  for (let i = 0; i < width + 2; i++) {
    cells.push({
      position: vectorToModifiedVector({ x: i, y: 0 }),
      type: "B",
    });
  }
  raw.forEach((row, y) => {
    cells.push({
      position: vectorToModifiedVector({ x: 0, y: y + 1 }),
      type: "B",
    });
    row.forEach((type, x) => {
      cells.push({
        position: vectorToModifiedVector({ x: x + 1, y: y + 1 }),
        type,
      });
    });
    cells.push({
      position: vectorToModifiedVector({ x: width + 1, y: y + 1 }),
      type: "B",
    });
  });
  for (let i = 0; i < width + 2; i++) {
    cells.push({
      position: vectorToModifiedVector({ x: i, y: height + 1 }),
      type: "B",
    });
  }

  return { cells, height, width };
};

type Direction = "Up" | "Right" | "Down" | "Left";

// 隣接する Cell を取得
const getAdjacentCell = (
  cell: Cell,
  direction: Direction,
  board: Board,
): Result<Cell> => {
  const { x, y } = cell.position;

  if (direction === "Up") {
    return vectorToCell(vectorToModifiedVector({ x, y: y - 1 }), board);
  } else if (direction === "Right") {
    return vectorToCell(vectorToModifiedVector({ x: x + 1, y }), board);
  } else if (direction === "Down") {
    return vectorToCell(vectorToModifiedVector({ x, y: y + 1 }), board);
  } else if (direction === "Left") {
    return vectorToCell(vectorToModifiedVector({ x: x - 1, y }), board);
  }

  return new Failure("Invalid direction");
};

const getBorderWidthPx = (
  cellSize: number,
  cell: Cell,
  board: Board,
  direction: Direction,
): Result<number> => {
  const adjacentCellResult = getAdjacentCell(cell, direction, board);
  if (adjacentCellResult.success) {
    const adjacentCell = adjacentCellResult.value;
    if (adjacentCell.type === "B") {
      return new Success(cellSize * 0.04);
    } else if (
      adjacentCell.type === "S" || adjacentCell.type === "G" ||
      adjacentCell.type === " " || typeof adjacentCell.type === "number"
    ) {
      return new Success(cellSize * 0.01);
    }
    return new Failure("Invalid cell type: " + adjacentCell.type);
  }
  return adjacentCellResult;
};

export type { Board, BoardRaw, Cell };
export { generateBoard, getBorderWidthPx, vectorToCell };
