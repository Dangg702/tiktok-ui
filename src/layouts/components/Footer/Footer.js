import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { LogoIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const footerContent = [
    {
        header: 'Company',
        items: [
            { title: 'About', to: 'https://www.tiktok.com/about?lang=en' },
            { title: 'Newsroom', to: 'https://newsroom.tiktok.com/' },
            { title: 'Contact', to: 'https://www.tiktok.com/about/contact?lang=en' },
            { title: 'Careers', to: 'https://careers.tiktok.com/' },
            { title: 'ByteDance', to: 'https://www.bytedance.com/' },
        ],
    },
    {
        header: 'Programs',
        items: [
            { title: 'TikTok for Good', to: 'https://www.tiktok.com/forgood' },
            {
                title: 'Advertise',
                to: 'https://www.tiktok.com/business/?attr_source=tt_official_site&attr_medium=tt_official_site_guidance&refer=tiktok_web',
            },
            { title: 'Developers', to: 'https://developers.tiktok.com/?refer=tiktok_web' },
            { title: 'TikTok Rewards', to: 'https://https://www.tiktok.com/tiktok-rewards/en.tiktok.com/' },
            { title: 'TikTok Embeds', to: 'https://www.tiktok.com/embed' },
        ],
    },
    {
        header: 'Support',
        items: [
            { title: 'Help Center', to: 'https://support.tiktok.com/en' },
            { title: 'Safety Center', to: 'https://www.tiktok.com/safety?lang=en' },
            { title: 'Creator Portal', to: 'https://www.tiktok.com/creators/creator-portal/en-us/' },
            { title: 'Community Guidelines', to: 'https://www.tiktok.com/community-guidelines?lang=en' },
            { title: 'Transparency', to: 'https://www.tiktok.com/transparency' },
            { title: 'Accessibility', to: 'https://www.tiktok.com/accessibility' },
        ],
    },
    {
        header: 'Legal',
        items: [
            { title: 'Terms of Use', to: 'https://www.tiktok.com/legal/terms-of-service?lang=en' },
            { title: 'Privacy Policy', to: 'https://www.tiktok.com/legal/privacy-policy-row?lang=en' },
        ],
    },
];

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <footer className={cx('content')}>
                <div className={cx('tiktok-logo')}>
                    <LogoIcon className={cx('logo')} />
                </div>
                <div className={cx('items-container')}>
                    {footerContent.map((data, index) => (
                        <div key={index} className={cx('content-column')}>
                            <h4 className={cx('title')}>{data.header}</h4>
                            {data.items.map((item, i) => (
                                <a key={i} className={cx('item')} href={item.to}>
                                    <h5>{item.title}</h5>
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </footer>
        </div>
    );
}

export default Footer;
