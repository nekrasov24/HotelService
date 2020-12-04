import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './AuthContext';

const initialSate = {
    token: null,
    scope: [],
};

export default function AuthProviderWrapper({ children }) {
    const [currentState, setCurrentState] = useState(initialSate);

    const clear = () => {
        setCurrentState((prev) => ({ ...prev, ...initialSate }));
    };
    const setUserData = () => {
        setCurrentState((prev) => ({ ...prev, }));
        console.log(currentState);
        console.log("YEEEEEEEEEEEEEES")
    };

    const authContextValue = {
        ...currentState,
        clear,
        setUserData
    };

    return <AuthProvider value={authContextValue}>{children}</AuthProvider>;
}

AuthProviderWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};
