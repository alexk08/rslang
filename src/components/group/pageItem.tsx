import React from 'react';

const startTitlePage: string = 'Unit';
interface PageItemProps {
  numberPage: number,
  classGroup: string,
}

const PageItem: React.FC<PageItemProps> = ({numberPage, classGroup}) => {
  const titlePage: string = `${startTitlePage} ${numberPage}`;
  const classPage: string = `page-item ${classGroup}`;
  return (
    <div className={classPage}>
      <p>{titlePage}</p>
    </div>
  );
}

export {PageItem};
