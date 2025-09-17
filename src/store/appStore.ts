"use client";

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice'; // Example slice
import notesReducer from './features/notesSlice';
import expenseTrackerReducer from './features/expenseTrackerSlice';
import { STATE_STORAGE_KEY } from '@/services/interfaces';

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

// const preloadedState: any = typeof window !== 'undefined' ? loadState() : undefined;

const loadState = () => {
  if (typeof window !== 'undefined') {
    try {
      const serializedState = localStorage.getItem(STATE_STORAGE_KEY);
      if (serializedState === null) {
        return undefined; // Let the reducer initialize the state
      }
      return JSON.parse(serializedState);
    } catch (e) {
      console.warn("Could not load state from localStorage", e);
      return undefined;
    }
  }
};
const savedState = loadState();
const preloadedState = {
  counter: savedState?.counter,
  notes: savedState?.notes,
  expenseTracker: savedState?.expenseTracker,
};



export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add your reducers here
    notes: notesReducer,
    expenseTracker: expenseTrackerReducer,
  },
  preloadedState,
});

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;

// Add this after store creation
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    saveState(store.getState());
  });
}
