import { createContext, useContext, useEffect, useState } from "react";

const AuthProviderContext = createContext();
const AuthProviderContextDispatcher = createContext();

const AuthProvider = ({ children }) => {
    const [state, setState] = useState(false);
    const LOCAL_STORAG_AUTH_STATE = 'authState'
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem(LOCAL_STORAG_AUTH_STATE)) || false;
        setState(userData)
    }, []);

    useEffect(() => {
        const data = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAG_AUTH_STATE, data);
    }, [state]);

    return (
        <AuthProviderContext.Provider value={state}>
            <AuthProviderContextDispatcher.Provider value={setState}>
                {children}
            </AuthProviderContextDispatcher.Provider>
        </AuthProviderContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthProviderContext);
export const useAuthActions = () => useContext(AuthProviderContextDispatcher);


