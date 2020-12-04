import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './AuthContext';
import { SetToken, GetToken } from 'Services/LocalStorage';
import jwt_decode from 'jwt-decode';

const initialSate = {
    token: '',
    sub: '',
    email: '',
    scope: '',
    isLoggedIn: false,
};

export default function AuthProviderWrapper({ children }) {
    const [currentState, setCurrentState] = useState(initialSate);

    const clear = useCallback(() => {
        SetToken();
        setCurrentState(initialSate);
    }, [setCurrentState]);

    const setUserData = useCallback(
        (propDecodedToken, propToken) => {
            setCurrentState(() => ({
                token: propToken,
                sub: propDecodedToken.sub,
                email: propDecodedToken.email,
                scope: propDecodedToken.scope,
                isLoggedIn: true,
            }));
        },
        [setCurrentState],
    );

    useEffect(() => {
        const token = GetToken();

        if (token) {
            try {
                const decodeToken = jwt_decode(token);
                setUserData(decodeToken, token);
            } catch (error) {
                console.error(error);
                clear();
            }
        } else {
            clear();
        }
    }, [setUserData, clear]);

    const authContextValue = {
        ...currentState,
        clear,
        setUserData,
    };

    return <AuthProvider value={authContextValue}>{children}</AuthProvider>;
}

AuthProviderWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};
