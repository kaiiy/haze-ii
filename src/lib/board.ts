import {
  isVectorEqual,
  ModifiedVector,
  vectorToModifiedVector,
} from "@/lib/vector";
import { Failure, Result, Success } from "@/lib/result";

// number は G までの距離
type CellType =
  | "S"
  | "B"
  | "G"
  | " "
  | number // 後で消す
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "\\"
  | "RS"
  | "RG";

interface Cell {
  position: ModifiedVector;
  type: CellType;
}

// cellType を 表示用の文字に変換
const cellTypeToSymbol = (type: CellType): string => {
  if (type === "S" || type === "RS") {
    return "S";
  } else if (type === "G" || type === "RG") {
    return "G";
  } else if (type === "B") {
    return "";
  } else {
    return type.toString();
  }
};

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
  isDark: boolean = false,
): number => {
  const adjacentCellResult = getAdjacentCell(cell, direction, board);
  if (!adjacentCellResult.success) {
    throw adjacentCellResult.error;
  }

  const adjacentCell = adjacentCellResult.value;
  if (!isDark) {
    if (adjacentCell.type === "B") {
      return cellSize * 0.03;
    } else {
      return cellSize * 0.01;
    }
  } else {
    if (adjacentCell.type === "B") {
      return cellSize * 0.01;
    } else {
      return cellSize * 0.03;
    }
  }
};

const getAllBorderWidthCss = (
  cellSize: number,
  cell: Cell,
  board: Board,
  isDark: boolean = false,
) => {
  return ({
    borderLeftWidth:
      String(getBorderWidthPx(cellSize, cell, board, "Left", isDark)) + "px",
    borderRightWidth:
      String(getBorderWidthPx(cellSize, cell, board, "Right", isDark)) + "px",
    borderTopWidth:
      String(getBorderWidthPx(cellSize, cell, board, "Up", isDark)) + "px",
    borderBottomWidth:
      String(getBorderWidthPx(cellSize, cell, board, "Down", isDark)) + "px",
  });
};

export type { Board, BoardRaw, Cell };
export {
  cellTypeToSymbol,
  generateBoard,
  getAllBorderWidthCss,
  getBorderWidthPx,
  vectorToCell,
};
