// store.js
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import breedReducer from './reducers';

const store = createStore(breedReducer, composeWithDevTools());

export default store;
