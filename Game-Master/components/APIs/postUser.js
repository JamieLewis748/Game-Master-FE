import axios from "axios";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Authentication/firebase-config";


const PostNewUser = async (name, username, email, img_url, characterName, password, setDbUser) => {
    console.log(name, username, email, img_url, characterName)
    return axios
        .post(`https://game-master-be.onrender.com/api/users`, {
            name: name,
            username: username,
            email: email,
            img_url: img_url,
            characterName: characterName,
        })
        .then(async ({ data }) => {
            console.log(data)
            if (data.acknowledged === true) {
                await createUserWithEmailAndPassword(auth, email, password);
                const user = await axios.get(`https://game-master-be.onrender.com/api/users/${data.insertedId}`,
                    { userWhoRequested: "00000020f51bb4362eee2a02" }
                )
                setDbUser(user.user)
                return;
            } else {
                return;
            }

        }).then(() => {
            return { acknowledged: true }
        })
};

// const data = {
//     "name": "newUser",
//     "username": "newUser1234",
//     "email": "newUser@gmail.com",
//     "img_url": "",
//     "characterName": "Bam"
//   }
export default PostNewUser;