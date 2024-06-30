const calcCellSize = (baseSize: number) => baseSize * 6;
const calcFontSize = (cellSize: number) => cellSize / 2;

const calcFontSizeFromBaseSize = (baseSize: number) => {
    const cellSize = calcCellSize(baseSize);
    return calcFontSize(cellSize);
};

export { calcCellSize, calcFontSize, calcFontSizeFromBaseSize };
