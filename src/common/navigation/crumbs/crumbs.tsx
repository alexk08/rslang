import React from "react";
import {NavLink} from "react-router-dom";
import {levelsEnglish} from "../../../data";
import {namesPath} from "../../../data/CONSTANTS";

interface CrumbsProps {
  path: string,
}

const Crumbs: React.FC<CrumbsProps> = ({path}) => {
  const pathComponent: RegExpMatchArray | null = path.match(/[^/][\w]*/g);
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

        const isDictionary: any = path.match(/^dictionary$/);
        const isHard: any = path.match(/hard$/);
        const isDeleted: any = path.match(/deleted$/);
        const isLearning: any = path.match(/learning$/);

        const namePath: string =
          (isGroup && `${levelsEnglish[numberGroup - 1].title} ${levelsEnglish[numberGroup - 1].name}`) ||
          (isPage && `${namesPath['page']} ${numberPage}`) ||
          (isSprint && `${namesPath['sprint']} ${numberSprint}`) ||
          (isDictionary && `${namesPath['dictionary']}`) ||
          (isHard && `${namesPath['hard']}`) ||
          (isDeleted && `${namesPath['deleted']}`) ||
          (isLearning && `${namesPath['learning']}`) ||
          namesPath[path];

        const classGroup: string = isGroup ? `crumbs__btn crumbs__btn--${numberGroup - 1}` : '';
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