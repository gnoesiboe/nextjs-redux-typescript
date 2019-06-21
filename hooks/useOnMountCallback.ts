import { useEffect, EffectCallback } from 'react';

export const useOnMountCallback = (callback: EffectCallback) => {
    useEffect(() => {
        return callback();
    }, []);
};
