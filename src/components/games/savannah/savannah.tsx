import React, { useState, useEffect, useRef } from 'react';
import { WordsProps, GameProps, StatisticsProps } from "../../../common/ts/interfaces";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { Loader } from "../../loader";
import { Lives } from "../lives/lives";
import { Sound } from "../sound";
import {
  shuffleArray, highlightWords, removeWordsHighlighting,
  onFullScreenClick, changeFullscreenIcon
} from "../utils/utils";
import { playAnswer, updateStatistics } from '../../../data/utils';
import { ResultsGame } from '../resultsGame/resultsGame';
import { setData, getStatistics, setStatistics } from '../../../data';

const savannahHeight = window.innerHeight;
const BG_IMAGE_HEIGHT = 4500;
const MAX_BG_POSITION = 3550;
let necessaryWords: WordsProps[];
let correctAnswers: WordsProps[] = [];
let wrongAnswers: WordsProps[] = [];
let bgPosition: number = 0;
let bgShift: number = 225;
let isMute: boolean = false;
let statisticBack: StatisticsProps;
let series: number = 0;
let seriesMax: number = 0;

interface SavannahProps {
  words: WordsProps[];
  user: {};
}

const SavannahRedux: React.FC<GameProps & SavannahProps> = ({ group, page = -1, words, user }) => {
  const [gameWords, setGameWords] = useState<WordsProps[]>([]);
  const [translations, setTranslations] = useState<WordsProps[]>([]);
  const [isWelcomeScreen, setIsWelcomeScreen] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("en");

  const [lives, setLives] = useState<number>(5);
  const savannah = useRef<HTMLElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const sun = useRef<HTMLImageElement>(null);
  const fullscreen = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    page > -1 ?
      necessaryWords = words.slice((Number(group) * 600), ((Number(group)) * 600) + ((page + 1) * 20)) :
      necessaryWords = words.slice((Number(group) * 600), ((Number(group) + 1) * 600));

    setGameWords(necessaryWords);
    setTranslations(necessaryWords);

    correctAnswers = [];
    wrongAnswers = [];
    series = 0;
    seriesMax = 0;
  }, [words, group, page]);

  useEffect(() => {
    getStatistics(user).then((res: any) => statisticBack = res.statistics);
  }, []);

  useEffect(() => {
    if (lives > 0 || gameWords.length === 0) {
      setGameStatistic();
    }
    return () => {
      if (statisticBack) statisticBack = updateStatistics('savannah', statisticBack, wrongAnswers, correctAnswers, seriesMax)
      if (lives > 0 || gameWords.length === 0) setGameStatistic();
    }
  }, [lives, gameWords]);

  useEffect(() => {
    window.document.addEventListener("fullscreenchange", onFullScreenChange)
    window.addEventListener("keyup", onKeyUpHandler);

    return () => {
      (window as any).removeEventListener("keyup", onKeyUpHandler);
      (window as any).removeEventListener("keyup", onFullScreenChange);
    };
  }, [gameWords]);

  const setGameStatistic = () => {
    const statisticSend = {
      statistics: statisticBack
    }
    setStatistics(user, statisticSend);
  }

  const onFullScreenChange = () => {
    if (fullscreen.current) {
      changeFullscreenIcon(fullscreen.current)
    }
  };

  const onKeyUpHandler = (evt: KeyboardEvent) => {
    switch (evt.key) {
      case "1":
        return onAnswer(translationWord, translationsOnScreen[0].wordTranslate);
      case "2":
        return onAnswer(translationWord, translationsOnScreen[1].wordTranslate);
      case "3":
        return onAnswer(translationWord, translationsOnScreen[2].wordTranslate);
      case "4":
        return onAnswer(translationWord, translationsOnScreen[3].wordTranslate);
    }
  };

  const restartGame = () => {
    page > -1 ?
      necessaryWords = words.slice((Number(group) * 600), ((Number(group)) * 600) + ((page + 1) * 20)) :
      necessaryWords = words.slice((Number(group) * 600), ((Number(group) + 1) * 600));
    moveBackground(0, 300);
    bgPosition = 0;
    setGameWords(necessaryWords);
    setLives(5);
    statisticBack = updateStatistics('savannah', statisticBack, wrongAnswers, correctAnswers, seriesMax);
    correctAnswers = [];
    wrongAnswers = [];
    seriesMax = 0;
  };

  const moveBackground = (bgPosition: number, duration: number): void => {
    savannah.current?.animate([
      { backgroundPosition: `left 0 bottom ${bgPosition}px` }
    ], {
      duration: duration,
      fill: "forwards"
    });
  };

  const moveWord = (): void => {
    word.current?.animate([
      { top: "90%" }
    ], {
      duration: 800,
    });
  };

  const increaseSun = (): void => {
    if (sun.current) {
      const sunWidth = sun.current.width;
      sunWidth <= 160 ? sun.current.width = sunWidth + 3 : sun.current.width = sunWidth;
    }
  };

  const addFlowAnimation = (): void => {
    word.current?.classList.replace("flow-animation", "hidden");
    setTimeout(() => word.current?.classList.replace("hidden", "flow-animation"), 50);
  };

  let answers: number = 0;

  const onAnswer = (wordTranslation: WordsProps, translate?: string): void => {

    ++answers;
    if (answers === 1 && lives > 0 && gameWords.length !== 0) {
      let wrongAnswer: boolean;

      if (typeof translate === "string") {
        wrongAnswer = translate !== wordTranslation.wordTranslate;
      } else {
        wrongAnswer = true;
      };

      if (!wrongAnswer) {
        bgPosition += bgShift;

        if (bgPosition <= BG_IMAGE_HEIGHT - savannahHeight && bgPosition <= MAX_BG_POSITION) {
          moveBackground(-bgPosition, 800);
        }

        moveWord();
        increaseSun();
        playAnswer(true, isMute);
        ++series;
      } else {
        playAnswer(false, isMute);
        seriesMax = seriesMax < series ? series : seriesMax;
        series = 0;
      }

      const wordTranslations = document.querySelectorAll<HTMLLIElement>(".minigames__translation-item");
      highlightWords(wordTranslations, wordTranslation, language);

      setTimeout(() => {
        if (wrongAnswer) {
          setLives(prevLives => prevLives - 1);
          setData(wordTranslation, 'errorsCount', ++wordTranslation.errorsCount);
          wrongAnswers.push(wordTranslation);
        } else {
          correctAnswers.push(wordTranslation);
          setData(wordTranslation, 'corrects', ++wordTranslation.corrects);
        };

        const updatedWords = gameWords.filter((word) => word.word !== wordTranslation.word);

        setGameWords(updatedWords);
        removeWordsHighlighting(wordTranslations, wordTranslation);
        addFlowAnimation();
      }, 800);
    };
  };

  const translationWordIndex: number = Math.floor(Math.random() * gameWords.length);
  const translationWord: WordsProps = gameWords[translationWordIndex] || {};
  const translationsCopy = translations.slice();

  translationsCopy.splice(translations.findIndex((word) => word.wordTranslate === translationWord.wordTranslate), 1);

  const getRandomWords = () => {
    const randomWordIndex: number = Math.floor(Math.random() * translationsCopy.length);
    const randomWord = translationsCopy[randomWordIndex];

    translationsCopy.splice(randomWordIndex, 1);

    return randomWord;
  }

  const translationsOnScreen: WordsProps[] = [
    getRandomWords(),
    getRandomWords(),
    getRandomWords(),
    translationWord
  ];

  if (gameWords.length === 0 && translations.length === 0) {
    return <Loader />
  };

  if (isWelcomeScreen) {
    return (
      <main className="savannah minigames">
        <div className="minigames__wrapper">
          <div className="welcome-screen">
            <p className="welcome-screen__title">
              Выберите один верный перевод слова из четырех. Для управления игрой используйте клавиши 1, 2, 3, 4, либо просто кликайте мышкой.
            </p>
            <div className="minigames__start-game">
              <span className="minigames__choose-type">Выберите язык игры:</span>
              <button className="btn welcome-screen__btn" onClick={() => {
                setIsWelcomeScreen(false);
                setLanguage("en");
              }}>
                En
              </button>
                <button className="btn welcome-screen__btn" onClick={() => {
                  setIsWelcomeScreen(false);
                  setLanguage("ru");
                }}>
                  Ru
              </button>
            </div>
          </div>
        </div>
      </main >
    )
  };

  return (
    <main className="savannah minigames" ref={savannah}>
      <div className="minigames__wrapper">
        {lives > 0 && gameWords.length !== 0 ?
          <>
            <div className="minigames__panel">
              <div className="minigames__left-panel">
                <div onClick={() => isMute = !isMute}>
                  <Sound />
                </div>
                <button className="minigames__fullscreen" ref={fullscreen} onClick={() => {
                  if (savannah.current && fullscreen.current) {
                    onFullScreenClick(savannah.current);
                  }
                }}>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                      <path d="M0 0.928581V7.42859H1.85716V1.85716H7.42859V0H0.928581C0.415309 0 0 0.415309 0 0.928581H0Z" fill="white" />
                      <path d="M25.0713 0H18.5713V1.85716H24.1427V7.42859H25.9999V0.928581C25.9999 0.415309 25.5846 0 25.0713 0V0Z" fill="white" />
                      <path d="M24.1427 24.1428H18.5713V26H25.0713C25.5846 26 25.9999 25.5847 25.9999 25.0714V18.5714H24.1427V24.1428Z" fill="white" />
                      <path d="M1.85716 18.5714H0V25.0714C0 25.5847 0.415309 26 0.928581 26H7.42859V24.1428H1.85716V18.5714Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="26" height="26" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
              <div className="minigames__right-panel">
                <Lives lives={lives} />
                <NavLink to='/games' onClick={() => 
                  statisticBack = updateStatistics('savannah', statisticBack, wrongAnswers, correctAnswers, seriesMax)}>
                  <button className="minigames__close" >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.4347 14.022L0.532091 3.11904C-0.177435 2.40985 -0.177435 1.26318 0.532091 0.55399C1.24129 -0.155204 2.38795 -0.155204 3.09715 0.55399L14.0001 11.457L24.9028 0.55399C25.6123 -0.155204 26.7587 -0.155204 27.4679 0.55399C28.1774 1.26318 28.1774 2.40985 27.4679 3.11904L16.5652 14.022L27.4679 24.925C28.1774 25.6342 28.1774 26.7808 27.4679 27.49C27.1144 27.8438 26.6497 28.0215 26.1853 28.0215C25.7209 28.0215 25.2566 27.8438 24.9028 27.49L14.0001 16.5871L3.09715 27.49C2.74338 27.8438 2.279 28.0215 1.81462 28.0215C1.35024 28.0215 0.885857 27.8438 0.532091 27.49C-0.177435 26.7808 -0.177435 25.6342 0.532091 24.925L11.4347 14.022Z" fill="#CDCDCD" />
                    </svg>
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="savannah__word flow-animation" ref={word} onAnimationEnd={() => { onAnswer(translationWord) }}>
              {language === "en" ? translationWord.word : translationWord.wordTranslate}
            </div>
            <ul className="minigames__translation-list">
              {
                shuffleArray(translationsOnScreen).map((word: WordsProps, i: number) => {
                  return (
                    <li
                      key={word.wordTranslate + i}
                      className="minigames__translation-item"
                      onClick={() => onAnswer(translationWord, word.wordTranslate)}
                    >
                      <span>{i + 1}. {language === "en" ? word.wordTranslate : word.word}</span>
                    </li>
                  )
                })
              }
            </ul>
            <div className="savannah__sun-wrapper">
              <img className="savannah__sun" src="/images/games/sun.png" alt="sun" width="100px" ref={sun} />
            </div>
          </>
          :
          <div className='minigames__result'>
            <ResultsGame errorList={wrongAnswers} correctList={correctAnswers} onClickHandlerNewGame={restartGame} seriesLength={seriesMax}/>
          </div>
        }
      </div>
    </main >
  )
};

const mapStateToProps = (state: any) => ({
  words: state.data.words,
  user: state.login.user
});

const Savannah = connect(mapStateToProps)(SavannahRedux);

export { Savannah };