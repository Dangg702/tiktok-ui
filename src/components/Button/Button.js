import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

function Button(
    {
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
    },
    ref,
) {
    let Comp = 'button';
    // props chứa các props nội bộ và passProps chứa các props mở rộng (target, ...)
    const props = {
        onClick,
        ...passProps,
    };
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
        <Comp ref={ref} className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default forwardRef(Button);
