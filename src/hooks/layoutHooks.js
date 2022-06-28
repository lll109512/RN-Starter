import {useState} from 'react';

export const useLayout = () => {
    const [layout, setLayout] = useState({
        height: 0,
    });
    const onLayout = ({nativeEvent}) => {
        setLayout(nativeEvent.layout);
    };

    return [layout, onLayout];
};
