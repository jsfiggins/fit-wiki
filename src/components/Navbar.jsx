import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../components/images/logo.png";

const Navbar = () => { //Navbar utilizing react-router-dom 
  return (
  
    <nav >
      <Link to="/">
        <img src={Logo} alt="Logo" style={{ width: '80px', height: '50px', margin:'none' }} />
      </Link>
      <ul>
        <li>
          <Link to="/" style ={{textDecoration:'none',color: '#3A1212'}}>Home</Link>
        </li>
        <li>
          <Link to="/exercises" style={{ textDecoration: 'none', color: '#3A1212', marginRight: '20px' }}>Explore All Exercises </Link>
        </li>
        <li>
          <Link to="/exercises/bodyPart" style={{ textDecoration: 'none', color: '#3A1212', marginRight: '20px' }}>Exercises by Body Part</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
