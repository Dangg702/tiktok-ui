import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [typeForm, setTypeForm] = useState('login');

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleChangeForm = (type) => {
        setTypeForm(type);
    };

    const values = {
        modalIsOpen,
        typeForm,
        openModal,
        closeModal,
        handleChangeForm,
    };
    return <ModalContext.Provider value={values}>{children}</ModalContext.Provider>;
}

export { ModalContext, ModalProvider };
