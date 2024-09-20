import React from "react";
import { TypeAnimation } from 'react-type-animation';

const HeroBanner = () => (
  <div className="hero-banner">
   
    
    
    <h1 className="subtitle">
      Improve, Adapt, <br />
      <TypeAnimation
        sequence={[
          'Conquer',  // Types 'Repeat'
          1200,      // Waits 1 second
          'Inspire', // Deletes 'Repeat' and types 'Inspire'
          1200,      // Waits 1 second
          'Evolve',  // Deletes 'Inspire' and types 'Evolve'
          1200,      // Waits 1 second
          'Elevate', // Deletes 'Evolve' and types 'Elevate'
          1200,      // Waits 1 second
        ]}
        wrapper="span"    // Wraps the animation in a <span>
        cursor={false}     // Shows the blinking cursor
        repeat={Infinity} // Repeats the animation infinitely
        style={{ whiteSpace: 'pre-line' }} // Keeps the line break after 'Adapt'
      />
    </h1>
    
    <p className="description">
      Check out some of the most popular exercise moves! Spot Me is here to keep your workouts fresh every time!
    </p>
    
    <button className="exerciseButton">
      <a href="/exercises" className="explore-link">Explore Exercises</a>
    </button>
  </div>
);

export default HeroBanner;
