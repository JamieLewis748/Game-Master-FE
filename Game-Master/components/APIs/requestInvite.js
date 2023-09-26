const axios = require('axios');




exports.requestInvite = async (eventId, userId) => {
    try {
        const response = await axios.patch(`https://game-master-be.onrender.com/api/events/${eventId}/request`, { user_id: userId });
        console.log('Request sent successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending request:', error);
        throw error;
    }
};