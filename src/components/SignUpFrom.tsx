import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { Form, ControlledInput, ControlledSelect } from './Form';
import { RequiredField, FieldError } from './Errors';
import { KoCard } from './KoCard';
import { Gender, RegisterUserError } from '../models/user';
import { useTranslate } from '../hooks/useTranslate';

export type FormInputs = {
    name: string;
    surname: string;
    gender: Gender;
    phone: string;
    country: string;
    email: string;
    password: string;
    repeatPassword: string;
};

export interface SignUpFromProps {
    onSubmit: (
        values: FormInputs,
        e: React.BaseSyntheticEvent<object, any, any> | undefined
    ) => void;
    loading: boolean;
    error: RegisterUserError[] | null;
    countries: string[];
}

export const SignUpFrom = ({ onSubmit, loading, error, countries }: SignUpFromProps) => {
    const { handleSubmit, control, getValues } = useForm<FormInputs>();
    const translate = useTranslate();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} columns={12}>
                {loading && (
                    <Grid item xs={12}>
                        <LinearProgress />
                    </Grid>
                )}

                {error && <KoCard error={error} />}

                <Grid item xs={6}>
                    <ControlledInput
                        control={control}
                        name="name"
                        label="Nome"
                        required
                        errorMessage={() => <RequiredField />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ControlledInput
                        control={control}
                        name="surname"
                        label="Cognome"
                        required
                        errorMessage={() => <RequiredField />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ControlledSelect
                        control={control}
                        name="gender"
                        label="Sesso"
                        required
                        errorMessage={() => <RequiredField />}
                    >
                        <MenuItem value={'female'}>{translate('gender.female')}</MenuItem>
                        <MenuItem value={'male'}>{translate('gender.male')}</MenuItem>
                    </ControlledSelect>
                </Grid>
                <Grid item xs={6}>
                    <ControlledInput
                        control={control}
                        name="phone"
                        label="Telefono"
                        required
                        type="tel"
                        errorMessage={() => <RequiredField />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ControlledSelect
                        control={control}
                        name="country"
                        label="Nazione"
                        required
                        errorMessage={() => <RequiredField />}
                    >
                        {countries.map((c, i) => (
                            <MenuItem value={c} key={i}>
                                {c}
                            </MenuItem>
                        ))}
                    </ControlledSelect>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                        <ControlledInput
                            control={control}
                            name="email"
                            label="E-mail"
                            required
                            errorMessage={(e) =>
                                e?.type === 'pattern' ? (
                                    <FieldError message="Il fomrato della mail non è corretto" />
                                ) : (
                                    <RequiredField />
                                )
                            }
                            pattern={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
                        />
                        <Tooltip title="esempio@esempio.com" arrow placement="top">
                            <InfoIcon />
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <ControlledInput
                        control={control}
                        name="password"
                        label="Password"
                        required
                        errorMessage={() => <RequiredField />}
                        type="password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <ControlledInput
                        control={control}
                        name="repeatPassword"
                        label="Ripeti Password"
                        required
                        errorMessage={(e) =>
                            e?.type === 'required' ? (
                                <RequiredField />
                            ) : (
                                <FieldError message="La password non corrisponde" />
                            )
                        }
                        type="password"
                        validate={(v) => v === getValues().password}
                    />
                </Grid>
            </Grid>

            <Box marginTop="1rem">
                <Button variant="contained" type="submit" size="large" fullWidth disabled={loading}>
                    REGISTRATI
                </Button>
            </Box>
        </Form>
    );
};
