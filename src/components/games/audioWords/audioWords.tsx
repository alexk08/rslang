import React from 'react';
import { urlBackend } from "../../../data";

interface AudioWordProps {
  src: string,
}
const AudioWord: React.FC<AudioWordProps> = ({src}) => {
  const playWord = (src: string) => {
    const audio = new Audio();
    audio.src = urlBackend + src;
    audio.play();
  };
  return (
    <span className = 'icon-container' onClick={() => playWord(src)}>
      <i className="material-icons sprint-body-game__icon">volume_up</i>
    </span>
  )
}

export {AudioWord};