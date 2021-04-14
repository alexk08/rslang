interface user {
    name: null | string,
    userId: null | string,
    photo: string | null,
    token: string | null
}

interface InitialState {
    isLoginOpen: boolean,
    user: user,
    error: string | null,
    isAuth: boolean,
}

interface Action {
    type: string,
    payload: any,
}

const initialState: InitialState = {
    isLoginOpen: false,
    user: {
        name: null,
        userId: null,
        photo: null,
        token: null,
    },
    error: null,
    isAuth: false,
}

const loginReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'TOGGLE_LOGIN_OPEN':
            return { 
                ...state, 
                isLoginOpen: action.payload
            }
        case 'LOGIN_USER':
            return {
                ...state,
                user: {
                    name: action.payload.name,
                    userId: action.payload.userId,
                    photo: action.payload.photo,
                    token: action.payload.token
                },
                isAuth: action.payload.isAuth,
            }

        case 'SET_LOGIN_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export { loginReducer };
