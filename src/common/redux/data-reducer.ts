import {WordsProps} from "../ts/interfaces";
import {setData} from "../../data";

interface InitialState {
  words: [];
  hardWords: [];
  deletedWords: [];
  learningWords: [];
}

const initialState: InitialState = {
  words: [],
  hardWords: [],
  deletedWords: [],
  learningWords: [],
};

const reducer = (state: InitialState = initialState, action: any) => {
  switch (action.type) {
    case `SET_WORDS`:

      const hardWords = action.payload.filter(
        (word: WordsProps) => word.hardWord === true
      );

      const deletedWords = action.payload.filter(
        (word: WordsProps) => word.deletedWord === true
      );

      return {
        ...state,
        words: action.payload,
        hardWords: hardWords,
        deletedWords: deletedWords,
      };
    case `ADD_HADR_WORD`:
      setData(action.payload, 'hardWord', true);
      return {
        ...state,
        hardWords: [...state.hardWords, action.payload],
      };
    case `REMOVE_HARD_WORD`:
      const updatedHardWords = state.hardWords.filter((word: any) => {
        if (word.id === action.payload) setData(word, 'hardWord', false);
        return word.id !== action.payload
      });

      return {
        ...state,
        hardWords: updatedHardWords,
      };
    case `ADD_DELETED_WORD`:
      setData(action.payload, 'deletedWord', true);

      return {
        ...state,
        deletedWords: [...state.deletedWords, action.payload],
      };
    case `ADD_LEARNING_WORD`:

      return {
        ...state,
        learningWords: [...state.learningWords, action.payload],
      };
    case `RECOVER_DELETED_WORD`:
      const updatedDeletedWords = state.deletedWords.filter((word: any) => {
        console.log(word.id)
        console.log(action.payload)
        if (word.id === action.payload) setData(word, 'detetedWord', false);
        return word.id !== action.payload
      });
      console.log('pltxm')
      console.log(updatedDeletedWords)

      return {
        ...state,
        deletedWords: updatedDeletedWords,
      };
    default:
      return state;
  }
};

export {reducer};
