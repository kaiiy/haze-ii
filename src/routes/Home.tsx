import Container from "@/components/Container";
import BudouX from "@/components/BudouX";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface InfoProps {
  title: string;
  content: string | JSX.Element;
}

const Info = ({ title, content }: InfoProps) => (
  <div className="mb-6 font-notoSerif">
    <div className="text-2xl border-b border-charcoal mb-3 text-center">
      {title}
    </div>
    <div className="text-2xl text-center">{content}</div>
  </div>
);

const NoticeContent = () => (
  <div className="text-xl flex flex-col text-center pt-1">
    <div>
      <BudouX text="各ステージはそれ単体で解くことができます。" />
    </div>
    <div className="mb-3">
      <BudouX text="ステージをやり直す際には、ページをリロードしてください。" />
    </div>
    <div>
      <BudouX text="本作は、前作「" />
      <a
        href="https://kaiiy.github.io/haze/"
        className="text-blue-500"
        target="_blank"
      >
        <BudouX text="HAZE" />
      </a>
      <BudouX text="」のシステムを踏襲しています。" />
    </div>
    <div>
      <BudouX text="先に「HAZE: STAGE 1」をプレイされることをおすすめします。" />
    </div>
  </div>
);

const TutorialContent = () => (
  <div className="text-xl flex flex-col text-center pt-1">
    <div>
      <BudouX text="下の正方形「0」をクリックして、「右矢印キー」を3回、「スペースキー」を1回、「右矢印キー」を3回、そして最後に「エンターキー」を1回押してください。" />
    </div>
  </div>
);

// js の % はモジュロ演算子ではないため
const mod = (n: number, m: number) => ((n % m) + m) % m;

const SCENES = ["0", "1", "2", "3", "4", "5", "C1"];

interface HomeProps {
  containerWidth: number;
}

const Home = ({ containerWidth }: HomeProps) => {
  const navigate = useNavigate();

  const [sceneIndex, setSceneIndex] = useState<number>(-1);

  // 矢印キー長押し対策での keyup
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      const nextIndex = mod(sceneIndex + 1, SCENES.length);
      setSceneIndex(nextIndex);
    } else if (e.key === "ArrowLeft") {
      const nextIndex = mod(sceneIndex - 1, SCENES.length);
      setSceneIndex(nextIndex);
    } else if (e.key === "Enter" || e.key === " ") {
      if (sceneIndex !== -1) {
        navigate(`/${SCENES[sceneIndex]}`);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [sceneIndex]);

  return (
    <Container width={containerWidth}>
      <Nav text="HOME" />
      <Tooltip
        id="my-tooltip"
        style={{
          zIndex: "calc(infinity)",
        }}
      />

      <div className="flex flex-col ">
        <div
          className="w-full text-center text-8xl text-charcoal font-sawarabi"
          style={{
            marginBottom: "80px",
          }}
        >
          MIST
        </div>
        <div
          className="text-charcoal"
          style={{
            marginBottom: "40px",
          }}
        >
          <Info title="制作" content="kaiiy" />
          <Info title="注意事項" content={NoticeContent()} />
          <Info title="チュートリアル" content={TutorialContent()} />
        </div>
        <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-3">
          {SCENES.map((stage, index) => (
            <Link to={`/${stage}`} key={index}>
              <div
                className={`w-32 h-32 border border-charcoal text-center text-2xl flex items-center justify-center cursor-pointer   transition duration-300 hover:text-[#f7f7f7] hover:bg-charcoal ${
                  sceneIndex === index
                    ? "text-[#f7f7f7] bg-charcoal"
                    : "text-charcoal bg-white"
                }`}
              >
                {stage}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;
