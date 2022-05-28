import Mockman from "mockman-js";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import {
  Footer,
  NavBar,
  PageNotFound,
  RequiresAuth,
  Toast,
} from "./components";
import { Home, SingleVideo, Videos, Login, Signup, WatchLater } from "./redux";

const App = () => {
  const { theme } = useSelector((store) => store.auth);
  return (
    <div className={theme === "light" ? "light-mode" : "dark-mode"}>
      <Toast />
      <NavBar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Videos />} />
        <Route path="/video/:videoId" element={<SingleVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route
          path="/watch-later"
          element={
            <RequiresAuth>
              <WatchLater />
            </RequiresAuth>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
