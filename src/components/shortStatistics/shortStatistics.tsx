import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StatisticsProps, GameStatisticDailyProps} from '../../common/ts/interfaces';
import {titleGames, getStatistics} from '../../data';
import {ResultPercent} from '../games/resultPercent/resultPercent';
import {compareDates} from '../../data/utils'

interface ShortStatisticsProps {
  user: any;
  correct?: number;
  error?: number;
  seriesLength?: number;
  isAuth: boolean;
}

const emptyStatistic: GameStatisticDailyProps = {
  data: '',
  learningWords: [],
  winStreak: 0,
  generalCountLearningWords: 0,
  countRightAnswers: 0,
}

let statisticBack: StatisticsProps;

const ShortStatisticsRedux: React.FC<ShortStatisticsProps> = ({user, isAuth}) => {
const [gameNumber, setGameNumber] = useState<number>(4);
  const [countLearningWords, setCountLearningWords] = useState<number>(0);
  const [error, setError] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [date, setDate] = useState<string>('');
  const [winStreak, setWinStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const titleStatistic = titleGames.concat(
    {
      id: 'summary',
      name: 'Общая статистика',
      iconUrl: '/images/games/stat.png',
      imgUrl: '',
      description: '',
    }
  );

  useEffect(() => {
    getStatistics(user).then((res: any) => {
      statisticBack = res.statistics;
      getSummaryStatistic();
      setLoading(false);
    });
  }, [isAuth]);

  const getLastDay = (arr: GameStatisticDailyProps[]) => {
    return arr.length ? arr[arr.length - 1] : emptyStatistic;
  }

  const getSummaryStatistic = () => {
    const todaySummaryStatistics = [];
    let countAnswer: number = 0;
    let countRightAnswers: number = 0;
    let winStreak: number = 0;
    for (let game in statisticBack) {
      if (!compareDates(getLastDay(statisticBack[game as keyof StatisticsProps]).data))
        todaySummaryStatistics.push(getLastDay(statisticBack[game as keyof StatisticsProps]))
    }
    const summaryLearningWords = new Set<string>();
    todaySummaryStatistics.forEach(game => {
      game.learningWords.forEach(word => summaryLearningWords.add(word));
      if (game.winStreak > winStreak) winStreak = game.winStreak;
      countRightAnswers += game.countRightAnswers;
      countAnswer += game.generalCountLearningWords;
    });
    setWinStreak(winStreak);
    setCountLearningWords(summaryLearningWords.size);
    setCorrect(countRightAnswers);
    setError(countAnswer - countRightAnswers);
  }

  const getGameStatisticLastDay = (index: number): GameStatisticDailyProps => {
    const gameName = titleStatistic[index].id;
    let gameStatistic;
    switch (gameName) {
      case 'sprint':
        gameStatistic = statisticBack ? getLastDay(statisticBack!.sprint) : emptyStatistic;
        break;
      case 'audio':
        gameStatistic = statisticBack ? getLastDay(statisticBack!.audioCall) : emptyStatistic;
        break;
      case 'savannah':
        gameStatistic = statisticBack ? getLastDay(statisticBack!.savannah) : emptyStatistic;
        break;
      case 'constructor':
        gameStatistic = statisticBack ? getLastDay(statisticBack!.constructorWords) : emptyStatistic;
        break;
      default:
        gameStatistic = emptyStatistic;
    }
    return gameStatistic;
  }

  const onChangeGameNumber = (index: number) => {
    setGameNumber(index);
    const gameStatistic = getGameStatisticLastDay(index);
    if (index !== 4) {
      setDate(gameStatistic.data);
      setWinStreak(gameStatistic.winStreak);
      setCountLearningWords(gameStatistic.learningWords.length);
      setCorrect(gameStatistic.countRightAnswers);
      setError(gameStatistic.generalCountLearningWords - gameStatistic.countRightAnswers);
    } else getSummaryStatistic();
  }

  return (
    <React.Fragment>
      <div className='short-statistic'>
        <p className='short-statistic__title'>{titleStatistic[gameNumber].name}</p>
        <div className='short-statistic__body'>
          {loading ?
            <span>Сейчас посчитаем</span> :
            <React.Fragment>
              {gameNumber === 4 ?
                <p className='short-statistic__body__subtitle'>Ваш прогресс на сегодня:</p> :
                <p className='short-statistic__body__subtitle'>Последняя тренровка: {date}</p>
              }
              <p className='short-statistic__body__series'>Самая длинная серия: {winStreak}</p>
              <p className='short-statistic__body__repeat'>Повторено слов: {countLearningWords}</p>
              <ResultPercent error={error} correct={correct}/>
              <div className='short-statistic__body__control'>
                {
                  titleStatistic.map((item, index) => {
                    return (index === gameNumber ?
                        <div
                          className='short-statistic__body__control__item short-statistic__body__control__item--active'
                          key={index}>
                          <img src={item.iconUrl} alt={item.iconUrl} height='60%'/>
                        </div> :
                        <div className='short-statistic__body__control__item' key={index}
                             onClick={() => onChangeGameNumber(index)}>
                          <img src={item.iconUrl} alt={item.iconUrl} height='60%'/>
                        </div>
                    )
                  })
                }
              </div>
            </React.Fragment>}
        </div>
      </div>
    </React.Fragment>)
};

const mapStateToProps = (state: any) => ({
  user: state.login.user,
  isAuth: state.login.isAuth,
});

const ShortStatistics = connect(mapStateToProps)(ShortStatisticsRedux);

export {ShortStatistics};