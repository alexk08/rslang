import React, {useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {GroupItem} from "./groupItem";
import {levelsEnglish, titleGroup, descriptionGroup} from '../../data';
import {Crumbs} from "../../common/navigation/crumbs";

const Tutorial: React.FC = () => {
  const [idGroup, setIdGroup] = useState(0);
  const hoverHandler = (id: number) => {
    setIdGroup(id);
  };
  const location = useLocation();
  const pathImg: string = `/images/group/${idGroup}.png`;
  const titleDescription: string = titleGroup[idGroup];
  const dataDescription: string = descriptionGroup[idGroup];

  return (
    <>
      <Crumbs path={location.pathname}/>
      <div className="tutorial-wrapper">
        <p className="tutorial__title">Уровни сложности</p>
        <div className="tutorial">
          <div className="tutorial__groups">
            {levelsEnglish.map(({id, title, name}) => {
              const key = `group${id}`;
              return (
                <NavLink to={`/tutorial/group${id + 1}`} key={`group${id}`}>
                  <GroupItem
                    key={key}
                    id={id}
                    title={title}
                    name={name}
                    hoverHandler={hoverHandler}>
                  </GroupItem>
                </NavLink>
              )
            })}
          </div>

          <div className="tutorial__description">
            <img src={pathImg} alt="Group"/>
            <p className="tutorial__description__title">{titleDescription}</p>
            <p className="tutorial__description__data" dangerouslySetInnerHTML={{__html: dataDescription}}></p>
          </div>
        </div>
      </div>
    </>
  )

};

export {Tutorial};
