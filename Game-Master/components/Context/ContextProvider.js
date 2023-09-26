import { useState } from "react";
import { UserContext, DbUserContext } from "./UserContext";
import { SocketContext } from "./SocketContest";



const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [dbUser, setDbUser] = useState();
    const [socket, setSocket] = useState();

    return (
        <DbUserContext.Provider value={{ dbUser, setDbUser }}>
            <UserContext.Provider value={{ user, setUser }}>
                <SocketContext.Provider value={{ socket, setSocket }}>
                    {children}
                </SocketContext.Provider>
            </UserContext.Provider>
        </DbUserContext.Provider >
    );
};

export default UserProvider;