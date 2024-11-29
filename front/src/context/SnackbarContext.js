import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';


const SnackbarContext = createContext();
export const useSnackbar = () =>  useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const showSnackbar = (msg, sev) => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    const hideSnackbar = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={hideSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={hideSnackbar} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};
