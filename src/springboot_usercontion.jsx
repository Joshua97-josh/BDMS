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
function DonorRegistration(doner) {

    return axios.post(url + "/user/BD_Entity_DonorRegistration" ,doner, {headers: { Authorization: `Bearer ${doner.Tocken}`},});
}

function Get_DonorRegistration(Tocken) {
    console.log(Tocken)

    return axios.get(url + "/user/Get_DonorRegistration", {headers: { Authorization: `Bearer ${Tocken}`},});
}

function Get_One_DonorRegistration(data) {
    return axios.get(url +`/user/Get_one_DonorRegistration?id=${data.id}`, {headers: { Authorization: `Bearer ${data.Tocken}`},});
}

function Get_adminone_DonorRegistration() {
    return axios.get(url +"/public/Get_DonorRegistration");
}
export {GetTimetocken,Get_Use_one,DonorRegistration,Get_DonorRegistration,Get_One_DonorRegistration,Get_adminone_DonorRegistration};
//  http://localhost:8080/api/user/Get_one_DonorRegistration?id=4