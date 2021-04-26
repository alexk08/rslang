import React from 'react';
import { urlBackend } from "../../../data";
import './audioWords.scss';

interface AudioWordProps {
  src: string,
}
const AudioWord: React.FC<AudioWordProps> = ({src}) => {
  const playWord = (node: any, src: string) => {
    node.classList.add('material-icons--play');
    setTimeout(() => (node.classList.remove('material-icons--play')), 2000);
    const audio = new Audio();
    audio.src = urlBackend + src;
    audio.play();
  };
  return (
    <span className = 'icon-container' onClick={(event) => playWord(event.target, src)}>
      <i className="material-icons material-icons--audio">volume_up</i>
    </span>
  )
}

export {AudioWord};