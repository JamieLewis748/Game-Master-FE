import { useState } from "react";
import { UserContext, DbUserContext } from "./UserContext";



const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [dbUser, setdbUser] = useState(null);



    return (
        <DbUserContext.Provider value={{ dbUser, setdbUser }}>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </DbUserContext.Provider >
    );
};

export default UserProvider;