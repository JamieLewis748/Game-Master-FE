import axios from "axios";

const cancelEvent = async (user_id, event_id) => {
    console.log("🚀 ~ file: handleEventCancel.js:4 ~ cancelEvent ~ event_id:", event_id)
    console.log("🚀 ~ file: handleEventCancel.js:4 ~ cancelEvent ~ user_id:", user_id)
    console.log('inside cancelEvent')
  try {
    return axios
      .post(
        `https://game-master-be.onrender.com/api/events/${event_id}/cancel`,
        { "user_id": user_id }
      )
      .then((data) => {
        return data;
      });
  } catch (err) {
    console.log(err);
  }
};
export default cancelEvent;
