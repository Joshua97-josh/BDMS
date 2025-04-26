import axios from "axios";
var url = "http://localhost:8080/api";



function GetTimetocken(tocken) { 
    console.log(tocken)
    return axios.get(url+`/user/taime`, {headers: { Authorization: `Bearer ${tocken}`},});
   
}
function Get_Use_one(dataspring) { 
    console.log(dataspring)
    return axios.get(url+`/user/use_data_email?email=${dataspring.username}`, {headers: { Authorization: `Bearer ${dataspring.Tocken}`},});
   
}
export {GetTimetocken,Get_Use_one};
// http://localhost:8080/api/user/use_data_email?email=sanjaykumarmtt%40gmail.com username,Tocken