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
  onRecoverWordClick: (id: string) => void,
  isDictionary?: boolean,
  dictionaryWords?: any,
  wordType?: string
}

const audio = new Audio();

const WordSliderRedux: React.FC<WordSliderProps> = ({group, page, isDictionary = false, dictionaryWords = [], isTranslate, areButtons, hardWords, deletedWords, getWords, onHardWordClick, onDeleteHardWordClick, onDeleteWordClick, onRecoverWordClick, wordType = ''}) => {
  const [words, setWords] = useState<WordsProps[]>([]);
  const [isMessage, setMessage] = useState<boolean>(false);

  useEffect(() => {
    if (isDictionary) {
      if (page >= 0) {
        setWords(dictionaryWords[page] || []);
        setMessage(false);
      }
    } else {
      setWords([]);
      getDataPage(group - 1, page).then((res: WordsProps[]) => getWordsWithoutDeleted(res));
    }
  }, [page, isDictionary, deletedWords]);


  const getWordsWithoutDeleted: any = (words: any) => {
    const wordsWithoutDeleted = words.filter((word: any) => deletedWords.findIndex((deletedWord: any) => deletedWord.id === word.id) === -1);

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

              const isHard: boolean = Boolean(hardWords.length) && hardWords.some((word: any) =>  word.id === item.id);
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
                      {areButtons && !(isDictionary && wordType === 'deleted') &&
                      <div className='btn-delete' onClick={() => {
                        onDeleteWordClick(item);
                      //  setIsDelete((isDelete) => isDelete + 1);
                      }}>
                        Удалить
                      </div>}
                      {isDictionary && wordType === 'deleted' && 
                        <div className='btn-delete' onClick={() => {
                          onRecoverWordClick(item.id);
                        }}>
                          Восстановить
                        </div>}
                      <div className="carousel__results">
                        {isDictionary && wordType === 'learning' ? 
                        <div className="carousel__results-wrap">
                          <div className="carousel__corrects">{`Правильно: ${item.corrects}`}</div>
                          <div className="carousel__errors">{`Ошибки: ${item.errorsCount}`}</div>
                        </div> : null}
                      </div>
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
  getWords: state.data.words
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
  onRecoverWordClick: (id: string) => {
    dispatch(ActionCreator.recoverDeletedWord(id));
  }
});


const WordSlider = connect(mapStateToProps, mapDispatchToProps)(WordSliderRedux);

export {WordSlider};
