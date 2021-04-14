import React, {useEffect, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import {getDataPage, urlBackend} from "../../data";
import {Loader} from "../loader";
import {connect} from "react-redux";
import {WordsProps} from "../../common/ts/interfaces";
import {ActionCreator} from "../../common/redux/action-creator";

interface WordSliderProps {
  group: number,
  page: number,
  isTranslate: boolean,
  areButtons: boolean,
  hardWords: [],
  deletedWords: [],
  getWords: [],
  onHardWordClick: (word: WordsProps) => void,
  onDeleteHardWordClick: (id: string) => void,
  onDeleteWordClick: (word: WordsProps) => void,
  isDictionary?: boolean,
  dictionaryWords?: any
}

const audio = new Audio();

const WordSliderRedux: React.FC<WordSliderProps> = ({group, page, isDictionary = false, dictionaryWords = [], isTranslate, areButtons, hardWords, deletedWords, getWords, onHardWordClick, onDeleteHardWordClick, onDeleteWordClick}) => {
  const [words, setWords] = useState<WordsProps[]>([]);
  const [isMessage, setMessage] = useState<boolean>(false);

  useEffect(() => {
<<<<<< dictionary
    setWordsRedux(getWords);
  }, [getWords]);


  useEffect(() => {
    if (isDictionary) {
      if (page >= 0) {
        setWords(dictionaryWords[page]);
        setMessage(false);
      }
      console.log('словарь')
    } else {
      setWords([]);
      getDataPage(group - 1, page).then((res: WordsProps[]) => getWordsWithoutDeleted(res));
      console.log('учебник')
    }
  }, [page, group, isDelete, isDictionary]);


  const getWordsWithoutDeleted: any = (words: any) => {
    const wordsWithoutDeleted = words.filter((word: WordsProps) => deletedWords.findIndex((deletedWord: WordsProps) => deletedWord.id === word.id) === -1);

    if (!wordsWithoutDeleted.length) {
      const option = document.getElementsByTagName('option')[page + 1];
      option.hidden = true;
      setMessage(true);
    } else {
      setWords(wordsWithoutDeleted);
      setMessage(false);
    }
  }

  const playWord = (audioWord: string, audioMeaning: string, audioExample: string) => {
    const tracks: Array<string> = [urlBackend + audioWord, urlBackend + audioMeaning, urlBackend + audioExample];
    let current: number = 0;
    audio.src = tracks[0];
    audio.play();

    audio.onended = function () {
      current += 1;
      if (current < tracks.length) {
        audio.src = tracks[current];
        audio.play();
      }
    }
  };

  const pathImg: string = `/images/group/${group - 1}.png`;


  return (
    <div className="word-slider">
      {
        ((page < 0) && <img src={pathImg} alt='level english'/>) ||
        (isMessage && <p className="message">The page is deleted</p>) ||
        ((words.length && getWords.length) ?
          <Carousel dynamicHeight={false}>
            {words.map((item: WordsProps) => {
              const isHard: boolean = Boolean(hardWords.length) && hardWords.some((word: any) => word.id === item.id);
              return (
                <div key={item.id}>
                  <img src={urlBackend + item.image} alt='figure of word'/>
                  <div className="carousel__content">
                    <div className="word">
                      {isHard && <img className="hard-icon" src='/images/lamp.png' alt='hard word'/>}
                      <p className="word__value">{item.word} {item.transcription}</p>
                      {isTranslate && <p className="word__translate">({item.wordTranslate})</p>}
                    </div>
                    <div className='meaning'>
                      <p className="meaning__value" dangerouslySetInnerHTML={{__html: item.textMeaning}}></p>
                      {isTranslate && <p className="meaning__translate">({item.textMeaningTranslate})</p>}
                    </div>
                    <div className='example'>
                      <p className="example__value" dangerouslySetInnerHTML={{__html: item.textExample}}></p>
                      {isTranslate && <p className="example__translate">({item.textExampleTranslate})</p>}
                    </div>
                    <div className="carousel__content__btns">
                      <div className="audio"
                           onClick={() => playWord(item.audio, item.audioMeaning, item.audioExample)}>
                        <img src="/images/audio.png" alt='audio'/>
                      </div>
                      {areButtons &&
                      <div className='btn-difficult' onClick={() => {
                        isHard ? onDeleteHardWordClick(item.id) : onHardWordClick(item);
                      }}>
                        {isHard ? 'Удалить из Сложных' : 'Добавить в Сложные'}
                      </div>}
                      {areButtons &&
                      <div className='btn-delete' onClick={() => {
                        onDeleteWordClick(item);
                      //  setIsDelete((isDelete) => isDelete + 1);
                      }}>
                        Удалить
                      </div>}
                    </div>
                  </div>
                </div>
              )
            })}
          </Carousel> :
          <Loader/>)
      }
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isTranslate: state.setting.isTranslate,
  areButtons: state.setting.areButtons,
  hardWords: state.data.hardWords,
  deletedWords: state.data.deletedWords,
  getWords: state.data.words,
});

const mapDispatchToProps = (dispatch: any) => ({
  onHardWordClick: (word: WordsProps) => {
    dispatch(ActionCreator.addHardWord(word));
  },
  onDeleteHardWordClick: (id: string) => {
    dispatch(ActionCreator.removeHardWord(id));
  },
  onDeleteWordClick: (word: WordsProps) => {
    dispatch(ActionCreator.addDeletedWord(word));
  },
});


const WordSlider = connect(mapStateToProps, mapDispatchToProps)(WordSliderRedux);

export {WordSlider};
