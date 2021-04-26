interface Action {
  type: string,
  value: boolean,
  payload: boolean,
}

interface Initial {
  isTranslate: boolean,
  areButtons: boolean,
  isOpen: boolean,
  isGameOpen: boolean,
}

const initialState: Initial = {
  isTranslate: true,
  areButtons: true,
  isOpen: false,
  isGameOpen: false,
};

const settingsReducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case 'TOGGLE_TRANSLATE':
      return { ...state, isTranslate: action.value }
    case 'TOGGLE_BUTTONS':
      return { ...state, areButtons: action.value }
    case 'TOGGLE_OPEN':
      return { ...state, isOpen: action.value }
    case 'GAME_OPEN':
      return { ...state, isGameOpen: action.value }
    default:
      return state;
  }
};

export { settingsReducer };
