import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/components/Image';
import VideoInfo from '~/components/VideoInfo';
import VideoItem from '~/components/VideoItem';
import styles from './Content.module.scss';
import AccountPreview from '~/components/AccountPreview';

const cx = classNames.bind(styles);

function Content({ data }) {
    return (
        <div className={cx('one-column-container')}>
            {data.map((item, index) => (
                <div key={index} className={cx('list-item-container')}>
                    <div>
                        <Tippy
                            delay={[800, 500]}
                            offset={[-20, 5]}
                            interactive
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className={cx('account-preview')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper className={cx('account-popper')}>
                                        <AccountPreview data={item.user} />
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <Image className={cx('avatar-anchor')} src={item.user.avatar} alt="avatar" />
                        </Tippy>
                    </div>
                    <div className={cx('content-container')}>
                        {/* Video info */}
                        <VideoInfo data={item} />
                        {/* Video */}
                        <VideoItem data={item} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Content;
