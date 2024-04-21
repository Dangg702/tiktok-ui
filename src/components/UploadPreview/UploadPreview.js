import { generateVideoThumbnails, importFileandPreview } from '@rajesh896/video-thumbnails-generator';

import classNames from 'classnames/bind';
import { useRef, useState, useContext, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper/';
import { ModalContext } from '~/components/ModalContext';
import MockupPreview from '~/components/UploadPreview/MockupPreview';
import Button from '~/components/Button';
import {
    ArrowSolidIcon,
    ArrowsFromLineIcon,
    AtSignIcon,
    HashtagIcon,
    HeartVideoIcon,
    InfoRoundIcon,
    LiveMobileIcon,
    MinusIcon,
    MusicIcon,
    OpenCommentIcon,
    PlusIcon,
    ScissorsIcon,
    SearchIcon,
    ShareIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import CheckboxElement from '~/components/CheckboxElement';
import SwitchElement from '~/components/SwitchElement';
import { useGetUser, useVideo } from '~/hooks';
import { postVideoService } from '~/services/postVideoService';
import styles from './UploadPreview.module.scss';

const cx = classNames.bind(styles);

const selectOptions = [
    { title: 'Followers', selected: true },
    { title: 'Friends', selected: false },
    { title: 'Private', selected: false },
];

const checkboxesList = [
    { name: 'comment', label: 'Comment', isChecked: true },
    { name: 'duet', label: 'Duet', isChecked: true },
    { name: 'stitch', label: 'Stitch', isChecked: true },
];

function UploadPreview({ file, userData }) {
    const [showOptions, setShowOptions] = useState(false);
    const [selections, setSelection] = useState(selectOptions);
    const [selectedValue, setSelectedValue] = useState('Followers');
    const [checkedItems, setCheckedItems] = useState(checkboxesList);
    const [scheduleSwitch, setScheduleSwitch] = useState(false);
    const [discloseSwitch, setDiscloseSwitch] = useState(false);
    const [copyrightSwitch, setCopyrightSwitch] = useState(false);
    const [showDiscloseExpanded, setShowDiscloseExpanded] = useState(false);
    const [showCopyrightExpanded, setShowCopyrightExpanded] = useState(false);
    const [hideSubtitles, setHideSubtitles] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [caption, setCaption] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoThumb, setVideoThumb] = useState('');
    const [thumbnails, setThumbnails] = useState([]);
    const [duration, setDuration] = useState(0);
    const [fullDuration, setFullDuration] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [slideValue, setSlideValue] = useState(0);

    const captionRef = useRef();
    const videoRef = useRef();
    const sliderRef = useRef();
    const sliderTrack = useRef();

    // const { currentTime, calculateTime } = useVideo(videoRef);

    const iconClasses = cx('selector-icon', { rotate180: showOptions });

    const { data } = useGetUser();

    useEffect(() => {
        if (file) {
            importFileandPreview(file).then((res) => {
                setVideoUrl(res); //blob
                setFullDuration(videoRef.current.duration);
                setDuration(Math.floor(videoRef.current.duration));
            });
            setVideoThumb('');
        }
    }, [file]);
    useEffect(() => {
        generateVideoThumbnails(file, 7).then((thumbs) => {
            setThumbnails(thumbs);
            setVideoThumb(thumbs[0]);
        });
    }, [file]);

    const upLoadFile = () => {
        const fetchApi = async () => {
            const FormData = require('form-data');
            const formData = new FormData();

            formData.append('description', caption);

            formData.append('upload_file', file);
            formData.append('thumbnail_time', 5);
            formData.append('music', 'Hot Trend Tiktok 2023 Music!');
            formData.append('viewable', 'public');

            const result = await postVideoService(formData);
        };
        fetchApi();
    };

    const handleThumbnail = (e) => {
        setVideoThumb(e.target.src);
        console.log('videoThumb', videoThumb);
    };
    const changeThumbnail = () => {
        sliderTrack.current.style.setProperty('--slide-data', `${sliderRef.current.value}%`);
        sliderRef.current.setAttribute('value', sliderRef.current.value);
        setSlideValue(sliderRef.current.value);
        setCurrentValue((fullDuration / 100) * sliderRef.current.value);
        console.log('duration: ', fullDuration);
        console.log('slide value: ', sliderRef.current.value);
    };
    const handleShowOptions = () => {
        setShowOptions(!showOptions);
    };
    const handleSelectOption = (id) => {
        setSelectedValue(selections[id].title);
        setSelection((prev) =>
            prev.map((item, index) => (index === id ? { ...item, selected: true } : { ...item, selected: false })),
        );
        setShowOptions(false);
    };
    const handleCheckedItems = (event) => {
        setCheckedItems((prev) =>
            prev.map((item) => (item.name === event.target.name ? { ...item, isChecked: event.target.checked } : item)),
        );
    };
    const handleToggleSwitch = (title) => {
        if (title === 'schedule') {
            setScheduleSwitch(!scheduleSwitch);
        } else if (title === 'disclose') {
            setDiscloseSwitch(!discloseSwitch);
            !discloseSwitch ? setShowDiscloseExpanded(true) : setShowDiscloseExpanded(false);
            console.log(discloseSwitch);
        } else if (title === 'copyright') {
            setCopyrightSwitch(!copyrightSwitch);
            if (!copyrightSwitch) {
                setHideSubtitles(true);
                setShowCopyrightExpanded(true);
            } else {
                setHideSubtitles(false);
                setShowCopyrightExpanded(false);
            }
        }
    };
    const handleChangeCaption = () => {
        const captionText = captionRef.current.innerText;
        setCaption(captionText);
        setWordCount(captionText.length);
        if (captionText.length > 2200) {
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'top')}>
                <div className={cx('edit-card', 'selected')}>
                    <div className={cx('video-info')}>
                        <div className={cx('video-index')}>
                            <span>1</span>
                        </div>
                        <div className={cx('video-cover')}>
                            {/* <div className={cx('video-cover-loading-block')}></div> */}
                            {/* <video className={cx('video-cover-img')} src="" alt="video thumbnail" /> */}
                            <video className={cx('video-cover-img')} src={videoUrl} />
                        </div>
                        <div className={cx('video-basic')}>
                            <span className={cx('file-name')}>{file.name.slice(0, -4)}</span>
                            <div className={cx('video-time')}>
                                <span>00:00 - {duration}</span>
                                <span>{duration}s</span>
                            </div>
                        </div>
                    </div>
                    <Button className={cx('action-btn')} primary leftIcon={<ScissorsIcon />}>
                        Edit video
                    </Button>
                </div>

                <div className={cx('split-card', 'disabled')}>
                    <div className={cx('split-body')}>
                        <span className={cx('description')}>Split into multiple parts to get more exposure</span>
                        <div className={cx('split-increment')}>
                            <span className={cx('icon', 'minus', 'disabled')}>
                                <MinusIcon />
                            </span>
                            <span className={cx('split-num')}>
                                <input className={cx('split-num-input')} type="number" value="2" />
                            </span>
                            <span className={cx('icon', 'plus', 'disabled')}>
                                <PlusIcon />
                            </span>
                        </div>
                    </div>
                    <Button
                        className={cx('action-btn')}
                        outlineGray
                        disabled
                        leftIcon={<ArrowsFromLineIcon />}
                        style={{ color: 'rgba(22, 24, 35, 0.34)' }}
                    >
                        Split
                    </Button>
                </div>
            </div>

            <div className={cx('container', 'bottom')}>
                <div className={cx('post-title')}>
                    <h1>Upload video</h1>
                    <div className={cx('sub-title')}>
                        <span>Post a video to your account</span>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <MockupPreview url={videoUrl} data={userData} caption={caption} fileName={file.name} />

                    <div className={cx('post-contents')}>
                        <div className={cx('form')}>
                            <div className={cx('caption-wrap')}>
                                <div className={cx('caption-container')}>
                                    <div>
                                        <div className={cx('title-wrap')}>
                                            <span className={cx('form-title')}>Caption</span>
                                            <span className={cx('word-count')}>{wordCount} / 2200</span>
                                        </div>
                                        <div className={cx('input-wrap')}>
                                            <div
                                                ref={captionRef}
                                                className={cx('input')}
                                                contentEditable
                                                spellCheck="false"
                                                suppressContentEditableWarning={true}
                                                onInput={handleChangeCaption}
                                            ></div>
                                            <div className={cx('input-controls')}>
                                                <button className={cx('icon')}>
                                                    <AtSignIcon />
                                                </button>
                                                <button className={cx('icon')}>
                                                    <HashtagIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('cover-wrap')}>
                                <div className={cx('form-title')}>Cover</div>
                                <div className={cx('cover-container')}>
                                    <div className={cx('cover-background')}>
                                        {/* list thumbnail */}
                                        {thumbnails.map((thumbnail, index) => (
                                            <img
                                                key={index}
                                                className={cx('cover-bg-item')}
                                                src={thumbnail}
                                                alt="Drag to change"
                                                onClick={(e) => handleThumbnail(e)}
                                            />
                                        ))}
                                    </div>
                                    <div className={cx('cover-slider')}>
                                        <div className={cx('cover-slider-track')} ref={sliderTrack}>
                                            <div className={cx('cover-slider-thumb')}>
                                                <div className={cx('video-slider')}>
                                                    {/* + '#t=1.5' */}
                                                    <video
                                                        preload="metadata"
                                                        ref={videoRef}
                                                        src={videoUrl + `#t=${currentValue}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            ref={sliderRef}
                                            type="range"
                                            min="0"
                                            max="100"
                                            onChange={changeThumbnail}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* test */}
                            <div>
                                {/* <img src={videoUrl + `#t=${currentValue}`} alt="" /> */}
                                {/* <video src={videoUrl + `#t=${currentValue}`} /> */}
                            </div>
                            <div className={cx('allow-options')}>
                                <div className={cx('form-title')}>Who can watch this video</div>
                                <div className={cx('select-options')}>
                                    <Tippy
                                        visible={showOptions}
                                        interactive
                                        placement="bottom"
                                        offset={[0, 3]}
                                        // delay={[500, 500]}
                                        render={(attrs) => (
                                            <div className={cx('options')} tabIndex="-1" {...attrs}>
                                                <PopperWrapper>
                                                    {selections.map((option, index) => (
                                                        <div
                                                            key={index}
                                                            className={cx('option', { selected: option.selected })}
                                                            onClick={() => handleSelectOption(index)}
                                                        >
                                                            {option.title}
                                                        </div>
                                                    ))}
                                                </PopperWrapper>
                                            </div>
                                        )}
                                    >
                                        <div className={cx('selector')} onClick={handleShowOptions}>
                                            <div className={cx('selector-title')}>{selectedValue}</div>
                                            <div className={iconClasses}>
                                                <ArrowSolidIcon />
                                            </div>
                                        </div>
                                    </Tippy>
                                </div>
                                <div className={cx('form-title')}>Allow user to:</div>
                                <div className={cx('checkbox-group')}>
                                    {checkedItems.map((checkbox, index) => (
                                        <div className={cx('checkbox-item')} key={index}>
                                            <CheckboxElement
                                                checked={checkbox.isChecked}
                                                name={checkbox.name}
                                                label={checkbox.label}
                                                onChange={handleCheckedItems}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('schedule-wrap')}>
                                <SwitchElement
                                    title="Schedule video"
                                    icon={<InfoRoundIcon />}
                                    isChecked={scheduleSwitch}
                                    onClick={() => handleToggleSwitch('schedule')}
                                />
                            </div>
                            <div className={cx('disclose-wrap')}>
                                <SwitchElement
                                    title="Disclose video content"
                                    isChecked={discloseSwitch}
                                    onClick={() => handleToggleSwitch('disclose')}
                                />
                                <span className={cx('sub-title')}>
                                    Let others know this video promotes a brand, product or service.
                                </span>
                                <div className={cx('disclose-expand', { show: showDiscloseExpanded })}>
                                    <div className={cx('content-wrap', 'mb-16')}>
                                        <CheckboxElement
                                            name="brand"
                                            value="brand"
                                            label="Your brand"
                                            checkRight
                                            className={cx('mb-6')}
                                        />
                                        <span className={cx('desc')}>
                                            You are promoting yourself or your own business.
                                        </span>
                                    </div>
                                    <div className={cx('content-wrap')}>
                                        <CheckboxElement
                                            name="content"
                                            value="content"
                                            label="Branded content"
                                            checkRight
                                            className={cx('mb-6')}
                                        />
                                        <span className={cx('desc')}>
                                            You are in a paid partnership with a brand. After posting the video, open
                                            your TikTok mobile app and link the campaign under the video’s “Ad
                                            settings”.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('copyright-wrap')}>
                                <SwitchElement
                                    title="Run a copyright check"
                                    isChecked={copyrightSwitch}
                                    onClick={() => handleToggleSwitch('copyright')}
                                />
                                <span className={cx('sub-title', { hide: hideSubtitles })}>
                                    We'll check your video for potential copyright infringements on used sounds. If
                                    infringements are found, you can edit the video before posting.
                                    <span>Learn more</span>
                                </span>
                                <div className={cx('copyright-expand', { show: showCopyrightExpanded })}>
                                    <div className={cx('tool-tip', 'mb-6')}>
                                        <span>No issues detected.</span>
                                    </div>
                                    <span className={cx('desc')}>
                                        Note: Results of copyright checks aren't final. For instance, future changes of
                                        the copyright holder's authorization to the sound may impact your video. <br />
                                    </span>
                                    <strong>Learn more</strong>
                                </div>
                            </div>
                            <div className={cx('btn-wrap')}>
                                <Button outlineGray large>
                                    Discard
                                </Button>
                                <Button
                                    primary
                                    large
                                    onClick={() => {
                                        upLoadFile();
                                    }}
                                    to="/"
                                >
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadPreview;
