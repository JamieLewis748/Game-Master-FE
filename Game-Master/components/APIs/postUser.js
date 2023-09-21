import axios from "axios";
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../Authentication/firebase-config";


const postNewUser = async (name, username, email, img_url, characterName, password) => {
    return axios
        .post(`https://game-master-be.onrender.com/api/users`, {
            name: name,
            username: username,
            email: email,
            img_url: img_url,
            characterName: characterName,
        })
        .then(async ({ data }) => {
            if (data.acknowledged === true) {
                const user = await createUserWithEmailAndPassword(auth, email, password);
                return;
            } else {
                return;
            }

        });
};

// const data = {
//     "name": "newUser",
//     "username": "newUser1234",
//     "email": "newUser@gmail.com",
//     "img_url": "",
//     "characterName": "Bam"
//   }
export default postNewUser;