import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Get_DonorRegistration } from "../springboot_usercontion";
import { Getlocalstorage, Getlocalstorageusername } from "../localstorage";

export default function FindDonors() {
  const navigate = useNavigate();



  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [donorList, setDonorList] = useState([]);

  var username = Getlocalstorageusername();
  var Tocken = Getlocalstorage();

  // Fetch donors from backend API
  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      // const response = await fetch('http://localhost:8080/api/donors', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: null // if you want to fetch all donors
      // });

      // const data = await response.json();
      // setDonorList(data);
      var response = await Get_DonorRegistration(Tocken);
      console.log(response.data);
      setDonorList(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      navigate("/")

    }

  };
function Getivandnavigat(id){
   console.log(id);
   navigate(`/UserRequest/${id}`)
}

  // Search function when the button is clicked
  const handleSearch = () => {
    setFilteredDonors(
      donorList.filter((donor) =>
        donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Find a Donor</h2>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by blood group..."
          className="p-3 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-3 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <FaSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {donorList.length > 0 ? (
          donorList.map((donor, index) => (
            <div key={index}  className="bg-white p-5 rounded-lg shadow-md text-center hover:scale-105 duration-500 active:scale-95">
              <button onClick={()=>Getivandnavigat(donor.id)}>
              <h3 className="text-xl font-bold text-red-600">{donor.name}</h3>
              <p className="text-gray-700">Blood Group: {donor.bloodGroup}</p>
              <p className="text-gray-500">Location: {donor.location}</p>
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No donors found.</p>
        )}
      </div>
    </div>
  );
}
