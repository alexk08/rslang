import React from 'react';

interface GroupProps {
  id: number,
  title: string,
  name: string,
  hoverHandler?: ((id: number) => void),
  isDictionary?: boolean,
  wordsCount?: number
}

const GroupItem: React.FC<GroupProps> = ({id, title, name, hoverHandler = () => {}, isDictionary = false, wordsCount = 0}) => {
  const classGroup = `group-btn group--${id}`;

  return (
    <div className={classGroup} onMouseEnter={() => hoverHandler(id)}>
      <span className="group__title" >{title}</span >
      <span className="group__description" >{name}</span >
      {isDictionary ? <span className="group__word-count">{wordsCount}</span> : null}
    </div >
  )
};

export {GroupItem};

