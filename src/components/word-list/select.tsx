import React from "react";
import { WordsProps } from "../../common/ts/interfaces";

interface SelectProps {
  page: number,
  changeSelectItem: ((e: any) => void),
  dictionaryWords?: any,
  isDictionary?: boolean
}

const Select: React.FC<SelectProps> = ({page, changeSelectItem, isDictionary = false, dictionaryWords = []}) => {
  const pages: number[] = isDictionary ? dictionaryWords.map((it: WordsProps[], idx: number) => idx) :  Array.from(Array(30).keys());

  return (
    <div className="selectPages">
      <select value={page} onChange={changeSelectItem} required>
        <option key='-1'  value='' hidden>Выберите страницу</option>
        {pages.map((id) => <option key={id} value={id}>{isDictionary ? `Страница` : `Unit`} {id + 1}</option>)}
      </select>
    </div>
  )
}

export {Select};
