const toggleSignUpOpen = (isSignUpOpen: boolean) => ({ type: 'TOGGLE_SIGN_UP_OPEN', payload: isSignUpOpen });

const signUpUser = (name: string | null, id: string | null, email: string | null, photo: string | null) => ({
    type: 'SIGN_UP_USER',
    payload: {
        name,
        id,
        email,
        photo
    }
});

const setSignUpError = (error: string | null) => ({ type: 'SET_SIGN_UP_ERROR', payload: error });

export { toggleSignUpOpen, signUpUser, setSignUpError }