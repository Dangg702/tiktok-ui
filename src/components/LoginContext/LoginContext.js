import { createContext, useState, useContext } from 'react';
import * as AuthService from '~/services/authService';
import { ModalContext } from '../ModalContext';

const LoginContext = createContext();

function LoginProvider({ children }) {
    const [data, setData] = useState({});
    const [showError, setShowError] = useState(false);
    const [isNotify, setIsNotify] = useState(false);
    // const [isLogin, setIsLogin] = useState(localStorage.getItem('token') !== null);
    const modalContext = useContext(ModalContext);

    const handleLogOut = async () => {
        const result = await AuthService.logout();
        setData(result);
        // setIsLogin(false);
        modalContext.closeModal();
        localStorage.removeItem('token');
        window.location.reload();
    };

    const fetchApi = async (email, password) => {
        const result = await AuthService.login(email, password);
        if (result) {
            localStorage.setItem('token', result.meta.token);
            setData(result); //not work
            setIsNotify(true);
            setShowError(false);
            modalContext.closeModal();
            window.location.reload();
        } else {
            setShowError(true);
        }
    };

    // const fetchCurrentUser = async () => {
    //     const result = await getUserService.getCurrentUser();
    //     if (result) {
    //         setData(result);
    //         // setNickname(result.nickname);
    //         console.log('current user: ', data);
    //     }
    // };

    const values = {
        data,
        showError,
        isNotify,
        handleLogOut,
        fetchApi,
    };
    return <LoginContext.Provider value={values}>{children}</LoginContext.Provider>;
}

export { LoginContext, LoginProvider };
