import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { exerciseOptions, fetchData } from "../../utils/fetchData";


const NewDetail = () => {

  const { id } = useParams(); //grabbing id from selected exercise to determine what to display
  const [exerciseDetail, setExerciseDetail] = useState({});

  useEffect(() => { //to perform side effects whenever id changes (i.e the exercise )
    const fetchExerciseData = async () => {
      try {
        const foundExercises = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, exerciseOptions); //fetching exercise from API based on id 
        setExerciseDetail(foundExercises); //changing the state responsible for the details of exercise to those of the requested id
      } catch (error) {
        console.error("Failed to fetch exercise data");
      }
    };

    fetchExerciseData();
  }, [id]); //runs whenenever the id changes ; i. e whenever a new exercise is searched or bodyPart card clicked on. 

  return (



    <div className="exercise-detail-container">
      <h1 className="exercise-title">{exerciseDetail.name}</h1>
      <div className="exercise-image-container">
        {exerciseDetail.gifUrl && (
          <img src={exerciseDetail.gifUrl} alt={exerciseDetail.name} className="exercise-image" />
        )}
      </div>
      <div className="exercise-details">
        <div className="exercise-detail">
          <span className="detail-label">Body Part:</span>
          <span className="detail-value">{exerciseDetail.bodyPart}</span>
        </div>
        <div className="exercise-detail">
          <span className="detail-label">Equipment:</span>
          <span className="detail-value">{exerciseDetail.equipment}</span>
        </div>
        <div className="exercise-detail">
          <span className="detail-label">Target:</span>
          <span className="detail-value">{exerciseDetail.target}</span>
        </div>
        <div className="exercise-detail">
          <span className="detail-label">Instructions:</span>
          <span className="detail-value">{exerciseDetail.instructions}</span>
        </div>
      </div>
    </div>


  );
};

export default NewDetail;

