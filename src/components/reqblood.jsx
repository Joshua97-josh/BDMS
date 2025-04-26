import { useState, useEffect } from 'react';
import axios from 'axios';

const countries = {
  India: {
    TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
    Karnataka: ["Bangalore", "Mysore"],
  },
  USA: {
    California: ["Los Angeles", "San Francisco"],
    Texas: ["Houston", "Dallas"],
  },
};

export default function RequestBlood() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    phoneNumber: '',
    bloodGroup: '',
    country: '',
    state: '',
    district: '',
    reason: '',
    latitude: null,
    longitude: null,
  });

  const SelectField = ({ label, options, ...props }) => (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <select {...props} className="w-full p-2 border rounded-lg">
        <option value="">Select</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
  

  // Fetch location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          setLocation(data.display_name || "Location unavailable");

          setFormData((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
        } catch (error) {
          console.error("Error fetching location data: ", error);
          setLocation("Unable to fetch location");
        }
      },
      (error) => {
        console.error("Geolocation error: ", error);
        setLocation("Geolocation permission denied");
      }
    );
  }, []);

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setDob(dobValue);

    const birthDate = new Date(dobValue);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }

    setAge(calculatedAge);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      dob,
      age: parseInt(age),
      location,
    };

    try {
      console.log(dataToSend);
      // const response = await axios.post("http://localhost:8080/api/request-blood", dataToSend);
      // alert("✅ Blood request submitted successfully!");
    } catch (error) {
      if (error.response) {
        const errorText = error.response.data || "Unknown error";
        alert(`❌ Submission failed: ${errorText}`);
      } else {
        alert("❌ Network error or server unreachable.");
      }
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Request Blood</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input type="date" value={dob} onChange={handleDobChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Blood Group</label>
          <SelectField  type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg"  required options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <select name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required>
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {formData.country && (
          <div className="mb-4">
            <label className="block text-gray-700">State</label>
            <select name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required>
              <option value="">Select State</option>
              {Object.keys(countries[formData.country]).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        )}

        {formData.state && (
          <div className="mb-4">
            <label className="block text-gray-700">District</label>
            <select name="district" value={formData.district} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required>
              <option value="">Select District</option>
              {countries[formData.country][formData.state].map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Reason for Request</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Detected Location</label>
          <input type="text" value={location} readOnly className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100" />
        </div>

        <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700">Submit Request</button>
      </form>
    </div>
  );
  
}
