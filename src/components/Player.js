import React, { useEffect } from "react";
import { connect } from "react-redux";

import { showSnackbar } from "../redux/actions/snackbarAction";

const Player = (props) => {
  const [players, setPlayers] = React.useState(props.player);
  const [searchValue, setSearchValue] = React.useState("");

  const searchPlayer = () => {
    if (searchValue == "") {
      props.showSnackbar({
        message: "empty Search Showing All Data",
        variant: "warning",
      });
      setPlayers(props.player);
    } else {
      let search_data = props.player;
      let data = [];
      for (let d = 0; d < search_data.length; d++) {
        if (search_data[d].name === searchValue) {
          data.push(search_data[d]);
        }
      }
      props.showSnackbar({
        message: "showing Search Data",
        variant: "info",
      });
      setPlayers(data);
    }
  };

  return (
    <div className="player">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Player's name"
          aria-label="Player's name"
          aria-describedby="button-addon2"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => searchPlayer()}
          >
            Search
          </button>
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Player Name</th>
            <th scope="col">Team Name</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{player.name}</td>
                <td>{player.team}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  player: state.user.player,
});
const mapDispatchToProps = {
  showSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
