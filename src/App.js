import "./styles/index.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { connect } from "react-redux";
import { hideSnackbar } from "./redux/actions/snackbarAction";

function App(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (props.show_snackbar) {
      enqueueSnackbar(props.snackbar_message, {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        variant: props.snackbar_variant,
        autoHideDuration: 3000,
      });
      props.hideSnackbar();
    }
  }, [props.show_snackbar]);

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={LandingPage}></Route>
        {/* <Route exact path="/profile" component={Profile}></Route> */}
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  show_snackbar: state.snackbar.show,
  snackbar_message: state.snackbar.message,
  snackbar_variant: state.snackbar.variant,
});

export default connect(mapStateToProps, { hideSnackbar })(App);
