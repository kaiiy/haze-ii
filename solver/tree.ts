import { CellBase, CellStr, toCellBase } from "./cell.ts";

const generateTree = (root: CellBase, rootlessView: CellStr[]): CellBase => {
  const clonedRoot = structuredClone(root);
  let parents: CellBase[] = [clonedRoot];

  const rootlessViewLength = rootlessView.length;

  for (let i = 0; i < rootlessViewLength; i++) {
    const child = toCellBase(rootlessView[i]);

    const nextParents: CellBase[] = [];

    for (const parent of parents) {
      if (parent.next.top === undefined) {
        if (child.next.bottom === undefined) {
          const cloned = structuredClone(child);

          cloned.next.bottom = null;
          if (i === rootlessViewLength - 1) {
            cloned.next.top = null;
            cloned.next.right = null;
            cloned.next.left = null;
          }
          cloned.depth = i + 1;

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
          if (i === rootlessViewLength - 1) {
            cloned.next.top = null;
            cloned.next.right = null;
            cloned.next.bottom = null;
          }
          cloned.depth = i + 1;

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
          if (i === rootlessViewLength - 1) {
            cloned.next.right = null;
            cloned.next.bottom = null;
            cloned.next.left = null;
          }
          cloned.depth = i + 1;

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
          if (i === rootlessViewLength - 1) {
            cloned.next.top = null;
            cloned.next.bottom = null;
            cloned.next.left = null;
          }
          cloned.depth = i + 1;

          parent.next.left = cloned;
          nextParents.push(cloned);
        } else {
          parent.next.left = null;
        }
      }
    }

    if (i < rootlessView.length - 1) {
      parents = nextParents;
    }
  }

  return clonedRoot;
};

const isLeaf = (cell: CellBase) => {
  return (
    [cell.next.top, cell.next.right, cell.next.bottom, cell.next.left].every((
      v,
    ) => v === null)
  );
};

// leaf (next 4つが全部 null) をカット
// ただし、最後の leaf は残す
const pruneUnnecessaryLeaves = (
  tree: CellBase,
  fullView: CellStr[],
): CellBase | null => {
  const clonedTree = structuredClone(tree);
  // 一旦、rootだけ
  if (isLeaf(clonedTree)) {
    return null;
  }

  // rootより下
  let grandParents = [clonedTree];
  for (let i = 0; i < fullView.length - 2; i++) {
    for (const grandParent of grandParents) {
      let parent = grandParent.next.top;
      if (parent !== null && parent !== undefined) {
        if (isLeaf(parent)) {
          grandParent.next.top = null;
        }
      }

      parent = grandParent.next.right;
      if (parent !== null && parent !== undefined) {
        if (isLeaf(parent)) {
          grandParent.next.right = null;
        }
      }

      parent = grandParent.next.bottom;
      if (parent !== null && parent !== undefined) {
        if (isLeaf(parent)) {
          grandParent.next.bottom = null;
        }
      }

      parent = grandParent.next.left;
      if (parent !== null && parent !== undefined) {
        if (isLeaf(parent)) {
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
  return clonedTree;
};

// 不要な node を削除
const pruneTree = (tree: CellBase, fullView: CellStr[]): CellBase | null => {
  let clonedTree: CellBase | null = structuredClone(tree);
  for (let i = 0; i < fullView.length - 1; i++) {
    const pruned = pruneUnnecessaryLeaves(clonedTree, fullView);
    if (pruned === null) {
      return null;
    }
    clonedTree = pruned;
  }
  return clonedTree;
};

export { generateTree, pruneTree, pruneUnnecessaryLeaves };
