import { inputCharToSymbol } from "@/components/arrow";
import { InputChar } from "@/lib/input";

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
            className={`flex justify-center ${
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
