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

interface Vec2 {
  x: number;
  y: number;
}

interface CellBase {
  type: CellStr;
  depth: number;
  vec2: Vec2 | undefined;
  next: {
    top: CellBase | null | undefined;
    right: CellBase | null | undefined;
    bottom: CellBase | null | undefined;
    left: CellBase | null | undefined;
    // 同一のマスに移動
    identical: CellBase | null | undefined;
  };
}

const toCellBase = (cellStr: CellStr): CellBase => {
  const baseCell: CellBase = {
    type: cellStr,
    depth: -1,
    vec2: undefined,
    next: {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
      identical: undefined,
    },
  };
  if (cellStr === "0") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        // 黒マスが隣接していないマスは、viewが変われば必ず別マス
        identical: null,
      },
    };
  } else if (cellStr === "1T") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        top: null,
      },
    };
  } else if (cellStr === "1R") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        right: null,
      },
    };
  } else if (cellStr === "1B") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        bottom: null,
      },
    };
  } else if (cellStr === "1L") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        left: null,
      },
    };
  } else if (cellStr === "2TR") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        top: null,
        right: null,
      },
    };
  } else if (cellStr === "2RB") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        right: null,
        bottom: null,
      },
    };
  } else if (cellStr === "2BL") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        bottom: null,
        left: null,
      },
    };
  } else if (cellStr === "2LT") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        top: null,
        left: null,
      },
    };
  } else if (cellStr === "2TB") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        top: null,
        bottom: null,
      },
    };
  } else if (cellStr === "2RL") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        right: null,
        left: null,
      },
    };
  } else if (cellStr === "3RBL") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        right: null,
        bottom: null,
        left: null,
      },
    };
  } else if (cellStr === "3BLT") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        top: null,
        bottom: null,
        left: null,
      },
    };
  } else if (cellStr === "3LTR") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        top: null,
        right: null,
        left: null,
      },
    };
  } else if (cellStr === "3TRB") {
    return {
      ...baseCell,
      next: {
        ...baseCell.next,
        top: null,
        right: null,
        bottom: null,
      },
    };
  }
  throw new Error("not implemented");
};

export type { CellBase, CellStr, Vec2 };
export { toCellBase };
