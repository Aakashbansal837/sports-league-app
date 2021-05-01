import React, { useState, useEffect } from "react";
import axios from "axios";

const Homepage = () => {
  const [data, setData] = useState([{ name: "abc" }]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = () => {
    let getData = {
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users",
    };
    axios(getData)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const editData = (index) => {
    console.log("edit data", index);
    let value = data[index];
    setCurrentIndex(index);

    setName(value.name);
    setEmail(value.email);
    setPhone(value.phone);
    setCurrentUser(data[index]);
  };
  const updateUserData = () => {
    let tmp_data = data;
    tmp_data[currentIndex].name = name;
    tmp_data[currentIndex].email = email;
    tmp_data[currentIndex].phone = phone;

    setData(tmp_data);
  };
  const deleteData = (index) => {
    console.log("delete data", index);
    let value = data[index];

    let tm_data = data.filter((ob) => ob != value);
    setData(tm_data);
  };
  return (
    <div className="container homepage">
      <div className="row">
        {data.map((dt, index) => {
          return (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 card">
              <div className="image">
                <img
                  className="img"
                  src={`https://avatars.dicebear.com/v2/avataaars/${dt.username}.svg?options[mood][]=happy`}
                />{" "}
              </div>
              <div className="disc">
                <p>{dt.name}</p>
                <p>{dt.email}</p>
                <p>{dt.phone}</p>
              </div>
              <div className="buttons">
                <button className="btn user-btn"> like</button>
                <button
                  className="btn user-btn"
                  onClick={() => editData(index)}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  edit
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Edit {name} Data
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div>
                          <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                        </div>
                        <div>
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>

                        <div>
                          <input
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => updateUserData()}
                          type="button"
                          className="btn btn-primary"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn user-btn"
                  onClick={() => deleteData(index)}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
