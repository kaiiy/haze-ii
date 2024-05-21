import { useSyncExternalStore } from "react";
import Scene0 from "@/scenes/scene0";

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

type CanvasProps = {
  children: React.ReactNode;
};
const Canvas = ({ children }: CanvasProps) => {
  return (
    <div className="w-full relative">
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

const Stage = () => {
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
    <Container windowSize={windowSize} widthRatio={CONTAINER_WIDTH_RATIO}>
      <Canvas>
        <div>width: {windowSize.width}</div>
        <div>height: {windowSize.height}</div>
        <div className="mb-4">baseSize: {baseSize}</div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Scene0 baseSize={baseSize} />
        </div>
      </Canvas>
    </Container>
  );
};

export default Stage;
