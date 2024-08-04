import React from 'react';
import Icon from './images/icon.png';
import '../index.css';

const BodyPart = ({ item, setBodyPart, bodyPart, handleSearch, setSearch }) => ( //item represents the name of body part 
  <div
    className={`bodyPart-card ${bodyPart === item ? 'active' : ''}`}
    onClick={() => {
      setBodyPart(item); //update the state of selected body part 
      setSearch(item); // sets search field to body part clicked (item)
      handleSearch(item);// search based on selected body part 
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    }}
  >
    <img src={Icon} alt="dumbbell" className="bodyPart-icon" />
    <p className="bodyPart-text">{item}</p>
  </div>
);

export default BodyPart;
