import { useContext } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '~/components/ModalContext';
import { useModal } from '~/hooks';

const customStyles = {
    content: {
        width: 'var(--modal-default-width)',
        maxHeight: 'var(--modal-default-max-height)',
        height: '65%',
        margin: 'auto',
        padding: '0',
        display: 'flex',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: 'var(--white)',
        overflow: 'hidden',
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: '9999',
    },
};

function ModalCustom({ children }) {
    const modalContext = useContext(ModalContext);
    // const { modalIsOpen, closeModal } = useModal();
    return (
        <Modal
            closeTimeoutMS={500}
            isOpen={modalContext.modalIsOpen}
            onRequestClose={modalContext.closeModal}
            style={customStyles}
            appElement={document.getElementById('root')}
        >
            {children}
        </Modal>
    );
}

export default ModalCustom;
