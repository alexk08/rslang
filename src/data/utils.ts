export const getRandomInteger = (max : number) : number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const getRandomOderArr = (n : number) => {
  let array = getOderArr(n);
  for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getRandomBoolean = () : boolean => {
  return Math.random() < 0.5;
}

const getOderArr = (n : number) => {
  let arr : number[] = [];
  Array(n).fill(1).forEach((item, index) => arr.push(index));
  return arr;
};

export const playAnswer = (answer: boolean, mute: boolean) => {
  const audio = new Audio();
  if (!mute) {
    audio.src = answer ? '/audio/correct.mp3' : '/audio/error.mp3';
    audio.play();
  }
};