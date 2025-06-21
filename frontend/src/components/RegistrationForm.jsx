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

   const [errors, setErrors] = useState({});
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

const validate = () => {
  const newErrors = {};

  // ✅ Full name validation (min 3 alphabetic letters)
  const fullName = formData.fullName.trim();
  if (!fullName) {
    newErrors.fullName = 'Enter full name';
  } else {
    const letterCount = fullName.replace(/[^A-Za-z]/g, '').length;
    if (letterCount < 3) {
      newErrors.fullName = 'Full name must contain at least 3 letters';
    } else if (!/^[A-Za-z ]+$/.test(fullName)) {
      newErrors.fullName = 'Full name must contain only letters and spaces';
    }
    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
  }

  // ✅ DOB validation (must be past date and age ≥ 18)
  if (!formData.dob) {
    newErrors.dob = 'Date of Birth is required';
  } else {
    const dobDate = new Date(formData.dob);
    const today = new Date();
    const age = calculateAge(formData.dob);
    if (dobDate >= today) {
      newErrors.dob = 'DOB must be in the past';
    } else if (age < 18) {
      newErrors.dob = 'Student must be at least 18 years old';
    }
  }

  // ✅ Address validation
  if (!formData.address.trim() || formData.address.trim().length < 10) {
    newErrors.address = 'Address must be at least 10 characters long';
  }

  // ✅ Branch validation
  if (!formData.branch) {
    newErrors.branch = 'Please select a branch';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === 'dob') {
      newFormData.age = calculateAge(value);
    }

    setFormData(newFormData);
    setErrors({ ...errors, [name]: '' }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}

      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
       
        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"

      />
       {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}

      <textarea
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        minLength="10"
        required
        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
      ></textarea>
       {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}


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
      {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}

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
