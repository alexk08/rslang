import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StatisticsProps, GameStatisticDailyProps} from '../../common/ts/interfaces';
import {getStatistics} from '../../data';
import Chart from "react-google-charts";

interface ShortStatisticsProps {
  user: any;
  correct?: number;
  error?: number;
  seriesLength?: number;
}

const emptyStatistic: GameStatisticDailyProps = {
  data: '',
  learningWords: [],
  winStreak: 0,
  generalCountLearningWords: 0,
  countRightAnswers: 0,
}

let statisticBack: StatisticsProps;

const LongStatisticsRedux: React.FC<ShortStatisticsProps> = ({user}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getStatistics(user).then((res: any) => {
      statisticBack = res.statistics || res;
      setLoading(false);
    });
  }, []);

  const getCommonWords = (set: Set<any>, arr: GameStatisticDailyProps[]) => {
    const summaryWords: any[] = Array.from(set);
    arr.forEach(dayData => summaryWords.push(...dayData.learningWords));
    return new Set(summaryWords);
  }

  const getCountWords = (arr: GameStatisticDailyProps[]) => {
    const summaryWords: any[] = [];
    arr.forEach(dayData => summaryWords.push(...dayData.learningWords));
    return new Set(summaryWords).size;
  }

  const getLongStatisticData = () => {
    const data: GameStatisticDailyProps[] = []
    for (let game in statisticBack) {
      statisticBack[game as keyof StatisticsProps].forEach(dayData => data.push(dayData));
    }
    const dates = new Set<any>();
    data.forEach(dayData => dates.add(dayData.data));
    const datesArr: any[] = Array.from(dates);
    datesArr.sort();
    let wordsCommon = new Set<any>();
    const countWordsCommon: number[] = [];
    datesArr.forEach((date) => {
      wordsCommon = getCommonWords(wordsCommon, data.filter(dayData => date === dayData.data));
      countWordsCommon.push(wordsCommon.size);
    });
    const countWordsDaily: number[] = [];
    for (let i = 0; i < countWordsCommon.length; i += 1) {
      const daily = i ? countWordsCommon[i] - countWordsCommon[i - 1] : countWordsCommon[i];
      countWordsDaily.push(daily);
    }
    const dataChartCommon: [any, number][] = datesArr.map(date => {
      return [date, getCountWords(data.filter(dayData => date === dayData.data))]
    });

    const dataChart = datesArr.map((date, index) => [date, countWordsCommon[index], countWordsDaily[index]]);
    let dataChartCommonDaily = dataChartCommon;
    const dataChartCommonCount: number[] = dataChartCommon.map(data => data[1]);
    for (let i = 0; i < dataChartCommonCount.length; i += 1) {
      const daily = i ? dataChartCommonCount[i] - dataChartCommonCount[i - 1] : dataChartCommonCount[i];
      dataChartCommonDaily[i].push(daily);
    }
    return dataChart;
  }

  return (
    <React.Fragment>
      <div className='long-statistic' >
        <p className='long-statistic__title'>Долгосрочная статистика</p>
        <div className='long-statistic__body'>
          {loading ?
            <span>Сейчас посчитаем</span> :
            <React.Fragment>
              <Chart
                width={'100%'}
                height={450}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Количество изучаемых слов', 'общее', 'новых слов'],
                  ...getLongStatisticData()
                ]}
                options={{
                  //title: 'Долгосрочная статистика',
                  legend: {position: 'bottom', maxLines: 3},
                  chartArea: {width: '60%'},
                  hAxis: {
                    //title: 'Даты',
                    minValue: 0,
                  },
                  vAxis: {
                    //title: 'Количество изучаемых слов',
                  },
                }}
                legendToggle
              />
            </React.Fragment>}
        </div>
      </div>
    </React.Fragment>)
};

const mapStateToProps = (state: any) => ({
  user: state.login.user,
});

const LongStatistics = connect(mapStateToProps)(LongStatisticsRedux);

export {LongStatistics};