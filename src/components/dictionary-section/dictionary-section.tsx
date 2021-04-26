import React from "react";
import { connect } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { DICTIONARY_TITLES, levelsEnglish } from "../../data";
import { GroupItem } from "../tutorial/groupItem";
import { getWordsAmountInGroup } from "./helpers";
import { Crumbs } from "../../common/navigation/crumbs";

interface DictionarySectionProps {
  hardWords: [];
  deletedWords: [];
  words: [];
  wordsType: string;
}

const DictionarySectionRedux: React.FC<DictionarySectionProps> = ({
  hardWords,
  deletedWords,
  words,
  wordsType
}) => {
  const location = useLocation();
  return (
    <>
      <Crumbs path={location.pathname} />
      <div className="dictionary-section">
        <h2 className="dictionary-section__title">{`${DICTIONARY_TITLES[wordsType]} слова`}</h2>
        <div className="dictionary-section__groups">
          {levelsEnglish.map(({ id, title, name }) => {
            const key = `group${id}`;

            const wordsAmount = getWordsAmountInGroup(
              wordsType,
              id,
              hardWords,
              deletedWords,
              words
            );

            return wordsAmount ? (
              <NavLink
                to={`/dictionary/${wordsType}/group${id + 1}`}
                key={`group${id}`}
              >
                <GroupItem
                  key={key}
                  id={id}
                  title={title}
                  name={name}
                  isDictionary={true}
                  wordsCount={wordsAmount}
                ></GroupItem>
              </NavLink>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  hardWords: state.data.hardWords,
  deletedWords: state.data.deletedWords,
  words: state.data.words,
});

const DictionarySection = connect(mapStateToProps)(DictionarySectionRedux);

export { DictionarySection };
