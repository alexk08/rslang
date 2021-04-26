import React from "react";
import { connect } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { dictionaryLinks } from "../../data";
import { getCategoryWordsAmount } from "./helpers";
import { Crumbs } from "../../common/navigation/crumbs";

interface DictionaryProps {
  hardWords: [];
  deletedWords: [];
  words: [];
}

const DictionaryRedux: React.FC<DictionaryProps> = ({
  hardWords,
  deletedWords,
  words,
}) => {
  const location = useLocation();
  return (
    <>
      <Crumbs path={location.pathname} />
      <div className="dictionary">
        <h2 className="dictionary__title">Словарь</h2>
        {dictionaryLinks.map(({ name, link }, index) => {
          const wordsAmount = getCategoryWordsAmount(
            hardWords,
            deletedWords,
            words,
            link
          );

          return (
            <NavLink
              to={`/dictionary/${link}`}
              key={`dictionary${index}`}
              className={`dictionary__link dictionary__link--${link}`}
              onClick={(e) => {
                if (!wordsAmount) e.preventDefault();
              }}
            >
              <span className="dictionary__category-name">{name}</span>
              <span className="dictionary__category-amount">{wordsAmount}</span>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  hardWords: state.data.hardWords,
  deletedWords: state.data.deletedWords,
  words: state.data.words,
});

const Dictionary = connect(mapStateToProps)(DictionaryRedux);

export { Dictionary };
