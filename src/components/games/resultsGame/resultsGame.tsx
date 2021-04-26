import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { WordsProps } from '../../../common/ts/interfaces';
import { ResultPercent } from '../resultPercent/resultPercent';
import { ResultWordsList } from '../ResultWordsList/resultWordsList';

interface ResultsGameProps {
  correctList: WordsProps[];
  errorList: WordsProps[];
  onClickHandlerNewGame: () => void;
  score?: number;
  seriesLength?: number;
}

const ResultsGame: React.FC<ResultsGameProps> = ({correctList, errorList, onClickHandlerNewGame, score, seriesLength}) => {
  const [listResultsNumber, setListResultsNumber] = useState<number>(0);
  const gameScore = score ? score : correctList.length * 10;
  const gameSeriesLength = seriesLength ? seriesLength : '***'

  const onChangeHandlerPagination = (index: number) => {
    setListResultsNumber(index);
  }

  return (
  <React.Fragment>
    <div className='game-results'>
      <p className='game-results__title'>Твой результат {gameScore} очков</p>
      {
        seriesLength ? <p className='game-results__series-length'>Длина серии: {gameSeriesLength}</p> : null
      }
        { listResultsNumber === 0 ?
          <ResultPercent  error = {errorList.length} correct = {correctList.length}/> :
          <ResultWordsList  errorList = {errorList} correctList ={correctList} />
        }
      <nav className='game-results__nav'>
        <Pagination quantityPages = {2} onChangeHandler = {onChangeHandlerPagination}/>
          <span className='game-results-nav__link' onClick={onClickHandlerNewGame.bind(null, false)}>Продолжить игру</span>
          <NavLink to={`/games`} >
            <span className='game-results-nav__link' onClick={onClickHandlerNewGame.bind(null, false)}>К списку игр</span>
          </NavLink>
      </nav>
    </div>
  </React.Fragment>)
};

export {ResultsGame};


interface PaginationProps {
  onChangeHandler: (index: number) => void;
  quantityPages: number
}

const Pagination: React.FC<PaginationProps> = ({quantityPages, onChangeHandler}) => {
  const pages = new Array(quantityPages).fill(null);
  const [indexPage, setIndex] = useState(0);
  return (
    <div className = 'game-results__nav__pagination'>
    {
      pages.map((item, index) => {
        return (
          <div key = {index} className = 'pagination__item' >
            <input type='radio' name='game' id={`${index}`} value={`${index}`} className='pagination__input'
                   checked = {index === indexPage} onChange ={(e) => {
                     setIndex(index);
                     onChangeHandler(+e.target.value);
                     }} />
            <label className='pagination__label' htmlFor={`${index}`} />
          </div>
        )
      })
    }
  </div>)
}