import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "../../../components";
import { setTitle } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../auth/authSlice";
import { toast } from "react-toastify";
const Login = () => {
  setTitle("StarLight | Login");
  const { encodedToken } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.setItem("login-token", encodedToken);
  }, [encodedToken]);

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };
  const handleInput = (e, value) => {
    if (value === "password") {
      setPassword(e.target.value);
    }
    if (value === "email address") {
      setUserName(e.target.value);
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  const loginHandler = () => {
    const user = {
      email: userName,
      password: password,
    };
    if (!userName && !password) {
      toast.info("Please enter valid credentials");
    } else if (!password) {
      toast.info("Please enter valid password");
    } else if (!userName) {
      toast.info("Please enter valid username");
    } else {
      const data = dispatch(loginUser(user));
      data
        .then((res) =>
          res.error
            ? toast.error(res.payload)
            : toast.success("User logged in!") &&
              navigate(location.state?.from?.pathname || "/", {
                replace: true,
              })
        )
        .catch((e) => toast.error(e));
    }
  };
  const guestLoginHandler = () => {
    const user = {
      email: "aditi@gmail.com",
      password: "aditi123",
    };
    setUserName(user.email);
    setPassword(user.password);
    const data = dispatch(loginUser(user));
    data
      .then((res) =>
        res.error
          ? toast.error(res.payload)
          : toast.success("User logged in!") &&
            navigate(location.state?.from?.pathname || "/", {
              replace: true,
            })
      )
      .catch((e) => toast.error(e));
  };
  return (
    <main className="outer-wrapper auth-wrapper flex-spbt">
      <section className="screen flex-spbt login">
        <div className="form-container card-container-shadow">
          <div className="card-title">
            <h3>Login</h3>
          </div>
          <form className="card-desc form" onSubmit={formSubmitHandler}>
            <div className="text-left padding-xs">
              <Input
                inputType="email"
                label="Email Address"
                placeholder="redcloset@gmail.com"
                inputHandler={handleInput}
                value={userName}
              />
            </div>
            {showPassword ? (
              <div className="text-left padding-xs passwordBox">
                <Input
                  inputType="text"
                  label="Password"
                  placeholder="*****************"
                  inputHandler={handleInput}
                  value={password}
                />
                <i
                  className="fa fa-eye showPassword"
                  onClick={showPasswordHandler}
                ></i>
              </div>
            ) : (
              <div className="text-left padding-xs passwordBox">
                <Input
                  inputType="password"
                  label="Password"
                  placeholder="*****************"
                  inputHandler={handleInput}
                  value={password}
                />
                <i
                  className="fa fa-eye showPassword"
                  onClick={showPasswordHandler}
                ></i>
              </div>
            )}
            <button
              type="button"
              className="btn btn-primary margin-tb-sm"
              onClick={guestLoginHandler}
            >
              Login To Guest Account
            </button>
            <button
              type="button"
              className="btn btn-primary margin-tb-sm"
              onClick={loginHandler}
            >
              Login To Your Account
            </button>
            <div>
              <Link to="/signup" className="text text-sm ft-light">
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export { Login };
