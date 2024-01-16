/* eslint-disable import/no-unresolved */
import { loadingBarReducer } from 'react-redux-loading-bar';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/reducer';
import authUserReducer from './authUser/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import threadsReducer from './threads/reducer';
import detailThreadReducer from './detailThread/reducer';
import isPreloadReducer from './isPreload/reducer';
import categoriesReducer from './categories/reducer';

const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    users: usersReducer,
    authUser: authUserReducer,
    leaderboards: leaderboardsReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    categories: categoriesReducer,
  },
});

export default store;
