import React, {useState} from "react";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import {Crumbs} from "../../common/navigation/crumbs";
import {titleGames} from "../../data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  Legend,
  CartesianAxis,
  LineChart,
  CartesianGrid,
  Line
} from 'recharts';

interface StatisticsProps {
  isAuth: boolean,
}

interface StatisticsCardsProps {
  name: string,
  isGame: boolean
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({name, isGame}) => {
  return (
    <div>
      <p className='statistics__title'>{name}</p>
      <div className='statistics__cards'>
        <div>Изучено слов</div>
        <div>Правильные ответы</div>
        {isGame && <div>Лучшая серия</div>}
      </div>
    </div>
  )
};

const StatisticsRedux: React.FC<StatisticsProps> = ({isAuth}) => {
  const location = useLocation();
  const [nameGame, setNameGame] = useState('');
  const data = [
    {name: 'Page A', uv: 400, pv: 2400},
    {name: 'Page B', uv: 300, pv: 4567},
    {name: 'Page C', uv: 300, pv: 1398},
    {name: 'Page D', uv: 200, pv: 9800},
    {name: 'Page E', uv: 278, pv: 3908},
    {name: 'Page F', uv: 189, pv: 4800}];

  return (
    <>
      <Crumbs path={location.pathname}/>
      <div className='statistics'>
        <div className=''>
          <StatisticsCards name='Ваш прогресс на сегодня' isGame={false}/>
        </div>
        <div className='tutorial__icons'>
          {
            titleGames.map((item, index) => {
              return (
                <div className={`game__icon game__icon--${index + 1}`} onClick={() => setNameGame(item.name)}>
                  <img src={item.iconUrl} alt={item.iconUrl} title={item.name} className='tutorial__icon'/>
                </div>
              )
            })
          }
        </div>
        {nameGame && <StatisticsCards name={nameGame} isGame/>}
        {isAuth &&
        <div className='diagramms'>
          <LineChart
            width={400}
            height={400}
            data={data}
            margin={{top: 20, right: 20, left: 10, bottom: 20}}
          >
            <XAxis dataKey="name"/>
            <Tooltip/>
            <CartesianGrid stroke="#f5f5f5"/>
            <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0}/>
          </LineChart>
          <LineChart
            width={400}
            height={400}
            data={data}
            margin={{top: 20, right: 20, left: 10, bottom: 20}}
          >
            <XAxis dataKey="name"/>
            <Tooltip/>
            <CartesianGrid stroke="#f5f5f5"/>
            <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1}/>
          </LineChart>
        </div>}
      </div>
    </>
  )
};

const mapStateToProps = (state: any) => ({
  isAuth: state.login.isAuth,
});

const Statistics = connect(mapStateToProps)(StatisticsRedux);

export {Statistics};