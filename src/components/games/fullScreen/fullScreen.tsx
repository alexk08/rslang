import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { WordsProps } from '../../../common/ts/interfaces';
import { ResultPercent } from '../resultPercent/resultPercent';
import { ResultWordsList } from '../ResultWordsList/resultWordsList';


const FullScreen: React.FC = () => {

  return (
    <button className='full-screen'>
      <i className="material-icons">fullscreen</i>
      <i className="material-icons">fullscreen_exit</i>
    </button>
  )

};

export {FullScreen};


