import { useState, useEffect } from 'react'

const PREFIX = 'react-chatapp-';

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;

    // use the function version of useState because getting values from local
    // storage and parsing the json is slow. So we only want to do this once
    // when we run this function
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null && jsonValue !== 'undefined') {
            return JSON.parse(jsonValue);
        } else if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value])

    return [value, setValue];
}
