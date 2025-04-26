import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Getlocalstorage, Getlocalstorageusername } from "../localstorage";
import { DonorRegistration, Get_Use_one, GetTimetocken } from "../springboot_usercontion";
import { useNavigate } from "react-router-dom";


const DonorSignUp = () => {
  const navigate=useNavigate();

  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [Useondata, setUseondata] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    emailId: "",
    bloodGroup: "",
    state: "",
    unit: "",
    district: "",
    pinCode: "",
    latitude: null,
    longitude: null,
  });

  var username = Getlocalstorageusername();
  var Tocken = Getlocalstorage();

  useEffect(() => {
    Get_use_one_name();
  }, []);
  async function Get_use_one_name() {
    try {
      var response = await GetTimetocken(Tocken);
      console.log(response.data);
    var response = await GetTimetocken(Tocken);
    var data_get = { username, Tocken };
    var Spring_Response = await Get_Use_one(data_get);
    setUseondata(Spring_Response.data)
    console.log(Spring_Response.data);
    console.log(Useondata);
  } catch (error) {
    navigate("/");
    console.log(error.response.data);
  }
  }

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      name: Useondata.name,
      phoneNumber: Useondata.phone,
      emailId: Useondata.username,
    }));
  }, [Useondata]);

  console.log(formData);

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
      Tocken,
    };

    try {
      console.log(dataToSend);

      var respon = await DonorRegistration(dataToSend);
      console.log(respon.data);
      //const response = await axios.post("http://localhost:8080/api/submit", dataToSend);

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
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Donor Registration</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <FormField label="Name" type="text" name="name" value={Useondata.name} onChange={handleChange} required />
          <FormField label="Date of Birth" type="date" value={dob} onChange={handleDobChange} required />
          <FormField label="Age" type="number" value={age} readOnly />
          <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} required options={["Male", "Female", "Other"]} />
          <SelectField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
          <SelectField label="Unit" name="unit" value={formData.unit} onChange={handleChange} required options={["1", "2"]} />
          <FormField label="Phone Number" type="number" name="phoneNumber" value={Useondata.phone} onChange={handleChange} required />
          <FormField label="Email ID" type="email" name="emailId" value={Useondata.username} onChange={handleChange} />
          <SelectField label="State" name="state" value={formData.state} onChange={handleChange} required options={["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh"]} />
          <SelectField label="District" name="district" value={formData.district} onChange={handleChange} required options={["Chennai", "Coimbatore", "Madurai", "Tirunelveli"]} />
          <FormField label="Pin Code" name="pinCode" type="number" value={formData.pinCode} onChange={handleChange} required />
          <FormField label="Location" value={location} readOnly />

          <div className="col-span-2 text-center mt-4">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg">
              Submit
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