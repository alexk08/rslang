import React from "react";
import {TEAM, githubMembers, githubSrc} from "../../data";
import {ReactComponent as GithubLogo} from "../../data/images/github.svg";
import {useLocation} from "react-router-dom";
import {Crumbs} from "../../common/navigation/crumbs";

const Team: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <Crumbs path={location.pathname}/>
      <div className='team-wrapper'>
        <h1>над проектом работали</h1>
        <div className='team'>
          {
            TEAM.map((member) => {
              return (
                <div className='team-member' key={member.id}>
                  <img src={`images/team/${githubMembers[member.id]}.jpg`} alt={member.name}/>
                  <p className='team-member__name'>{member.name}</p>
                  <p className='team-member__role'>{member.role}</p>
                  <p className='team-member__description'>{member.description}</p>
                  <a target="_blank" rel="noreferrer" href={githubSrc + githubMembers[member.id]}>
                    <GithubLogo/>
                  </a>
                </div>)
            })
          }
        </div>
      </div>
    </>
  )
};

export {Team};