import { createContext } from "react";

export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
    return (
        <UserDataContext.Provider value={{}}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserDataProvider;