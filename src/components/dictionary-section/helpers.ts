import { WordsProps } from "../../common/ts/interfaces";
import { checkTypeOfWord } from "../../data/utils";

const getWordsAmountInGroup = (
  wordsType: string,
  groupId: number,
  hardWords: WordsProps[],
  deletedWords: WordsProps[],
  allWords: WordsProps[]
) => {
  switch (wordsType) {
    case "hard":
      const hardWordsInGroup =
        hardWords.filter(({ group, id }) => {
          const isWordDeleted = checkTypeOfWord(id, deletedWords);
          return group === groupId && !isWordDeleted;
        });

      return hardWordsInGroup.length;

    case "deleted":
      const deletedWordsInGroup = deletedWords.filter(({ group }) => group === groupId);
      return deletedWordsInGroup.length;

    case "learning":
      const learningWordsInGroup = 
        allWords.filter(({ corrects, errorsCount, id, group }) => {
          const isHardWord = checkTypeOfWord(id, hardWords);
          const isDeletedWord = checkTypeOfWord(id, deletedWords);
          const isLearningWord = (corrects || errorsCount || isHardWord);
          return group === groupId && isLearningWord && !isDeletedWord;
        });

      return learningWordsInGroup.length;

    default:
      return 0;
  }
};

export { getWordsAmountInGroup };