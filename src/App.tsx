import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";

import { subscribeWindowSizeChange, WindowSize } from "@/lib/window";
import { useEffect, useSyncExternalStore } from "react";

import Scene0 from "./routes/Scene0";
import Scene1 from "./routes/Scene1";
import Scene2 from "./routes/Scene2";
import Scene3 from "./routes/Scene3";
import Scene4 from "./routes/Scene4";

const CONTAINER_WIDTH_RATIO = 0.5;

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

  const containerWidth = windowSize.width * CONTAINER_WIDTH_RATIO;

  const baseSize = containerWidth / 24;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      // ブラウザのページバックを無効化
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
    <Routes>
      <Route
        path="/"
        element={<Home containerWidth={containerWidth} />}
      />
      <Route
        path="/0"
        element={<Scene0 containerWidth={containerWidth} baseSize={baseSize} />}
      />
      <Route
        path="/1"
        element={<Scene1 containerWidth={containerWidth} baseSize={baseSize} />}
      />
      <Route
        path="/2"
        element={<Scene2 containerWidth={containerWidth} baseSize={baseSize} />}
      />
      <Route
        path="/3"
        element={<Scene3 containerWidth={containerWidth} baseSize={baseSize} />}
      />
      <Route
        path="/4"
        element={<Scene4 containerWidth={containerWidth} baseSize={baseSize} />}
      />
    </Routes>
  );
};

export default App;
