import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import styles from './Image.module.scss';

// Để tippy lấy được ref của componet thì phải dùng forwardRef để lấy được

// Giai quyet render img mac dinh khi anh loi nếu có truyền fallback thì ưu tiên render ảnh fallback (src --> fallback --> default img)
const Image = forwardRef(
    ({ src, alt, className, fallback: customFallback = images.noImage, onClick, ...props }, ref) => {
        const [fallback, setFallback] = useState('');

        const handleError = () => {
            setFallback(customFallback);
        };

        // mặc định Image có css của wrapper còn các className để custom sau này

        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallback || src}
                alt={alt}
                {...props}
                onError={handleError}
                onClick={onClick}
            />
        );
    },
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
    onClick: PropTypes.func,
};

export default Image;
