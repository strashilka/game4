import { FeedbackColors, ItemColors, randomColor } from 'views/ColorItem/ItemColors';
import {
  createEntityAdapter, createSelector, createSlice, EntityAdapter, PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from './store';
import { GameStatus } from './storeData';

export type ItemPosition = {
  x:number,
  y:number
}

type GameState = {
  startTime: number,
  endTime: number,
  status:GameStatus,
  openItem: ItemPosition,
  question: Array<ItemColors>,
  answers: Array<Array<ItemColors>>
  feedback: Array<Array<FeedbackColors>>
}

const gameAdapter :EntityAdapter<ItemColors> = createEntityAdapter();
export const { selectAll: selectAllUsers } = gameAdapter.getSelectors(
  (state:RootState) => state.game,
);

const initialState = gameAdapter.getInitialState({
  startTime: 0,
  endTime: 0,
  status: GameStatus.Idle,
  openItem: { x: -1, y: -1 },
  question: [],
  answers: [],
  feedback: [],
} as GameState);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startNewGame: (state) => {
      // save previousGame
      state.startTime = Date.now();
      state.status = GameStatus.Online;
      state.answers = [];

      const questions : Array<ItemColors> = [];
      let color:ItemColors;
      for (let i = 0; i < 4; i += 1) {
        do {
          color = randomColor();
        } while (questions.includes(color));
        questions.push(color);
      }

      state.question = questions;

      state.answers = [];
      state.feedback = [];
      state.answers[0] = new Array(4).fill(ItemColors.None);
      state.feedback[0] = new Array(4).fill(FeedbackColors.None);

      console.log(`Start new game with colors: ${questions.toString()}`);
    },

    setAnswerColor: (state, action:PayloadAction<ItemColors>) => {
      state.answers[state.openItem.y][state.openItem.x] = action.payload;
      state.openItem = { x: -1, y: -1 };
    },

    setOpenItem: (state, action:PayloadAction<ItemPosition>) => {
      state.openItem = action.payload;
    },

    closeItem: (state) => {
      state.openItem = { x: -1, y: -1 };
    },

    checkLastRow: (state) => {
      const lastRowIndex = state.answers.length - 1;
      const row = state.answers[lastRowIndex];
      const { question } = state;

      const availableItemCount = new Set(row).size;
      if (availableItemCount !== 4) {
        alert('Проверьте правильность заполнения ответа (без дублей, без пропусков)');
        return;
      }

      const intersectedItemsCount = row.filter((value) => question.includes(value)).length;

      let positionedItemsCount = 0;
      for (let i = 0; i < 4; i += 1) {
        // console.log(`${row[i]}  ${question[i]}`);
        if (row[i] === question[i])positionedItemsCount += 1;
      }

      const feedback = [];
      for (let i = 0; i < 4; i += 1) {
        if (i < positionedItemsCount) feedback[i] = FeedbackColors.ColorPosition;
        else if (i < intersectedItemsCount) feedback[i] = FeedbackColors.Color;
        else feedback[i] = FeedbackColors.None;
      }
      state.feedback[lastRowIndex] = feedback;

      if (positionedItemsCount === 4) {
        state.status = GameStatus.Victory;
        state.endTime = Date.now();
        return;
      }

      state.answers[lastRowIndex + 1] = new Array(4).fill(ItemColors.None);
      state.feedback[lastRowIndex + 1] = new Array(4).fill(FeedbackColors.None);
    },
  },
});

export const {
  startNewGame, setAnswerColor, setOpenItem, closeItem, checkLastRow,
} = gameSlice.actions;

const selectSelf = (state: RootState) => state.game;
export const selectGameStatus = createSelector(
  selectSelf,
  (state:GameState) => state.status,
);

export const selectMovesCount = createSelector(
  selectSelf,
  (state:GameState) => state.answers.length,
);

export const selectGameDuration = createSelector(
  selectSelf,
  (state:GameState) => Math.trunc((state.endTime - state.startTime) / 1000),
);

export const selectAnswers = createSelector(
  selectSelf,
  (state:GameState) => state.answers,
);

export const getAnswersByRowNumber = (row:number) => createSelector(
  selectSelf,
  (state:GameState) => state.answers[row],
);

export const selectFeedbackByRowNumber = (row:number) => createSelector(
  selectSelf,
  (state:GameState) => state.feedback[row],
);

export const isRowDisabled = (row:number) => createSelector(
  selectSelf,
  (state:GameState) => row < (state.answers.length - 1) || state.status === GameStatus.Victory,
);

export const selectOpenItem = createSelector(
  selectSelf,
  (state: GameState) => state.openItem,
);

export const selectItemColor = (position:ItemPosition) => createSelector(
  selectSelf,
  (state: GameState) => state.answers[position.y][position.x],
);
