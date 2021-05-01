import React, { useEffect } from "react";
import { connect } from "react-redux";
import { signOutUser, updateUserData } from "../redux/actions/userAction";
import { showSnackbar } from "../redux/actions/snackbarAction";
import Flower from "../images/flower.jpg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Profile = (props) => {
  const [focusInput, setFocusInput] = React.useState(false);

  const [email, setEmail] = React.useState(
    props.user.email ? props.user.email : ""
  );
  const [userName, setUserName] = React.useState(
    props.user.userName ? props.user.userName : ""
  );
  const [password, setPassword] = React.useState(
    props.user.password ? props.user.password : ""
  );
  const [image, setImage] = React.useState(
    props.user.image ? props.user.image : ""
  );
  const [dob, setDob] = React.useState(
    props.user.dob ? props.user.dob : "" ? props.user.dob : ""
  );
  const [phone, setPhone] = React.useState(
    props.user.phone ? props.user.phone : ""
  );
  const [address, setAddress] = React.useState(
    props.user.address ? props.user.address : ""
  );

  // Reload page
  const logoutClicked = () => {
    props.signOutUser();
  };

  useEffect(() => {
    updateLabelFocus();
  }, []);

  const updateLabelFocus = () => {
    if (
      userName == "" &&
      address == "" &&
      phone == "" &&
      image == "" &&
      dob == ""
    ) {
      setFocusInput(false);
    } else {
      setFocusInput(true);
    }
  };

  const changeImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const localImageUrl = window.URL.createObjectURL(file);
      setImage(localImageUrl);
    } else {
      setImage("");
    }
    showSnackbar({
      message: "IMAGE UPDATED IN BRAND BACKGROUND",
      variant: "info",
    });
  };

  const submitForm = () => {
    // console.log("phone", phone);
    if (userName === "") {
      props.showSnackbar({ message: "EMPTY USERNAME", variant: "error" });
    } else if (dob === "") {
      props.showSnackbar({ message: "EMPTY DATE OF BIRTH", variant: "error" });
    } else if (phone === "") {
      props.showSnackbar({ message: "EMPTY PHONE NUMBER", variant: "error" });
    } else if (phone.length > 14 || phone.length < 8) {
      props.showSnackbar({ message: "INVALID PHONE NUMBER", variant: "error" });
    } else if (address === "") {
      props.showSnackbar({ message: "EMPTY ADDRESS", variant: "error" });
    } else {
      let data = {
        userName,
        email,
        password,
        image,
        dob,
        phone,
        address,
      };
      props.updateUserData(data);
    }
  };

  return (
    <div className="container">
      <section id="formHolder">
        <div className="row">
          <div
            className="col-sm-6 d-md-none brand text-right brand-image"
            style={{ backgroundImage: "url(" + (image ? image : Flower) + ")" }}
          >
            <a
              style={{ cursor: "pointer" }}
              className="logo"
              onClick={() => logoutClicked()}
            >
              Logout
            </a>

            <div className="heading">
              <h2>Profile</h2>
              <p style={{ textTransform: "lowercase" }}> {email}</p>
              <p style={{ textTransform: "lowercase" }}>
                upload image for background update
              </p>
            </div>
          </div>
          <div className=" col-xs-12 col-sm-10 col-md-6 form form-1">
            <div className="signup form-peice">
              <form className="signup-form">
                <div className="form-group">
                  <label className={focusInput ? "active" : ""} htmlFor="name">
                    Full Name
                  </label>
                  <input
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => updateLabelFocus()}
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    type="text"
                    name="username"
                    id="name"
                    className="name"
                  />
                </div>

                <div className="form-group">
                  <label className={focusInput ? "active" : ""} htmlFor="email">
                    Date Of Birth
                  </label>
                  <input
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => updateLabelFocus()}
                    onChange={(e) => setDob(e.target.value)}
                    value={dob}
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    className="dateOfBirth"
                  />
                </div>

                <div className="form-group">
                  <label className={focusInput ? "active" : ""} htmlFor="phone">
                    Phone Number - <small>Optional</small>
                  </label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                  />
                  {/* <input
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => updateLabelFocus()}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="text"
                    name="phone"
                    id="phone"
                  /> */}
                </div>

                <div className="form-group">
                  <label
                    className={focusInput ? "active" : ""}
                    htmlFor="passwordCon"
                  >
                    Image
                  </label>
                  <input
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => updateLabelFocus()}
                    onChange={(e) => changeImage(e)}
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    name="passwordCon"
                    id="passwordCon"
                    className="passConfirm"
                  />
                </div>

                <div className="form-group">
                  <label className={focusInput ? "active" : ""} htmlFor="email">
                    Adderss
                  </label>
                  <input
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => updateLabelFocus()}
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                    name="address"
                    id="address"
                    className="address"
                  />
                </div>

                <div className="CTA">
                  <input
                    onClick={() => submitForm()}
                    type="button"
                    value="Update"
                    id="submit"
                  />
                </div>
              </form>
            </div>
          </div>
          <div
            className="col-sm-6 d-none d-md-block brand text-right brand-image"
            style={{ backgroundImage: "url(" + (image ? image : Flower) + ")" }}
          >
            <a
              style={{ cursor: "pointer" }}
              className="logo"
              onClick={() => logoutClicked()}
            >
              Logout
            </a>

            <div className="heading">
              <h2>Profile</h2>
              <p style={{ textTransform: "lowercase" }}> {email}</p>
              <p style={{ textTransform: "lowercase" }}>
                upload image for background update
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  is_logged_in: state.user.is_logged_in,
  user: state.user.currentUser,
});
const mapDispatchToProps = {
  signOutUser,
  showSnackbar,
  updateUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
