import { ItemColors } from 'views/ColorItem/ItemColors';
import { createEntityAdapter, createSelector, createSlice, EntityAdapter } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GameResult } from './storeData';

type resultState = {
  entities: Array<GameResult>;
};

const resultAdapter: EntityAdapter<ItemColors> = createEntityAdapter();
export const { selectAll: selectAllUsers } = resultAdapter.getSelectors(
  (state: RootState) => state.result
);

const initialState = resultAdapter.getInitialState({
  entities: []
} as resultState);

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {}
});

const selectSelf = (state: RootState) => state;
export const selectGameStatus2 = createSelector(selectSelf, (state: RootState) => state.result);

/**
 * наверное ненужный слайс раз ничего не используется
 * это заглушка =) пусть останется
 */
