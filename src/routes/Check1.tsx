import ContainerBase from "@/components/ContainerBase";
import Nav from "@/components/Nav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { navigateWithDelay } from "@/lib/navigate";
import { useNavigate } from "react-router-dom";
import Clear from "@/components/Clear";
import NavTooltip from "@/components/NavTooltip";
import { SceneId, vStorage } from "@/lib/storage";
import { isSceneClear, SceneBox as Box } from "@/components/homeUI";

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

interface SceneBoxProps {
  index: SceneId;
  clear: boolean;
}

const SceneBox = ({ index, clear }: SceneBoxProps) => (
  <Link to={`/${index}`}>
    <Box scene={index} clear={clear} />
  </Link>
);

interface SceneProps {
  baseSize: number;
  containerWidth: number;
}

const S4_CORRECT: number[] = [2, 3];
const S6_CORRECT: number[] = [2, 3, 4, 6];
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

        // クリア判定
        if (
          s4List.length === S4_CORRECT.length - 1 &&
          s6List.length === S6_CORRECT.length
        ) {
          setIsClear(true);
          vStorage.overwriteChecked("A", true);
        }
      }
    }
  };

  // Scene 6
  const [inputS6Value, setInputS6Value] = useState<string>("");
  const [s6List, setS6List] = useState<number[]>([]);
  const s6ListStr = s6List.length === 0
    ? ""
    : s6List.map((num) => num.toString()).join(", ") + (
      s6List.length === S6_CORRECT.length ? "" : ", "
    );

  const handleS6Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 1) {
      setInputS6Value(value);
    }
  };

  const handleS6keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.currentTarget.value;
      // 1桁の数字でない場合
      if (!DIGIT1.includes(input)) {
        return;
      }

      const inputNum = parseInt(input, 10);

      if (S6_CORRECT.includes(inputNum) && !s6List?.includes(inputNum)) {
        setS6List([...s6List, inputNum]);
        setInputS6Value("");

        // クリア判定
        if (
          s4List.length === S4_CORRECT.length &&
          s6List.length === S6_CORRECT.length - 1
        ) {
          setIsClear(true);
          vStorage.overwriteChecked("A", true);
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

  const storage = vStorage.load();
  const sceneStates = storage.sceneStates;

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
      <NavTooltip />
      <Nav text="CHECKPOINT 1" />

      <ContentInfo title="問題" content="S はいくつ？" />

      <div className="flex gap-6">
        <div className="w-1/2">
          <Info title="S = 3" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox
              index="0"
              clear={isSceneClear(
                "0",
                sceneStates,
              )}
            />
            <SceneBox
              index="2"
              clear={isSceneClear(
                "2",
                sceneStates,
              )}
            />
            <SceneBox
              index="3"
              clear={isSceneClear(
                "3",
                sceneStates,
              )}
            />
          </div>
        </div>
        <div className="w-1/2">
          <Info title="S = 5" />
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox
              index="1"
              clear={isSceneClear(
                "1",
                sceneStates,
              )}
            />
            <SceneBox
              index="5"
              clear={isSceneClear(
                "5",
                sceneStates,
              )}
            />
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
            <SceneBox
              index="4"
              clear={isSceneClear(
                "4",
                sceneStates,
              )}
            />
          </div>
        </div>

        <div className="w-1/2">
          <div className="mb-6 font-notoSerif">
            <div className="text-2xl border-b border-charcoal text-center">
              <div className="flex justify-center gap-2">
                <span>S =</span>
                {s6List.length === 0 ? "" : <span>{s6ListStr}</span>}
                {s6List.length === S6_CORRECT.length ? "" : (
                  <input
                    className="w-8 h-8 text-center rounded-sm focus-visible:outline-charcoal"
                    type="text"
                    value={inputS6Value}
                    onChange={handleS6Change}
                    onKeyDown={handleS6keyDown}
                    maxLength={1}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-6">
            <SceneBox
              index="6"
              clear={isSceneClear(
                "6",
                sceneStates,
              )}
            />
          </div>
        </div>
      </div>

      <Clear
        showClear={showClear}
        fontSize={fontSize}
        sharedText={"Checkpoint 1 Clear!"}
      />
    </ContainerBase>
  );
};

export default Scene;
