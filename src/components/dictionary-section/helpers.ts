import { WordsProps } from "../../common/ts/interfaces";

const checkForDeletedWords = (checkedId: string, deletedWords: WordsProps[]) =>
  deletedWords.findIndex(({ id }) => id === checkedId) !== -1;

const getWordsAmountInGroup = (
  wordsType: string,
  groupId: number,
  hardWords: WordsProps[],
  deletedWords: WordsProps[],
  learningWords: WordsProps[]
) => {
  switch (wordsType) {
    case "hard":
      const hardWordsInGroup =
        hardWords.filter(({ group, id }) => {
          const isWordDeleted = checkForDeletedWords(id, deletedWords);
          return group === groupId && !isWordDeleted;
        });

      return hardWordsInGroup.length;

    case "deleted":
      const deletedWordsInGroup = deletedWords.filter(({ group }) => group === groupId);
      return deletedWordsInGroup.length;

    case "learning":
      break;
  }
};

export { getWordsAmountInGroup };