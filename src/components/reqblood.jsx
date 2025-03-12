import { useState } from 'react';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    country: '',
    state: '',
    district: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Blood Group</label>
          <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
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
        <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700">Submit Request</button>
      </form>
    </div>
  );
}
