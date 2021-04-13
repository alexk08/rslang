import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { dictionaryLinks } from "../../data";
import { getCategoryWordsAmount } from "./helpers";

interface DictionaryProps {
  hardWords: [];
  deletedWords: [];
  learningWords: [];
}

const DictionaryRedux: React.FC<DictionaryProps> = ({
  hardWords,
  deletedWords,
  learningWords,
}) => {
  return (
    <div className="dictionary">
      <h2 className="dictionary__title">Словарь</h2>
      {dictionaryLinks.map(({ name, link }, index) => {
        const wordsAmount = getCategoryWordsAmount(
          hardWords,
          deletedWords,
          learningWords,
          link
        );

        return (
          <NavLink
            to={`/dictionary/${link}`}
            key={`dictionary${index}`}
            className={`dictionary__link dictionary__link--${link}`}
            onClick={(e) => { if (!wordsAmount) e.preventDefault() }}
          >
            <span className="dictionary__category-name">{name}</span>
            <span className="dictionary__category-amount">{wordsAmount}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  hardWords: state.data.hardWords,
  deletedWords: state.data.deletedWords,
  learningWords: state.data.learningWords,
});

const Dictionary = connect(mapStateToProps)(DictionaryRedux);

export { Dictionary };
