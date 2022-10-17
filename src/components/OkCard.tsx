import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemIcon';
import { UiUser } from '../models/user';
import { useTranslate } from '../hooks/useTranslate';

export const ListItemDesc = ({ label, value }: { label: string; value: string }) => (
    <ListItemText>
        <strong>{label}: </strong> {value}
    </ListItemText>
);

export const OkCard = ({ user }: { user: UiUser }) => {
    const translate = useTranslate();

    return (
        <Box boxShadow="rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem">
            <Alert>
                <AlertTitle>Utenete registrato con successo</AlertTitle>
                <List>
                    <ListItem>
                        <ListItemDesc label="Nome" value={user.name} />
                    </ListItem>

                    <ListItem>
                        <ListItemDesc label="Nazionalità" value={user.country} />
                    </ListItem>

                    <ListItem>
                        <ListItemDesc label="Sesso" value={translate(`gender.${user.gender}`)} />
                    </ListItem>

                    <ListItem>
                        <ListItemDesc label="E-mail" value={user.email} />
                    </ListItem>

                    <ListItem>
                        <ListItemDesc label="Telefono" value={user.phone} />
                    </ListItem>
                </List>
            </Alert>
        </Box>
    );
};
