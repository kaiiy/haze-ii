import { InputChar } from "@/lib/input";

import {
    FaArrowDown,
    FaArrowLeft,
    FaArrowRight,
    FaArrowUp,
} from "react-icons/fa";

const inputCharToSymbol = (
    char: InputChar,
    baseSize: number,
    isDark: boolean,
): JSX.Element => {
    const size = baseSize * 1.2;
    const color = isDark ? "#f7f7f7" : "#101010";
    if (char === "ArrowRight") {
        return <FaArrowRight size={size} color={color} />;
    } else if (char === "ArrowLeft") {
        return <FaArrowLeft size={size} color={color} />;
    } else if (char === "ArrowUp") {
        return <FaArrowUp size={size} color={color} />;
    } else if (char === "ArrowDown") {
        return <FaArrowDown size={size} color={color} />;
    }
    throw new Error("Invalid input char");
};

export { inputCharToSymbol };
