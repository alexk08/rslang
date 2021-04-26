import {setDataNewUser} from "../../data/service";
import {WordsProps} from "../ts/interfaces";
import {stateUser} from "./login-reducer";

const ActionCreator = {
  getWords: () => (dispatch: any): void => {
    setDataNewUser().then((data: any) => {
      const auth: boolean = stateUser.isAuth;
      const words = auth ? data[0].words : data;

      dispatch({
        type: `SET_WORDS`,
        payload: words,
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

  recoverDeletedWord: (id: string) => ({
    type: `RECOVER_DELETED_WORD`,
    payload: id
  })
};

export {ActionCreator};
