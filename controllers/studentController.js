const Student = require('../models/Student');

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

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

const createStudent = async (req, res) => {
  try {
    const { fullName, dob, address, branch } = req.body;
    const age = calculateAge(dob);
    const newStudent = new Student({ fullName, dob, address, branch, age });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// studentController.js
exports.createStudent = async (req, res) => {
    const { fullName, dob, address, branch, age } = req.body;
    if (!fullName || !dob || !address || !branch || !age) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const student = await Student.create({ fullName, dob, address, branch, age });
    res.status(201).json(student);
  };
  

module.exports = {
  getStudents,
  createStudent
};