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
    char: InputChar,
    baseSize: number,
    isDark: boolean,
): React.JSX.Element => {
    const size = baseSize * 1.2;
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
    baseSize: number;
    isDark: boolean;
    inputChars: InputChar[];
    showClear: boolean;
    isBoardFocused: boolean;
    fontSize: number;
}

const Arrows = (
    { baseSize, inputChars, isDark, showClear, isBoardFocused, fontSize }:
        ArrowsProps,
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
            <span className="flex">
                {inputChars.map((inputChar, index) => (
                    <span key={index}>
                        {inputCharToSymbol(inputChar, baseSize, isDark)}
                    </span>
                ))}
            </span>
        </div>
    );
};

export default Arrows;
