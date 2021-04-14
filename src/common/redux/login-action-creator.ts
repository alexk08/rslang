const toggleLoginOpen = (isLoginOpen: boolean) => ({ type: 'TOGGLE_LOGIN_OPEN', payload: isLoginOpen });

const loginUser = (name: string | null, userId: string | null, photo: string | null, isAuth: boolean) => {
    localStorage.user = JSON.stringify({
        name,
        userId,
        photo,
        isAuth,
    });

    return {
        type: 'LOGIN_USER',
        payload: {
            name,
            userId,
            photo,
            isAuth,
        }
    }
};

const setLoginError = (error: string | null) => ({ type: 'SET_LOGIN_ERROR', payload: error });

export { toggleLoginOpen, loginUser, setLoginError }