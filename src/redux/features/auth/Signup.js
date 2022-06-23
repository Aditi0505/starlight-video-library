import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "../../../components";
import { setTitle } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signUpUser } from "./authSlice";
import { toast } from "react-toastify";
const Signup = () => {
  setTitle("StarLight | Signup");
  const [user, setUser] = useState({ email: "", firstName: "", lastName: "" });
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
      setUser((user) => ({
        ...user,
        email: e.target.value,
      }));
    }
    if (value === "confirm password") {
      setConfirmPassword(e.target.value);
    }
    if (value === "first name") {
      setUser((user) => ({
        ...user,
        firstName: e.target.value,
      }));
    }
    if (value === "last name") {
      setUser((user) => ({
        ...user,
        lastName: e.target.value,
      }));
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
    if (
      !user.email &&
      !user.firstName &&
      !user.lastName &&
      !password &&
      !confirmPassword
    ) {
      toast.info("Please enter valid credentials");
    } else if (!user.firstName) {
      toast.info("Please enter first name");
    } else if (!user.lastName) {
      toast.info("Please enter last name");
    } else if (!confirmPassword && !password) {
      toast.info("Please enter valid password");
    } else if (!confirmPassword && password) {
      toast.info("Please confirm password");
    } else if (!user.email) {
      toast.info("Please enter valid username");
    } else {
      const isValid = validateFields(password, confirmPassword);
      if (isValid) {
        const userDetails = {
          email: user.email,
          password: password,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        {
          const data = dispatch(signUpUser(userDetails));
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
  const guestSignUpHandler = () => {
    const userDetails = {
      firstName: "Sarah",
      lastName: "Parker",
      email: "sarah.parker@gmail.com",
      password: "sarah@parker",
      confirmPassword: "sarah@parker",
    };
    setUser((user) => ({
      ...user,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
    }));
    setPassword(userDetails.password);
    setConfirmPassword(userDetails.confirmPassword);
    const isValid = validateFields(
      userDetails.password,
      userDetails.confirmPassword
    );
    if (isValid) {
      const data = dispatch(signUpUser(userDetails));
      data
        .then((res) =>
          res.error
            ? toast.error(res.payload)
            : toast.success("User signed up!")
        )
        .catch((e) => toast.error(e));
      const login = dispatch(loginUser(userDetails));
      login.then((res) =>
        res.error
          ? toast.error(res.payload)
          : toast.success("User logged in!") &&
            navigate(location.state?.from?.pathname || "/", {
              replace: true,
            })
      );
    } else {
      toast.error("Password does not match!");
    }
  };
  useEffect(() => {
    localStorage.setItem("signup-token", encodedToken);
  }, [encodedToken]);
  useEffect(() => {
    localStorage.setItem("login-token", encodedToken);
    localStorage.setItem("user", JSON.stringify(user));
  }, [encodedToken, user]);
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
                inputType="text"
                label="First Name"
                placeholder="Aditi"
                inputHandler={handleInput}
                value={user.firstName}
              />
              <Input
                inputType="text"
                label="Last Name"
                placeholder="Jha"
                inputHandler={handleInput}
                value={user.lastName}
              />
              <Input
                inputType="email"
                label="Email Address"
                placeholder="redcloset@gmail.com"
                inputHandler={handleInput}
                value={user.email}
              />
              {showPassword ? (
                <div className="passwordBox">
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
                <div className="passwordBox">
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
                <div className="passwordBox">
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
                <div className="passwordBox">
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
            </div>
            <button
              className="btn btn-primary margin-tb-sm auth-button"
              onClick={validateHandler}
            >
              Create New Account
            </button>
            <button
              className="btn btn-outline-primary margin-tb-sm auth-button"
              onClick={guestSignUpHandler}
            >
              Fill Test Credentials
            </button>
            <div>
              <Link to="/login" className="text text-sm ft-light underlined">
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
