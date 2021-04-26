import { WordsProps } from "../../common/ts/interfaces";
import { checkTypeOfWord } from "../../data/utils";

const getCategoryWordsAmount = (
  hardWords: WordsProps[],
  deletedWords: WordsProps[],
  allWords: WordsProps[],
  wordsType: string
) => {
  switch (wordsType) {
    case "hard":
      const hardWordsWithoutDeleted = hardWords.filter(
        ({ id }) => deletedWords.findIndex((word) => word.id === id) === -1
      );
      return hardWordsWithoutDeleted.length;

    case "deleted":
      return deletedWords.length;

    case "learning":
      const learningWords = allWords.filter(({ corrects, errorsCount, id }) => (corrects || errorsCount || checkTypeOfWord(id, hardWords)) && !checkTypeOfWord(id, deletedWords));
      
      // const learningWordsWithoutDeleted = learningWords.filter(
      //   ({ id }) => deletedWords.findIndex((word) => word.id === id) !== -1
      // );

      // return learningWordsWithoutDeleted.length;
      return learningWords.length;
    default:
      return 0;
  }
};

export { getCategoryWordsAmount };
