// import { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// const AuthPage = () => {
//   const [isSignup, setIsSignup] = useState(true);
//   const [captcha, setCaptcha] = useState("");
//   const [captchaInput, setCaptchaInput] = useState("");
//   const captchaCanvasRef = useRef(null);

//   const generateCaptcha = () => {
//     const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//     let result = "";
//     for (let i = 0; i < 6; i++) {
//       result += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setCaptcha(result);
//     drawCaptcha(result);
//   };

//   const drawCaptcha = (text) => {
//     const canvas = captchaCanvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "#f3f4f6";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.font = "20px monospace";
//     ctx.fillStyle = "#374151";
//     ctx.textBaseline = "middle";
//     ctx.fillText(text, 20, 25);
//   };

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSignup && captcha !== captchaInput) {
//       alert("Captcha does not match! Try again.");
//       return;
//     }
//     alert(isSignup ? "Signup Successful!" : "Login Successful!");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <div className="flex mb-4">
//           <button
//             className={`flex-1 p-2 transition-all duration-300 border rounded mb-2 ${isSignup ? "bg-red-600" : "bg-white"}`}
//             onClick={() => setIsSignup(true)}
//           >
//             Signup
//           </button>
//           <button
//             className={`flex-1 p-2 transition-all duration-300 border rounded mb-2 ${!isSignup ? "bg-red-600" : "bg-white"}`}
//             onClick={() => setIsSignup(false)}
//           >
//             Login
//           </button>
//         </div>
    
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <form onSubmit={handleSubmit}>
//             {isSignup ? (
//               <>
//                 <h2 className="text-xl font-bold mb-2">Signup</h2>
//                 <label className="block mb-2">Email</label>
//                 <input className="w-full p-2 border rounded mb-2" type="email" required />
//                 <label className="block mb-2">Password</label>
//                 <input className="w-full p-2 border rounded mb-2" type="password" required />
//                 <label className="block mb-2">Captcha:</label>
//                 <canvas ref={captchaCanvasRef} width="150" height="40" className="border rounded mb-2" />
//                 <input
//                   className="w-full p-2 border rounded mb-2"
//                   type="text"
//                   placeholder="Enter Captcha"
//                   value={captchaInput}
//                   onChange={(e) => setCaptchaInput(e.target.value)}
//                   required
//                 />
//                 <button className="w-full bg-red-600 text-white p-2 rounded">Signup</button>
//               </>
//             ) : (
//               <>
//                 <h2 className="text-xl font-bold mb-2">Login</h2>
//                 <label className="block mb-2">Email</label>
//                 <input className="w-full p-2 border rounded mb-2" type="email" required />
//                 <label className="block mb-2">Password</label>
//                 <input className="w-full p-2 border rounded mb-2" type="password" required />
//                 <a href="#" className="text-red-600 text-sm mb-2 block">Forgot Password?</a>
//                 <button className="w-full bg-red-600 text-white p-2 rounded">Login</button>
//               </>
//             )}
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;









// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const AuthPage = () => {
//   const [isSignup, setIsSignup] = useState(true);
//   const [captcha, setCaptcha] = useState("");
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpInput, setOtpInput] = useState("");
//   const [password, setPassword] = useState("");

//   const generateCaptcha = () => {
//     const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//     let result = "";
//     for (let i = 0; i < 6; i++) {
//       result += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setCaptcha(result);
//   };

//   const generateOtp = () => {
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     setOtp(otpCode);
//     alert(`Your OTP is: ${otpCode}`); // Simulating OTP send
//   };

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSignup && (captcha !== captchaInput || otp !== otpInput)) {
//       alert("Captcha or OTP does not match! Try again.");
//       return;
//     }
//     if (!isSignup && otp !== otpInput) {
//       alert("OTP does not match! Try again.");
//       return;
//     }
//     alert(isSignup ? "Signup Successful!" : "Login Successful!");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96 min-h-[550px] flex flex-col">
//         <div className="relative flex bg-gray-200 rounded-lg p-1 mb-4">
//           <motion.div
//             className="absolute w-1/2 h-full bg-red-600 rounded-lg"
//             animate={{ x: isSignup ? 0 : "100%" }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//           />
//           <button
//             className={`flex-1 p-2 text-center relative z-10 transition-colors ${isSignup ? "text-white" : "text-gray-700"}`}
//             onClick={() => setIsSignup(true)}
//           >
//             Signup
//           </button>
//           <button
//             className={`flex-1 p-2 text-center relative z-10 transition-colors ${!isSignup ? "text-white" : "text-gray-700"}`}
//             onClick={() => setIsSignup(false)}
//           >
//             Login
//           </button>
//         </div>
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="flex-1 flex flex-col justify-center"
//         >
//           <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full">
//             <h2 className="text-xl font-bold mb-2">{isSignup ? "Signup" : "Login"}</h2>
//             {!isSignup && (
//               <>
//                 <label className="block mb-2">Email or Phone Number</label>
//                 <input className="w-full p-2 border rounded mb-2" type="text" required />
//                 <label className="block mb-2">Password</label>
//                 <input className="w-full p-2 border rounded mb-2" type="password" required />
//               </>
//             )}
//             {isSignup && (
//               <>
//                 <label className="block mb-2">Email</label>
//                 <input className="w-full p-2 border rounded mb-2" type="email" required />
//                 <label className="block mb-2">Phone Number</label>
//                 <input
//                   className="w-full p-2 border rounded mb-2"
//                   type="text"
//                   placeholder="Enter phone number"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   required
//                 />
//                 <button type="button" onClick={generateOtp} className="w-full bg-gray-500 text-white p-2 rounded mb-2">Send OTP</button>
//               </>
//             )}
//             <label className="block mb-2">Enter OTP</label>
//             <input
//               className="w-full p-2 border rounded mb-2"
//               type="text"
//               placeholder="Enter OTP"
//               value={otpInput}
//               onChange={(e) => setOtpInput(e.target.value)}
//               required
//             />
//             {isSignup && (
//               <>
//                 <label className="block mb-2">Password</label>
//                 <input className="w-full p-2 border rounded mb-2" type="password" required />
//                 <label className="block mb-2">Captcha:</label>
//                 <div className="w-full p-2 text-lg font-bold bg-gradient-to-r from-red-600 to-purple-500 text-white text-center tracking-wide border rounded mb-2 shadow-lg">
//                   <span className="text-white shadow-md font-mono">{captcha}</span>
//                 </div>
//                 <input
//                   className="w-full p-2 border rounded mb-2"
//                   type="text"
//                   placeholder="Enter Captcha"
//                   value={captchaInput}
//                   onChange={(e) => setCaptchaInput(e.target.value)}
//                   required
//                 />
//               </>
//             )}
//             {!isSignup && (
//               <a href="#" className="text-red-600 text-sm mb-2 block">Forgot Password?</a>
//             )}
//             <button className="w-full bg-red-600 text-white p-2 rounded">{isSignup ? "Signup" : "Login"}</button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;


import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [password, setPassword] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  const generateOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(otpCode);
    alert(`Your OTP is: ${otpCode}`); // Simulating OTP send
  };

  const generateCaptcha = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setGeneratedCaptcha(captcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp !== otpInput) {
      alert("OTP does not match! Try again.");
      return;
    }
    alert(isSignup ? "Signup Successful!" : "Login Successful!");
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
                <input className="w-full p-2 border rounded mb-2" type="text" required />
                <label className="block mb-2">Password</label>
                <input className="w-full p-2 border rounded mb-2" type="password" required />
              </>
            )}
            {isSignup && (
              <>
                <label className="block mb-2">Name</label>
                <input className="w-full p-2 border rounded mb-2" type="text" placeholder="Enter your name" required />
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
                <input className="w-full p-2 border rounded mb-2" type="email" required />
                <button type="button" onClick={generateOtp} className="w-full bg-gray-500 text-white p-2 rounded mb-2">Send OTP</button>
              </>
            )}
            <label className="block mb-2">Enter OTP</label>
            <input
              className="w-full p-2 border rounded mb-2"
              type="text"
              placeholder="Enter OTP"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              required
            />
            {isSignup && (
              <>
                <label className="block mb-2">Password</label>
                <input className="w-full p-2 border rounded mb-2" type="password" required />
                <label className="block mb-2">Confirm Password</label>
                <input className="w-full p-2 border rounded mb-2" type="password" required />
              </>
            )}
            {!isSignup && (
              <a href="#" className="text-red-600 text-sm mb-2 block">Forgot Password?</a>
            )}
            <button className="w-full bg-red-600 text-white p-2 rounded">{isSignup ? "Signup" : "Login"}</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;

