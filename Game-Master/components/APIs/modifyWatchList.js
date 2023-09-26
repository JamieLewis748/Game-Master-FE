import axios from "axios";

const modifyWatchList = async (user_id, event_id) => {
  console.log('in modWatL')
  try {
    return axios
      .post(
        `https://game-master-be.onrender.com/api/events/${event_id}/watchList`,
        { "user_id": user_id }
      )
      .then((data) => {
        return data;
      });
  }
      catch(err) {
        console.log(err)
  };
}

export default modifyWatchList;