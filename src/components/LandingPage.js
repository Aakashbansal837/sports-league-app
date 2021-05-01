import React from "react";
import { connect } from "react-redux";
import { showSnackbar } from "../redux/actions/snackbarAction";
import Brand from "./Brand";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LandingPage = (props) => {
  // true if signIn , false if signup
  const [loginView, setLoginView] = React.useState(true);

  // Form submit
  const activateProfile = (error) => {
    if (error) {
      document.querySelector(".name, .email, .pass, .passConfirm").blur();
    } else {
      window.document
        .querySelector(".signup, .login")
        .classList.add("switched");

      setTimeout(function () {
        window.document.querySelector(".signup, .login , .form").style.display =
          "none";
      }, 700);
      setTimeout(function () {
        window.document.querySelector(".brand").classList.add("active");
      }, 300);
      setTimeout(function () {
        window.document.querySelector(".heading").classList.add("active");
      }, 600);
      setTimeout(function () {
        window.document.querySelector(".success-msg p").classList.add("active");
      }, 900);
      setTimeout(function () {
        window.document.querySelector(".success-msg a").classList.add("active");
      }, 1050);
    }
  };

  return (
    <React.Fragment>
      {props.view_profile ? (
        <Profile />
      ) : (
        <div className="container">
          <section id="formHolder">
            <div className="row">
              <Brand />
              <div className="col-sm-10 col-md-6 form">
                <SignIn
                  loginView={loginView}
                  activateProfile={activateProfile}
                  setLoginView={setLoginView}
                />
                <SignUp
                  loginView={loginView}
                  activateProfile={activateProfile}
                  setLoginView={setLoginView}
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  is_logged_in: state.user.is_logged_in,
  view_profile: state.user.view_profile,
});
const mapDispatchToProps = {
  showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
