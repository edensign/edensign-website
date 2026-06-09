/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ToastContext = React.createContext();

export const useToast = () => {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = React.useState({
        open: false,
        message: '',
        severity: 'success',
        actionLabel: '',
        onActionClick: null
    });

    const showToast = React.useCallback((message, severity = 'success', actionLabel = '', onActionClick = null) => {
        setToast({
            open: true,
            message,
            severity,
            actionLabel,
            onActionClick
        });
    }, []);

    const handleClose = React.useCallback((event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToast(prev => ({
            ...prev,
            open: false
        }));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={toast.open}
                onClose={handleClose}
                autoHideDuration={6000}
                TransitionComponent={Slide}
                key={toast.open ? 'open' : 'closed'}
            >
                <Alert 
                    severity={toast.severity} 
                    sx={{ 
                        width: '100%', 
                        alignItems: 'center',
                        backgroundColor: '#1a0a00 !important',
                        color: '#faf6f1 !important',
                        border: '1.5px solid rgba(199, 149, 108, 0.4)',
                        borderRadius: '16px',
                        boxShadow: '0 12px 48px rgba(26, 10, 0, 0.35)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        padding: '12px 18px',
                        '& .MuiAlert-icon': {
                            color: '#c7956c !important',
                            fontSize: '22px'
                        },
                        '& .MuiAlert-message': {
                            color: '#faf6f1'
                        }
                    }} 
                    action={
                        <React.Fragment>
                            {toast.actionLabel && toast.onActionClick && (
                                <button
                                    onClick={(e) => {
                                        toast.onActionClick();
                                        handleClose(e);
                                    }}
                                    style={{
                                        background: 'linear-gradient(135deg, #c7956c, #a8724d)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '6px 16px',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        marginRight: '12px',
                                        textTransform: 'uppercase',
                                        boxShadow: '0 4px 12px rgba(199,149,108,0.25)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {toast.actionLabel}
                                </button>
                            )}
                            <IconButton
                                size="small"
                                aria-label="close"
                                sx={{ color: 'rgba(250, 246, 241, 0.65)', '&:hover': { color: '#fff' } }}
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

export default function Toast(props) {
    const [open, setOpen] = React.useState(props.alerting);

    React.useEffect(() => {
        setOpen(props.alerting);
    }, [props.alerting]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            {open && (
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={2000}
                    TransitionComponent={Slide}
                >
                    <Alert 
                        severity={props.severity} 
                        sx={{ 
                            width: '100%',
                            alignItems: 'center',
                            backgroundColor: '#1a0a00 !important',
                            color: '#faf6f1 !important',
                            border: '1.5px solid rgba(199, 149, 108, 0.4)',
                            borderRadius: '16px',
                            boxShadow: '0 12px 48px rgba(26, 10, 0, 0.35)',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            fontWeight: 500,
                            padding: '12px 18px',
                            '& .MuiAlert-icon': {
                                color: '#c7956c !important',
                                fontSize: '22px'
                            },
                            '& .MuiAlert-message': {
                                color: '#faf6f1'
                            }
                        }} 
                        action={
                            <IconButton
                                size="small"
                                aria-label="close"
                                sx={{ color: 'rgba(250, 246, 241, 0.65)', '&:hover': { color: '#fff' } }}
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    >
                        {props.message}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}
