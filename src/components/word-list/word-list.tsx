import React, {useState} from 'react';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {levelsEnglish} from "../../data";
import {Select} from "./select";
import {WordSlider} from "./word-slider";
import {Pagination} from "../pagination";
import {toggleOpen, toggleButtons} from "../../common/redux/action";
import {connect} from "react-redux";
import {Crumbs} from "../../common/navigation/crumbs";

interface WordListProps {
  toggleOpen: any,
  toggleButtons: any,
  group: number,
  pageInitial?: number
}

const WordListRedux: React.FC<WordListProps> = ({group, pageInitial = 0, toggleOpen, toggleButtons}) => {
  const [page, setPage] = useState(pageInitial - 1);
  const location = useLocation();
  const history = useHistory();
  const name: string = levelsEnglish[group - 1].name;
  const changeSelectItem = (e: any) => {
    const newPage: number = (typeof e === "number") ? e : ((e.target.value === '') ? -1 : Number(e.target.value));
    history.push(`/tutorial/group${group}/page${newPage + 1}`);
    setPage(newPage);
  };

  return (
    <>
      <Crumbs path={location.pathname}/>
      <div className="word-list">
        <p className='word-list__title'>топ 600 слов {name}</p>
        <div className="word-list__select">
          <NavLink to={`/games`}>
            <img src='/images/games.png' alt='open games' title='Open games'/>
          </NavLink>
          <Select changeSelectItem={changeSelectItem} page={page}/>
          <img src='/images/settingsIcon.png' alt='settings' title='Настройки' onClick={() => toggleOpen('true')}/>
        </div>
        <WordSlider group={group} page={page}/>
        <Pagination group={group} page={page + 1} changeSelectItem={changeSelectItem}/>
      </div>
    </>
  )
};

const mapDispatchToProps = {
  toggleOpen,
  toggleButtons,
};

const WordList = connect(null, mapDispatchToProps)(WordListRedux);
export {WordList};
