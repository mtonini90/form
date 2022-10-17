import React from 'react';

export interface I18NTranslate {
    [k: string]: string | I18NTranslate;
}

export const TranslationContext = React.createContext<I18NTranslate | null>(null);
