import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { NavLink } from 'react-router-dom';
import { WordsProps } from '../../../common/ts/interfaces';
import { getRandomOderArr, getRandomBoolean, getRandomInteger, playAnswer } from '../../../data/utils';
import { Loader } from '../../loader';
import { ResultsGame } from '../resultsGame';
import { connect } from 'react-redux';
import {setData} from '../../../data';

let WORDS_GROUP : WordsProps[];
let WORDS_GAME : WordsProps[];

let indexesWord : number[];
let indexWord : number | undefined;
let indexTranslate : number | undefined;
let round: number = 0;
let series: number = 0;
let seriesMax: number = 0;

let correctList: WordsProps[] = [];
let errorList: WordsProps[] = [];

interface GameSprintProps {
  words: WordsProps[],
  hardWords: WordsProps[],
  group?: number,
  page?: number,
  hard?: string | undefined,
}

const SprintRedux: React.FC<GameSprintProps> = ({words, hardWords, group, page, hard}) => {
  // WORDS_GROUP - массив со словами, используемый в игре (или сложные слова и группа слов)
  const getWordsGroup = () => {
    if (hard) return hardWords;
    return words.filter(item => item.group === group);
  }

  // WORDS_GAME - массив со словами, используемый в игре с учетом номера страницы (сложные слова или игра из меню 
  // соответствует массиву WORDS_GROUP - иначе конкретная страница)
  const getWordsGame = () => {
    if (page !== undefined) return WORDS_GROUP.filter(item => item.page === page - round);
    return WORDS_GROUP;
  }

  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<boolean>(true);
  const [word, setWord] = useState<string>();
  const [wordTranslate, setWordTranslate] = useState<string>();
  const [mute, setMute] = useState<boolean>(false);
  const colorsBase: string[] = ['#51BFA6', '#184656', '#F7CC7E', '#F57359'];
  const colorsNone: string = "rgba(255,255,255,0.37)";
  const [colors, setColors] = useState<string[]>(new Array(4).fill(colorsNone));
  const [increment, setIncrement] = useState<string>('');
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if(words.length) {
      WORDS_GROUP = getWordsGroup();
      WORDS_GAME = getWordsGame();
      console.log(WORDS_GAME);
      indexesWord = getRandomOderArr(WORDS_GAME.length);
      indexWord = indexesWord.pop();
      indexTranslate = getRandomBoolean() ? indexWord : getRandomInteger(WORDS_GAME.length);
      setWord(WORDS_GAME[indexWord!].word);
      setWordTranslate(WORDS_GAME[indexTranslate!].wordTranslate);
    }
  }, [words]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setGameStatus(false)
    }, 60000);
    return () => {
      clearTimeout(timerId);
    };
  }, [gameStatus]);

  useEffect(() => {
    window.addEventListener("keyup", onKeyPressHandler);

    return () => (window as any).removeEventListener("keyup", onKeyPressHandler);

  })
  const onKeyPressHandler = (event: KeyboardEvent) => {
    event.preventDefault();
    if (gameStatus) {
      if (event.key === 'ArrowRight') onClickHandlerGame(true);
      else if (event.key === 'ArrowLeft') onClickHandlerGame(false);
    }
  }

  const getColors = (series: number) => {
    return colorsBase.fill(colorsNone,series);
  }

  const changeBorder = (answer: boolean) => {
    const border = document.querySelector('.sprint-body__field');
    const colorBorder = answer ? 'sprint-body__field--correct' : 'sprint-body__field--error';
    border?.classList.add(colorBorder);
    setTimeout(() => (border?.classList.remove(colorBorder)), 1000);
  }

  const onClickHandlerGame = (answer : boolean) => {
    const correctAnswer : boolean = (indexWord === indexTranslate);
    playAnswer(answer === correctAnswer, mute);
    changeBorder(answer === correctAnswer);
    if (answer === correctAnswer) {
      WORDS_GAME[indexWord!].corrects += 1;
      setData(WORDS_GAME[indexWord!], 'corrects', WORDS_GAME[indexWord!].corrects);
      correctList.push(WORDS_GAME[indexWord!]);
      series += 1;
      seriesMax = (seriesMax < series) ? series : seriesMax;
      setColors(getColors(series));
      setIncrement(`+${Math.min(series * 20, 80)}`);
      setScore(score + Math.min(series * 20, 80));
    } else {
      WORDS_GAME[indexWord!].errorsCount += 1;
      setData(WORDS_GAME[indexWord!], 'errorsCount', WORDS_GAME[indexWord!].errorsCount);
      errorList.push(WORDS_GAME[indexWord!]);
      series = 0;
      setColors(getColors(series));
      setIncrement('');
    }
    if (indexesWord.length) {
      indexWord = indexesWord.pop();
      indexTranslate = getRandomBoolean() ? indexWord : getRandomInteger(19);
      setWord(WORDS_GAME[indexWord!].word);
      setWordTranslate(WORDS_GAME[indexTranslate!].wordTranslate);
    } else {
      indexesWord = getRandomOderArr(WORDS_GAME.length);
      if (page! > round) {
        round += 1;
        WORDS_GAME = getWordsGame();
        indexWord = indexesWord.pop();
        indexTranslate = getRandomBoolean() ? indexWord : getRandomInteger(19);
        setWord(WORDS_GAME[indexWord!].word);
        setWordTranslate(WORDS_GAME[indexTranslate!].wordTranslate);
      } else {
        setGameStatus(false);
      }
    }
  }

  const onClickHandlerNewGame = () => {
    indexesWord = getRandomOderArr(WORDS_GAME.length);
    indexWord = indexesWord.pop();
    indexTranslate = getRandomBoolean() ? indexWord : getRandomInteger(19);
    setGameStatus(true);
    setWord(WORDS_GAME[indexWord!].word);
    setWordTranslate(WORDS_GAME[indexTranslate!].wordTranslate);
    correctList = [];
    errorList = [];
    series = 0;
    seriesMax = 0;
    setColors(getColors(series));
    setScore(0);
  }

  const onToggleHandlerMute = () => {
    setMute(!mute);
  }

  const onToggleHandlerFullScreen = () => {
    const sprint = document.querySelector('.sprint');
    setFullscreen(!fullscreen);
    if (!document.fullscreenElement) {
      sprint!.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <>
      <div className='sprint'>
        { words.length ?
          <React.Fragment>
            <div className='sprint__header'>
              <i className="material-icons sprint-header__icons sprint-header__icons--sound"
                onClick={() => onToggleHandlerMute()}>{mute ? 'notifications_off' : 'notifications'}</i>
              <i className="material-icons sprint-header__icons sprint-header__icons--fullscreen"
                onClick={() => onToggleHandlerFullScreen()}>{fullscreen ? 'fullscreen_exit' : 'fullscreen'}</i>
              <NavLink to='/games'>
                <i className="material-icons sprint-header__icons sprint-header__icons--close">close</i>
              </NavLink>
            </div>
              {gameStatus && (
                <div className='sprint-body'>
                  <div className='sprint-body__info'>
                    <div className='sprint-info__score'>
                      <p className='increment increment--first'>{increment}</p>
                      <p className='increment increment--second'>{increment}</p>
                      <p className='increment increment--third'>{increment}</p>
                      <p className='score-value'>{score}</p>
                    </div>
                    <Series colors = {colors}/>
                    <Timer gameStatus={gameStatus}/>
                  </div>
                  <div className='sprint-body__field'>
                      <Series colors = {colors}/>
                      <div className='sprint-field__words'>
                        <p className='word'>{word}</p>
                        <p className='translate'>{wordTranslate}</p>
                      </div>
                      <SprintAnswer onClickHandlerGame={onClickHandlerGame}/>
                  </div>
                </div>)}
              {!gameStatus  && ( <div className='sprint__field'>
                <ResultsGame correctList={correctList} errorList={errorList} onClickHandlerNewGame={onClickHandlerNewGame}
                seriesLength={seriesMax} score={score}/>
              </div>)}
          </React.Fragment>:
          <Loader />
      }
    </div>
    </>
  )
};

interface TimerProps {
  gameStatus: boolean,
}

const Timer: React.FC<TimerProps> = ({ gameStatus }) => {
  const timerProps = {
    isPlaying: gameStatus,
    size: 95,
    strokeWidth: 7,
    trailColor: '#C1C1C1'
  };

  const renderTime = (time: number) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
      </div>
    );
  };

  const getTimeSeconds = (time: number | undefined) => (60 - time!) | 0;

  return (
    <div className='sprint-info__timer'>
      {gameStatus && (<CountdownCircleTimer
        {...timerProps}
        duration={60}
        colors={[
          ['#00BF97', 0.33],
          ['#f7cc7e', 0.33],
          ['#F57359', 0.33],
        ]}
        onComplete={() => [
          true, 0
        ]}
      >
        {({elapsedTime}) =>
          renderTime(getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>)}
    </div>
  )
};

interface SeriesProps {
  colors: string[];
}
const Series: React.FC<SeriesProps> = ({colors}) => {
  return (
    <svg className='sprint__series' width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.59575 0C2.06167 0 0 2.06167 0 4.59575V36.7148H9.19136V35.5596C9.19136 30.5055 13.3033 26.3936 18.3574 26.3936C23.4116 26.3936 27.5235 30.5055 27.5235 35.5596V36.7148H36.7148V25.2383C36.7148 23.9763 37.738 22.9532 39 22.9532H42.4404C44.9745 22.9532 47.0361 20.8915 47.0361 18.3574C47.0361 15.8233 44.9745 13.7617 42.4404 13.7617H39C37.738 13.7617 36.7148 12.7385 36.7148 11.4765V0H4.59575Z"
    fill={colors[0]}/>
    <path d="M59.6426 47.0361C62.1767 47.0361 64.2383 44.9745 64.2383 42.4404V39C64.2383 37.738 65.2615 36.7148 66.5235 36.7148H78V4.59575C78 2.06167 75.9383 0 73.4042 0H41.2852V9.19136H42.4404C47.4945 9.19136 51.6064 13.3033 51.6064 18.3574C51.6064 23.4116 47.4945 27.5235 42.4404 27.5235H41.2852V36.7148H52.7617C54.0237 36.7148 55.0468 37.738 55.0468 39V42.4404C55.0468 44.9745 57.1085 47.0361 59.6426 47.0361Z"
    fill={colors[1]}/>
    <path d="M73.4042 78C75.9383 78 78 75.9383 78 73.4042V41.2852H68.8086V42.4404C68.8086 47.4945 64.6967 51.6064 59.6426 51.6064C54.5884 51.6064 50.4765 47.4945 50.4765 42.4404V41.2852H41.2852V52.7617C41.2852 54.0237 40.262 55.0468 39 55.0468H35.5596C33.0255 55.0468 30.9639 57.1085 30.9639 59.6426C30.9639 62.1767 33.0255 64.2383 35.5596 64.2383H39C40.262 64.2383 41.2852 65.2615 41.2852 66.5235V78H73.4042Z"
    fill={colors[2]}/>
    <path d="M36.7148 78V68.8086H35.5596C30.5055 68.8086 26.3936 64.6967 26.3936 59.6426C26.3936 54.5884 30.5055 50.4765 35.5596 50.4765H36.7148V41.2852H25.2383C23.9763 41.2852 22.9532 40.262 22.9532 39V35.5596C22.9532 33.0255 20.8915 30.9639 18.3574 30.9639C15.8233 30.9639 13.7617 33.0255 13.7617 35.5596V39C13.7617 40.262 12.7385 41.2852 11.4765 41.2852H0V73.4042C0 75.9383 2.06167 78 4.59575 78H36.7148Z"
    fill={colors[3]}/>
  </svg>
  )
}

interface SprintAnswerProps {
  onClickHandlerGame : (answer: boolean) => void;
}
const SprintAnswer: React.FC<SprintAnswerProps> = ({onClickHandlerGame}) => {
  return (
    <div className='sprint-field__answer'>
    <div className='sprint-field-answer__item'>
      <button className='sprint-field-answer__button button--false'
              onClick={() => onClickHandlerGame(false)}>Неверно
      </button>
      <span><i className="material-icons">arrow_back</i></span>
    </div>
    <div className='sprint-field-answer__item'>
      <button className='sprint-field-answer__button button--true'
              onClick={() => onClickHandlerGame(true)}>Верно
      </button>
      <span><i className="material-icons">arrow_forward</i></span>
    </div>
  </div>
  )
}

const mapStateToProps = (state: any) => ({
  words: state.data.words,
  hardWords: state.data.hardWords,
});

const Sprint = connect(mapStateToProps)(SprintRedux);

export { Sprint };