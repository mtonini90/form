import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import axios, { AxiosError } from 'axios';

axios.interceptors.request.use((config) => {
    if (config.params?.authToken) {
        return {
            ...config,
            // this is ok in dev mode, in a real case this should be returned from BE
            headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
        };
    }

    return config;
});

axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(error?.response?.data)
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <CssBaseline />
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
