import axios from "axios";


const postNewEvent = async ({ host_id, image, gameInfo, isGameFull, game_type, dateTime, duration, capacity, prizeCollection_id }) => {
    try {
        return axios.post(`https://game-master-be.onrender.com/api/events`, {
            hostedBy : host_id,
            image: image,
            gameInfo: gameInfo,
            isGameFull: isGameFull,
            gameType: game_type,
            dateTime: dateTime,
            duration: duration,
            capacity: capacity,
            prizeCollection_id: prizeCollection_id
        })
            .then((data) => {
                return data
            });
    }
    catch (err) {
        console.log(err)
    }
};
export default postNewEvent;