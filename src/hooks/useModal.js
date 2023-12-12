import { useState } from 'react';

function useModal() {
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
    return { modalIsOpen, typeForm, openModal, closeModal, handleChangeForm };
}

export default useModal;
