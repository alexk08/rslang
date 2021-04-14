import { WordsProps } from "../common/ts/interfaces";
import {urlBackend} from "./index";

const url: string = `${urlBackend}words?all=true`;

export const getData = async (): Promise<Array<WordsProps>> => {

  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }

  return await res.json();
};

const setData = (word: any, prop: any, value: boolean) => {
  word[prop] = value;
  const {id: newId, ...rest} = word;
  const newWord = {_id: newId, ...rest};
  if (newWord) {
    const setWordsToBack = async (newWord: any) => {
      console.log(newWord);
      const responce = await fetch(`${urlBackend}words/${newWord._id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWord)
      });
    };
    setWordsToBack(newWord);
  }
}

export {setData};
