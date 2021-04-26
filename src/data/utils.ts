import { StatisticsProps, WordsProps, GameStatisticDailyProps} from "../common/ts/interfaces";

export const getRandomInteger = (max : number) : number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const getRandomOderArr = (n : number) => {
  let array = getOderArr(n);
  for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getRandomBoolean = () : boolean => {
  return Math.random() < 0.5;
}

const getOderArr = (n : number) => {
  let arr : number[] = [];
  Array(n).fill(1).forEach((item, index) => arr.push(index));
  return arr;
};

export const playAnswer = (answer: boolean, mute: boolean) => {
  const audio = new Audio();
  if (!mute) {
    audio.src = answer ? '/audio/correct.mp3' : '/audio/error.mp3';
    audio.play();
  }
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('ru-RU', {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })
}

export const compareDates = (lastData: string): boolean => {
  //переводим прошлую и текущую даты в формат ИСО
  const lastDateInISO = lastData.split(".").reverse().join("-");
  const todayDateInISO = formatDate(new Date()).split(".").reverse().join("-");
  return new Date(lastDateInISO) < new Date(todayDateInISO);
}

export const updateStatistics =
(game:string, statistic: StatisticsProps, errorList: WordsProps[], correctList: WordsProps[], winSteak: number) => {
  console.log(game, statistic, errorList, correctList, winSteak);
  
  const statisticGame = statistic[game as keyof StatisticsProps];
  console.log(statisticGame);
  let learningWords: string[] = [];
  correctList.forEach(word => learningWords.push(word.word));
  errorList.forEach(word => learningWords.push(word.word));
  const newStatistic: GameStatisticDailyProps = {
    data: formatDate(new Date()),
    learningWords: learningWords,
    winStreak: winSteak,
    generalCountLearningWords: correctList.length + errorList.length,
    countRightAnswers: correctList.length
  }
  if (statisticGame.length) {
    let statisticGameLastDay = statisticGame[statisticGame.length - 1];
    if (!compareDates(statisticGameLastDay.data)) {
      const summaryLearningWords = new Set<string>(newStatistic.learningWords);
      statisticGameLastDay.learningWords.forEach(word => summaryLearningWords.add(word));
      newStatistic.learningWords = Array.from(summaryLearningWords);
      if (newStatistic.winStreak < statisticGameLastDay.winStreak) newStatistic.winStreak = statisticGameLastDay.winStreak;
      newStatistic.generalCountLearningWords += statisticGameLastDay.generalCountLearningWords;
      newStatistic.countRightAnswers += statisticGameLastDay.countRightAnswers;
      statistic[game as keyof StatisticsProps].pop();
    }
  }
  statistic[game as keyof StatisticsProps].push(newStatistic);
  return statistic;
}

const checkTypeOfWord = (checkedId: string, groupWords: WordsProps[]) =>
  groupWords.findIndex(({ id }) => id === checkedId) !== -1;

export {checkTypeOfWord};