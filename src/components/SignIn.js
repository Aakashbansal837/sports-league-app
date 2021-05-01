import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signInUser } from "../redux/actions/userAction";
import { showSnackbar } from "../redux/actions/snackbarAction";

const SignIn = (props) => {
  // user data
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // label focus
  const [focusInput, setFocusInput] = React.useState(false);

  const updateLabelFocus = () => {
    if (email == "" && password == "") {
      setFocusInput(false);
    } else {
      setFocusInput(true);
    }
  };

  useEffect(() => {
    if (props.is_logged_in) {
      props.activateProfile();
    }
  }, [props.is_logged_in]);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const submitForm = () => {
    if (email === "") {
      props.showSnackbar({ message: "EMPTY EMAIL", variant: "error" });
    } else if (!validateEmail(email)) {
      props.showSnackbar({ message: "INVALID EMAIL", variant: "error" });
    } else if (password === "") {
      props.showSnackbar({ message: "EMPTY PASSWORD", variant: "error" });
    } else {
      let data = {
        email: email,
        password: password,
      };
      props.signInUser(data);
    }
  };
  const setLoginView = (value) => {
    props.setLoginView(value);
  };
  return (
    <div className={"login form-peice" + (props.loginView ? " " : " switched")}>
      <form className="login-form">
        <div className="form-group">
          <label className={focusInput ? "active" : ""} htmlFor="loginemail">
            Email Adderss
          </label>
          <input
            onFocus={() => setFocusInput(true)}
            onBlur={() => updateLabelFocus()}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="loginemail"
            id="loginemail"
            required
          />
        </div>

        <div className="form-group">
          <label className={focusInput ? "active" : ""} htmlFor="loginPassword">
            Password
          </label>
          <input
            onFocus={() => setFocusInput(true)}
            onBlur={() => updateLabelFocus()}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="loginPassword"
            id="loginPassword"
            required
          />
        </div>

        <div className="CTA">
          <input onClick={() => submitForm()} type="button" value="Login" />
          <a onClick={() => setLoginView(false)} className="switch">
            I'm New
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
  signInUser,
  showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
