import { DogOfTheDayState } from './reducers';

const STORAGE_KEY = 'dogOfTheDay_state';

// Save state to localStorage
export const saveDogOfTheDayState = (state: DogOfTheDayState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Error saving dog of the day state to localStorage:', error);
  }
};

// Load state from localStorage
export const loadDogOfTheDayState = (): DogOfTheDayState | null => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading dog of the day state from localStorage:', error);
    return null;
  }
};

// Clear state from localStorage
export const clearDogOfTheDayState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing dog of the day state from localStorage:', error);
  }
};

// Check if the saved state is still valid for today
export const isStateValidForToday = (state: DogOfTheDayState): boolean => {
  if (!state.lastFetchDate) {
    return false;
  }
  
  const lastFetch = new Date(state.lastFetchDate);
  const today = new Date();
  
  // Reset time to compare only dates
  lastFetch.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  return lastFetch.getTime() === today.getTime();
};
