import axios from "axios";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../Authentication/firebase-config";


const PostNewUser = async (name, username, email, img_url, characterName, password, setDbUser) => {
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
                await createUserWithEmailAndPassword(auth, email, password);
                const user = await axios.get(`https://game-master-be.onrender.com/api/users/${data.insertedId}`)
                setDbUser(user.user)
                return { acknowledged: true }
            } else {
                return { acknowledged: false }
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
export default PostNewUser;