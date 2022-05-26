import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './gameSlice';
import { resultSlice } from './resultSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    result: resultSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {Posts: PostsState, CommentsList: CommentsState, UsersList: UsersState}
export type AppDispatch = typeof store.dispatch;
