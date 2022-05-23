import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import { Footer, NavBar, PageNotFound } from "./components";
import { Home, Videos } from "./redux";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Videos />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
