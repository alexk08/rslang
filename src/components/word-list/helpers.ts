import { WordsProps } from "../../common/ts/interfaces";
import { WORDS_ON_PAGE } from "../../data";

const getGroupWordsPerPage = (
  wordsType: string,
  group: number,
  hardWords: WordsProps[],
  deletedWords: WordsProps[]
) => {
  switch (wordsType) {
    case "hard":
      return getGroupHardWordsPerPages(hardWords, deletedWords, group);
    case "deleted":
      return getGroupDeletedWordsPerPages(deletedWords, group);
    case "learning":
      break;

    default:
      break;
  }
};

const getGroupHardWordsPerPages = (
  hardWords: WordsProps[],
  deletedWords: WordsProps[],
  group: number
) => {
  const isDeletedWord = (checkedId: string) =>
    deletedWords.findIndex(({ id }) => id === checkedId) !== -1;

  const groupHardWords: WordsProps[] = hardWords.filter(
    (item: WordsProps) => item.group === group - 1 && !isDeletedWord(item.id)
  );

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

export { getGroupWordsPerPage };
