import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Get_One_DonorRegistration } from "../springboot_usercontion";
import { Getlocalstorage, Getlocalstorageusername } from "../localstorage";

function UserRequest() {

    const { id } = useParams();
    var username = Getlocalstorageusername();
    var Tocken = Getlocalstorage();
    const navigate = useNavigate();

    var [GetONeData, setGetONeData] = useState("")

    useEffect(() => {
        Getinr_onedata();
    }, [])

   async function Getinr_onedata(){
    try{
       var data={id,Tocken}
       console.log(data);
       var respon=await Get_One_DonorRegistration(data);
       console.log(respon.data);
       setGetONeData(respon.data);
    }catch(err){
        console.log(err);
        navigate("/");
    }
}

    return (
        <div className="user-request">
            <h2 className="justify-self-center m-20 font-bold text-3xl">Request</h2>
            <div className="flex flex-col gap-10 justify-self-center shadow-md shadow-black rounded-md p-5 m-5 h-96 w-1/2">

            <div className="flex gap-16 justify-self-center mt-12">
            <label className="font-bold">Name : <span className="text-gray-500">{GetONeData.name}</span></label>
            <label className="font-bold">Date of Birth : <span className="text-gray-500">{GetONeData.dob}</span></label>
            <label className="font-bold">Age : <span className="text-gray-500">{GetONeData.age}</span></label>
            </div>
            
            {/* <label>Number</label> */}
            <div className="flex gap-[150px] justify-self-center">

            <label className="font-bold">Gender : <span className="text-gray-500">{GetONeData.gender}</span></label>
            <label className="font-bold">Blood Group : <span className="text-gray-500">{GetONeData.bloodGroup}</span></label>
            <label className="font-bold">Unit : <span className="text-gray-500">{GetONeData.unit}</span></label>
            </div>
            <div className="flex gap-[30px] justify-self-center">
            <label className="font-bold">Phone Number : <span className="text-gray-500">{GetONeData.phoneNumber}</span></label>
            <label className="font-bold">Email ID : <span className="text-gray-500">{GetONeData.emailId}</span></label>
            <label className="font-bold">State : <span className="text-gray-500">{GetONeData.state}</span></label>
            </div>
            <div className="flex gap-[100px] justify-self-center">
            <label className="font-bold ">District : <span className="text-gray-500">{GetONeData.district}</span></label>
            <label className="font-bold">Pin Code : <span className="text-gray-500">{GetONeData.pinCode}</span></label>
            <label className="font-bold">Location : <span className="text-gray-500">{GetONeData.location}</span></label>
            </div>

            </div>           
        </div>
    )
}
export default UserRequest