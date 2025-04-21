// import React, { useState, useEffect } from "react";

// function Demo() {
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [bloodGroup, setBloodGroup] = useState("");
//   const [state, setState] = useState("");
//   const [district, setDistrict] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [location, setLocation] = useState({ latitude: null, longitude: null, place: "" });
//   const [error, setError] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");
//   const [email, setEmail] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [userCaptcha, setUserCaptcha] = useState("");

//   const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
//   const statesList = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"];
//   const districtsList = {
//     "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
//     Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
//     Karnataka: ["Bangalore", "Mysore", "Mangalore"],
//     "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Tirupati"],
//   };

//   useEffect(() => {
//     setCaptcha(generateCaptcha());
//   }, []);

//   const generateCaptcha = () => {
//     return Math.random().toString(36).substr(2, 6).toUpperCase();
//   };

//   const handleDobChange = (e) => {
//     const inputDob = e.target.value;
//     setDob(inputDob);
//     if (inputDob) {
//       const birthYear = new Date(inputDob).getFullYear();
//       const currentYear = new Date().getFullYear();
//       setAge(currentYear - birthYear);
//     }
//   };

//   const getLocation = async (e) => {
//     e.preventDefault();
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const lat = position.coords.latitude;
//           const lon = position.coords.longitude;
//           try {
//             const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
//             const data = await response.json();
//             setLocation({ latitude: lat, longitude: lon, place: data.display_name });
//           } catch (err) {
//             setError("Failed to fetch place name");
//           }
//         },
//         () => setError("Location access denied. Enable GPS.")
//       );
//     } else {
//       setError("Geolocation is not supported by your browser.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (userCaptcha !== captcha) {
//       alert("Invalid Captcha!");
//       return;
//     }

//     const donorData = {
//       name,
//       dob,
//       age,
//       gender,
//       bloodGroup,
//       state,
//       district,
//       pincode,
//       location: location.place,
//       latitude: location.latitude,
//       longitude: location.longitude,
//       phoneNumber: phoneNo,
//       emailId: email,
//     };

//     fetch("http://localhost:8080/api/submit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(donorData),
//     })
//       .then((response) => response.text())
//       .then((data) => alert("✅ " + data))
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg" onSubmit={handleSubmit}>
//         <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Blood Donor Registration</h2>

//         <label>Name</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

//         <label>Date of Birth</label>
//         <input type="date" value={dob} onChange={handleDobChange} required />

//         <label>Age</label>
//         <input type="number" value={age} readOnly />

//         <label>State</label>
//         <select value={state} onChange={(e) => setState(e.target.value)} required>
//           <option value="" disabled>Select State</option>
//           {statesList.map((st) => (
//             <option key={st} value={st}>{st}</option>
//           ))}
//         </select>

//         <label>District</label>
//         <select value={district} onChange={(e) => setDistrict(e.target.value)} required>
//           <option value="" disabled>Select District</option>
//           {state && districtsList[state]?.map((dist) => (
//             <option key={dist} value={dist}>{dist}</option>
//           ))}
//         </select>

//         <label>Pincode</label>
//         <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required />

//         <label>Location</label>
//         <button onClick={getLocation}>Get Location</button>
//         {location.place && <p>📍 {location.place}</p>}
//         {error && <p className="text-red-500">{error}</p>}

//         <label>Captcha: {captcha}</label>
//         <input type="text" value={userCaptcha} onChange={(e) => setUserCaptcha(e.target.value)} required />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Demo;
import React, { useState, useEffect } from "react";

function Demo() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null, place: "" });
  const [error, setError] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const statesList = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh"];
  const districtsList = {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Tirupati"],
  };

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const generateCaptcha = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const handleDobChange = (e) => {
    const inputDob = e.target.value;
    setDob(inputDob);
    if (inputDob) {
      const birthYear = new Date(inputDob).getFullYear();
      const currentYear = new Date().getFullYear();
      setAge(currentYear - birthYear);
    }
  };

  const getLocation = async (e) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await response.json();
            setLocation({ latitude: lat, longitude: lon, place: data.display_name });
          } catch (err) {
            setError("Failed to fetch place name");
          }
        },
        () => setError("Location access denied. Enable GPS.")
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userCaptcha !== captcha) {
      alert("Invalid Captcha!");
      return;
    }

    const donorData = {
      name,
      dob,
      age,
      gender,
      bloodGroup,
      state,
      district,
      pincode,
      location: location.place,
      latitude: location.latitude,
      longitude: location.longitude,
      phoneNumber: phoneNo,
      emailId: email,
    };

    fetch("http://localhost:8080/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donorData),
    })
      .then((response) => response.text())
      .then((data) => alert("✅ " + data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Blood Donor Registration</h2>

        <label className="block text-gray-700">Name</label>
        <input className="input-field w-full p-3 mb-3 border rounded-lg" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label className="block text-gray-700">Date of Birth</label>
        <input className="input-field w-full p-3 mb-3 border rounded-lg" type="date" value={dob} onChange={handleDobChange} required />

        <label className="block text-gray-700">Age</label>
        <input className="input-field w-full p-3 mb-3 border rounded-lg" type="number" value={age} readOnly />

        <label className="block text-gray-700">State</label>
        <select className="input-field w-full p-3 mb-3 border rounded-lg" value={state} onChange={(e) => setState(e.target.value)} required>
          <option value="" disabled>Select State</option>
          {statesList.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>

        <label className="block text-gray-700">District</label>
        <select className="input-field w-full p-3 mb-3 border rounded-lg" value={district} onChange={(e) => setDistrict(e.target.value)} required>
          <option value="" disabled>Select District</option>
          {state && districtsList[state]?.map((dist) => (
            <option key={dist} value={dist}>{dist}</option>
          ))}
        </select>

        <label className="block text-gray-700">Pincode</label>
        <input className="input-field w-full p-3 mb-3 border rounded-lg" type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required />

        {/* <label className="block text-gray-700">Location</label>
        <button className="btn-primary w-full p-3 mb-3 border rounded-lg text-red-600" onClick={getLocation}>Get Live Location</button>
        {location.place && <p className="text-green-600 mt-2">📍 {location.place}</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>} */}

        <label className="block text-gray-700">Location</label>
        <button className="w-full p-2 bg-red-600 text-white rounded mb-3 hover:bg-red-700" onClick={getLocation}>
          Get Location
        </button>
        {location.place && <p className="text-sm text-gray-600">📍 {location.place}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <label className="block text-gray-700">Captcha: {captcha}</label>
        <input className="input-field w-full p-3 mb-3 border rounded-lg" type="text" value={userCaptcha} onChange={(e) => setUserCaptcha(e.target.value)} required />

        <button type="submit" className="btn-primary mt-4">Register</button>
      </form>
    </div>
  );
}

export default Demo;
