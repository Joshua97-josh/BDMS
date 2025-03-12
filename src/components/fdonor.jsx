import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function FindDonors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [donorList] = useState([
    { name: "Joshua W", bloodGroup: "O+", location: "Arani" },
    { name: "Yuvaraj A", bloodGroup: "B+", location: "Thiruvannamalai" },
    { name: "Sachin R", bloodGroup: "O+", location: "Cheyyar" },
    { name: "Sanjay K", bloodGroup: "B+", location: "Mittapalli" },
  ]);
  const [filteredDonors, setFilteredDonors] = useState(donorList);

  useEffect(() => {
    setFilteredDonors(
      donorList.filter((donor) =>
        donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, donorList]);

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
        <button className="ml-3 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
          <FaSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-red-600">{donor.name}</h3>
              <p className="text-gray-700">Blood Group: {donor.bloodGroup}</p>
              <p className="text-gray-500">Location: {donor.location}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No donors found.</p>
        )}
      </div>
    </div>
  );
}
