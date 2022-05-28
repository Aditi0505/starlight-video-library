import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Toast = () => {
  const { theme } = useSelector((store) => store.auth);
  return (
    <ToastContainer
      theme={theme === "light" ? "light" : "dark"}
      className="toastify-container"
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
export { Toast };
