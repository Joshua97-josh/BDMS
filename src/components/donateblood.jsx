// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaHeartbeat, FaUserPlus, FaComments, FaSearch, FaTint } from "react-icons/fa";

function DonateBlood() {
  const [formData, setFormData] = useState({ name: "", bloodGroup: "", location: "", contact: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for registering as a donor!");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Become a Blood Donor</h2>
      <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" className="w-full p-3 mb-4 border rounded-lg" onChange={handleChange} required />
        <input type="text" name="bloodGroup" placeholder="Blood Group" className="w-full p-3 mb-4 border rounded-lg" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" className="w-full p-3 mb-4 border rounded-lg" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Number" className="w-full p-3 mb-4 border rounded-lg" onChange={handleChange} required />
        <button type="submit" className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700">Register as Donor</button>
      </form>
    </div>
  );
}
export{DonateBlood}

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/find-donors" element={<FindDonors />} />
//         <Route path="/donate-blood" element={<DonateBlood />} />
//       </Routes>
//     </Router>
//   );
// }
