import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { MainPage } from "../../components/main-page";
import { Team } from "../../components/team";
import { Tutorial } from "../../components/tutorial";
import { WordList } from "../../components/word-list";
import { Games } from '../../components/games';
import { Sprint } from '../../components/games/sprint';
import { Constructor } from '../../components/games/constructor';
import { Dictionary } from '../../components/dictionary';
import { DictionarySection } from '../../components/dictionary-section';
import {Statistics} from "../../components/statistics";
import { Savannah } from '../../components/games/savannah';
import { AudioChallenge } from '../../components/games/audio-challenge';

const Switcher: React.FC = () => {

  const isGroupExists: React.FC<any> = ({ match }) => {
    const idGroup: number = Number(match.params.id);
    if (
      idGroup < 0
      || idGroup > 6
      || (idGroup ^ 0) !== idGroup
    ) {
      return <Redirect to='/tutorial' />
    }

    return <WordList group={idGroup} />
  };

  const isGroupPageExists: React.FC<any> = ({ match }) => {
    const idGroup: number = Number(match.params.group);
    const idPage: number = Number(match.params.page);
    if (
      idGroup < 0
      || idGroup > 6
      || (idGroup ^ 0) !== idGroup
    ) {
      return <Redirect to='/tutorial' />
    }

    if (
      idPage < 0
      || idPage > 30
      || (idPage ^ 0) !== idPage
    ) {
      const path = `/tutorial/group${idGroup}`;
      return <Redirect to={path} />
    }
    return <WordList group={idGroup} pageInitial={idPage} />
  };

  return (
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/team' component={Team} />
      <Route exact path='/tutorial' component={Tutorial} />
      <Route exact path='/games' component={Games} />

      <Route exact path='/dictionary' component={Dictionary}/>
      <Route exact path='/dictionary/hard' component={() => <DictionarySection wordsType={'hard'}/>}/>
      <Route path='/dictionary/hard/group:group/page:page' render={({match}) => {
        const group: number = Number(match.params.group);
        const page: number = Number(match.params.page) || 0;
        return <WordList group={group} pageInitial={page} isDictionary wordsType='hard'/>
      } }/>
      <Route path='/dictionary/hard/group:group' render={({match}) => {
        const group: number = Number(match.params.group);
        return <WordList group={group} isDictionary wordsType='hard'/>
      } }/>

      <Route exact path='/dictionary/deleted' component={() => <DictionarySection wordsType={'deleted'}/>}/>
      <Route path='/dictionary/deleted/group:group/page:page' render={({match}) => {
        const group: number = Number(match.params.group);
        const page: number = Number(match.params.page) || 0;
        return <WordList group={group} pageInitial={page} isDictionary wordsType='deleted'/>
      } }/>
      <Route path='/dictionary/deleted/group:group' render={({match}) => {
        const group: number = Number(match.params.group);
        return <WordList group={group} isDictionary wordsType='deleted'/>
      } }/>

      <Route exact path='/dictionary/learning' component={() => <DictionarySection wordsType={'learning'}/>}/>
      <Route path='/dictionary/learning/group:group/page:page' render={({match}) => {
        const group: number = Number(match.params.group);
        const page: number = Number(match.params.page) || 0;
        return <WordList group={group} pageInitial={page} isDictionary wordsType='learning'/>
      } }/>
      <Route path='/dictionary/learning/group:group' render={({match}) => {
        const group: number = Number(match.params.group);
        return <WordList group={group} isDictionary wordsType='learning'/>
      } }/>

      <Route path='/statistics' component={Statistics}/>
      <Route path='/games/sprint:group/page:page' render={({match}) => {
        const group: number = Number(match.params.group);
        const page: number = Number(match.params.page);
        return <Sprint group={group-1} page={page-1}/>
      } }/>
      <Route path='/games/sprint:group' render={({match}) => {
        const group: number = Number(match.params.group) || 0;
        return <Sprint group={group-1}/>
      } }/>
      <Route path='/games/constructor:group/page:page' render={({match}) => {
        const group: number = Number(match.params.group);
        const page: number = Number(match.params.page);
        return <Constructor group={group-1} page={page-1}/>
      } }/>
      <Route path='/games/constructor:group' render={({match}) => {
        const group: number = Number(match.params.group) || 0;
        return <Constructor group={group-1}/>
      } }/>
      <Route path='/games/savannah:group/page:page' render={({ match }) => {
        const group = Number(match.params.group);
        const page = Number(match.params.page);
        return <Savannah group={group - 1} page={page - 1} />
      }} />
      <Route path='/games/savannah:group' render={({ match }) => {
        const group = Number(match.params.group) || 0;
        return <Savannah group={group - 1} />
      }} />
      <Route path='/games/audio:group/page:page' render={({ match }) => {
        const group = Number(match.params.group);
        const page = Number(match.params.page);
        return <AudioChallenge group={group - 1} page={page - 1} />
      }} />
      <Route path='/games/audio:group' render={({ match }) => {
        const group = Number(match.params.group) || 0;
        return <AudioChallenge group={group - 1} />
      }} />
      <Route path='/tutorial/group:group/page:page'
        component={(...props: Array<object>) => isGroupPageExists(props[0])} />
      <Route path='/tutorial/group:id' component={(...props: Array<object>) => isGroupExists(props[0])} />
      <Route />
      <Redirect path='*' to='/' />
    </Switch>
  );
}

export { Switcher };
