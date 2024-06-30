const inputChars = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"] as const;
type InputChar = typeof inputChars[number];

const isInputChar = (char: string): char is InputChar => {
  for (const inputChar of inputChars) {
    if (char === inputChar) {
      return true;
    }
  }
  return false;
};

export { type InputChar, isInputChar };
