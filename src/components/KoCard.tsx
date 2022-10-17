import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { RegisterUserError } from '../models/user';

export const KoCard = ({ error }: { error: RegisterUserError[] }) => (
    <>
        {error.map((er, i) => (
            <Grid item xs={12} key={i}>
                <Alert severity="error">
                    <AlertTitle> {er.field}</AlertTitle>
                    {er.message}
                </Alert>
            </Grid>
        ))}
    </>
);
