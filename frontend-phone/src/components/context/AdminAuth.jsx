import {createContext, useState } from "react";


export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({children}) =>{
    const adminInfo = localStorage.getItem('adminInfo')
    const [user, setUer] = useState(adminInfo);

    const login = (user) =>{
        setUer(user)
    }
    const logout=() =>{
        localStorage.removeItem('adminInfo');
        setUer(null)
    }
    return <AdminAuthContext.Provider value={{
        user,
        login,
        logout
    }}>
        {children}
    </AdminAuthContext.Provider>
}

