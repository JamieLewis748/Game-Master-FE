// app.get("/api/users", returnAllUsers);
// app.get("/api/users/:user_id", returnUser);
// app.post("/api/users", postNewUser);
import axios from "axios";

export const fetchUsers = () => {
    return axios
        .get(`https://game-master-be.onrender.com/api/users`)
        .then(({ data }) => {
            return data.users;
        });
};


export const fetchUserByUserId = (userId) => {
    return axios
        .get(`https://game-master-be.onrender.com/api/users/${userId}`, {
            data: { userWhoRequested: "2" }
        })
        .then(({ data }) => {
            return data.users;
        });
};