import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createNewUser } from "../redux/actions/userAction";
import { showSnackbar } from "../redux/actions/snackbarAction";

const SignUp = (props) => {
  // user State
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // label focus
  const [focusInput, setFocusInput] = React.useState(false);

  useEffect(() => {
    if (props.is_logged_in) {
      props.activateProfile();
    }
  }, [props.is_logged_in]);

  const updateLabelFocus = () => {
    if (email == "" && password == "" && userName == "" && confirmPassword) {
      setFocusInput(false);
    } else {
      setFocusInput(true);
    }
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const submitForm = () => {
    if (userName === "") {
      props.showSnackbar({ message: "EMPTY USERNAME", variant: "error" });
    } else if (email === "") {
      props.showSnackbar({ message: "EMPTY EMAIL", variant: "error" });
    } else if (!validateEmail(email)) {
      props.showSnackbar({ message: "INVALID EMAIL", variant: "error" });
    } else if (password === "") {
      props.showSnackbar({ message: "EMPTY PASSWORD", variant: "error" });
    } else if (password !== confirmPassword) {
      props.showSnackbar({
        message: "PASSWORD MATCH FAILED",
        variant: "error",
      });
    } else if (password.length < 6) {
      props.showSnackbar({
        message: "YOUR PASSWORD IS TOO WEEK",
        variant: "warning",
      });
    } else {
      let data = {
        userName,
        email,
        password,
      };
      // console.log("data :", data);
      props.createNewUser(data);
    }
  };
  const setLoginView = (value) => {
    props.setLoginView(value);
  };

  return (
    <div
      className={"signup form-peice" + (!props.loginView ? " " : " switched")}
    >
      <form className="signup-form">
        <div className="form-group">
          <label className={focusInput ? "active" : ""} htmlFor="name">
            Full Name
          </label>
          <input
            onFocus={() => setFocusInput(true)}
            onBlur={() => updateLabelFocus()}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            name="username"
            id="name"
            className="name"
          />
          <span className="error"></span>
        </div>

        <div className="form-group">
          <label className={focusInput ? "active" : ""} htmlFor="email">
            Email Adderss
          </label>
          <input
            onFocus={() => setFocusInput(true)}
            onBlur={() => updateLabelFocus()}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="emailAdress"
            id="email"
            className="email"
          />
          <span className="error"></span>
        </div>

        <div className="form-group">
          <label className={focusInput ? "active" : ""} htmlFor="password">
            Password
          </label>
          <input
            onFocus={() => setFocusInput(true)}
            onBlur={() => updateLabelFocus()}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="pass"
          />
          <span className="error"></span>
        </div>

        <div className="form-group">
          <label className={focusInput ? "active" : ""} htmlFor="passwordCon">
            Confirm Password
          </label>
          <input
            onFocus={() => setFocusInput(true)}
            onBlur={() => updateLabelFocus()}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="passwordCon"
            id="passwordCon"
            className="passConfirm"
          />
          <span className="error">
            {password !== confirmPassword ? "Passwords don't match" : null}
          </span>
        </div>

        <div className="CTA">
          <input
            onFocus={() => setFocusInput(true)}
            onClick={() => submitForm()}
            type="button"
            value="Signup Now"
            id="submit"
          />
          <a onClick={() => setLoginView(true)} className="switch">
            I have an account
          </a>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  is_logged_in: state.user.is_logged_in,
});
const mapDispatchToProps = {
  createNewUser,
  showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
