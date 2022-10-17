import React from 'react';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {
    Control,
    Controller,
    FieldError,
    Message,
    ValidationRule,
    Validate,
} from 'react-hook-form';

export interface FormProps {
    children: React.ReactNode;
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

export const Form = ({ children, onSubmit }: FormProps) => {
    return (
        <form onSubmit={onSubmit}>
            <Box
                padding="3rem"
                margin="3rem 0"
                boxShadow="rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem"
                borderRadius=".5rem"
                bgcolor="#ffffff"
            >
                {children}
            </Box>
        </form>
    );
};

interface BaseControlledProps {
    name: string;
    label?: string;
    control?: Control<any, any>;
    defaultValue?: any;
    required?: Message | ValidationRule<boolean>;
    errorMessage?: ((error: FieldError) => React.ReactNode | string) | undefined;
    validate?: Validate<any> | Record<string, Validate<any>>;
}

export interface ControlledInputProps extends BaseControlledProps {
    min?: ValidationRule<number | string>;
    max?: ValidationRule<number | string>;
    maxLength?: ValidationRule<number>;
    minLength?: ValidationRule<number>;
    pattern?: ValidationRule<RegExp>;
    type?: React.InputHTMLAttributes<unknown>['type'];
}

export const ControlledInput = ({
    control,
    name,
    label,
    defaultValue,
    required,
    min,
    max,
    maxLength,
    minLength,
    pattern,
    errorMessage,
    type,
    validate,
}: ControlledInputProps) => (
    <Controller
        control={control}
        name={name}
        rules={{ required, min, max, maxLength, minLength, pattern, validate }}
        defaultValue={defaultValue}
        render={({ field: { name, value, onChange }, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
                <TextField
                    name={name}
                    value={value ?? ''}
                    onChange={onChange}
                    label={label}
                    error={!!error}
                    type={type}
                />
                {!!error && errorMessage && <Error errorMessage={errorMessage?.(error)} />}
            </FormControl>
        )}
    />
);

let i = 0;

export interface ControlledSelectProp extends BaseControlledProps {
    children: React.ReactNode;
}

export const ControlledSelect = ({
    control,
    name,
    label,
    defaultValue,
    required,
    errorMessage,
    children,
    validate,
}: ControlledSelectProp) => {
    const selectId = `ControlledSelect-${i++}`;

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required, validate }}
            defaultValue={defaultValue}
            render={({ field: { name, value, onChange }, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error}>
                    <InputLabel id={selectId}>{label}</InputLabel>
                    <Select
                        name={name}
                        labelId={selectId}
                        value={value ?? ''}
                        label={label}
                        onChange={onChange}
                    >
                        {children}
                    </Select>
                    {!!error && errorMessage && <Error errorMessage={errorMessage?.(error)} />}
                </FormControl>
            )}
        />
    );
};

export const Error = ({ errorMessage }: { errorMessage: React.ReactNode }) => (
    <FormHelperText>{errorMessage}</FormHelperText>
);
