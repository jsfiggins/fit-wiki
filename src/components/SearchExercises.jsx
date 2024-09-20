import React, { useState, useEffect } from 'react';
import { fetchData, exerciseOptions } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';

const SearchExercises = ({ exercises, setExercises, bodyPart, setBodyPart, setLoading }) => { 
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [searching, setSearching] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(20);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedExercises = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=0', exerciseOptions);
        setExercises(fetchedExercises);
        setAllExercises(fetchedExercises);
        setSearching(false);

        const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
        setBodyParts(['all', ...bodyPartsData]);
      } catch (error) {
        console.error('Failed to fetch data');
      }
    };

    fetchInitialData();
  }, [setExercises]);

  const handleSearch = async (bodyPart = search) => {
    if (bodyPart) {
      setSearching(true);
      setLoading(true);
      try {
        const exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=0`, exerciseOptions);
        setExercises(exercisesData);
        setSearch('');
        setCurrentPage(1);
      } catch (error) {
        console.error('Failed to fetch exercises data');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = searching
    ? exercises.slice(indexOfFirstExercise, indexOfLastExercise)
    : allExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil((searching ? exercises.length : allExercises.length) / exercisesPerPage);

  // Pagination logic to display ellipses for hidden page numbers
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2));

  if (endPage - startPage + 1 < maxPagesToShow) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }
  }

  return (
    <div className="search-container">
      <h1>Search By Body Part</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Body Part"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => handleSearch()}>Search</button>
      </div>
      <div className="body-part-scroll-wrapper">
        <div className="body-part-container">
          {bodyParts.map((part) => (
            <BodyPart
              key={part}
              exercises={exercises}
              item={part}
              setBodyPart={setBodyPart}
              bodyPart={bodyPart}
              handleSearch={handleSearch}
              setSearch={setSearch}
            />
          ))}
        </div>
      </div>

      <div className="exercises-container">
        {currentExercises.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {/* Pagination */}
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

export default SearchExercises;
