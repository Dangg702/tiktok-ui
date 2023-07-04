import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outlinePrimary = false,
    outlineGray = false,
    rounded = false,
    disabled = false,
    leftIcon = false,
    rightIcon = false,
    small = false,
    large = false,
    children,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    // props chứa các props nội bộ và passProps chứa các props mở rộng (target, ...)
    const props = {
        onClick,
        ...passProps,
    };

    // handle button disabled
    if (disabled) {
        // Cach 1
        // delete props.disabled;

        // Cach 2
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    // kt các props và gán tag phù hợp
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className, //lay value cua className lam key
        primary,
        outlinePrimary,
        outlineGray,
        rounded,
        disabled,
        small,
        large,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired, //bắt buộc chứa các kiểu DL có thể render được
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outlinePrimary: PropTypes.bool,
    outlineGray: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    small: PropTypes.bool,
    large: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
