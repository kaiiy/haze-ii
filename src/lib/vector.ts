interface Vector {
  x: number;
  y: number;
}

// 盤面記述用 vector (human friendly)
interface OriginalVector extends Vector {
  type: "OriginalVector";
}

// 内部処理用 vector (machine friendly)
interface ModifiedVector extends Vector {
  type: "ModifiedVector";
}

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

export type { ModifiedVector, OriginalVector, Vector };
export {
  isVectorEqual,
  originalVectorToModifiedVector,
  vectorToModifiedVector,
  vectorToOriginalVector,
};
