import { Dog } from '../../services/api';

// Action Types
export const SET_DOG_OF_THE_DAY = 'SET_DOG_OF_THE_DAY';
export const SET_DOGS_OF_THE_DAY = 'SET_DOGS_OF_THE_DAY';
export const CLEAR_DOG_OF_THE_DAY = 'CLEAR_DOG_OF_THE_DAY';
export const SET_LAST_FETCH_DATE = 'SET_LAST_FETCH_DATE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

// Simple Action Creators
export const setDogOfTheDay = (dog: Dog) => ({
  type: SET_DOG_OF_THE_DAY,
  payload: dog,
});

export const setDogsOfTheDay = (dogs: Dog[]) => ({
  type: SET_DOGS_OF_THE_DAY,
  payload: dogs,
});

export const clearDogOfTheDay = () => ({
  type: CLEAR_DOG_OF_THE_DAY,
});

export const setLastFetchDate = (date: string) => ({
  type: SET_LAST_FETCH_DATE,
  payload: date,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: string | null) => ({
  type: SET_ERROR,
  payload: error,
});

// Helper function to check if we need to fetch a new dog of the day
export const shouldFetchNewDogOfTheDay = (lastFetchDate: string | null): boolean => {
  if (!lastFetchDate) return true;
  
  const lastFetch = new Date(lastFetchDate);
  const today = new Date();
  
  // Reset time to compare only dates
  lastFetch.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  return lastFetch < today;
};

// Helper function to get today's date as ISO string
export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
};