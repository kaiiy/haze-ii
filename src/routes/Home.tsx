import { useSyncExternalStore } from "react";
import { useBudouX } from "@/lib/budoux";

const CONTAINER_WIDTH_RATIO = 0.5;

type ContainerProps = {
  children: React.ReactNode;
  widthRatio: number;
  windowSize: WindowSize;
};
const Container = ({ children, widthRatio, windowSize }: ContainerProps) => {
  return (
    <div className="flex justify-center w-screen">
      <div
        className="h-full"
        style={{ width: String(windowSize.width * widthRatio) + "px" }}
      >
        {children}
      </div>
    </div>
  );
};

const { parse } = useBudouX();

type WindowSize = {
  width: number;
  height: number;
};

const subscribeWindowSizeChange = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const Home = () => {
  const windowSize: WindowSize = {
    width: useSyncExternalStore(
      subscribeWindowSizeChange,
      () => window.innerWidth,
    ),
    height: useSyncExternalStore(
      subscribeWindowSizeChange,
      () => window.innerHeight,
    ),
  };

  return (
    <Container windowSize={windowSize} widthRatio={CONTAINER_WIDTH_RATIO}>
      <div className="flex flex-col">
        <div
          className="w-full text-center text-8xl overflow-hidden"
          style={{
            marginTop: "80px",
            marginBottom: "80px",
          }}
        >
          VIEW
        </div>
        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <Caution title="制作" content="kaiiy" />
          <Caution title="注意事項" content={NoticeContent()} />
          <Caution title="チュートリアル" content={TutorialContent()} />
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            "0",
            "1",
            "2",
            "3",
            "1",
            "2",
            "3",
          ].map((stage, index) => (
            <div
              key={index}
              className="w-32 h-32 border border-black text-center text-2xl flex items-center justify-center"
            >
              {stage}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

interface CautionProps {
  title: string;
  content: string | JSX.Element;
}

const Caution = ({ title, content }: CautionProps) => (
  <div className="mb-6">
    <div className="text-2xl border-b border-black mb-3 overflow-hidden text-center">
      {title}
    </div>
    <p className="text-2xl overflow-hidden text-center">{content}</p>
  </div>
);

const NoticeContent = () => (
  <div className="text-2xl flex flex-col text-center pt-2">
    <div className="overflow-hidden">
      {parse("各ステージはそれ単体で解くことができます。")}
    </div>
    <div className="overflow-hidden mb-3">
      {parse("ステージをやり直す際には、ページをリロードしてください。")}
    </div>
    <div
      className="overflow-hidden"
      style={{
        lineHeight: "1.0",
      }}
    >
      {parse("本作は、前作「")}
      <a
        href="https://kaiiy.github.io/haze/"
        className="text-blue-500"
        target="_blank"
      >
        <span>HAZE</span>
      </a>
      {parse("」のシステムを踏襲しています。")}
    </div>
    <div className="overflow-hidden">
      {parse(
        "先に「HAZE: STAGE 1」をプレイされることをおすすめします。",
      )}
    </div>
  </div>
);

const TutorialContent = () => (
  <div className="text-2xl flex flex-col text-center pt-2">
    <div className="overflow-hidden">
      {parse(
        "下の正方形「0」をクリックして、「右矢印キー」を3回、「スペースキー」を1回、「右矢印キー」を3回、そして最後に「エンターキー」を1回押してください。",
      )}
    </div>
  </div>
);

export default Home;
