import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Stage from "./routes/Stage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stage" element={<Stage />} />
    </Routes>
  );
};

export default App;
