import React from "react";
import { connect } from "react-redux";
import { viewProfile } from "../redux/actions/userAction";

const Brand = (props) => {
  const showProfile = () => {
    props.viewProfile();
  };

  return (
    <div className="col-sm-6 brand">
      <a href="#" className="logo">
        Made By
      </a>

      <div className="heading">
        <h2>Aakash</h2>
        <p> ( Login / SignUp ) via Redux</p>
      </div>

      <div className="success-msg">
        <p>Great! You are one of our members now</p>
        <a
          style={{ cursor: "pointer" }}
          onClick={() => showProfile()}
          className="profile"
        >
          Your Profile
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  is_logged_in: state.user.is_logged_in,
});
const mapDispatchToProps = {
  viewProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Brand);
