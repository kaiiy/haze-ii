import { Vec2, VecCell } from "./cell.ts";
import { Failure, Result, Success } from "./result.ts";

type Board = VecCell[];

const findCell = (board: Board, vec2: Vec2): Result<VecCell> => {
  const cell = board.find((cell) =>
    cell.vec2.x === vec2.x && cell.vec2.y === vec2.y
  );
  if (cell === undefined) {
    return new Failure("cell not found");
  }
  return new Success(cell);
};

const addVecCell = (board: Board, vecCell: VecCell): Result<Board> => {
  const { vec2 } = vecCell;
  const cellResult = findCell(board, vec2);

  //   vec2 の位置にまだ存在していない場合、追加
  if (!cellResult.success) {
    return new Success([...board, vecCell]);
  }

  //   存在していても、同じ cellStr なら成功
  const cell = cellResult.value;
  if (cell.type === vecCell.type) {
    return new Success(board);
  }

  //   同じ cellStr でない場合、失敗
  return new Failure("cell already exists");
};

export type { Board };
export { addVecCell };
