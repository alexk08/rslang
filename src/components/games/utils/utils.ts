import { WordsProps } from "../../../common/ts/interfaces";

export const shuffleArray = (array: WordsProps[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const highlightWords = (
  wordTranslations: NodeListOf<HTMLLIElement>,
  wordTranslation: WordsProps,
  gameType: string
): void => {
  let answer: string;

  wordTranslations?.forEach((translation: HTMLLIElement) => {
    if (gameType === "ru" || gameType === "en") {
      gameType === "ru" ? answer = wordTranslation.word.replace(/\s/g, "") : answer = wordTranslation.wordTranslate.replace(/\s/g, "");
    }

    if (gameType === "word" || gameType === "sentenсe") {
      gameType === "word" ? answer = wordTranslation.wordTranslate.replace(/\s/g, "") : answer = wordTranslation.word.replace(/\s/g, "");
    }
    
    translation.textContent?.match(/[A-Zа-я-,]/gi)?.join("") === answer
      ? translation.classList.add("word-correct")
      : translation.classList.add("word-wrong");
  });
};

export const removeWordsHighlighting = (
  wordTranslations: NodeListOf<HTMLLIElement>,
  wordTranslation: WordsProps
): void => {
  wordTranslations?.forEach((translation) => {
    translation.textContent?.match(/[A-Zа-я-,]]/gi)?.join("") ===
      wordTranslation.wordTranslate.replace(/\s/g, "")
      ? translation.classList.remove("word-correct")
      : translation.classList.remove("word-wrong");
  });
};

export const onFullScreenClick = (
  game: HTMLElement
): void => {
  if (document.fullscreenElement === null) {
    game.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

export const changeFullscreenIcon = (fullscreen: HTMLButtonElement): void => {
  if (document.fullscreenElement === null) {
    fullscreen.innerHTML = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path d="M0 0.928581V7.42859H1.85716V1.85716H7.42859V0H0.928581C0.415309 0 0 0.415309 0 0.928581H0Z" fill="white" />
      <path d="M25.0713 0H18.5713V1.85716H24.1427V7.42859H25.9999V0.928581C25.9999 0.415309 25.5846 0 25.0713 0V0Z" fill="white" />
      <path d="M24.1427 24.1428H18.5713V26H25.0713C25.5846 26 25.9999 25.5847 25.9999 25.0714V18.5714H24.1427V24.1428Z" fill="white" />
      <path d="M1.85716 18.5714H0V25.0714C0 25.5847 0.415309 26 0.928581 26H7.42859V24.1428H1.85716V18.5714Z" fill="white" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="26" height="26" fill="white" />
      </clipPath>
    </defs>
  </svg>`;
  } else {
    fullscreen.innerHTML = `
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.57143 5.57143H0V7.42859H6.50001C7.01328 7.42859 7.42859 7.01328 7.42859 6.50001V0H5.57143V5.57143Z" fill="white"/>
      <path d="M19.8572 0H18V6.50001C18 7.01328 18.4153 7.42859 18.9286 7.42859H25.4286V5.57143H19.8572V0Z" fill="white"/>
      <path d="M19.8572 25.4286H18V18.9286C18 18.4153 18.4153 18 18.9286 18H25.4286V19.8572H19.8572V25.4286Z" fill="white"/>
      <path d="M6.50001 18H0V19.8572H5.57143V25.4286H7.42859V18.9286C7.42859 18.4153 7.01328 18 6.50001 18V18Z" fill="white"/>
    </svg>`;
  }
};
