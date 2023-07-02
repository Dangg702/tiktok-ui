import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import { useState } from 'react'

import { Wrapper as PopperWrapper } from '~/components/Popper/';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {}

function Menu({ children, items = [], onChange=defaultFn }) {
    
    const [history, setHistory] = useState([{data: items}])
    const current = history[history.length - 1];
    

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return <MenuItem key={index} data={item} onClick={() => {
                if(isParent) {
                    setHistory(prev => [...prev, item.children])
                } else {
                    onChange(item)
                }
            }}/>
        })
    }

    return ( 
        <Tippy
            interactive={true} //cho phep click vao ben trong tooltip
            // visible
            delay={[0, 700]}
            placement='bottom-end'
            offset={[12, 8]}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {/* có từ 2 cấp trở lên thì hiện header */}
                        {history.length > 1 && (
                            <Header title={history[history.length - 1].title} 
                                    onBack={() => {
                                        setHistory(prev => prev.slice(0, prev.length - 1) )
                                }}
                            />)
                        }
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            // luon quay lai trang dau tien sau khi tat menu
            onHide={() => {
                setHistory(prev => prev.slice(0, 1))
            }}
            >
                {children}
        </Tippy>
    );
}

export default Menu;