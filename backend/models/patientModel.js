const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    }
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of Birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Gender is required']
  },
  package: {
    type: mongoose.Schema.ObjectId,
    ref: "HealthPackage"
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required']
  },
  emergencyContact: {
    fullName: {
      type: String,
      required: [true, 'Emergency contact full name is required']
    },
    mobileNumber: {
      type: String,
      required: [true, 'Emergency contact mobile number is required']
    }
  },
  healthRecords: [
    {
      type: String
    }
  ],
});


patientSchema.virtual('helathPackage', {
  ref: 'healthPackage',
  localField: 'package',
  foreignField: '_id',
  justOne: true
});


// Apply the virtual field to the schema
patientSchema.set('toObject', { virtuals: true });
patientSchema.set('toJSON', { virtuals: true });



const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
