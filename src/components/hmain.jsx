import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaUserPlus, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MHomePage() {
  const [donors, setDonors] = useState(1200);
  const [requests, setRequests] = useState(450);
  const navigate=useNavigate();

  useEffect(() => {
    // Simulating real-time updates (can be replaced with API calls)
    const interval = setInterval(() => {
      setDonors((prev) => prev + Math.floor(Math.random() * 5));
      setRequests((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center px-10 z-50">
        <h1 className="text-red-600 text-2xl font-bold">Blood Donation System</h1>
        <div className="space-x-6">
          <a href="/mhome" className="text-red-500 hover:text-red-700">Home</a>
          <a href="/register" className="text-red-500 hover:text-red-700">Register</a>
          <a href="/finddonor" className="text-red-500 hover:text-red-700">Find Donors</a>
          <a href="/request-blood" className="text-red-500 hover:text-red-700">Request Blood</a>
          <a href="/signup" className="text-red-500 hover:text-red-700">Sign Up</a>
          <a href="/donor-login" className="text-red-500 hover:text-red-700">Login</a>
          <a href="/donor-signup" className="text-red-500 hover:text-red-700">Register</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-red-500 to-red-700 text-white text-center px-5">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Donate Blood, Save Lives</h1>
        <p className="text-lg md:text-xl mb-6">Join us in making a difference today.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-white text-red-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-200 transition"
          onClick={()=>navigate("/donate-blood ")}
        >
          Donate Blood Now
        </motion.button>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center gap-10 bg-white p-10 shadow-lg">
        <div className="text-center">
          <FaUserPlus className="text-red-600 text-4xl mx-auto" />
          <h2 className="text-3xl font-bold text-red-600">{donors}</h2>
          <p className="text-gray-700">Active Donors</p>
        </div>
        <div className="text-center">
          <FaHeartbeat className="text-red-600 text-4xl mx-auto" />
          <h2 className="text-3xl font-bold text-red-600">{requests}</h2>
          <p className="text-gray-700">Blood Requests</p>
        </div>
      </div>

      {/* Chatbot Icon */}
      <div className="fixed bottom-5 right-5 bg-red-600 p-4 rounded-full text-white shadow-lg cursor-pointer hover:bg-red-700">
        <FaComments className="text-2xl" />
      </div>
    </div>
  );
}
