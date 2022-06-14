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
import { GameStatus } from './storeData';
import { RootState } from './store';

export type ItemPosition = {
  x: number;
  y: number;
};

export type GameState = {
  startTime: number;
  endTime: number;
  status: GameStatus;
  openItem: ItemPosition;
  message: string;
  question: ItemColorWithId[];
  answers: ItemColorWithId[][];
  feedback: FeedbackColorWithId[][];
};

const gameAdapter: EntityAdapter<ItemColorWithId> = createEntityAdapter<ItemColorWithId>();

const initialState = gameAdapter.getInitialState<GameState>({
  startTime: 0,
  endTime: 0,
  status: GameStatus.Idle,
  openItem: { x: -1, y: -1 },
  message: null,
  question: [],
  answers: [],
  feedback: []
} as GameState);

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startNewGame: (state) => {
      // TODO: save  previousGame
      state.startTime = Date.now();
      state.status = GameStatus.Online;
      state.answers = [];

      const questions: Array<ItemColorWithId> = [];

      for (let i = 0; i < 4; i += 1) {
        let color: ItemColors;
        let duplicateColor = false;

        do {
          duplicateColor = false;
          color = randomColor();
          for (let j = 0; j < questions.length; j += 1) {
            if (questions[j].color === color) {
              duplicateColor = true;
            }
          }
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
      // eslint-disable-next-line no-console
      console.log(`Start new game with colors : ${cl.toString()}`);
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
        state.message = 'Проверьте правильность заполнения ответа (без дублей, без пропусков)';
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
    },

    closeMessage: (state) => {
      state.message = null;
    }
  }
});

export const { startNewGame, setAnswerColor, setOpenItem, closeItem, checkLastRow, closeMessage } =
  gameSlice.actions;

const selectGameState = (state: RootState) => state.game;
export const selectGameStatus = createSelector(selectGameState, (state: GameState) => {
  return state.status;
});
export const selectMovesCount = createSelector(
  selectGameState,
  (state: GameState) => state.answers.length
);

export const selectGameDuration = createSelector(selectGameState, (state: GameState) =>
  Math.trunc((state.endTime - state.startTime) / 1000)
);

export const selectAnswer = createSelector(selectGameState, (state: GameState) => state.answers);
const selectAnswerUtility = (state: RootState) => state.game.answers;
export const selectAnswerByRow = createSelector(
  [selectAnswerUtility, (state: RootState, row: number) => row],
  (answer, row) => answer[row]
);

export const selectQuestions = createSelector(
  selectGameState,
  (state: GameState) => state.question
);

const selectPosition = (state: RootState, position: ItemPosition) => position;

const selectFeedbackUtility = (state: RootState) => state.game.feedback;
export const selectFeedbackByRow = createSelector(
  [selectFeedbackUtility, (state: RootState, row: number) => row],
  (feedback, row) => feedback[row]
);

const selectStatus = (state: RootState) => state.game.status;
export const isRowDisabled = createSelector(
  [selectAnswerUtility, selectStatus, (state: RootState, row: number) => row],
  (answer, status, row) => row < answer.length - 1 || status === GameStatus.Victory
);

export const selectOpenItem = createSelector(
  [selectGameState],
  (state: GameState) => state.openItem
);
export const selectItemColor = createSelector(
  [selectAnswerUtility, selectPosition],
  (answer, position) => answer[position.y][position.x].color
);

export const selectMessage = createSelector(selectGameState, (state: GameState) => state.message);
