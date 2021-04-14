import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser, setLoginError, toggleLoginOpen } from '../../common/redux/login-action-creator';
import { toggleSignUpOpen } from '../../common/redux/signup-action-creator';
import { urlBackend } from '../../data';

interface LoginProps {
    isLoginOpen: boolean,
    handleSubmit: any,
    error: string | null,
    toggleLoginOpen: (isLoginOpen: boolean) => void,
    toggleSignUpOpen: (isLoginOpen: boolean) => void,
    loginUser: (name: string, userId: string, photo: string | null, isAuth: boolean, token: string | null) => void,
    setLoginError: (error: string | null) => void,
}

interface submitValues {
    email: string,
    password: string,
}

const LoginFormRedux: React.FC<LoginProps> = ({ isLoginOpen, handleSubmit, error, toggleLoginOpen, toggleSignUpOpen, loginUser, setLoginError }) => {
    const submit = async (values: submitValues) => {
        const response = await fetch(`${urlBackend}signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        const content = await response.json();
        console.log(content);
        if (content.error) {
            setLoginError(content.error.errors[0].message);
        } else {
            loginUser(content.name, content.userId, content.photo, true, content.token);
            toggleLoginOpen(false);
        }
    };
    
    return (
        isLoginOpen ?
        <div className="login-form-wrapper">
            <form className="login-form" onSubmit={handleSubmit(submit)}>
                <div className="login-form__close-btn" onClick={ () => toggleLoginOpen(false) } >
                    <img src="/images/close.svg" alt="close"></img>
                </div>
                <div className="login-form-title">
                    <h2>Изучать слова удобнее, если у вас есть профиль</h2>
                </div>
                <div className="login-form-subtitle">
                    <span>Вы получите доступ к долгосрочному хранению статистики, а также сможете формировать собственный словарь.</span>
                </div>
                <div className="login-form-fields">
                    <Field className="login-form-fields__item" name="email" component="input" type="email" placeholder="E-mail" required={true} />
                    <Field className="login-form-fields__item" name="password" component="input" type="password" placeholder="Пароль" required={true} minLength={8} />
                </div>
                <div className="login-form-error">
                    <span>{error}</span>
                </div>
                <div className="login-form-submit">
                    <button className="login-form-submit__btn" type="submit">Войти</button>
                </div>
                <div className="login-form-registration" onClick={ () => {
                    toggleLoginOpen(false);
                    toggleSignUpOpen(true);
                }}>
                    <span>Забыли пароль?</span> | <span>Регистрация
                    </span>
                </div>
            </form>
        </div> : null
    );
}

const mapStateToProps = (state: any) => ({
    isLoginOpen: state.login.isLoginOpen,
    user: state.login.user,
    error: state.login.error,
});

const mapDispatchToProps = (dispatch: any) => ({
    toggleLoginOpen: (isLoginOpen: boolean) => {
        dispatch(toggleLoginOpen(isLoginOpen));
    },
    toggleSignUpOpen: (isSignUpOpen: boolean) => {
        dispatch(toggleSignUpOpen(isSignUpOpen));
    },
    loginUser: (name: string, userId: string, photo: string | null, isAuth: boolean, token: string | null) => {
        dispatch(loginUser(name, userId, photo, isAuth, token));
    },
    setLoginError: (error: string | null) => {
        dispatch(setLoginError(error));
    }
});

const LoginFormConnect = connect(mapStateToProps, mapDispatchToProps)(LoginFormRedux);

const LoginForm = reduxForm({
    form: 'login'
})(LoginFormConnect);

export {LoginForm};