import axios from "axios";
import { useContext } from "react";
import { WatchListContext } from "../Context/WatchListContext";

const modifyWatchList = async (user_id, event_id, setWatchList) => {
  try {
    return axios
      .post(
        `https://game-master-be.onrender.com/api/events/${event_id}/watchList`,
        { "user_id": user_id }
      )
      .then((data) => {
        setWatchList((prevWatch) => [...prevWatch, event_id])
        return data;
      });
  }
  catch (err) {
    console.log(err)
  };
}

export default modifyWatchList;