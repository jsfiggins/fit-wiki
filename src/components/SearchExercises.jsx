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
        // Fetch all exercises initially with no limit
        const fetchedExercises = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=0', exerciseOptions);
        setExercises(fetchedExercises);
        setAllExercises(fetchedExercises);
        setSearching(false);

        // Fetch body parts data
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
        // Fetch exercises for the specific body part with no limit
        const exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=0`, exerciseOptions);
        setExercises(exercisesData);
        setSearch('');
        setCurrentPage(1); // Reset to the first page after searching
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

  // Pagination Logic
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = searching
    ? exercises.slice(indexOfFirstExercise, indexOfLastExercise)
    : allExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages for exercises
  const totalPages = Math.ceil((searching ? exercises.length : allExercises.length) / exercisesPerPage);

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
      <div className='body-part-scroll-wrapper'>
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
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => paginate(index + 1)}
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

export default SearchExercises;
