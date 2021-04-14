const toggleTranslate = (e: any) => {
  return {
    type: 'TOGGLE_TRANSLATE',
    value: e.target.checked,
    payload: e.target.checked,
  };
};

const toggleButtons = (e: any) => {
  return {
    type: 'TOGGLE_BUTTONS',
    value: e.target.checked,
    payload: e.target.checked,
  };
};

const toggleOpen = (e: boolean) => {
  return {
    type: 'TOGGLE_OPEN',
    value: e,
    payload: e,
  };
};

const toggleGameOpen = (e: boolean) => {
  return {
    type: 'GAME_OPEN',
    value: e,
    payload: e,
  };
};

export { toggleTranslate, toggleButtons, toggleOpen, toggleGameOpen };