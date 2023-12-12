import classNames from 'classnames/bind';
import styles from '../VideoItem.module.scss';

import {
    EmailIcon,
    EmbedIcon,
    FacebookIcon,
    LineIcon,
    LinkIcon,
    LinkedInIcon,
    PinterestIcon,
    RedditIcon,
    SendIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsAppIcon,
} from '~/components/Icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export const shareListItem = [
    {
        icon: EmbedIcon,
        title: 'Embed',
    },
    {
        icon: SendIcon,
        title: 'Send to friends',
    },
    {
        icon: FacebookIcon,
        title: 'Share to Facebook',
    },
    {
        icon: WhatsAppIcon,
        title: 'Share to WhatsApp',
    },
    {
        icon: LinkIcon,
        title: 'Copy link',
    },
    {
        icon: TwitterIcon,
        title: 'Share to Twitter',
    },
    {
        icon: LinkedInIcon,
        title: 'Share to LinkedIn',
    },
    {
        icon: RedditIcon,
        title: 'Share to Reddit',
    },
    {
        icon: TelegramIcon,
        title: 'Share to Telegram',
    },
    {
        icon: EmailIcon,
        title: 'Share to Email',
    },
    {
        icon: LineIcon,
        title: 'Share to Line',
    },
    {
        icon: PinterestIcon,
        title: 'Share to Pinterest',
    },
];

export const renderAllItem = () => {
    return shareListItem.map((item, index) => (
        <Button key={index} href="#" className={cx('share-item')} leftIcon={<item.icon />}>
            {item.title}
        </Button>
    ));
};

export const render5FirstItem = () => {
    return shareListItem.slice(0, 5).map((item, index) => (
        <Button key={index} href="#" className={cx('share-item')} leftIcon={<item.icon />}>
            {item.title}
        </Button>
    ));
};
