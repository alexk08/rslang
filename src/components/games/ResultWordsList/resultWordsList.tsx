import React from 'react';
import { WordsProps } from '../../../common/ts/interfaces';
import { AudioWord } from "../audioWords/audioWords";
import './resultWordsList.scss';


interface ResultWordsListProps {
  errorList: WordsProps[];
  correctList: WordsProps[];
}
const ResultWordsList: React.FC<ResultWordsListProps> = ({errorList, correctList}) => {
  return (
    <div className="game__results game__results--list" >
      <h4 className = 'result-list__header result-list__header--error'>{`Ошибок : ${errorList.length}`}</h4>
      {
        errorList.map((word : WordsProps, index : number) => {
          return (
            <div key = {index} className = 'result-list__item'>
              <AudioWord src = {word.audio} />
              <span className = 'result-list__item--bold'>{word.word}</span><span> &#8212; </span><span>{word.wordTranslate}</span>
            </div>
          )
        })
      }
      <h4 className = 'result-list__header result-list__header--correct'>{`Знаю : ${correctList.length}`}</h4>
      {
        correctList.map((word : WordsProps, index : number) => {
          return (
            <div key = {index} className = 'result-list__item'>
              <AudioWord src = {word.audio} />
              <span className = 'result-list__item--bold'>{word.word}</span><span> &#8212; </span><span>{word.wordTranslate}</span>
            </div>
          )
        })
      }
    </div>)
}

export {ResultWordsList};