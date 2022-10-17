import React from 'react';

export const FieldError = ({ message }: { message: string }) => <strong>{message}</strong>;

export const RequiredField = () => <FieldError message="Campo obbligatorio" />;
