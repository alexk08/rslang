import React from "react";
import {NavLink} from "react-router-dom";
import {levelsEnglish} from "../../../data";
import {namesPath} from "../../../data/CONSTANTS";

interface CrumbsProps {
  path: string,
}

const Crumbs: React.FC<CrumbsProps> = ({path}) => {
  const pathComponent: RegExpMatchArray | null = path.match(/[^\/][\w]*/g);
  let currentPath: string = '/';

  return (
    <div className='crumbs'>
      <NavLink to={currentPath} key='main'>
        <span>Главная</span>
        <img src='/images/navIconMain.png' alt='Icon main page'/>
      </NavLink>

      {pathComponent && pathComponent.map((path, index) => {
        currentPath += `${path}/`;
        const numberGroup: any = path.match(/^group/) && Number(path.slice(5, 7));
        const isGroup: boolean = numberGroup || numberGroup === 0;

        const numberPage: any = path.match(/^page/) && Number(path.slice(4));
        const isPage: boolean = numberPage || numberPage === 0;

        const numberSprint: any = path.match(/^sprint/) && Number(path.slice(6, 8));
        const isSprint: boolean = numberSprint || numberSprint === 0;


        const namePath: string = (isGroup && `${levelsEnglish[numberGroup].title} ${levelsEnglish[numberGroup].name}`) ||
          (isPage && `${namesPath['page']} ${numberPage}`) ||
          (isSprint && `${namesPath['sprint']} ${numberSprint}`) ||
          namesPath[path];

        const classGroup: string = isGroup ? `crumbs__btn crumbs__btn--${numberGroup}` : '';
        const lastPath: boolean = (index === pathComponent.length - 1);


        return (
          <NavLink to={currentPath} key={path}>
            {lastPath ? <span className={`actual-menu ${classGroup}`}> {namePath}</span> :
              <span className={classGroup}> {namePath}</span>}
            {!lastPath && <img src='/images/navIconPage.png' alt='Icon secondary page'/>}
          </NavLink>
        )
      })}
    </div>
  )
};

export {Crumbs};