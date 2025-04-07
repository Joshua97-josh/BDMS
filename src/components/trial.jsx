import React, { useState, useEffect } from "react";

const DonorSignUp = () => {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( 
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          setLocation(data.display_name);
        } catch (error) {
          console.error("Error fetching location data: ", error);
        }
      },
      (error) => console.error("Error getting location: ", error)
    );
  }, []);

  const handleDobChange = (e) => {
    setDob(e.target.value);
    const birthYear = new Date(e.target.value).getFullYear();
    const currentYear = new Date().getFullYear();
    setAge(currentYear - birthYear);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-full mx-auto mt-10 ">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Donor Sign-Up</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 bg-white gap-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input type="text" className="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-gray-700">Date of Birth</label>
          <input type="date" value={dob} onChange={handleDobChange} className="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-gray-700">Age</label>
          <input type="number" value={age} className="w-full p-2 border rounded-lg" readOnly />
        </div>
        <div>
          <label className="block text-gray-700">Gender</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Mobile</label>
          <input type="text" className="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full p-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-gray-700">State</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Tamil Nadu</option>
            <option>Karnataka</option>
            <option>Kerala</option>
            <option>Andhra Pradesh</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">District</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Chennai</option>
            <option>Coimbatore</option>
            <option>Madurai</option>
            <option>Tirunelveli</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Pin Code</label>
          <input type="text" className="w-full p-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-gray-700">Location</label>
          <input type="text" value={location} className="w-full p-2 border rounded-lg" readOnly />
        </div>
        <div className="col-span-2 text-center">
          <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg">Sign Up</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default DonorSignUp;
