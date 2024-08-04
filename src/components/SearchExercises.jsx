import React, { useState, useEffect } from 'react';
import HorizontalScrollbar from './HorizontalScrollbar';
import { fetchData, exerciseOptions } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart, setLoading, exercises = [] }) => { //props from App
  const [search, setSearch] = useState(''); // Initialize the search state with an empty string
  const [bodyParts, setBodyParts] = useState([]); // Initialize the bodyParts state with an empty array
  const [searching, setSearching] = useState(false); // Initialize the searching state with false

  // Fetch body parts data from the API and set the bodyParts state
  useEffect(() => {
    const fetchBodyPartsData = async () => {
      try {
        const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
        setBodyParts(['all', ...bodyPartsData]);
      } catch (error) {
        console.error('Failed to fetch body parts data');
      }
    };

    fetchBodyPartsData();
  }, []);

  // Handle search when the user clicks the search button or selects a body part
  const handleSearch = async (bodyPart = search) => {
    if (bodyPart) {
      setSearching(true); // Set searching state to true
      setLoading(true); // Set loading state to true
      try {
        const exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions); //Exercise based on the bodyPart 
        const searchedExercises = exercisesData.filter(
          (item) => item.name.toLowerCase().includes(bodyPart.toLowerCase()) // Ensure case-insensitive search
            || item.target.toLowerCase().includes(bodyPart.toLowerCase())
            || item.equipment.toLowerCase().includes(bodyPart.toLowerCase())
            || item.bodyPart.toLowerCase().includes(bodyPart.toLowerCase())
        );

        setExercises(searchedExercises); // Set exercises state to the searched exercises
        setSearch(''); // Reset the search state to an empty string
      } catch (error) {
        console.error('Failed to fetch exercises data');
      } finally {
        setLoading(false); // Set loading state to false after search is completed
      }
    }
  };

  // Use an empty array as the default value for exercises
  const searchElements = (exercises || []).map(exercise => (
    <ExerciseCard key={exercise.id} exercise={exercise} /> // Use the ExerciseCard component to display filtered results 
  ));

  return (
    <div className="search-container">
      <h1>Exercises By Body Part</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Body Part"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update the search state when the user types in the search input
        />
        <button  onClick={() => handleSearch()}> 
         Search
        </button>
      </div>

      <div className="body-part-container">
        <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} handleSearch={handleSearch} setSearch={setSearch} />
      </div>
      <div className="exercises-container">
        {searchElements}
      </div>
    </div>
  );
};

export default SearchExercises;
