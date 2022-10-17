import React from 'react';
import axios from 'axios';
import {
    RegisterUserError,
    RegisterUserRequest,
    RegisterUserResponse,
    UiUser,
} from '../models/user';
import { FormInputs } from '../components/SignUpFrom';

export const useRegisterUser = () => {
    const [data, setData] = React.useState<UiUser | null>(null);
    const [payload, setPayload] = React.useState<FormInputs | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<RegisterUserError[] | null>(null);

    React.useEffect(() => {
        (async () => {
            if (!payload) return;

            try {
                setLoading(true);

                const { name, surname, email, gender } = payload;
                const request: RegisterUserRequest = {
                    name: `${name} ${surname}`,
                    email,
                    gender,
                    status: 'active',
                };
                const {
                    data: { id },
                } = await axios.post<RegisterUserResponse>(
                    'https://gorest.co.in/public/v2/users',
                    request,
                    { params: { authToken: true } }
                );

                const { data: user } = await axios.get<RegisterUserResponse>(
                    `https://gorest.co.in/public/v2/users/${id}`,
                    { params: { authToken: true } }
                );

                setData({ ...payload, ...user });
                setError(null);
            } catch (error) {
                setError(error as RegisterUserError[]);
            } finally {
                setLoading(false);
            }
        })();
    }, [payload]);

    return {
        user: data,
        loading,
        error,
        fetch: setPayload,
    };
};
