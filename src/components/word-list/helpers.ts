import { WordsProps } from "../../common/ts/interfaces";
import { WORDS_ON_PAGE } from "../../data";
import { checkTypeOfWord } from "../../data/utils";

const getGroupWordsPerPage = (
  wordsType: string,
  group: number,
  hardWords: WordsProps[],
  deletedWords: WordsProps[],
  allWords: WordsProps[]
) => {
  switch (wordsType) {
    case "hard":
      return getGroupHardWordsPerPages(hardWords, deletedWords, group);
    case "deleted":
      return getGroupDeletedWordsPerPages(deletedWords, group);
    case "learning":
      return getGroupLearningWordsPerPage(allWords, hardWords, deletedWords, group);
    default:
      return
  }
};

const getGroupHardWordsPerPages = (
  hardWords: WordsProps[],
  deletedWords: WordsProps[],
  group: number
) => {

  const groupHardWords: WordsProps[] = hardWords.filter(
    (item: WordsProps) => {
      const isWordDeleted = checkTypeOfWord(item.id, deletedWords);
      return item.group === group - 1 && !isWordDeleted;
    });

  let pagesHardWord: any[] = [];
  let wordsOnPage: any[] = [];

  groupHardWords.forEach((item, index) => {
    if (index % WORDS_ON_PAGE > 0) {
      wordsOnPage.push(item);
    } else {
      if (wordsOnPage.length !== 0) {
        pagesHardWord.push(wordsOnPage);
      }
      wordsOnPage = [];
      wordsOnPage.push(item);
    }

    if (index === groupHardWords.length - 1 && wordsOnPage.length !== 0) {
      pagesHardWord.push(wordsOnPage);
    }
  });

  return pagesHardWord;
};

const getGroupDeletedWordsPerPages = (
  deletedWords: WordsProps[],
  group: number
) => {
  const groupDeletedWords: WordsProps[] = deletedWords.filter(
    (item: WordsProps) => item.group === group - 1
  );

  return groupDeletedWords.reduce(
    (prev: any[], cur: WordsProps, index: number, array: WordsProps[]) =>
      !(index % WORDS_ON_PAGE)
        ? prev.concat([array.slice(index, index + WORDS_ON_PAGE)])
        : prev,
    []
  );
};

const getGroupLearningWordsPerPage = (
  allWords: WordsProps[],
  hardWords: WordsProps[],
  deletedWords: WordsProps[],
  groupId: number
) => {
  const groupLearningWords: WordsProps[] = allWords.filter(
    ({ corrects, errorsCount, id, group }) => {
      const isHardWord = checkTypeOfWord(id, hardWords);
      const isDeletedWord = checkTypeOfWord(id, deletedWords);
      const isLearningWord = (corrects || errorsCount || isHardWord);

      return group === groupId - 1 && isLearningWord && !isDeletedWord;
    });

  return groupLearningWords.reduce(
    (prev: any[], cur: WordsProps, index: number, array: WordsProps[]) =>
      !(index % WORDS_ON_PAGE)
        ? prev.concat([array.slice(index, index + WORDS_ON_PAGE)])
        : prev,
    []
  );
}

export { getGroupWordsPerPage };
