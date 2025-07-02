'use client'

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import storyReducer from '../features/story/storySlice'
import { loadState } from "./browserStorage";

const reducers = combineReducers({
    story: storyReducer
})

export const store = configureStore({
  devTools: true,
  reducer: reducers,
  // here we restore the previously persisted state
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch; 