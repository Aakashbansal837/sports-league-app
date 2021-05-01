import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  addTeam,
  removeTeam,
  addPlayer,
  removePlayer,
  updateFromLocalStorage,
} from "../redux/actions/userAction";
import { showSnackbar } from "../redux/actions/snackbarAction";

const AddNewTeam = (props) => {
  const [name, setName] = React.useState("");

  const saveTeam = () => {
    if (name == "") {
      props.showSnackbar({ message: "EMPTY TEAM NAME", variant: "error" });
    } else {
      let data = {
        name: name,
        players: [],
      };
      setName("");
      props.addTeam(data);
    }
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add new Team
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Teams
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                placeholder="enter Team name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                // data-dismiss="modal"
                className="btn btn-primary"
                onClick={() => saveTeam()}
              >
                Save Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const AddNewPlayer = (props) => {
  const [name, setName] = React.useState("");

  const savePlayer = () => {
    if (name == "") {
      props.showSnackbar({ message: "EMPTY PLAYER NAME", variant: "error" });
    } else {
      let data = {
        name: name,
        index: props.team_index,
      };
      setName("");
      props.addPlayer(data);
    }
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={"#exampleModalPlayer" + props.team_index}
      >
        Add new Player
      </button>

      <div
        className="modal fade"
        id={"exampleModalPlayer" + props.team_index}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalPlayerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalPlayerLabel">
                Add Players
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                placeholder="enter Player name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                // data-dismiss="modal"
                className="btn btn-primary"
                onClick={() => savePlayer()}
              >
                Save Player
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const RemovePlayer = (props) => {
  const [name, setName] = React.useState("");

  const removePlayerData = () => {
    if (name == "") {
      props.showSnackbar({ message: "EMPTY PLAYER NAME", variant: "error" });
    } else {
      let data = {
        name: name,
        index: props.team_index,
      };
      setName("");
      props.removePlayer(data);
    }
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-danger ml-2"
        data-toggle="modal"
        data-target={"#playerRemove" + props.team_index}
      >
        Remove Player
      </button>

      <div
        className="modal fade"
        id={"playerRemove" + props.team_index}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="playerRemoveLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="playerRemoveLabel">
                Remove Players
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <select
                className="form-control"
                placeholder="enter Player name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              >
                <option value="" disabled hidden>
                  none
                </option>

                {props.players.map((pl) => (
                  <option value={pl}>{pl}</option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                // data-dismiss="modal"
                className="btn btn-danger"
                onClick={() => removePlayerData()}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const Team = (props) => {
  const [teams, setTeams] = React.useState(props.teams);

  useEffect(() => {
    props.updateFromLocalStorage();
  }, []);

  useEffect(() => {
    setTeams(props.teams);
  }, [props.teams]);

  return (
    <div className="teams">
      <div className="add-team">
        <AddNewTeam addTeam={props.addTeam} showSnackbar={props.showSnackbar} />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Teams</th>
            <th scope="col">Players</th>
            <th scope="col">add / remove Players</th>
            <th scope="col">Remove Team</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{team.name}</td>
                <td>
                  <ul>
                    {team.players.map((player) => (
                      <li>{player}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <AddNewPlayer
                    team_index={index}
                    addPlayer={props.addPlayer}
                    showSnackbar={props.showSnackbar}
                  />
                  <RemovePlayer
                    team_index={index}
                    players={team.players}
                    removePlayer={props.removePlayer}
                    showSnackbar={props.showSnackbar}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => props.removeTeam(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  teams: state.user.teams,
});
const mapDispatchToProps = {
  showSnackbar,
  addTeam,
  removeTeam,
  addPlayer,
  removePlayer,
  updateFromLocalStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
