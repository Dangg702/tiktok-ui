import { createContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
    const [typeForm, setTypeForm] = useState('login');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleChangeForm = (form) => {
        setTypeForm(form);
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
