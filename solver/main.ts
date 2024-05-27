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
  } else if (cellStr === "2TB") {
    return {
      type: "2TB",
      next: {
        top: null,
        right: undefined,
        bottom: null,
        left: undefined,
      },
    };
  }
  throw new Error("not implemented");
};

const main = () => {
  const VIEW: CellStr[] = ["0", "2TB", "2TB", "0"];

  let view = VIEW;

  const { head, tail } = viewNs.shift(view);
  const root = toCellBase(head);
  let tree: CellBase | null = root;
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

  // 一旦、rootだけ
  if (
    [root.next.top, root.next.right, root.next.bottom, root.next.left].every((
      v,
    ) => v === null)
  ) {
    tree = null;
    return tree;
  }

  // rootより下
  let grandParents = [root];
  for (let i = 0; i < VIEW.length - 2; i++) {
    for (const grandParent of grandParents) {
      let parent = grandParent.next.top;
      if (parent !== null && parent !== undefined) {
        if (
          [
            parent.next.top,
            parent.next.right,
            parent.next.bottom,
            parent.next.left,
          ].every((
            v,
          ) => v === null)
        ) {
          grandParent.next.top = null;
        }
      }

      parent = grandParent.next.right;
      if (parent !== null && parent !== undefined) {
        if (
          [
            parent.next.top,
            parent.next.right,
            parent.next.bottom,
            parent.next.left,
          ].every((
            v,
          ) => v === null)
        ) {
          grandParent.next.right = null;
        }
      }

      parent = grandParent.next.bottom;
      if (parent !== null && parent !== undefined) {
        if (
          [
            parent.next.top,
            parent.next.right,
            parent.next.bottom,
            parent.next.left,
          ].every((
            v,
          ) => v === null)
        ) {
          grandParent.next.bottom = null;
        }
      }

      parent = grandParent.next.left;
      if (parent !== null && parent !== undefined) {
        if (
          [
            parent.next.top,
            parent.next.right,
            parent.next.bottom,
            parent.next.left,
          ].every((
            v,
          ) => v === null)
        ) {
          grandParent.next.left = null;
        }
      }
    }
    const nextGrandParents = [];
    for (const grandParent of grandParents) {
      if (grandParent.next.top !== null && grandParent.next.top !== undefined) {
        nextGrandParents.push(grandParent.next.top);
      }
      if (
        grandParent.next.right !== null && grandParent.next.right !== undefined
      ) {
        nextGrandParents.push(grandParent.next.right);
      }
      if (
        grandParent.next.bottom !== null &&
        grandParent.next.bottom !== undefined
      ) {
        nextGrandParents.push(grandParent.next.bottom);
      }
      if (
        grandParent.next.left !== null && grandParent.next.left !== undefined
      ) {
        nextGrandParents.push(grandParent.next.left);
      }
    }
    grandParents = nextGrandParents;
  }

  tree = root;
  console.log(JSON.stringify(tree, null, 2));

  // TODO: Cellが重なったら、そのpathは削除
  // VIEW.length >= 5 以上で発生
};

if (import.meta.main) {
  main();
}
