import axios from "axios";
import { useContext } from "react";
import { WatchListContext } from "../Context/WatchListContext";

const modifyWatchList = async (user_id, event_id, setWatchList, watchList) => {
  let prevWatch = [...watchList];
  try {
    return axios
    .post(
      `https://game-master-be.onrender.com/api/events/${event_id}/watchList`,
      { "user_id": user_id }
      )
      .then((data) => {
        if (!prevWatch.includes(event_id)) {
          setWatchList([...prevWatch, event_id]) 
          console.log(watchList)
        } else {
          console.log('inside else')
          const eventRemoved = prevWatch.filter((eachEvent) => {
            if(eachEvent !== event_id){
              return eachEvent
            }
          });
          console.log("🚀 ~ file: modifyWatchList.js:20 ~ .then ~ eventRemoved:", eventRemoved)
          setWatchList(eventRemoved)
         
        }
        return data;
      });
    }
    catch (err) {
      console.log(err)
    };
    
}

export default modifyWatchList;