import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './AuthContext';
import { GetToken, RemoveToken } from 'Services/LocalStorage';
import jwt_decode from 'jwt-decode';

const initialSate = {
    token: '',
    id: '',
    sub: '',
    email: '',
    scope: null,
    isLoggedIn: false,
};

export default function AuthProviderWrapper({ children }) {
    const [currentState, setCurrentState] = useState(initialSate);

    const clear = useCallback(() => {
        RemoveToken();
        setCurrentState(initialSate);
    }, [setCurrentState]);

    const setUserData = useCallback(
        (propDecodedToken, propToken) => {
            setCurrentState(() => ({
                token: propToken,
                id: propDecodedToken.jti,
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
