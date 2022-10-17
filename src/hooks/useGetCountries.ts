import React from 'react';
import axios from 'axios';

// this is only a partial interface, i don't need more right now
interface Country {
    translations: {
        [k: string]: { official: string; common: string };
    };
}

export const useGetCountries = () => {
    const [data, setData] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            try {
                // this is called twice in Strict Mode
                // this should only be in dev
                const { data: response } = await axios.get<Country[]>(
                    'https://restcountries.com/v3.1/all'
                );

                setData(
                    response
                        .map(({ translations }) => translations['ita'].official)
                        .sort((a, b) => a.localeCompare(b))
                );
                setError(false);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return {
        countries: data,
        loading,
        error,
    };
};
