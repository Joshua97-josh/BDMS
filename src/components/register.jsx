import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUserPlus, FaComments, FaSearch } from "react-icons/fa";

// function HomePage() {
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center px-10 z-50">
//         <h1 className="text-red-600 text-2xl font-bold">Blood Donation System</h1>
//         <div className="space-x-6">
//           <Link to="/" className="text-red-500 hover:text-red-700">Home</Link>
//           <Link to="/find-donors" className="text-red-500 hover:text-red-700">Find Donors</Link>
//           <Link to="/register" className="text-red-500 hover:text-red-700">Register</Link>
//           <Link to="#" className="text-red-500 hover:text-red-700">Request Blood</Link>
//           <Link to="#" className="text-red-500 hover:text-red-700">About Us</Link>
//         </div>
//       </nav>

//       <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-red-500 to-red-700 text-white text-center px-5">
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">Donate Blood, Save Lives</h1>
//         <p className="text-lg md:text-xl mb-6">Join us in making a difference today.</p>
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           className="bg-white text-red-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-200 transition"
//         >
//           Donate Blood Now
//         </motion.button>
//       </div>
//     </div>
//   );
// }

// function FindDonors() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [donorList] = useState([
//     { name: "John Doe", bloodGroup: "A+", location: "Chennai" },
//     { name: "Alice Smith", bloodGroup: "B-", location: "Mumbai" },
//     { name: "Raj Kumar", bloodGroup: "O+", location: "Bangalore" },
//   ]);
//   const [filteredDonors, setFilteredDonors] = useState(donorList);

//   useEffect(() => {
//     setFilteredDonors(
//       donorList.filter((donor) =>
//         donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, donorList]);

//   return (
//     <div className="p-10 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Find a Donor</h2>
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search by blood group..."
//           className="p-3 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-red-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button className="ml-3 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
//           <FaSearch />
//         </button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {filteredDonors.length > 0 ? (
//           filteredDonors.map((donor, index) => (
//             <div key={index} className="bg-white p-5 rounded-lg shadow-md text-center">
//               <h3 className="text-xl font-bold text-red-600">{donor.name}</h3>
//               <p className="text-gray-700">Blood Group: {donor.bloodGroup}</p>
//               <p className="text-gray-500">Location: {donor.location}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No donors found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

export default function Register() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-4">Donor Registration</h2>
        <form>
          <input type="text" placeholder="Full Name" className="w-full p-3 mb-3 border rounded-lg" />
          <input type="email" placeholder="Email" className="w-full p-3 mb-3 border rounded-lg" />
          <input type="text" placeholder="Phone Number" className="w-full p-3 mb-3 border rounded-lg" />
          <select className="w-full p-3 mb-3 border rounded-lg">
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <input type="text" placeholder="Location" className="w-full p-3 mb-3 border rounded-lg" />
          <button className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700">Register</button>
        </form>
      </div>
    </div>
  );
}

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/find-donors" element={<FindDonors />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// }
