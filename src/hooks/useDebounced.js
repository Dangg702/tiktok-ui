import { useState, useEffect } from 'react';

// Hàm debounce giúp hạn chế số lần gọi hàm xử lý (gửi request -> API ) khi người dùng gõ phím
// Hàm nhận 1 value và delay 1 khoảng tg rồi mới set lại value
function useDebounced(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}

export default useDebounced;
