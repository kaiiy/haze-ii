import ContainerBase from "@/components/ContainerBase";
import Nav from "@/components/Nav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BLINK_STYLE, KEYFRAMES_STYLE } from "@/lib/clear";
import { navigateWithDelay } from "@/lib/navigate";
import { useNavigate } from "react-router-dom";

interface InfoProps {
  title: string;
}

const Info = ({ title }: InfoProps) => (
  <div className="mb-6 font-notoSerif">
    <div className="text-2xl border-b border-charcoal text-center">
      {title}
    </div>
  </div>
);

interface ContentInfoProps {
  title: string;
  content: string;
}

const ContentInfo = ({ title, content }: ContentInfoProps) => (
  <div
    className="font-notoSerif"
    style={{
      marginTop: "60px",
      marginBottom: "60px",
    }}
  >
    <div className="text-2xl border-b border-charcoal text-center mb-3">
      {title}
    </div>
    <div className="text-2xl text-center">{content}</div>
  </div>
);

const SceneBox = ({ index }: { index: string }) => (
  <Link to={`/${index}`}>
    <div
      className={`w-32 h-32 border border-charcoal text-center text-2xl flex items-center justify-center cursor-pointer   transition duration-300 hover:text-[#f7f7f7] hover:bg-charcoal text-charcoal bg-white`}
    >
      {index}
    </div>
  </Link>
);

interface SceneProps {
  baseSize: number;
  containerWidth: number;
}

const S4_CORRECT: number[] = [2, 3];
const S5_CORRECT: number[] = [1, 2, 3, 4, 6];
const DIGIT1: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

const Scene = ({ containerWidth, baseSize }: SceneProps) => {
  const navigate = useNavigate();

  const [isClear, setIsClear] = useState(false);
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    if (isClear) {
      const timer = setTimeout(() => {
        setShowClear(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isClear]);

  const cellSize = baseSize * 6;
  const fontSize = cellSize / 2;

  // Scene 4
  const [inputS4Value, setInputS4Value] = useState<string>("");
  const [s4List, setS4List] = useState<number[]>([]);
  const s4ListStr = s4List.length === 0
    ? ""
    : s4List.map((num) => num.toString()).join(", ") + (
      s4List.length === S4_CORRECT.length ? "" : ", "
    );

  const handleS4Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 1) {
      setInputS4Value(value);
    }
  };

  const handleS4keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.currentTarget.value;
      // 1桁の数字でない場合
      if (!DIGIT1.includes(input)) {
        return;
      }

      const inputNum = parseInt(input, 10);

      if (S4_CORRECT.includes(inputNum) && !s4List?.includes(inputNum)) {
        setS4List([...s4List, inputNum]);
        setInputS4Value("");

        console.log(s4List, s5List);
        if (
          s4List.length === S4_CORRECT.length - 1 &&
          s5List.length === S5_CORRECT.length
        ) {
          setIsClear(true);
        }
      }
    }
  };

  // Scene 5
  const [inputS5Value, setInputS5Value] = useState<string>("");
  const [s5List, setS5List] = useState<number[]>([]);
  const s5ListStr = s5List.length === 0
    ? ""
    : s5List.map((num) => num.toString()).join(", ") + (
      s5List.length === S5_CORRECT.length ? "" : ", "
    );

  const handleS5Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 1) {
      setInputS5Value(value);
    }
  };

  const handleS5keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.currentTarget.value;
      // 1桁の数字でない場合
      if (!DIGIT1.includes(input)) {
        return;
      }

      const inputNum = parseInt(input, 10);

      if (S5_CORRECT.includes(inputNum) && !s5List?.includes(inputNum)) {
        setS5List([...s5List, inputNum]);
        setInputS5Value("");

        if (
          s4List.length === S4_CORRECT.length &&
          s5List.length === S5_CORRECT.length - 1
        ) {
          setIsClear(true);
        }
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isClear) {
      if (e.key === " ") {
        navigateWithDelay(navigate, "/");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isClear]);

  return (
    <ContainerBase
      width={containerWidth}
      style={{
        marginTop: "40px",
      }}
    >
      <Nav text="CHECKPOINT 1" />

      <ContentInfo title="問題" content="S はいくつ？" />

      <div className="flex gap-6">
        <div className="w-1/2">
          <Info title="S = 3" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox index="0" />
            <SceneBox index="2" />
            <SceneBox index="3" />
          </div>
        </div>
        <div className="w-1/2">
          <Info title="S = 5" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox index="1" />
          </div>
        </div>
      </div>

      <div
        className="flex gap-6"
        style={{
          marginBottom: "20px",
        }}
      >
        <div className="w-1/2">
          <div className="mb-6 font-notoSerif">
            <div className="text-2xl border-b border-charcoal text-center">
              <div className="flex justify-center gap-2">
                <span>S =</span>
                {s4List.length === 0 ? "" : <span>{s4ListStr}</span>}
                {s4List.length === S4_CORRECT.length ? "" : (
                  <input
                    className="w-8 h-8 text-center rounded-sm focus-visible:outline-charcoal"
                    type="text"
                    value={inputS4Value}
                    onChange={handleS4Change}
                    onKeyDown={handleS4keyDown}
                    maxLength={1}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox index="4" />
          </div>
        </div>

        <div className="w-1/2">
          <div className="mb-6 font-notoSerif">
            <div className="text-2xl border-b border-charcoal text-center">
              <div className="flex justify-center gap-2">
                <span>S =</span>
                {s5List.length === 0 ? "" : <span>{s5ListStr}</span>}
                {s5List.length === S5_CORRECT.length ? "" : (
                  <input
                    className="w-8 h-8 text-center rounded-sm focus-visible:outline-charcoal"
                    type="text"
                    value={inputS5Value}
                    onChange={handleS5Change}
                    onKeyDown={handleS5keyDown}
                    maxLength={1}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox index="5" />
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col font-notoSerif`}
        style={{
          opacity: showClear ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      >
        <div
          className="flex justify-center text-charcoal"
          style={{
            fontSize: String(fontSize * 0.3) + "px",
            fontWeight: 500,
          }}
        >
          Clear!
        </div>
        <style>{KEYFRAMES_STYLE}</style>
        <div
          className="flex justify-center text-charcoal"
          style={{
            fontSize: String(fontSize * 0.25) + "px",
            fontWeight: 500,
            ...BLINK_STYLE,
          }}
        >
          <span
            style={{
              letterSpacing: "-.2em",
              width: "2em",
              marginRight: ".5em",
            }}
          >
            ――
          </span>Press Space
          <span
            style={{
              letterSpacing: "-.2em",
              width: "2em",
              marginLeft: ".5em",
            }}
          >
            ――
          </span>
        </div>
      </div>
    </ContainerBase>
  );
};

export default Scene;
