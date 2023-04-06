import axios from 'axios';
const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
};
const url = 'http://192.168.56.1:3000/api/word'

const instance = axios.create({
    baseURL: url,
    headers: headers
});

export default getData = async() => {
    return (await instance.get('/')).data;
}

