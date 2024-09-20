import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../components/images/logo.png";

const Navbar = () => { //Navbar utilizing react-router-dom 
  return (
    <nav>
      <Link to="/">
        <img src={Logo} alt="Logo" style={{ width: '80px', height: '50px', margin:'none' }} />
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/exercises">Explore All Exercises</Link>
        </li>
        <li>
          <Link to="/exercises/bodyPart">Search by Body Part</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
