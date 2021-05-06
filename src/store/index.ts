import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import movies, { State as MovieState } from './movies/reducers';

export interface RootState {
  movies: MovieState;
}

export default createStore(
  combineReducers<RootState>({
    movies,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);
