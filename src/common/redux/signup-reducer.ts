interface user {
    name: null | string,
    id: null | string,
    email: null | string,
    photo: null | string,
}

interface InitialState {
    isSignUpOpen: boolean,
    user: user,
    error: string | null
}

interface Action {
    type: string,
    payload: any,
}

const initialState: InitialState = {
    isSignUpOpen: false,
    user: {
        name: null,
        id: null,
        email: null,
        photo: null,
    },
    error: null
}

const signupReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'TOGGLE_SIGN_UP_OPEN':
            return { 
                ...state, 
                isSignUpOpen: action.payload
            }
        case 'SIGN_UP_USER':
            return {
                ...state,
                user: {
                    name: action.payload.name,
                    id: action.payload.id,
                    email: action.payload.email,
                    photo: action.payload.photo,
                }
            }
        case 'SET_SIGN_UP_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export { signupReducer };