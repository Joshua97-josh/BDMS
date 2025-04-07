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
//           <Link to="/signup" className="text-red-500 hover:text-red-700">Sign Up</Link>
//           <Link to="/login" className="text-red-500 hover:text-red-700">Login</Link>
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

export function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Sign Up</h2>
        <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
        <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
        <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
        <button className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700">Sign Up</button>
      </div>
    </div>
  );
}

export function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
        <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded-lg mb-4" />
        <button className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700">Login</button>
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
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }
