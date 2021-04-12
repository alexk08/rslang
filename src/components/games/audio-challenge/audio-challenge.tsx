import React, { useState, useEffect, useRef } from 'react';
import { WordsProps, GameProps } from "../../../common/ts/interfaces";
import { connect } from "react-redux";
import { Loader } from "../../loader";
import { ResultsGame } from '../resultsGame/resultsGame';
import { urlBackend } from "../../../data";

let necessaryWords: WordsProps[];
let correctAnswers: WordsProps[] = [];
let wrongAnswers: WordsProps[] = [];

interface SavannahProps {
  words: WordsProps[]
}

const AudioChallengeRedux: React.FC<GameProps & SavannahProps> = ({ group, page = -1, words }) => {
  const [gameWords, setGameWords] = useState<WordsProps[]>([]);
  const [translations, setTranslations] = useState<WordsProps[]>([]);
  const [lives, setLives] = useState<number>(5);
  const savannah = useRef<HTMLElement>(null);
  const word = useRef<HTMLDivElement>(null);

  useEffect(() => {
    page > -1 ?
      necessaryWords = words.slice((Number(group) * 600), ((Number(group)) * 600) + ((page + 1) * 20)) :
      necessaryWords = words.slice((Number(group) * 600), ((Number(group) + 1) * 600));

    setGameWords(necessaryWords);
    setTranslations(necessaryWords);

    correctAnswers = [];
    wrongAnswers = [];
  }, [words, group, page]);

  useEffect(() => {
    window.addEventListener("keyup", onKeyUpHandler);
    return () => (window as any).removeEventListener("keyup", onKeyUpHandler);
  }, [gameWords]);

  // useEffect(() => {
  //   playAudio(translationWord.audio);
  // }, []);

  const playAudio = (audioSrc: string): void => {
    const audio = new Audio();
    audio.src = urlBackend + audioSrc;
    audio.play();
  }

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
    setGameWords(necessaryWords);
    setLives(5);
    correctAnswers = [];
    wrongAnswers = [];
  };

  const shuffleArray = (array: WordsProps[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const highlightWords = (wordTranslations: NodeListOf<HTMLLIElement>, wordTranslation: WordsProps): void => {
    wordTranslations?.forEach((translation: HTMLLIElement) => {
      translation.textContent?.match(/[а-я-,]/gi)?.join('') === wordTranslation.wordTranslate.replace(/\s/g, '') ?
        translation.classList.add("word-correct") :
        translation.classList.add("word-wrong");
    });
  };

  const removeWordsHighlighting = (wordTranslations: NodeListOf<HTMLLIElement>, wordTranslation: WordsProps): void => {
    wordTranslations?.forEach((translation) => {
      translation.textContent?.match(/[а-я-,]/gi)?.join('') === wordTranslation.wordTranslate.replace(/\s/g, '') ?
        translation.classList.remove("word-correct") :
        translation.classList.remove("word-wrong");
    })
  };

  let answers: number = 0;

  const onAnswer = (wordTranslation: WordsProps, translate?: React.MouseEvent | string): void => {
    ++answers;
    if (answers === 1 && lives > 0 && gameWords.length !== 0) {
      let wrongAnswer: boolean;

      if (typeof translate === "string") {
        wrongAnswer = translate !== wordTranslation.wordTranslate;
      } else {
        const evtTarget = translate?.target as HTMLElement;
        wrongAnswer = translate === undefined || evtTarget.innerText.match(/[а-я-,]/gi)?.join('') !== wordTranslation.wordTranslate.replace(/\s/g, '');
      };

      if (!wrongAnswer) {
      };

      const wordTranslations = document.querySelectorAll<HTMLLIElement>(".savannah__translation-item");
      highlightWords(wordTranslations, wordTranslation);

      setTimeout(() => {
        if (wrongAnswer) {
          wrongAnswers.push(wordTranslation);
        } else {
          correctAnswers.push(wordTranslation);
        };

        const updatedWords = gameWords.filter((word) => word.word !== wordTranslation.word);

        setGameWords(updatedWords);
        removeWordsHighlighting(wordTranslations, wordTranslation);
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
    getRandomWords(),
    translationWord
  ];

  if (gameWords.length === 0 && translations.length === 0) {
    return <Loader />
  };

  return (
    <main className="minigames audio-challenge" ref={savannah}>
      <div className="minigames__wrapper">
        {gameWords.length !== 0 ?
          <>
            <div className="minigames__panel">
              <button className="minigames__fullscreen" onClick={() => {
                if (savannah.current !== null) {
                  savannah.current.requestFullscreen();
                }
              }
              }>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M5.57143 5.57143H0V7.42859H6.50001C7.01328 7.42859 7.42859 7.01328 7.42859 6.50001V0H5.57143V5.57143Z" fill="white" />
                  <path d="M19.8572 0H18V6.50001C18 7.01328 18.4153 7.42859 18.9286 7.42859H25.4286V5.57143H19.8572V0Z" fill="white" />
                  <path d="M19.8572 25.4286H18V18.9286C18 18.4153 18.4153 18 18.9286 18H25.4286V19.8572H19.8572V25.4286Z" fill="white" />
                  <path d="M6.50001 18H0V19.8572H5.57143V25.4286H7.42859V18.9286C7.42859 18.4153 7.01328 18 6.50001 18V18Z" fill="white" />
                </svg>
              </button>
              <button className="minigames__close" >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4347 14.022L0.532091 3.11904C-0.177435 2.40985 -0.177435 1.26318 0.532091 0.55399C1.24129 -0.155204 2.38795 -0.155204 3.09715 0.55399L14.0001 11.457L24.9028 0.55399C25.6123 -0.155204 26.7587 -0.155204 27.4679 0.55399C28.1774 1.26318 28.1774 2.40985 27.4679 3.11904L16.5652 14.022L27.4679 24.925C28.1774 25.6342 28.1774 26.7808 27.4679 27.49C27.1144 27.8438 26.6497 28.0215 26.1853 28.0215C25.7209 28.0215 25.2566 27.8438 24.9028 27.49L14.0001 16.5871L3.09715 27.49C2.74338 27.8438 2.279 28.0215 1.81462 28.0215C1.35024 28.0215 0.885857 27.8438 0.532091 27.49C-0.177435 26.7808 -0.177435 25.6342 0.532091 24.925L11.4347 14.022Z" fill="#CDCDCD" />
                </svg>
              </button>
            </div>
            <div className="audio-challenge__word" ref={word} onClick={() => playAudio(translationWord.audio)}>
              <svg width="128" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="Layer 33" id="Layer_33"><path className="cls-1" d="M18,29a1,1,0,0,1-.57-.18l-10-7A1,1,0,0,1,7,21V11a1,1,0,0,1,.43-.82l10-7a1,1,0,0,1,1-.07A1,1,0,0,1,19,4V28a1,1,0,0,1-.54.89A1,1,0,0,1,18,29ZM9,20.48l8,5.6V5.92l-8,5.6Z" /><path className="cls-1" d="M8,22H4a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H8a1,1,0,0,1,1,1V21A1,1,0,0,1,8,22ZM4,12a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H7V12Z" /><path className="cls-1" d="M18,21V19a3,3,0,0,0,2.12-5.12l1.42-1.42A5,5,0,0,1,18,21Z" /><path className="cls-1" d="M23.65,22.65a1,1,0,0,1-.7-.29A1,1,0,0,1,23,21a7,7,0,0,0,0-9.9,1,1,0,0,1,1.41-1.41,9,9,0,0,1,0,12.72A1,1,0,0,1,23.65,22.65Z" /></g></svg>
            </div>
            <ul className="minigames__translation-list">
              {
                shuffleArray(translationsOnScreen).map((word: WordsProps, i: number) => {
                  return (
                    <li
                      key={word.wordTranslate + i}
                      className="minigames__translation-item"
                      onClick={evt => onAnswer(translationWord, evt)}
                    >
                      <span tabIndex={0}>{i + 1}. {word.wordTranslate}</span>
                    </li>
                  )
                })
              }
            </ul>
          </>
          :
          <div className='minigames__result'>
            <ResultsGame errorList={wrongAnswers} correctList={correctAnswers} onClickHandlerNewGame={restartGame} />
          </div>
        }
      </div>
    </main >
  )
};

const mapStateToProps = (state: any) => ({
  words: state.data.words
});

const AudioChallenge = connect(mapStateToProps)(AudioChallengeRedux);

export { AudioChallenge };