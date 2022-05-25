import Mockman from "mockman-js";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Footer, NavBar, PageNotFound, RequiresAuth } from "./components";
import { Home, Playlist, SingleVideo, Videos, Login, Signup } from "./redux";

const App = () => {
  const { theme } = useSelector((store) => store.auth);
  return (
    <div className={theme === "light" ? "light-mode" : "dark-mode"}>
      <ToastContainer className="toastify-container" />
      <NavBar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Videos />} />
        <Route path="/video/:videoId" element={<SingleVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
