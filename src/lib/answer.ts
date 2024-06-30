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

// answer配列をもとに解答判定
const isCorrectAnswer = (
    inputChars: InputChar[],
    answer: InputChar[][] | undefined,
    answerChecker: AnswerChecker | undefined,
) => {
    if (answer !== undefined) {
        for (let i = 0; i < answer.length; i++) {
            if (inputChars.length === answer[i].length) {
                if (inputChars.every((char, j) => char === answer[i][j])) {
                    return true;
                }
            }
        }
        return false;
    } else if (answerChecker !== undefined) {
        return answerChecker(inputChars);
    }
    throw new Error("answer or answerChecker is not defined");
};

export type { AnswerChecker };
export { isCorrectAnswer, validateAnswerLength };
