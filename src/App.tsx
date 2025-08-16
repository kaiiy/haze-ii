import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";

import { subscribeWindowSizeChange, WindowSize } from "@/lib/window";
import { useEffect, useSyncExternalStore } from "react";

import Scene0 from "./routes/Scene0";
import Scene1 from "./routes/Scene1";
import Scene2 from "./routes/Scene2";
import Scene3 from "./routes/Scene3";
import Scene4 from "./routes/Scene4";
import Scene5 from "./routes/Scene5";
import Scene6 from "./routes/Scene6";

import Check1 from "./routes/Check1";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const getContainerWidthRatio = (width: number): number => {
  if (width <= 768) {
    return 0.9;
  }
  if (width <= 1024) {
    const t = (width - 768) / (1024 - 768); // 0..1
    return lerp(0.9, 0.7, clamp(t, 0, 1));
  }
  if (width <= 1440) {
    const t = (width - 1024) / (1440 - 1024); // 0..1
    return lerp(0.7, 0.5, clamp(t, 0, 1));
  }
  return 0.5;
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

  const containerWidthRatio = getContainerWidthRatio(windowSize.width);

  const containerWidth = windowSize.width * containerWidthRatio;

  const baseSize = containerWidth / 24;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === " ") {
      // スクロールを無効化
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="pt-16 md:pt-0">
      <Routes>
        <Route
          path="/"
          element={<Home containerWidth={containerWidth} />}
        />
        <Route
          path="/0"
          element={
            <Scene0 containerWidth={containerWidth} baseSize={baseSize} />
          }
        />
        <Route
          path="/1"
          element={
            <Scene1 containerWidth={containerWidth} baseSize={baseSize} />
          }
        />
        <Route
          path="/2"
          element={
            <Scene2 containerWidth={containerWidth} baseSize={baseSize} />
          }
        />
        <Route
          path="/3"
          element={
            <Scene3 containerWidth={containerWidth} baseSize={baseSize} />
          }
        />
        <Route
          path="/4"
          element={
            <Scene4 containerWidth={containerWidth} baseSize={baseSize} />
          }
        />
        <Route
          path="/5"
          element={
            <Scene5 containerWidth={containerWidth} baseSize={baseSize} />
          }
        />
        <Route
          path="/6"
          element={
            <Scene6 containerWidth={containerWidth} baseSize={baseSize} />
          }
        />
        <Route
          path="/L"
          element={
            <Check1 containerWidth={containerWidth} baseSize={baseSize} />
          }
        />
      </Routes>
    </main>
  );
};

export default App;
