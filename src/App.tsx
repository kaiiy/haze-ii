import { useSyncExternalStore } from "react";
import Scene0 from "./scenes/scene0";

const CONTAINER_WIDTH_RATIO = 0.5;

type ContainerProps = {
  children: React.ReactNode;
  widthRatio: number;
  windowSize: WindowSize;
};
const Container = ({ children, widthRatio, windowSize }: ContainerProps) => {
  return (
    <div className="flex justify-center w-screen h-screen">
      <div
        className="h-full"
        style={{ width: String(windowSize.width * widthRatio) + "px" }}
      >
        {children}
      </div>
    </div>
  );
};

type CanvasProps = {
  children: React.ReactNode;
};
const Canvas = ({ children }: CanvasProps) => {
  return (
    <div className="h-full w-full relative">
      {children}
    </div>
  );
};

type WindowSize = {
  width: number;
  height: number;
};

const subscribeWindowSizeChange = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const App = () => {
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

  const baseSize = windowSize.width * CONTAINER_WIDTH_RATIO / 24;

  return (
    // <Container windowSize={windowSize} widthRatio={CONTAINER_WIDTH_RATIO}>
    //   <Canvas>
    //     {
    //       /* <div>width: {windowSize.width}</div>
    //     <div>height: {windowSize.height}</div>
    //     <div className="mb-4">baseSize: {baseSize}</div> */
    //     }
    //     <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
    //       <Scene0 baseSize={baseSize} />
    //     </div>
    //   </Canvas>
    // </Container>

    <div>
      <div className="flex flex-col lg:flex-row mb-4">
        <div className="w-1/2 px-6">
          <div className="w-full text-center text-8xl my-8">
            VIEW
          </div>
          <Caution title="制作" content="kaiiy" />
          <Caution title="注意事項" content={NoticeContent()} />
        </div>
        <div className="w-1/2 flex flex-col items-center px-6">
          {["STAGE 1", "STAGE 2", "STAGE 3"].map((stage, index) => (
            <div
              key={index}
              className="my-2 p-4 w-full border border-black text-center text-2xl"
            >
              {stage}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CautionProps {
  title: string;
  content: string | JSX.Element;
}

const Caution = ({ title, content }: CautionProps) => (
  <div className="mb-5">
    <div className="text-2xl border-b border-black mb-2">
      {title}
    </div>
    <p className="text-xl">{content}</p>
  </div>
);

const NoticeContent = () => (
  <div className="text-xl flex flex-col gap-2">
    <div>
      ・ 各ステージはそれ単体で解くことができます。
    </div>
    <div>
      ・ 「Clear!」と表示されたらステージクリアです。
    </div>
  </div>
);

export default App;
