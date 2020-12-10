// Set up Data layer
import React, { createContext, useContext, useReducer } from 'react';

// This is the Data layer
export const StateContext = createContext();

// Wrap our app and provide a Data layer
export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// This is how we use it inside of a component
// Pull data from the Data layer
export const useStateValue = () => useContext(StateContext);
