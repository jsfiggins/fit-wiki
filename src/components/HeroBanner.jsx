import React from "react";
import HeroBannerImage from './images/banner.png'


const HeroBanner = () => (
  <div className="hero-banner">
    <h1 className="title">Spot Me</h1>
    <h1 className="subtitle">
      Improve, Adapt <br />
      And Repeat
    </h1>
    <p className="description">
      Check out some of the most popular exercise moves! Spot Me is here to keep your workouts fresh everytime! 
    </p>
    <button className="exerciseButton"><a href="/exercises" className="explore-link">Explore Exercises</a></button>
   

    <img src={HeroBannerImage} alt="hero-banner" className="hero-banner-img" />
  </div>
);

export default HeroBanner;
