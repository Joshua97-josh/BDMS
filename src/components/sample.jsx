import React, { useState } from "react";

function Sample() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState({ latitude: null, longitude: null, place: "" });
  const [error, setError] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  // Function to get location
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

  // Function to submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    const donorData = {
      name,
      age: parseInt(age, 10),
      gender,
      bloodGroup,
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
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">User Registration</h2>

        <label className="block text-gray-700">Name</label>
        <input type="text" className="w-full p-2 border rounded mb-3" value={name} onChange={(e) => setName(e.target.value)} required />

        <label className="block text-gray-700">Age</label>
        <input type="number" className="w-full p-2 border rounded mb-3" value={age} onChange={(e) => setAge(e.target.value)} required />

        <label className="block text-gray-700">Gender</label>
        <div className="flex gap-4 mb-3">
          {['Male', 'Female', 'Others'].map((g) => (
            <label key={g} className="flex items-center gap-2">
              <input type="radio" name="gender" value={g} checked={gender === g} onChange={(e) => setGender(e.target.value)} />
              {g}
            </label>
          ))}
        </div>

        <label className="block text-gray-700">Blood Group</label>
        <select
          className="w-full p-2 border rounded mb-3"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
        >
          <option value="" disabled>Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        <label className="block text-gray-700">Location</label>
        <button className="w-full p-2 bg-red-600 text-white rounded mb-3 hover:bg-red-700" onClick={getLocation}>
          Get Location
        </button>
        {location.place && <p className="text-sm text-gray-600">📍 {location.place}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}

        <label className="block text-gray-700">Phone</label>
        <input type="text" className="w-full p-2 border rounded mb-3" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />

        <label className="block text-gray-700">Email ID</label>
        <input type="email" className="w-full p-2 border rounded mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <button type="submit" className="w-full p-3 bg-red-600 text-white rounded hover:bg-red-700">
          Register
        </button>
      </form>
    </div>
  );
}

export default Sample;
