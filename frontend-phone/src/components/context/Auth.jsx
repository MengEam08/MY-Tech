import {createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const userInfo = localStorage.getItem('userInfo')
    const [user, setUer] = useState(userInfo);

    const login = (user) =>{
        setUer(user)
    }
    const logout=() =>{
        localStorage.removeItem('userInfo');
        setUer(null)
    }
    return <AuthContext.Provider value={{
        user,
        login,
        logout
    }}>
        {children}
    </AuthContext.Provider>
}

