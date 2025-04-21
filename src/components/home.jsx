import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const generateOtp = async () => {
    if (!email) {
      alert("Please enter your email before requesting OTP.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/send-otp", { email });
      alert(response.data);
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      if (!otpInput) {
        alert("Please enter the OTP sent to your email.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    }

    const payload = isSignup
      ? { name, phone, email, password, otp: otpInput }
      : { email, password };

    try {
      const url = isSignup ? "http://localhost:8080/api/signup" : "http://localhost:8080/api/login";
      const res = await axios.post(url, payload);
      alert(res.data);

      if (res.status === 200 && !isSignup) {
        // On successful login, navigate to another page
        navigate("/mhome"); // Replace '/dashboard' with the desired route
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 min-h-[600px] flex flex-col justify-between">
        <div className="relative flex bg-gray-200 rounded-full p-0.5 mb-4 h-10 w-48 mx-auto">
          <motion.div
            className="absolute w-1/2 h-full bg-red-600 rounded-full"
            animate={{ x: isSignup ? 0 : "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <button
            className={`flex-1 text-sm font-medium text-center relative z-10 transition-colors ${isSignup ? "text-white" : "text-gray-700"}`}
            onClick={() => setIsSignup(true)}
          >
            Signup
          </button>
          <button
            className={`flex-1 text-sm font-medium text-center relative z-10 transition-colors ${!isSignup ? "text-white" : "text-gray-700"}`}
            onClick={() => setIsSignup(false)}
          >
            Login
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col justify-center"
        >
          <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full">
            <h2 className="text-xl font-bold mb-2">{isSignup ? "Signup" : "Login"}</h2>

            {!isSignup && (
              <>
                <label className="block mb-2">Email or Phone Number</label>
                <input
                  className="w-full p-2 border rounded mb-2"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="block mb-2">Password</label>
                <input
                  className="w-full p-2 border rounded mb-2"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}

            {isSignup && (
              <>
                <label className="block mb-2">Name</label>
                <input
                  className="w-full p-2 border rounded mb-2"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label className="block mb-2">Phone Number</label>
                <input
                  className="w-full p-2 border rounded mb-2"
                  type="text"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <label className="block mb-2">Email</label>
                <input
                  className="w-full p-2 border rounded mb-2"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label className="block mb-2">Password</label>
                <input
                  className="w-full p-2 border rounded mb-2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <label className="block mb-2">Confirm Password</label>
                <input
                  className="w-full p-2 border rounded mb-2"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={generateOtp}
                  className="w-full bg-gray-500 text-white p-2 rounded mb-2"
                >
                  Send OTP
                </button>
              </>
            )}

            {isSignup && otpSent && (
              <div>
                <label className="block mb-2">Enter OTP</label>
                <input
                  className="w-full p-2 border rounded mb-2"
                  type="text"
                  placeholder="Enter OTP"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  required
                />
              </div>
            )}

            {!isSignup && (
              <a href="#" className="text-red-600 text-sm mb-2 block">
                Forgot Password?
              </a>
            )}

            <button type="submit" className="w-full bg-red-600 text-white p-2 rounded">
              {isSignup ? "Signup" : "Login"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
