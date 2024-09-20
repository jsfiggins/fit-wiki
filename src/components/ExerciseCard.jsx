import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
// import {fetchData, exerciseOptions} from "../utils/fetchData"



const ExerciseCard = ({exercise}) => {
console.log(exercise)
   
    return (
//Links to corresponding exercise to indvl exercise page that renders the details 
        <Link className="exercise-card" to= {`/exercise/${exercise.id}`}>  
          <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" className="exercise-image" />
          <div className="exercise-info">
            <button className="exercise-button body-part">{exercise.bodyPart}</button>
            <button className="exercise-button target">{exercise.target}</button>
          </div>
          <p className="exercise-name">{exercise.name}</p>
        </Link>
    )
}


export default ExerciseCard;


