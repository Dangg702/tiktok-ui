import { useEffect, useRef, useState } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';

import * as request from '~/utils/request';
import * as searchServices from '~/apiServices/searchServices';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper/';
import styles from './Search.module.scss';
import { useDebounced } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    // Chỉ gửi request khi người dùng gõ xong
    const debounced = useDebounced(searchValue, 500);

    useEffect(() => {
        if (debounced === '') {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debounced);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <>
            {/* Search box */}
            <HeadlessTippy
                interactive={true} //cho phep click vao ben trong tooltip
                visible={showResult && searchResult.length > 0} //set dk hien thi kq tim kiem
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Acounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm"
                        spellCheck={false}
                        onChange={(e) => {
                            if (!e.target.value.startsWith(' ')) {
                                setSearchValue(e.target.value);
                            }
                        }}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    <button className={cx('loading')}>{loading && <FontAwesomeIcon icon={faSpinner} />}</button>
                    <span className={cx('separate')}></span>
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </>
    );
}

export default Search;
