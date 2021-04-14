import React from "react";

interface SelectProps {
  page: number,
  changeSelectItem: ((e: any) => void)
}

const Select: React.FC<SelectProps> = ({page, changeSelectItem}) => {
  const pages: number[] = Array.from(Array(30).keys());

  return (
    <div className="selectPages">
      <select value={page} onChange={changeSelectItem} required>
        <option key='-1'  value='' hidden>Выберите страницу</option>
        {pages.map((id) => <option key={id} value={id}>Unit {id + 1}</option>)}
      </select>
    </div>
  )
}

export {Select};
