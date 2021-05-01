import "./App.css";
import "./style/index.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { connect } from "react-redux";
import { hideSnackbar } from "./redux/actions/snackbarAction";
import Homepage from "./components/Homepage";
import Team from "./components/Team";
import Player from "./components/Player";
import Navbar from "./components/Navbar";

function App(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (props.show_snackbar) {
      enqueueSnackbar(props.snackbar_message, {
        variant: props.snackbar_variant,
        autoHideDuration: 3000,
      });
      props.hideSnackbar();
    }
  }, [props.show_snackbar]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={Team} />
        <Route exact path="/teams" component={Team} />
        <Route exact path="/players" component={Player} />
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
