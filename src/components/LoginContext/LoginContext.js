import { createContext, useContext } from 'react';
import React, { useState, useEffect, useNavigate } from 'react';
import * as AuthService from '~/services/authService';
import { ModalContext } from '../ModalContext';

const LoginContext = createContext();

function LoginProvider({ children }) {
    const [data, setData] = useState();
    const [showError, setShowError] = useState(false);
    const [isNotify, setIsNotify] = useState(false);
    const contentModal = useContext(ModalContext);
    const [loading, setLoading] = useState(false);
    const [showErrorRegister, setShowErrorRegister] = useState(false);

    //data random user
    const [dataUser, setDataUser] = useState();

    const handleDeleteData = () => {
        setData(null);
    };

    const handleSetData = (data) => {
        setData(data);
    };

    const handleSetDataUser = (data) => {
        setDataUser(data);
    };

    const fetchApi = async (email, password) => {
        setLoading(true);
        const result = await AuthService.login(email, password);

        if (result) {
            setData(result.data);
            localStorage.setItem('token', result.meta.token);

            setShowError(false);
            setTimeout(() => {
                setLoading(false);
                contentModal.handleHideModal();
                setIsNotify(true);
            }, 2500); // Thời gian là 2.8 giây (2800 milliseconds)
            setTimeout(() => {
                setIsNotify(false);
            }, 2200); // Thời gian là 2.8 giây (2800 milliseconds)
            window.location.reload();
        } else {
            setLoading(false);
            setShowError(true);
        }
    };

    const handleLogOut = async () => {
        setLoading(true);
        await AuthService.logout();
        localStorage.removeItem('token');
        setData(null);
        contentModal.setIsLogout(true);
        setLoading(false);
        setTimeout(() => {
            contentModal.setIsLogout(false);
        }, 2200);
    };

    const values = {
        data,
        dataUser,
        showError,
        isNotify,
        loading,
        showErrorRegister,
        setShowErrorRegister,
        setShowError,
        fetchApi,
        handleSetData,
        handleDeleteData,
        handleSetDataUser,
        handleLogOut,
    };
    return <LoginContext.Provider value={values}>{children}</LoginContext.Provider>;
}

export { LoginContext, LoginProvider };
