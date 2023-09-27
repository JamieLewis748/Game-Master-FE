import { useState } from "react";
import { UserContext, DbUserContext } from "./UserContext";
import { SocketContext } from "./SocketContest";
import { NotificationCountContext } from "./NotificationCountContext";



const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [dbUser, setDbUser] = useState();
    const [socket, setSocket] = useState();
    const [notificationCount, setNotificationCount] = useState(0)

    return (
        <DbUserContext.Provider value={{ dbUser, setDbUser }}>
            <UserContext.Provider value={{ user, setUser }}>
                <SocketContext.Provider value={{ socket, setSocket }}>
                    <NotificationCountContext.Provider value={{ notificationCount, setNotificationCount }}>
                        {children}
                    </NotificationCountContext.Provider>
                </SocketContext.Provider>
            </UserContext.Provider>
        </DbUserContext.Provider >
    );
};

export default UserProvider;