import React, { useState, useEffect } from "react";
import axios from 'axios'


const DonorSignUp = () => {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    emailId: "",
    bloodGroup: "",
    state: "",
    district: "",
    pinCode: "",
    latitude: null,
    longitude: null,
  });

  // Fetch location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
           ` https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
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
      const response = await axios.post("http://localhost:8080/api/submit", dataToSend);
    
      // In axios, a successful response (status 200–299) comes here
      alert("✅ Donor registered successfully!");
    } catch (error) {
      if (error.response) {
        // Server responded with a status outside 2xx
        const errorText = error.response.data || "Unknown error";
        alert(`❌ Registration failed: ${errorText}`);
      } else {
        // Network error or no response
        console.error("Error submitting form: ", error);
        alert("❌ Network error while submitting the form.");
      }
    }
    
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Donor Sign-Up</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <FormField label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <FormField label="Date of Birth" type="date" value={dob} onChange={handleDobChange} required />
          <FormField label="Age" type="number" value={age} readOnly />
          <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} required options={["Male", "Female", "Other"]} />
          <SelectField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
          <FormField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          <FormField label="Email ID" type="email" name="emailId" value={formData.emailId} onChange={handleChange} />
          <SelectField label="State" name="state" value={formData.state} onChange={handleChange} required options={["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh"]} />
          <SelectField label="District" name="district" value={formData.district} onChange={handleChange} required options={["Chennai", "Coimbatore", "Madurai", "Tirunelveli"]} />
          <FormField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
          <FormField label="Location" value={location} readOnly />

          <div className="col-span-2 text-center mt-4">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable input field
const FormField = ({ label, ...props }) => (
  <div>
    <label className="block text-gray-700 mb-1">{label}</label>
    <input {...props} className="w-full p-2 border rounded-lg" />
  </div>
);

// Reusable select field
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

export default DonorSignUp;