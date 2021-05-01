import React, { useState, useEffect } from "react";
import axios from "axios";

const Homepage = () => {
  return (
    <div className="container homepage">
      <div className="row">landing page here</div>
      <div className="row">
        <a href="/teams">
          <button className="btn btn-primary">Teams</button>
        </a>

        <a href="/players">
          <button className="btn btn-primary">Players</button>
        </a>
      </div>
      <div className="row">landing page here</div>
    </div>
  );
};

export default Homepage;
