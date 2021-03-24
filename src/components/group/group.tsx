import React from 'react';
import {PageItem} from "./pageItem";

const pages: Array<number> = (new Array(30)).fill(0);
interface GroupProps {
  classGroup: string,
}

const Group: React.FC<GroupProps> = ({classGroup}) => {
  return (
    <div className="group" >
      {pages.map((item: number, ind: number) => {
        const key = `page${ind}`;
        return <PageItem
          key={key}
          numberPage={ind + 1}
          classGroup={classGroup} />
      })}
    </div >
  );
};

export {Group};