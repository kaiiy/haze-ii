import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Stage from "./routes/Stage";
import { WindowSize } from "@/lib/window";
import { useSyncExternalStore } from "react";

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

  return (
    <Routes>
      <Route
        path="/"
        element={<Home containerWidth={containerWidth} />}
      />
      <Route
        path="/0"
        element={<Stage containerWidth={containerWidth} />}
      />
    </Routes>
  );
};

export default App;
