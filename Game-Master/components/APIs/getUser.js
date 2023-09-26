import axios from "axios";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Authentication/firebase-config";


const GetUser = async (email) => {
    console.log(email)
    return axios
        .get(`https://game-master-be.onrender.com/api/users/${email}`)
        .then(( {data} ) => {
            console.log(data)
            if(data.user !== undefined) {
                console.log(data)
                return data.user
            }
            else {
                return null
            }
        }).then((response) => {
            return response
        })
};

// const data = {
//     "name": "newUser",
//     "username": "newUser1234",
//     "email": "newUser@gmail.com",
//     "img_url": "",
//     "characterName": "Bam"
//   }
export default GetUser;