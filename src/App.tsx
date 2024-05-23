import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Scene0 from "./routes/Scene0";
import { WindowSize } from "@/lib/window";
import { useEffect, useSyncExternalStore } from "react";

const CONTAINER_WIDTH_RATIO = 0.5;

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

  const containerWidth = windowSize.width * CONTAINER_WIDTH_RATIO;

  const baseSize = containerWidth / 24;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
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
    </Routes>
  );
};

export default App;
