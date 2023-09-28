import axios from "axios";


const completeEvent = (event_id, host_id, participants, winner, duration) => { 
    console.log(event_id, '<== eventId')
    console.log(host_id, "<== hostId");
    console.log(participants, "<== participants");
    console.log(winner, "<== winner");
    console.log(duration, "<== duration");
        return axios
          .patch(`https://game-master-be.onrender.com/api/events/${event_id}`, {
            "host_id": host_id,
            "participants": participants,
            "winner": winner,
            "duration": duration
          })
          .then((response) => {
            console.log(response);
          });
};

export default completeEvent;