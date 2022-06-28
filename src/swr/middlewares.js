import stringify from 'fast-json-stable-stringify';
import { useCallback, useEffect, useRef } from 'react';
// import { showMessage } from 'react-native-flash-message';
// stroe data old data, aviod unnecessary refresh
export const laggy = (useSWRNext) => {
    return (key, fetcher, config) => {
        const laggyDataRef = useRef();

        const swr = useSWRNext(key, fetcher, config);

        useEffect(() => {
            if (swr.data !== undefined) {
                laggyDataRef.current = swr.data;
            }
        }, [swr.data]);

        const resetLaggy = useCallback(() => {
            laggyDataRef.current = undefined;
        }, []);

        const dataOrLaggyData =
            swr.data === undefined ? laggyDataRef.current : swr.data;

        const isLagging =
            swr.data === undefined && laggyDataRef.current !== undefined;
        return Object.assign({}, swr, {
            data: dataOrLaggyData,
            isLagging,
            resetLaggy,
        });
    };
};

// used for key like ['api',id,{ params }]
// inorder to get stable string key
export const serialize = (useSWRNext) => {
    return (key, fetcher, config) => {
        const serializedKey = Array.isArray(key) ? stringify(key) : key;
        return useSWRNext(
            serializedKey,
            (k) => fetcher(...(Array.isArray(key)?JSON.parse(k):k)),
            config
        );
    };
};

// export const flashMessage = (useSWRNext) => {
//     return (key, fetcher, config) => {
//         const swr = useSWRNext(key, fetcher, config);
//         if (swr.error) {
//             showMessage({
//                 message: 'Opps, error happended',
//                 description: swr.error.message,
//                 type: 'danger',
//                 icon:'auto'
//             });
//         }
//         return swr;
//     };
// };