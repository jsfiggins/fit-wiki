import React, { useEffect, useState } from 'react';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';
import { fetchData, exerciseOptions } from '../utils/fetchData';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(100);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        setLoading(true);

        let apiUrl = 'https://exercisedb.p.rapidapi.com/exercises';
        if (bodyPart === 'all' || bodyPart === '') {
          apiUrl += `?limit=800`;
        } else {
          apiUrl += `/bodyPart/${bodyPart}?limit=800`;
        }

        const exercisesData = await fetchData(apiUrl, exerciseOptions);
        setExercises(exercisesData);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  // Determine which page numbers to display
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);
  const maxPagesToShow = 5; // Maximum number of pages to display at once
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2));

  // Adjust start and end page if near the boundaries
  if (endPage - startPage + 1 < maxPagesToShow) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div id="exercises">
      <h4 className="exercises-title">Exercises</h4>
      
      <div className="exercises-grid">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>

      <div className="pagination-container">
        {totalPages > 1 && (
          <ul className="pagination">
            {startPage > 1 && (
              <>
                <li onClick={() => paginate(1)}>1</li>
                {startPage > 2 && <li>...</li>}
              </>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
              <li
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => paginate(page)}
              >
                {page}
              </li>
            ))}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <li>...</li>}
                <li onClick={() => paginate(totalPages)}>{totalPages}</li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Exercises;
