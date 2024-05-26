// 数字: 隣接する黒マスの数
// T,B,R,L: その方向に黒マスがあるかどうか
// ただし、Nはその方向に黒マスがないことを表す
type CellStr =
  | "0"
  | "1T"
  | "1R"
  | "1B"
  | "1L"
  | "2TR"
  | "2RB"
  | "2BL"
  | "2LT"
  | "2TB"
  | "2RL"
  | "3NT"
  | "3NR"
  | "3NB"
  | "3NL";

interface CellBase {
  type: CellStr;
  next: {
    top: CellBase | null | undefined;
    right: CellBase | null | undefined;
    bottom: CellBase | null | undefined;
    left: CellBase | null | undefined;
  };
}

interface Cell0 extends CellBase {
  type: "0";
  next: {
    top: CellBase;
    right: CellBase;
    bottom: CellBase;
    left: CellBase;
  };
}

interface Cell1T extends CellBase {
  type: "1T";
  next: {
    top: null;
    right: CellBase;
    bottom: CellBase;
    left: CellBase;
  };
}

interface Vec2 {
  x: number;
  y: number;
}

interface VecCell {
  vec: Vec2;
  cell: CellStr;
}

type Board = VecCell[];

// board namespace
const boardNs = {
  addCell: (board: Board, vec: Vec2, cell: CellStr) => {
    const vecCell: VecCell = { vec, cell };
    const newBoard = [...board, vecCell];
    return newBoard;
  },
};

const viewNs = {
  shift: (view: CellStr[]) => {
    if (view.length === 0) {
      throw new Error("view is empty");
    }
    const head = view[0];
    const tail = view.slice(1);
    return { head, tail };
  },
};

const main = () => {
  const VIEW: CellStr[] = ["3NR", "0", "2TR"];
  //   先頭の要素を取得する
  const { head, tail: newView } = viewNs.shift(VIEW);
  const board: Board = boardNs.addCell([], { x: 0, y: 0 }, head);

  console.log(newView);
  console.log(board);
};

if (import.meta.main) {
  main();
}
