import classNames from 'classnames/bind';

import styles from './CheckboxElement.module.scss';

const cx = classNames.bind(styles);

function CheckboxElement({
    className,
    checkRight = false,
    checked,
    id,
    name,
    value,
    label,
    width,
    height,
    textSize,
    onChange,
    ...passProps
}) {
    const classes = cx('label-checkbox', {
        [className]: className,
        checkRight,
    });
    const props = {
        onChange,
        ...passProps,
    };
    const styles = {
        width: width,
        height: height,
    };
    const spanStyle = {
        fontSize: textSize,
    };
    return (
        <label className={classes} {...props}>
            <input
                className={cx('checkbox')}
                type="checkbox"
                id={id}
                name={name}
                value={value}
                checked={checked}
                style={styles}
            />
            <span style={spanStyle}>{label}</span>
        </label>
    );
}

export default CheckboxElement;
