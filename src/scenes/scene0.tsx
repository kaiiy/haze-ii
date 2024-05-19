import { KeyboardEventHandler, useState } from "react";
import { Failure, Result, Success } from "@/lib/result";

interface Vector {
  x: number;
  y: number;
}

interface OriginalVector extends Vector {
  type: "OriginalVector";
}

interface ModifiedVector extends Vector {
  type: "ModifiedVector";
}

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

interface Cell {
  position: ModifiedVector;
  type: CellType;
}

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
  for (let i = 0; i < width; i++) {
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
  for (let i = 0; i < width; i++) {
    cells.push({
      position: vectorToModifiedVector({ x: i, y: height + 1 }),
      type: "B",
    });
  }
  return { cells, height, width };
};

// vector の一致性を確認
const isVectorEqual = (a: Vector, b: Vector) => {
  return a.x === b.x && a.y === b.y;
};

const vectorToOriginalVector = (vector: Vector): OriginalVector => {
  return { ...vector, type: "OriginalVector" };
};
const vectorToModifiedVector = (vector: Vector): ModifiedVector => {
  return { ...vector, type: "ModifiedVector" };
};
const originalVectorToModifiedVector = (
  vector: OriginalVector,
): ModifiedVector => {
  return vectorToModifiedVector({ x: vector.x + 1, y: vector.y + 1 });
};

const PLAYER_HISTORY: OriginalVector[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
].map(
  vectorToOriginalVector,
);

const vectorToCell = (vector: ModifiedVector, board: Board): Result<Cell> => {
  console.log(board.cells);
  const cell = board.cells.find((cell) => isVectorEqual(cell.position, vector));
  if (!cell) {
    return new Failure("Cell not found: " + JSON.stringify(vector));
  }
  return new Success(cell);
};

type Direction = "Up" | "Right" | "Down" | "Left";

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

interface SenseProps {
  baseSize: number;
}

const getBorderWidthPx = (
  baseSize: number,
  cell: Cell,
  board: Board,
  direction: Direction,
): Result<number> => {
  console.log(cell);
  const adjacentCellResult = getAdjacentCell(cell, direction, board);
  console.log(adjacentCellResult);
  if (adjacentCellResult.success) {
    const adjacentCell = adjacentCellResult.value;
    if (adjacentCell.type === "B") {
      return new Success(baseSize * 0.8);
    } else if (
      adjacentCell.type === "S" || adjacentCell.type === "G" ||
      adjacentCell.type === "W" || typeof adjacentCell.type === "number"
    ) {
      return new Success(baseSize * 0.2);
    }
    return new Failure("Invalid cell type: " + adjacentCell.type);
  }
  return adjacentCellResult;
};

const Sense = ({ baseSize }: SenseProps) => {
  const board = generateBoard(BOARD_RAW, BOARD_HEIGHT, BOARD_WIDTH);
  console.log(board);
  const [historyIndex, setHistoryIndex] = useState(0);
  const cellResult = vectorToCell(
    originalVectorToModifiedVector(PLAYER_HISTORY[historyIndex]),
    board,
  );
  if (!cellResult.success) {
    throw cellResult.error;
  }
  const cell = cellResult.value;

  const cellSize = baseSize * 24;
  const fontSize = cellSize / 2;

  const borderLeftWidthResult = getBorderWidthPx(baseSize, cell, board, "Left");
  const borderRightWidthResult = getBorderWidthPx(
    baseSize,
    cell,
    board,
    "Right",
  );
  const borderTopWidthResult = getBorderWidthPx(baseSize, cell, board, "Up");
  const borderBottomWidthResult = getBorderWidthPx(
    baseSize,
    cell,
    board,
    "Down",
  );
  if (!borderLeftWidthResult.success) {
    throw borderLeftWidthResult.error;
  }
  if (!borderRightWidthResult.success) {
    throw borderRightWidthResult.error;
  }
  if (!borderTopWidthResult.success) {
    throw borderTopWidthResult.error;
  }
  if (!borderBottomWidthResult.success) {
    throw borderBottomWidthResult.error;
  }
  const borderLeftWidth = borderLeftWidthResult.value;
  const borderRightWidth = borderRightWidthResult.value;
  const borderTopWidth = borderTopWidthResult.value;
  const borderBottomWidth = borderBottomWidthResult.value;

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowRight") {
      setHistoryIndex(Math.min(historyIndex + 1, PLAYER_HISTORY.length - 1));
    } else if (e.key === "ArrowLeft") {
      setHistoryIndex(Math.max(historyIndex - 1, 0));
    }
  };

  return (
    // TODO: handleKeyDown を window に対して設定する
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <h1>Scene0</h1>
      <div>historyIndex: {historyIndex}</div>
      <div>cell.position.x: {cell.position.x}</div>
      <div>cell.position.y: {cell.position.y}</div>
      <div>cell.type: {cell.type}</div>
      <hr />
      <div
        className="border-black flex items-center justify-center"
        style={{
          width: String(cellSize) + "px",
          height: String(cellSize) + "px",
          fontSize: String(fontSize) + "px",
          borderLeftWidth: String(borderLeftWidth) + "px",
          borderRightWidth: String(borderRightWidth) + "px",
          borderTopWidth: String(borderTopWidth) + "px",
          borderBottomWidth: String(borderBottomWidth) + "px",
        }}
      >
        <span
          style={{
            marginTop: String(-fontSize / 6) + "px",
          }}
        >
          {cell.type}
        </span>
      </div>
    </div>
  );
};

export default Sense;
