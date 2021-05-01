import React, { useEffect } from "react";
import { connect } from "react-redux";

import { showSnackbar } from "../redux/actions/snackbarAction";

const Player = (props) => {
  const [players, setPlayers] = React.useState(props.player);
  const [searchValue, setSearchValue] = React.useState("");

  const searchPlayer = () => {
    if (searchValue == "") {
      setPlayers(props.player);
    } else {
      let search_data = props.player;
      let data = [];
      for (let d = 0; d < search_data.length; d++) {
        if (search_data[d].name === searchValue) {
          data.push(search_data[d]);
        }
      }
      setPlayers(data);
    }
  };

  return (
    <div className="player">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Player's name"
          aria-label="Player's name"
          aria-describedby="button-addon2"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => searchPlayer()}
          >
            Search
          </button>
        </div>
      </div>
      <table class="table table-bordered">
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
