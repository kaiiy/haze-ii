import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Stage from "./routes/Stage";

const CONTAINER_WIDTH_RATIO = 0.5;

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home containerWidthRatio={CONTAINER_WIDTH_RATIO} />}
      />
      <Route path="/stage" element={<Stage />} />
    </Routes>
  );
};

export default App;
