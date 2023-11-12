const { validationResult } = require('express-validator');
const FamilyMember = require('../models/familyMembersModel');
const handlerFactory = require('./handlerFactory');
const patientController = require('./patientController');
const Patient = require('../models/patientModel');
const catchAsync = require('../utils/catchAsync');

exports.addFamilyMembers = catchAsync(async (req, res,next) => {
    const { name, nationalId, age, gender, relationToPatient} = req.body;
    // const patientId = await patientController.getPatientIdFromUserId(req.user._id);
    const patient = await Patient.findOne({user: req.user._id});
    const patientId = patient._id

    // Create a new family member instance using the Mongoose model
    const familyMember = new FamilyMember({
      name,
      nationalId,
      age,
      gender,
      relationToPatient,
      patientId : patientId
    });

    // Save the family member to the database
    await familyMember.save();
    req.body.sendtoken=false;
    req.body.id=familyMember._id;
    // Respond with a success message
 next()
     
});
exports.linkFamilyMember = catchAsync(async (req, res,next) => {
  const { name, nationalId, age, gender, relationToPatient,email} = req.body;

  const patient = await Patient.findOne({user: req.user._id});
  const familymemberaspatient = await Patient.findOne({email:email});
  const patientId = patient._id
  const familyMemberId=familymemberaspatient._id;


  // Create a new family member instance using the Mongoose model
  //DONT FORGET HANDLING IN GETTTTT!!!! @ABDULLAH AND AMIR 
  const familyMember = new FamilyMember({
    name,
    nationalId,
    age,
    gender,
    relationToPatient,
    patientId : patientId,
    linkedPatientId: familyMemberId
  });

  // Save the family member to the database
  await familyMember.save();

  // Respond with a success message
  res.status(200).json({
    status: 'success',
    data: {
        data: familyMember
    }
});

});
exports.viewRegisteredFamilyMembers = catchAsync(async (req, res,next) => {
    const patient = await Patient.findOne({user: req.user._id});
    const patientId = patient._id
    req.query["patientId"] = { "eq": patientId };
    handlerFactory.getAll(FamilyMember)(req,res,next);
});

exports.viewFamilyMemberAsPatient = async (req, res, next) => {
  try {
    const familyMemberId = req.params.familyMemberId;
    const familyMember = await FamilyMember.findById(familyMemberId);

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    if (!familyMember.linkedPatientId) {
      return res.status(400).json({ message: 'This family member is not registered as a patient' });
    }

    const patient = await Patient.findById(familyMember.linkedPatientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json({ patient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

