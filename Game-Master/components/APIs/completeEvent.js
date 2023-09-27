import axios from "axios";


const completeEvent = (eventId, host_id, participants, winner) => { 
    console.log(eventId)
    console.log(host_id)
    console.log(participants)
    console.log(winner)
        return axios.patch(`https://game-master-be.onrender.com/api/events/${eventId}`, { host_id: host_id, participants: participants, winner: winner })
        .then((response) => {
            console.log(response)
        })
};

export default completeEvent;