import axios from "axios";




const approveRequest = (eventId, userId) => { 
        return axios.patch(`https://game-master-be.onrender.com/api/events/${eventId}/accept`, { user_id: userId })
        .then((response) => {
            console.log(response)
        })
};

export default approveRequest;