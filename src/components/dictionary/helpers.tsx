import { WordsProps } from "../../common/ts/interfaces";

const getCategoryWordsAmount = (
  hardWords: WordsProps[],
  deletedWords: WordsProps[],
  learningWords: WordsProps[],
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
      const learningWordsWithoutDeleted = learningWords.filter(
        ({ id }) => deletedWords.findIndex((word) => word.id === id) !== -1
      );
      return learningWordsWithoutDeleted.length;

    default:
      return 0;
  }
};

export { getCategoryWordsAmount };
