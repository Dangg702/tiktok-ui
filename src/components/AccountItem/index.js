import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind"

import styles from "./AccountItem.module.scss"

const cx = classNames.bind(styles)
function AccountItem() {
    return ( 
        <div className={cx("wrapper")}>
            <img className={cx("avatar")} src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/eb59e38a3722b93d20141a47619b9261~c5_100x100.jpeg?x-expires=1688115600&x-signature=xFWZ9xiz0nbghBJuf8qMMK%2BgqT0%3D" alt="" />
            <div className={cx("info")}>
                <p className={cx("name")}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} />
                </p>
                <span className={cx("username")}>nva</span>
            </div>
        </div>
     );
}

export default AccountItem;