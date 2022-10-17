import React from 'react';
import { TranslationContext } from '../providers/Translate';

// this is only a small implementation of translate
export const useTranslate = () => {
    const context = React.useContext(TranslationContext);

    return (key: string, fallback?: string): string => {
        if (!context) return '';
        // now are allowed only string separated by dot
        // TODO fix type
        const translation = key
            .split('.')
            .reduce((acc, k) => acc[k] as any, context) as unknown as string;

        return translation ?? fallback ?? key;
    };
};
