import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import { Footer, NavBar, PageNotFound } from "./components";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
