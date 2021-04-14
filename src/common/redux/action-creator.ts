import { getData } from "../../data/service";
import { WordsProps } from "../ts/interfaces";

const ActionCreator = {
  getWords: () => (dispatch: any): void => {
    getData().then((data: WordsProps[]) => {
      dispatch({
        type: `SET_WORDS`,
        payload: data,
      });
    });
  },

  addHardWord: (word: WordsProps) => ({
    type: `ADD_HADR_WORD`,
    payload: word,
  }),

  removeHardWord: (id: string) => ({
    type: `REMOVE_HARD_WORD`,
    payload: id,
  }),

  addDeletedWord: (word: WordsProps) => ({
    type: `ADD_DELETED_WORD`,
    payload: word,
  }),

  addLearningWord: (word: WordsProps) => ({
    type: `ADD_LEARNING_WORD`,
    payload: word,
  }),
};

export { ActionCreator };
