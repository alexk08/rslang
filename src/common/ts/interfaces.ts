export interface WordsProps {
  id: string;
  group: string | number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  deletedWord: boolean;
  hardWord: boolean;
  corrects: number;
  errorsCount: number;
}

export interface GameProps {
  group: string | number,
  page?: number,
}
