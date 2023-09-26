import axios from "axios";


const completeEvent = (eventId, host_id, participants, winner) => { 
        return axios.patch(`https://game-master-be.onrender.com/api/events/${eventId}`, { host_id: host_id, participants: participants, winner: winner })
        .then((response) => {
            console.log(response)
        })
};

export default completeEvent;