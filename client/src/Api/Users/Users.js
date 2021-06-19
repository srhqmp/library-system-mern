
import axios from 'axios'

const url = 'http://localhost:4000/api';

export const loginUser = async (login) => {
    const {username, password} = login 
    try{
        const data = await axios.post(`${url}/login`, {
            username,
            password
        });
        return data;
    }catch(error){
        return error.response
    }
}       

export const checkToken = async () => {
    const userToken = sessionStorage.getItem("userToken")
    console.log(userToken);
    // try{
    //     const data = await axios.post(`${url}/login/me/`, {
    //         username,
    //         password
    //     });
    //     return data;
    // }catch(error){
    //     return error.response
    // }
}       