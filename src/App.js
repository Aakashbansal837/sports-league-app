import "./App.css";
import "./style/index.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Team from "./components/Team";
import Player from "./components/Player";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/teams" component={Team} />
        <Route exact path="/players" component={Player} />
      </Router>
    </div>
  );
}

export default App;
