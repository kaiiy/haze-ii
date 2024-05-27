// 数字: 隣接する黒マスの数
// T,B,R,L: その方向に黒マスがあるかどうか
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
  | "3RBL"
  | "3BLT"
  | "3LTR"
  | "3TRB";

interface CellBase {
  type: CellStr;
  next: {
    top: CellBase | null | undefined;
    right: CellBase | null | undefined;
    bottom: CellBase | null | undefined;
    left: CellBase | null | undefined;
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

const toCellBase = (cellStr: CellStr): CellBase => {
  if (cellStr === "0") {
    return {
      type: "0",
      next: {
        top: undefined,
        right: undefined,
        bottom: undefined,
        left: undefined,
      },
    };
  } else if (cellStr === "2LT") {
    return {
      type: "2LT",
      next: {
        top: null,
        right: undefined,
        bottom: undefined,
        left: null,
      },
    };
  } else if (cellStr === "2RB") {
    return {
      type: "2RB",
      next: {
        top: undefined,
        right: null,
        bottom: null,
        left: undefined,
      },
    };
  } else if (cellStr === "2TR") {
    return {
      type: "2TR",
      next: {
        top: null,
        right: null,
        bottom: undefined,
        left: undefined,
      },
    };
  }
  throw new Error("not implemented");
};

const main = () => {
  const VIEW: CellStr[] = ["2LT", "2RB", "2TR"];

  let view = VIEW;

  const { head, tail } = viewNs.shift(view);
  const root: CellBase = toCellBase(head);
  view = tail;
  let parents: CellBase[] = [root];

  for (const head of view) {
    const child = toCellBase(head);

    const nextParents: CellBase[] = [];

    for (const parent of parents) {
      if (parent.next.top === undefined) {
        if (child.next.bottom === undefined) {
          parent.next.top = structuredClone(child);
          nextParents.push(parent.next.top);
        } else {
          parent.next.top = null;
        }
      }
      if (parent.next.right === undefined) {
        if (child.next.left === undefined) {
          parent.next.right = structuredClone(child);
          nextParents.push(parent.next.right);
        } else {
          parent.next.right = null;
        }
      }
      if (parent.next.bottom === undefined) {
        if (child.next.top === undefined) {
          parent.next.bottom = structuredClone(child);
          nextParents.push(parent.next.bottom);
        } else {
          parent.next.bottom = null;
        }
      }
      if (parent.next.left === undefined) {
        if (child.next.right === undefined) {
          parent.next.left = structuredClone(child);
          nextParents.push(parent.next.left);
        } else {
          parent.next.left = null;
        }
      }
    }

    parents = nextParents;
  }

  console.log(root);
};

if (import.meta.main) {
  main();
}
