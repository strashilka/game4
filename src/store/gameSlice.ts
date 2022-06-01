import {
  FeedbackColors,
  FeedbackColorWithId,
  ItemColors,
  ItemColorWithId,
  randomColor
} from 'views/ColorItem/ItemColors';
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityAdapter,
  PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from './store';
import { GameStatus } from './storeData';

export type ItemPosition = {
  x: number;
  y: number;
};

type GameState = {
  startTime: number;
  endTime: number;
  status: GameStatus;
  openItem: ItemPosition;
  question: Array<ItemColorWithId>;
  answers: Array<Array<ItemColorWithId>>;
  feedback: Array<Array<FeedbackColorWithId>>;
};

const gameAdapter: EntityAdapter<ItemColorWithId> = createEntityAdapter();

const initialState = gameAdapter.getInitialState({
  startTime: 0,
  endTime: 0,
  status: GameStatus.Idle,
  openItem: { x: -1, y: -1 },
  question: [],
  answers: [],
  feedback: []
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

      const questions: Array<ItemColorWithId> = [];

      for (let i = 0; i < 4; i += 1) {
        let color: ItemColors;
        let duplicateColor = true;

        do {
          color = randomColor();
          // eslint-disable-next-line no-loop-func
          duplicateColor = questions.some((q) => q.color === color);
        } while (duplicateColor);

        questions[i] = { id: i, color };
      }

      state.question = questions;

      state.answers = [];
      state.feedback = [];
      state.answers[0] = [];
      state.feedback[0] = [];

      for (let i = 0; i < 4; i += 1) {
        state.answers[0][i] = { id: i, color: ItemColors.None };
        state.feedback[0][i] = { id: i, color: FeedbackColors.None };
      }

      const cl = questions.map((q) => q.color);
      console.log(`Start new game with colors: ${cl.toString()}`);
    },

    setAnswerColor: (state, action: PayloadAction<ItemColors>) => {
      state.answers[state.openItem.y][state.openItem.x].color = action.payload;
      state.openItem = { x: -1, y: -1 };
    },

    setOpenItem: (state, action: PayloadAction<ItemPosition>) => {
      state.openItem = action.payload;
    },

    closeItem: (state) => {
      state.openItem = { x: -1, y: -1 };
    },

    checkLastRow: (state) => {
      const lastRowIndex = state.answers.length - 1;
      const row = state.answers[lastRowIndex];
      const { question } = state;

      const availableItem: Array<ItemColors> = [];
      row.forEach((item) => {
        if (!availableItem.includes(item.color) && item.color !== ItemColors.None)
          availableItem.push(item.color);
      });
      const availableItemCount = availableItem.length;
      if (availableItemCount !== 4) {
        alert('Проверьте правильность заполнения ответа (без дублей, без пропусков)');
        return;
      }

      const intersectedItemsCount = row.filter((value) =>
        question.some((q) => q.color === value.color)
      ).length;

      let positionedItemsCount = 0;
      for (let i = 0; i < 4; i += 1) {
        if (row[i].color === question[i].color) positionedItemsCount += 1;
      }
      const feedback: Array<FeedbackColorWithId> = [];
      for (let i = 0; i < 4; i += 1) {
        feedback[i] = { id: i, color: FeedbackColors.None };
        if (i < positionedItemsCount) feedback[i].color = FeedbackColors.ColorPosition;
        else if (i < intersectedItemsCount) feedback[i].color = FeedbackColors.Color;
      }

      state.feedback[lastRowIndex] = feedback;

      if (positionedItemsCount === 4) {
        state.status = GameStatus.Victory;
        state.endTime = Date.now();
        return;
      }

      state.answers[lastRowIndex + 1] = [];
      state.feedback[lastRowIndex + 1] = [];

      for (let i = 0; i < 4; i += 1) {
        state.answers[lastRowIndex + 1][i] = { id: i, color: ItemColors.None };
        state.feedback[lastRowIndex + 1][i] = { id: i, color: FeedbackColors.None };
      }
    }
  }
});

export const { startNewGame, setAnswerColor, setOpenItem, closeItem, checkLastRow } =
  gameSlice.actions;

const selectSelf = (state: RootState) => state.game;
export const selectGameStatus = createSelector(selectSelf, (state: GameState) => state.status);

export const selectMovesCount = createSelector(
  selectSelf,
  (state: GameState) => state.answers.length
);

export const selectGameDuration = createSelector(selectSelf, (state: GameState) =>
  Math.trunc((state.endTime - state.startTime) / 1000)
);

export const selectAnswers = createSelector(selectSelf, (state: GameState) => state.answers);

export const getAnswersByRowNumber = (row: number) =>
  createSelector(selectSelf, (state: GameState) => state.answers[row]);

export const selectQuestions = createSelector(selectSelf, (state: GameState) => state.question);

export const selectFeedbackByRowNumber = (row: number) =>
  createSelector(selectSelf, (state: GameState) => state.feedback[row]);

export const isRowDisabled = (row: number) =>
  createSelector(
    selectSelf,
    (state: GameState) => row < state.answers.length - 1 || state.status === GameStatus.Victory
  );

export const selectOpenItem = createSelector(selectSelf, (state: GameState) => state.openItem);

export const selectItemColor = (position: ItemPosition) =>
  createSelector(selectSelf, (state: GameState) => state.answers[position.y][position.x].color);
