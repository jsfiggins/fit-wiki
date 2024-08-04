import React, { useState,useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Exercises from './components/Exercises';
import NewDetail from './components/pages/NewDetail';
import SearchExercises from './components/SearchExercises';
import { ExerciseContext } from './components/ExerciseContext';

const App = () => {
  
  const {exercises,setExercises}=useContext(ExerciseContext) // Allows whole app access to exercises and functions to update them 
  const [bodyPart, setBodyPart] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/exercises" element ={<Exercises
                    exercises={exercises}
                    setExercises={setExercises}
                    bodyPart={bodyPart}
                    loading={loading} // Pass loading state to Exercises
                />} />
        <Route path="/exercise/:id" element={<NewDetail />} />

        <Route path="/exercises/bodyPart" element={ <SearchExercises  //only shows up when an exercise is searched now !
                    setExercises={setExercises}
                    exercises={exercises}
                    bodyPart={bodyPart}
                    setBodyPart={setBodyPart}
                    setLoading={setLoading} // Pass setLoading to SearchExercises
                />} />
       
      </Routes>
      <Footer />
    </>

  );
};

export default App;


//Each component updates local state and updates the shared context. Consistent exercise data 