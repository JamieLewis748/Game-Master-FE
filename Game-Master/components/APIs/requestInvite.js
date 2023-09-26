import axios from "axios";




const requestInvite = (eventId, userId, setRequestInviteState) => {
    setRequestInviteState("Loading")
        return axios.patch(`https://game-master-be.onrender.com/api/events/${eventId}/request`, { user_id: userId })
        .then((response) => {
            if(response.data.acknowledged === true){
                setRequestInviteState("Request Sent")
            }
            console.log(response)
        })
        .catch(() => {
            setRequestInviteState("Request Invite")
        })
};

export default requestInvite;