import React, { useEffect, useState } from 'react';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';
import { fetchData, exerciseOptions } from '../utils/fetchData';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1); //State initializes and is responsible for pages 
  const [exercisesPerPage] = useState(70); 
  const [loading, setLoading] = useState(false); // Initialize loading state

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching data

        let apiUrl = 'https://exercisedb.p.rapidapi.com/exercises';
        if (bodyPart === 'all' || bodyPart === '') {
          apiUrl += `?limit=1300`; 
        } else {
          apiUrl += `/bodyPart/${bodyPart}?limit=1300`; 
        }

        const exercisesData = await fetchData(apiUrl, exerciseOptions);
        setExercises(exercisesData);// Updates state to include fetched data 
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false); // Set loading state to false after fetching data ( gets rid of spinning component )
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  // Renders the loader component when seatching 
  if (loading) {
    return <Loader />; //circle spinny component 
  }

  return (
    <div id="exercises">
      <h4 className="exercises-title">Exercises</h4>
      
      <div className="exercises-stack">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>

      <div className="pagination-container">
        {exercises.length > exercisesPerPage && (
          <ul className="pagination">
            {Array.from({ length: Math.ceil(exercises.length / exercisesPerPage) }).map((_, index) => (
              <li
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={(event) => paginate(event, index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Exercises;
