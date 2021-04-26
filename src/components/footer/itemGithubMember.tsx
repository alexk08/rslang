import React from 'react';
import {githubSrc} from "../../data";

interface ItemGithubMemberProps {
  name: string,
}

const ItemGithubMember: React.FC<ItemGithubMemberProps> = ({name}) => {
  const src = `${githubSrc}${name}`;

  return (
      <a target='_blank' rel="noreferrer" href={src} >
       {name}
      </a >
  )
};

export {ItemGithubMember};