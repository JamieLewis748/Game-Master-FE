import { createContext } from "react";


const UserContext = createContext();

export default UserContext;

// const user = {
//   _id: "2",
//   name: "Jamie",
//   username: "jamie1234",
//   email: "jamie@gmail.com",
//   img_url: "https://i.pinimg.com/originals/82/4c/75/824c75d5d8baddac1e3ab99a48b77f36.jpg",
//   friends: ["2", "3", "4"],
//   friendRequestsReceived: ["6", "10", "11", "9"],
//   friendRequestsSent: ["5"],
//   blocked: [],
//   topics: ["Card Games", "RPG"],
//   characterStats: {
//     name: "Character1",
//     level: "7",
//     experience: "29",
//     experienceToLevelUp: "70",
//   },
// };