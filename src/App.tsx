import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { useGetCountries } from './hooks/useGetCountries';
import { useRegisterUser } from './hooks/useResgisterUser';
import { OkCard } from './components/OkCard';
import { FormInputs, SignUpFrom } from './components/SignUpFrom';
import { I18NTranslate, TranslationContext } from './providers/Translate';
import axios from 'axios';

// this component acts as a container, here I can call api
function App() {
    const [translations, setTranslations] = React.useState<I18NTranslate | null>(null);
    const { error, loading, fetch, user } = useRegisterUser();

    const onSubmit = (
        values: FormInputs,
        e: React.BaseSyntheticEvent<object, any, any> | undefined
    ) => {
        e?.preventDefault();

        fetch(values);
    };

    const { countries, error: countryError, loading: loadingCuontry } = useGetCountries();

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get<I18NTranslate>('./assets/i18n/it-IT.json');
            setTranslations(data);
        })();
    }, []);

    if (loadingCuontry) {
        return <LinearProgress />;
    }

    if (countryError) {
        // TOOO show error component when api countries fail
    }
    return (
        <TranslationContext.Provider value={translations}>
            <Box
                bgcolor="#f8f8f8"
                minHeight="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Container maxWidth="xs">
                    {/* this can be handled with routing */}
                    {user && !error ? (
                        <OkCard user={user} />
                    ) : (
                        <SignUpFrom
                            onSubmit={onSubmit}
                            loading={loading}
                            error={error}
                            countries={countries}
                        />
                    )}
                </Container>
            </Box>
        </TranslationContext.Provider>
    );
}

export default App;
