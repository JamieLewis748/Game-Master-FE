import axios from "axios";

export const fetchCollections = () => {
    return axios
        .get(`https://game-master-be.onrender.com/api/collections`)
        .then(({ data }) => {
            return data;
        });
};