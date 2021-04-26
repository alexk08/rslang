import React, {useEffect, useState} from 'react';
import {getStatistics, urlBackend} from '../../../data';
import {WordsProps, StatisticsProps} from '../../../common/ts/interfaces';
import {getRandomOderArr, playAnswer, updateStatistics} from '../../../data/utils';
import {Loader} from '../../loader';
import {ResultsGame} from '../resultsGame';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {Lives} from '../lives/lives';
import {AudioWord} from '../audioWords/audioWords';
import {setData, setStatistics} from '../../../data';

const CONTROL_TEXT = [
  {
    value: 'Не знаю',
    icon: 'sentiment_dissatisfied'
  }, {
    value: 'Дальше',
    icon: 'sentiment_satisfied'
  }
];
const quantityLives: number = 5;

let indexesWord = getRandomOderArr(20);
let indexWord = indexesWord.pop();
let correctList: WordsProps[] = [];
let errorList: WordsProps[] = [];
let wordAnswer = true;
let score: number = 0;
let round: number = 0;
let series: number = 0;
let seriesMax: number = 0;
let statisticBack: StatisticsProps;

let WORDS_GROUP: WordsProps[];
let WORDS_GAME: WordsProps[];

interface GameConstructorProps {
  user: any,
  words: WordsProps[],
  hardWords: WordsProps[],
  group?: number,
  page?: number,
  hard?: string | undefined,
}

const ConstructorRedux: React.FC<GameConstructorProps> = ({user, words, hardWords, group, page, hard}) => {
  const [word, setWord] = useState<WordsProps>();
  const [solved, setSolved] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [letters, setLetters] = useState<string[]>([]);
  const [indexLetter, setIndexLetter] = useState<number>(0);
  const [mixedOder, setMixedOder] = useState<number[]>([]);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(quantityLives);

  useEffect(() => {
    getStatistics(user).then((res: any) => statisticBack = res.statistics);
  }, []);

  const getWordsGame = () => {
    if (page !== undefined) return WORDS_GROUP.filter(item => item.page === page - round);
    return WORDS_GROUP;
  }

  useEffect(() => {
    if(words.length) {
      WORDS_GROUP = hard ? hardWords : words.filter(item => item.group === group);
      WORDS_GAME = (page !== undefined) ? WORDS_GROUP.filter(item => item.page === page - round) : WORDS_GROUP;
      indexesWord = getRandomOderArr(WORDS_GAME.length);
      indexWord = indexesWord.pop();
      setWord(WORDS_GAME[indexWord!]);
      setLetters(getLetters(WORDS_GAME[indexWord!]));
      setMixedOder(getRandomOderArr(WORDS_GAME[indexWord!].word.length));
    }
  }, [words, hard, hardWords, page, group]);

  const getLetters = (word: WordsProps): (string[]) => {
    return word.word.split('');
  }

  const onClickHandlerControl = (): void => {
    if (solved) {
      if (indexesWord.length) {
        indexWord = indexesWord.pop();
        getNewWord(indexWord!);
      } else {
        indexesWord = getRandomOderArr(20);
        if (page! > round) {
          round += 1;
          WORDS_GAME = getWordsGame();
          indexWord = indexesWord.pop();
          getNewWord(indexWord!);
        } else {
          setLives(0);
          statisticBack = updateStatistics('constructorWords', statisticBack, errorList, correctList, seriesMax)
          console.log(statisticBack);
        }
      }
    } else {
      playWord(word!.audio);
      setSolved(true);
      setIndexLetter(letters.length);
      setLives(lives - 1);
      if (lives === 1) {
        statisticBack = updateStatistics('constructorWords', statisticBack, errorList, correctList, seriesMax)
        console.log(statisticBack);
      }
      word!.errorsCount += 1;
      setData(word, 'errorsCount', word!.errorsCount);
      errorList.push(word!);
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", onKeyPressHandler);

    return () => (window as any).removeEventListener("keyup", onKeyPressHandler);

  })
  const onKeyPressHandler = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === 'Enter') onClickHandlerControl()
  }
  const onToggleHandlerMute = () => {
    setMute(!mute);
  }

  const onClickHandlerGame = (elem: any, letter: string) => {
    const letters = getLetters(word!);
    if (letters[indexLetter] === letter) {
      score += 10;
      elem.classList.add('letter--solved');
      playAnswer(true, mute);
      setIndexLetter(indexLetter + 1);
      if (indexLetter === letters.length - 1) {
        if (wordAnswer) {
          correctList.push(word!);
          word!.corrects += 1;
          setData(word, 'corrects', word!.corrects);
        } else {
          errorList.push(word!);
        }
        wordAnswer = true;
        series += 1;
        seriesMax = (seriesMax < series) ? series : seriesMax;
        playWord(word!.audio);
        setSolved(true);
      }
    } else {
      playAnswer(false, mute);
      elem.classList.add('letter--error');
      setLives(lives - 1);
      wordAnswer = false;
      series = 0;
    }
  }

  const setGameStatistic = () => {
    const statisticSend = {
      statistics: statisticBack
    }
    setStatistics(user, statisticSend);
    return () => {
      setStatistics(user, statisticSend);
    }
  }

  const onClickHandlerNewGame = () => {
    indexesWord = getRandomOderArr(20);
    indexWord = indexesWord.pop();
    setLives(quantityLives);
    getNewWord(indexWord!);
    correctList = [];
    errorList = [];
    series = 0;
    seriesMax = 0;
    score = 0;
  }

  const getNewWord = (index: number) => {
    setWord(WORDS_GAME[index]);
    setLetters(getLetters(WORDS_GAME[index]));
    setMixedOder(getRandomOderArr(WORDS_GAME[index].word.length));
    setIndexLetter(0);
    setSolved(false);
  }

  const playWord = (src: string) => {
    const audio = new Audio();
    audio.src = urlBackend + src;
    audio.play();
  };

  const onToggleHandlerFullScreen = () => {
    const sprint = document.querySelector('.constructor');
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
    <div className='constructor'>
      {word ? (<React.Fragment>
        <div className='constructor__header'>
          <i className="material-icons constructor-header__icons constructor-header__icons--sound"
             onClick={() => onToggleHandlerMute()}>{mute ? 'notifications_off' : 'notifications'}</i>
          <i className="material-icons constructor-header__icons constructor-header__icons--fullscreen"
             onClick={() => onToggleHandlerFullScreen()}>{fullscreen ? 'fullscreen_exit' : 'fullscreen'}</i>
          {lives > 0 && <Lives lives={lives}/>}
          <NavLink to='/games'>
            <i className="material-icons constructor-header__icons constructor-header__icons--close"
               onClick={onClickHandlerNewGame.bind(null, false)}>close</i>
          </NavLink>
        </div>
        {lives ?
          (<div className='constructor__body'>
            <p className='constructor-body-game__translate'>
              {word.wordTranslate}
            </p>
            <div className='constructor-body-game__service'>
              {solved ? (<><AudioWord src={word.audio}/><span>{word.transcription}</span></>) : 'Собери слово из букв'}
            </div>
            <WordInEnglish letters={letters} indexLetter={indexLetter}/>
            <React.Fragment>
              {solved ?
                <WordCard word={word}/> :
                <MixedLetters mixedOder={mixedOder} letters={letters} indexLetter={indexLetter}
                              onClickHandlerGame={onClickHandlerGame}/>
              }
            </React.Fragment>
            <div className='constructor-body-game__control'>
              <p>Enter</p>
              <button onClick={() => onClickHandlerControl()}>
                <span className="control__value">{CONTROL_TEXT[Number(solved)].value}</span>
                <i className="material-icons control__icon">{CONTROL_TEXT[Number(solved)].icon}</i>
              </button>
            </div>
          </div>) :
          <>
            {setGameStatistic()}
            <ResultsGame correctList={correctList} errorList={errorList} onClickHandlerNewGame={onClickHandlerNewGame}
                         seriesLength={seriesMax} score={score}/>
          </>}
          </React.Fragment>) :
          <Loader />}
          </div>
          )
          };

          interface WordCardProps {
          word: WordsProps;
          }
          const WordCard: React.FC<WordCardProps> = ({ word }) => {
          return (
          <div className='constructor-body-game__card'>
          <img src={`${urlBackend}${word.image}`} alt={`${word.word}_img`} />
          <p>Контекст:</p>
          <p dangerouslySetInnerHTML={{ __html: word.textExample }}></p>
          </div>)
          }

          interface MixedLettersProps {
          mixedOder: number[];
          letters: string[];
          onClickHandlerGame: (elem: any, letter: string) => void;
          indexLetter: number;
          }
          const MixedLetters: React.FC<MixedLettersProps> = ({ mixedOder, letters, onClickHandlerGame, indexLetter }) => {
          return (
          <div className='constructor-body-game__letters  constructor-body-game__letters--question'>
          { mixedOder.map((indexMixed, index) => {
          return <div className='letter letter--question' key={index}
          onClick={(event) => onClickHandlerGame(event.target, letters[indexMixed])}>{letters[indexMixed]}</div>
          })
          }
          </div>
          )
          }

          interface WordInEnglishProps {
          letters: string[];
          indexLetter: number;
          }
          const WordInEnglish: React.FC<WordInEnglishProps> = ({ letters, indexLetter }) => {
          return (
          <div className='constructor-body-game__letters'>
          {
          letters.map((letter, index) => {
          return index < indexLetter ?
          (<div className='letter letter--open' key={index}> {letter} </div>) :
          (<div className='letter letter--close' key={index}> {letter} </div>)
          })
          }
          </div>)
          }

          const mapStateToProps = (state: any) => ({
          words: state.data.words,
          hardWords: state.data.hardWords,
          user: state.login.user,
          });

          const Constructor = connect(mapStateToProps)(ConstructorRedux);

          export { Constructor };
