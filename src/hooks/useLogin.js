import { useState, useContext } from 'react';
import * as AuthService from '~/services/authService';
import { ModalContext } from '~/components/ModalContext';

export default function useLogin() {
    const [data, setData] = useState();
    let [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(localStorage.getItem('token') !== null);
    // let [loading, setLoading] = useState(false);

    const modalContext = useContext(ModalContext);

    const login = async (email, password) => {
        const result = await AuthService.login(email, password);
        if (result) {
            console.log('login result', result);
            setData(result.data); // not work
            setError(null);
            localStorage.setItem('token', result.meta.token);
            localStorage.setItem('username', JSON.stringify(result.data.nickname));
            setIsLogin(true);
            modalContext.closeModal();
            window.location.reload();
        } else {
            setError("Username or password doesn't match our records. Try again.");
        }
    };
    const logOut = async () => {
        await AuthService.logout();
        modalContext.closeModal();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setData({});
        setError(null);
        setIsLogin(false);
        window.location.reload();
    };

    return { data, error, isLogin, login, logOut };
}
