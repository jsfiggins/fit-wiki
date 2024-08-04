
import React, { createContext, useState } from 'react';

export const ExerciseContext = createContext();

const ExerciseContextProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);  //that way the actaul exercises stay in state and are accesible from every file in the context providers 

  

  return (
    <ExerciseContext.Provider value={{ exercises, setExercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseContextProvider;