import React from "react";
import { COLOR } from "@/lib/const";
import { InputChar } from "@/lib/input";

import {
    FaArrowDown,
    FaArrowLeft,
    FaArrowRight,
    FaArrowUp,
} from "react-icons/fa";

const inputCharToSymbol = (
    isMdOrBelow: boolean,
    char: InputChar,
    baseSize: number,
    isDark: boolean,
): React.JSX.Element => {
    const size = baseSize * 1.2 * (isMdOrBelow ? 2 : 1);
    const color = isDark ? COLOR.LIME : COLOR.CHARCOAL;
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

interface ArrowsProps {
    isMdOrBelow: boolean;
    baseSize: number;
    isDark: boolean;
    inputChars: InputChar[];
    showClear: boolean;
    isBoardFocused: boolean;
    fontSize: number;
}

const Arrows = (
    {
        isMdOrBelow,
        baseSize,
        inputChars,
        isDark,
        showClear,
        isBoardFocused,
        fontSize,
    }: ArrowsProps,
) => {
    return (
        <div
            className={`flex justify-center mb-6 ${
                !isBoardFocused && !showClear ? "opacity-100" : "opacity-25"
            }`}
            style={{
                marginTop: String(fontSize * 0.3) + "px",
                minHeight: String(fontSize * 0.4) + "px",
            }}
        >
            <div className="flex w-full flex-wrap items-center justify-center">
                {inputChars.map((inputChar, index) => (
                    <span key={index}>
                        {inputCharToSymbol(
                            isMdOrBelow,
                            inputChar,
                            baseSize,
                            isDark,
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Arrows;
