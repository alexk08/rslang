import React, { useEffect, useState } from 'react';
import { urlBackend } from '../../../data';
import { WordsProps, GameProps } from '../../../common/ts/interfaces';
import { getRandomOderArr, playAnswer } from '../../../data/utils';
import { AudioWord } from '../audioWords/audioWords';
import { Loader } from '../../loader';
import { ResultsGame } from '../resultsGame';

const getData = async (url: string): Promise<WordsProps[]> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

const urls: Array<string> = [];
const WORDS_GROUP: WordsProps[][] = [];
let round: number = 0;

const CONTROL_TEXT = [
  {
    value: 'Не знаю',
    icon: 'sentiment_dissatisfied'
  }, {
    value: 'Дальше',
    icon: 'sentiment_satisfied'
  }
];
const quantityStars: number = 5;

let WORDS_GAME: WordsProps[] = [];
let indexesWord = getRandomOderArr(20);
let indexWord = indexesWord.pop();
let correctList: WordsProps[] = [];
let errorList: WordsProps[] = [];
let error = {
  currentWord: false,
  totalErrors: 0,
}
//let indexLetter: number = 0;


/*
let round: number = 0;
*/

const GameConstructor: React.FC<GameProps> = ({ group, page }) => {
  //const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<boolean>(true);
  //const [loading, setLoading] = useState<boolean>(true);
  const [word, setWord] = useState<WordsProps>();
  const [solved, setSolved] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const [stars, setStars] = useState<boolean[]>(new Array(quantityStars).fill(true));
  const [letters, setLetters] = useState<string[]>([]);
  const [indexLetter, setIndexLetter] = useState<number>(0);
  const [mixedOder, setMixedOder] = useState<number[]>([]);

  useEffect(() => {
    WORDS_GROUP.length = 0;
    urls.length = 0;
    for (let j = 0; j < 30; j += 1) {
      urls.push(`${urlBackend}words?group=${group}&page=${j}`)
    }
    let chain = Promise.resolve();
    urls.forEach((url) => {
      chain = chain
        .then(() => getData(url))
        .then((res: WordsProps[]) => {
          WORDS_GROUP.push(res);
          if (WORDS_GROUP.length === 30) {
            if (page !== undefined) {
              WORDS_GAME = WORDS_GROUP[page];
              //setLoading(false)
            } else {
              WORDS_GAME = WORDS_GROUP.flat();
              console.log(WORDS_GAME);
              //setLoading(false);
            }
            setWord(WORDS_GAME[indexWord!]);
            setLetters(getLetters(WORDS_GAME[indexWord!]));
            setMixedOder(getRandomOderArr(WORDS_GAME[indexWord!].word.length));
          }
        });
    });
  }, []);

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
          WORDS_GAME = WORDS_GROUP[page! - round];
          indexWord = indexesWord.pop();
          getNewWord(indexWord!);
        } else {
          setGameStatus(false);
        }
      }
    } else {

    }
  }


  /*
    useEffect(() => {
      window.addEventListener("keyup", onKeyPressHandler);
  
      return () => (window as any).removeEventListener("keyup", onKeyPressHandler);
  
    })
    const onKeyPressHandler = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === 'ArrowRight') onClickHandlerGame(true)
      else if (event.key === 'ArrowLeft') onClickHandlerGame(false)
    }*/
  const onToggleHandlerMute = () => {
    setMute(!mute);
  }

  const onClickHandlerGame = (letter: string) => {
    const letters = getLetters(word!);
    if (letters[indexLetter] === letter) {
      playAnswer(true, mute);
      setIndexLetter(indexLetter + 1);
      if (indexLetter === letters.length - 1) {
        correctList.push(word!);
        playWord(word!.audio)
        setSolved(true);
      }
    }
    else {
      playAnswer(false, mute);
      error.totalErrors += 1;
      const newStars = new Array(quantityStars).fill(true);
      newStars.fill(false, quantityStars - error.totalErrors);
      setStars(newStars);
      if (error.totalErrors >= quantityStars) {
        setGameStatus(false);
      }
    }
  }

  const onClickHandlerNewGame = () => {
    indexesWord = getRandomOderArr(20);
    indexWord = indexesWord.pop();
    setGameStatus(true);
    getNewWord(indexWord!);
    setStars(new Array(quantityStars).fill(true));
    error.totalErrors = 0;
    correctList = [];
    errorList = [];
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

  /*


  const onToggleHandlerMute = () => {
    setMute(!mute);
  }*/
  /*
  const playTimer = () => {
    audio.src = '/audio/timer.mp3';
    audio.play();
  };*/

  return (
    <div className='game-constructor'>
      {word ?
        <React.Fragment>
          <div className='game-constructor__stars'>
            {stars.map((item, index) => {
              return item ?
                <i className="material-icons star star--yellow" key={index}>star</i> :
                <i className="material-icons star star--pink" key={index}>star</i>
            })
            }
          </div>
          <div className='game-constructor__body'>
            {gameStatus ?
              (<React.Fragment>
                <div className='constructor-body-game__header'>
                  <AudioWord src={word.audio} />
                  <h3>{correctList.length * 10}</h3>
                  <span className='icon-container' onClick={() => onToggleHandlerMute()}>
                    {mute ? <i className="material-icons">notifications_off</i> : <i className="material-icons">notifications</i>}
                  </span>
                </div>
                <p className='constructor-body-game__translate'>
                  {word.wordTranslate}
                </p>
                <div>
                  {solved ? word.transcription : 'Собери слово из букв'}
                </div>
                <WordInEnglish letters={letters} indexLetter={indexLetter} />
                <React.Fragment>
                  {solved ?
                    <WordCard word={word} /> :
                    <MixedLetters mixedOder={mixedOder} letters={letters} indexLetter={indexLetter}
                      onClickHandlerGame={onClickHandlerGame} />
                  }
                </React.Fragment>
                <div className='constructor-body-game__control'>
                  <p>Enter</p>
                  <button onClick={() => onClickHandlerControl()}>
                    <span className="control__value">{CONTROL_TEXT[Number(solved)].value}</span>
                    <i className="material-icons control__icon">{CONTROL_TEXT[Number(solved)].icon}</i>
                  </button>
                </div>
              </React.Fragment>) :
              <ResultsGame correctList={correctList} errorList={errorList} onClickHandlerNewGame={onClickHandlerNewGame} />}
          </div>
          <button className='game-constructor__button-close'>
            <i className="material-icons">close</i>
          </button>
        </React.Fragment> :
        <Loader />}
    </div>
  )
};

export { GameConstructor };
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
  onClickHandlerGame: (letter: string) => void;
  indexLetter: number;
}
const MixedLetters: React.FC<MixedLettersProps> = ({ mixedOder, letters, onClickHandlerGame, indexLetter }) => {
  return (
    <div className='constructor-body-game__letters  constructor-body-game__letters--question'>
      {
        mixedOder.map((indexMixed, index) => {
          return indexMixed >= indexLetter ?
            (<div className='letter letter--question' key={index}
              onClick={() => onClickHandlerGame(letters[indexMixed])}>
              {letters[indexMixed]}
            </div>) :
            (<div className='letter letter--solved' key={index}>
              {letters[indexMixed]}
            </div>)
        })
      }
    </div>)
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

