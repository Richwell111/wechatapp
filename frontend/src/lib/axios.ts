import axios from "axios";


//development
// const api =  axios.create({
//     baseURL:"http://localhost:3000/api",
//     withCredentials:true
// });

//production
const api =  axios.create({
    baseURL:"/api",
    withCredentials:true
});

export default api;