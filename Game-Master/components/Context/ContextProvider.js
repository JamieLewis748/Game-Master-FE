import { useState } from "react";
import { UserContext, DbUserContext } from "./UserContext";
import { SocketContext } from "./SocketContext";
import { WatchListContext } from "./WatchListContext";



const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [dbUser, setDbUser] = useState();
    const [socket, setSocket] = useState();
    const [watchList, setWatchList] = useState([])

    return (
        <DbUserContext.Provider value={{ dbUser, setDbUser }}>
            <UserContext.Provider value={{ user, setUser }}>
                <SocketContext.Provider value={{ socket, setSocket }}>
                    <WatchListContext.Provider value={{watchList, setWatchList}}>
                        {children}
                    </WatchListContext.Provider>
                </SocketContext.Provider>
            </UserContext.Provider>
        </DbUserContext.Provider >
    );
};

export default UserProvider;