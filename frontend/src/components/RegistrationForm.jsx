import React, { useState } from 'react';
import axios from 'axios';

const branches = ['CS', 'IT', 'E&TC', 'Mechanical'];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    address: '',
    branch: '',
    age: ''
  });

  const [success, setSuccess] = useState('');

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === 'dob') {
      newFormData.age = calculateAge(value);
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', formData);
      setSuccess('Student registered successfully!');
      setFormData({
        fullName: '',
        dob: '',
        address: '',
        branch: '',
        age: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccess('Error submitting form.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        pattern="[A-Za-z ]+"
        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        minLength="10"
        required
        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
      ></textarea>

      <select
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Select Branch</option>
        {branches.map((branch) => (
          <option key={branch} value={branch}>{branch}</option>
        ))}
      </select>

      <input
        type="number"
        name="age"
        value={formData.age}
        readOnly
        placeholder="Age"
        className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-white"
      />

      <button
        type="submit"
        className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
      >
        Submit
      </button>

      {success && <p className="text-green-600 dark:text-green-400 text-center mt-2">{success}</p>}
    </form>
  );
};

export default RegistrationForm;
