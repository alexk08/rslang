import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { levelsEnglish } from '../../data';
import { titleGames } from "../../data";
import { Crumbs } from "../../common/navigation/crumbs";

const Games: React.FC = () => {
  const [level, setLevel] = useState<number>(0);

  const location = useLocation();

  const onChangeHandlerSelectLevel = (levelId: number) => {
    setLevel(levelId);
  }

  return (
    <>
      <Crumbs path={location.pathname} />
      <div className='games'>
        <div className='games__select'>
          {
            titleGames.map((item, index) => {
              return (
                <NavLink to={`/games/${item.id}${level + 1}`} key = {item.id} className={`game game--${index + 1}`}>
                  <div className='game__head' >
                    <div className='game__title'>{item.name}</div>
                      <div className='game__icon'>
                        <img src={item.iconUrl} alt={item.iconUrl} width='80%' />
                      </div>
                  </div>
                  <div className='game__img'>
                    <img src={item.imgUrl} alt={item.imgUrl} height='100%' width='100%' />
                  </div>
                </NavLink>
              )
            })
          }
          <div className='games__select--level'>
            {
              levelsEnglish.map((item, index) => {
                return (
                  <div key={index} className={`level__item level__item--${index + 1}`}>
                    <input type='radio' id={`${item.title}`} name='game' value={`${item.id}`}
                      className='level-item__input'
                      checked={index === level} onChange={(e) => onChangeHandlerSelectLevel(+e.target.value)} />
                    <label className='level-item__label' htmlFor={`${item.title}`}>
                      <span className='label__item label__title'>{item.title}</span>
                      <span className='label__item label__name'>{item.name}</span>
                    </label>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
};

export { Games };