import { InputChar } from "@/lib/input";
import { OriginalVector } from "@/lib/vector";

type AnswerChecker = (inputChars: InputChar[]) => boolean;

const validateAnswerLength = (
    answer: InputChar[][],
    playerHistory: OriginalVector[],
) => {
    if (answer.some((ans) => ans.length !== playerHistory.length - 1)) {
        throw new Error("Answer length must be equal to playerHistory length");
    }
};

export type { AnswerChecker };
export { validateAnswerLength };
