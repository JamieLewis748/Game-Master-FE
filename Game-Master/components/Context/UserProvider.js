import { useState } from "react";
import { UserContext, DbUserContext } from "./UserContext";



const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [dbUser, setDbUser] = useState();

    return (
        <DbUserContext.Provider value={{ dbUser, setDbUser }}>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </DbUserContext.Provider >
    );
};

export default UserProvider;