import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useModal } from '~/hooks';
import Button from '~/components/Button/Button';
import classNames from 'classnames/bind';
import styles from './EditProfileForm.module.scss';
import Image from '~/components/Image';
import { LoginContext } from '~/components/LoginContext';
import { EditIcon } from '~/components/Icons';
import { UpdateProfileService } from '~/services/updateProfileService';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        width: '700px',
        padding: '20px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        border: '1px solid rgba(22, 24, 35, 0.03)',
        boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 8px',
        backgroundColor: 'var(--white)',
        overflow: 'none',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: '999',
    },
};

function EditProfileForm({ children }) {
    const contextLogin = useContext(LoginContext);
    const { openModal, closeModal, modalIsOpen } = useModal();

    const [newAvatar, setNewAvatar] = useState(null);
    const [newLastName, setNewLastName] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLink, setNewLink] = useState('');
    const [newBio, setNewBio] = useState('');
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        setNewLastName(contextLogin.data.last_name);
        setNewFirstName(contextLogin.data.first_name);
        setNewLink(contextLogin.data.website_url);
        setNewBio(contextLogin.data.bio);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUpdateImage = (event) => {
        setNewAvatar(event.target.files[0]);
        setIsChange(true);
    };

    const handleUpdateLastName = (event) => {
        setNewLastName(event.target.value);
        if (event.target.value !== contextLogin.data.last_name) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    };

    const handleUpdateFirstName = (event) => {
        setNewFirstName(event.target.value);
        if (event.target.value !== contextLogin.data.first_name) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    };

    const handleUpdateNewLink = (event) => {
        setNewLink(event.target.value);
        if (event.target.value !== contextLogin.data.website_url) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    };

    const handleUpdateNewBio = (event) => {
        setNewBio(event.target.value);
        if (event.target.value !== contextLogin.data.bio) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    };
    const fetchApi = async () => {
        const FormData = require('form-data');
        const formData = new FormData();

        if (newAvatar !== null) {
            formData.append('avatar', newAvatar);
        }

        formData.append('last_name', newLastName);

        formData.append('first_name', newFirstName);
        if (newLink !== null) {
            formData.append('website_url', newLink);
        }
        formData.append('bio', newBio);

        const result = await UpdateProfileService(formData);

        console.log('result update profile: ', result);
        setIsChange(false);
        closeModal();
    };

    return (
        <>
            <Button className={cx('edit-btn')} outlineGray large leftIcon={<EditIcon />} onClick={() => openModal()}>
                Edit profile
            </Button>
            <Modal
                id="modal-edit-profile"
                closeTimeoutMS={500}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                appElement={document.getElementById('root')}
            >
                <div className={cx('modal-edit-profile-wrapper')}>
                    <div className={cx('edit-profile-title')}>Edit Profile</div>
                    <div className={cx('edit')}>
                        <span className={cx('text')}>Profile photo</span>
                        <div className={cx('change-avatar')}>
                            <Image src={contextLogin.data.avatar} className={cx('image-profile')} atl="" />
                            <input
                                className={cx('input-file')}
                                id="change-avatar"
                                type="file"
                                accept="image/*"
                                onChange={handleUpdateImage}
                            />
                            <label className={cx('label-upload')} htmlFor="change-avatar"></label>
                        </div>
                    </div>
                    <div className={cx('edit')}>
                        <span className={cx('text')}>Name</span>
                        <div className={cx('cover-input')}>
                            <div>
                                <div className={cx('input-data')}>
                                    <input
                                        value={newLastName}
                                        type="text"
                                        placeholder="Last name..."
                                        onChange={handleUpdateLastName}
                                    />
                                </div>
                                <div className={cx('input-data')} style={{ marginTop: '20px' }}>
                                    <input
                                        value={newFirstName}
                                        type="text"
                                        placeholder="First name..."
                                        onChange={handleUpdateFirstName}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('edit')}>
                        <span className={cx('text')}>Web Link</span>
                        <div className={cx('cover-input')}>
                            <div className={cx('input-data')}>
                                <input
                                    value={newLink}
                                    type="text"
                                    placeholder="Web..."
                                    onChange={handleUpdateNewLink}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('edit')}>
                        <span className={cx('text')}>Bio</span>
                        <div className={cx('cover-input')}>
                            <div className={cx('input-data')}>
                                <input value={newBio} type="text" placeholder="Bio..." onChange={handleUpdateNewBio} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('edit-profile-btn-wrapper')}>
                        <Button outlineGray onClick={() => closeModal()}>
                            Cancel
                        </Button>
                        <Button outlinePrimary disabled={!isChange} onClick={fetchApi}>
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default EditProfileForm;
