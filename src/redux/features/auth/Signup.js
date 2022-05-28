import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "../../../components";
import { setTitle } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "./authSlice";
import { toast } from "react-toastify";
const Signup = () => {
  setTitle("StarLight | Signup");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { encodedToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };
  const showSetConfirmPasswordHandler = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleInput = (e, value) => {
    if (value === "password") {
      setPassword(e.target.value);
    }
    if (value === "email address") {
      setUserName(e.target.value);
    }
    if (value === "confirm password") {
      setConfirmPassword(e.target.value);
    }
  };
  const validateFields = (password, confirmPassword) => {
    if (password && confirmPassword) {
      return password === confirmPassword;
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  const validateHandler = () => {
    if (!userName && !password && !confirmPassword) {
      toast.info("Please enter valid credentials");
    } else if (!confirmPassword && !password) {
      toast.info("Please enter valid password");
    } else if (!confirmPassword && password) {
      toast.info("Please confirm password");
    } else if (!userName) {
      toast.info("Please enter valid username");
    } else {
      const isValid = validateFields(password, confirmPassword);
      if (isValid) {
        const user = {
          email: userName,
          password: password,
        };
        {
          const data = dispatch(signUpUser(user));
          data
            .then((res) =>
              res.error
                ? toast.error(res.payload)
                : toast.success("User signed up!") &&
                  navigate(location.state?.from?.pathname || "/login", {
                    replace: true,
                  })
            )
            .catch((e) => toast.error(e));
        }
      } else {
        toast.error("Password does not match!");
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("signup-token", encodedToken);
  }, [encodedToken]);
  return (
    <main className="outer-wrapper auth-wrapper flex-spbt">
      <section className="screen flex-spbt sign-up">
        <div className="form-container card-container-shadow">
          <div className="card-title">
            <h3>Signup</h3>
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

            {showConfirmPassword ? (
              <div className="text-left padding-xs passwordBox">
                <Input
                  inputType="text"
                  label="Confirm Password"
                  placeholder="*****************"
                  inputHandler={handleInput}
                  value={confirmPassword}
                />
                <i
                  className="fa fa-eye showPassword"
                  onClick={showSetConfirmPasswordHandler}
                ></i>
              </div>
            ) : (
              <div className="text-left padding-xs passwordBox">
                <Input
                  inputType="password"
                  label="Confirm Password"
                  placeholder="*****************"
                  inputHandler={handleInput}
                  value={confirmPassword}
                />
                <i
                  className="fa fa-eye showPassword"
                  onClick={showSetConfirmPasswordHandler}
                ></i>
              </div>
            )}

            <button
              className="btn btn-primary margin-tb-sm"
              onClick={validateHandler}
            >
              Create New Account
            </button>
            <div>
              <Link to="/login" className="text text-sm ft-light">
                Already have an account
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export { Signup };
