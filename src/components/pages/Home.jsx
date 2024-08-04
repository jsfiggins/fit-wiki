import React, { useState,useContext } from 'react';
import { ExerciseContext } from '../ExerciseContext';
import HeroBanner from '../HeroBanner';
import SearchExercises from '../SearchExercises';
import Exercises from '../Exercises';

export default function Home() {
   //const [exercises, setExercises] = useState([]);
    // const [bodyPart, setBodyPart] = useState('');
    // const [loading, setLoading] = useState(false); // Add loading state
    //const {exercises,setExercises}=useContext(ExerciseContext)


    return (
        <>

            <div className="homeContainer">
                <HeroBanner />
                {/* <SearchExercises  //only shows up when an exercise is searched now !
                    setExercises={setExercises}
                    exercises={exercises}
                    bodyPart={bodyPart}
                    setBodyPart={setBodyPart}
                    setLoading={setLoading} // Pass setLoading to SearchExercises
                /> */}
                {/* <Exercises
                    exercises={exercises}
                    setExercises={setExercises}
                    bodyPart={bodyPart}
                    loading={loading} // Pass loading state to Exercises
                /> */}
            </div>
        </>
    );
}
