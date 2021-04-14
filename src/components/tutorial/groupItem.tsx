import React from 'react';

interface GroupProps {
  id: number,
  title: string,
  name: string,
  hoverHandler: ((id: number) => void)
}

const GroupItem: React.FC<GroupProps> = ({id, title, name, hoverHandler}) => {
  const classGroup = `group-btn group--${id}`;

  return (
    <div className={classGroup} onMouseEnter={() => hoverHandler(id)}>
      <span className="group__title" >{title}</span >
      <span className="group__description" >{name}</span >
    </div >
  )
};

export {GroupItem};

