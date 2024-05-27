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

  for (let i = 0; i < view.length; i++) {
    const child = toCellBase(view[i]);

    const nextParents: CellBase[] = [];

    for (const parent of parents) {
      if (parent.next.top === undefined) {
        if (child.next.bottom === undefined) {
          const cloned = structuredClone(child);
          cloned.next.bottom = null;
          if (i === view.length - 1) {
            cloned.next.top = null;
            cloned.next.right = null;
            cloned.next.left = null;
          }
          parent.next.top = cloned;
          nextParents.push(cloned);
        } else {
          parent.next.top = null;
        }
      }
      if (parent.next.right === undefined) {
        if (child.next.left === undefined) {
          const cloned = structuredClone(child);
          cloned.next.left = null;
          if (i === view.length - 1) {
            cloned.next.top = null;
            cloned.next.right = null;
            cloned.next.bottom = null;
          }
          parent.next.right = cloned;
          nextParents.push(cloned);
        } else {
          parent.next.right = null;
        }
      }
      if (parent.next.bottom === undefined) {
        if (child.next.top === undefined) {
          const cloned = structuredClone(child);
          cloned.next.top = null;
          if (i === view.length - 1) {
            cloned.next.right = null;
            cloned.next.bottom = null;
            cloned.next.left = null;
          }
          parent.next.bottom = cloned;
          nextParents.push(cloned);
        } else {
          parent.next.bottom = null;
        }
      }
      if (parent.next.left === undefined) {
        if (child.next.right === undefined) {
          const cloned = structuredClone(child);
          cloned.next.right = null;
          if (i === view.length - 1) {
            cloned.next.top = null;
            cloned.next.bottom = null;
            cloned.next.left = null;
          }
          parent.next.left = cloned;
          nextParents.push(cloned);
        } else {
          parent.next.left = null;
        }
      }
    }

    if (i < view.length - 1) {
      parents = nextParents;
    }
  }

  console.log(JSON.stringify(root, null, 2));
};

if (import.meta.main) {
  main();
}
