import axios from 'axios';
const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
};
const url = 'http://127.0.0.1:5001/ct201-dict/us-central1/app/api/user'

export const createUser = async(data) => {
    await axios.put(url, data)
}