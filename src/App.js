import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer, NavBar, PageNotFound } from "./components";
import { Home, SingleVideo, Videos } from "./redux";

const App = () => {
  return (
    <div>
      <ToastContainer className="toastify-container" />
      <NavBar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Videos />} />
        <Route path="/video/:videoId" element={<SingleVideo />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
