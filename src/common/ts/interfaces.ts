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

export interface GameStatisticDailyProps {
  data: string;
  learningWords: string[];
  winStreak: number;
  generalCountLearningWords: number;
  countRightAnswers: number
}

export interface StatisticsProps {
  constructorWords: GameStatisticDailyProps[];
  savannah: GameStatisticDailyProps[];
  audioCall: GameStatisticDailyProps[];
  sprint: GameStatisticDailyProps[];
}

export interface StatisticBackProps {
  statistics: StatisticsProps,
}