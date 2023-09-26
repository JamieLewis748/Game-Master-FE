import axios from "axios";

const modifyWatchList = (event_id, user_id) => {
    return axios
      .post(`/api/events/${event_id}/cancel`)
      .send({ _id: user_id })
        .then((data) => {
          return data
        })
        .catch((err) => {
        return err
    })
}
export default modifyWatchList;