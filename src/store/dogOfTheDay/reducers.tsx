import { Dog } from '../../services/api';

// State Interface
export interface DogOfTheDayState {
  dog: Dog | null;
  lastFetchDate: string | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: DogOfTheDayState = {
  dog: null,
  lastFetchDate: null,
  loading: false,
  error: null,
};

// Action Types
const SET_DOG_OF_THE_DAY = 'SET_DOG_OF_THE_DAY';
const CLEAR_DOG_OF_THE_DAY = 'CLEAR_DOG_OF_THE_DAY';
const SET_LAST_FETCH_DATE = 'SET_LAST_FETCH_DATE';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// Reducer
const dogOfTheDayReducer = (
  state = initialState,
  action: any
): DogOfTheDayState => {
  switch (action.type) {
    case SET_DOG_OF_THE_DAY:
      return {
        ...state,
        dog: action.payload,
        loading: false,
        error: null,
      };
    
    case CLEAR_DOG_OF_THE_DAY:
      return {
        ...state,
        dog: null,
        lastFetchDate: null,
        error: null,
      };
    
    case SET_LAST_FETCH_DATE:
      return {
        ...state,
        lastFetchDate: action.payload,
      };
    
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    
    default:
      return state;
  }
};

export default dogOfTheDayReducer;
