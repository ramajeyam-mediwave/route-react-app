import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <div className="Add">
          <Link to="/">home</Link>
        </div>
        <div className="Home">
          <Link to="/add">add</Link>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
