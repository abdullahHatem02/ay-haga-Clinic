'use client'
import React from 'react';
import { Button } from 'react-bootstrap';
// import Navbar from '../../../../components/Navbar';
// import Footer from '../../../../components/Footer';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doctorViewContract, doctorAcceptContract } from "../../redux/actions/doctorActions";
import { removeUser } from "../../redux/actions/userActions";

//652db656d750751a50d24e0a 

const ContractPage = () => {
  const dispatch = useDispatch();

  let doctorId;
  let userInfo;

  const doctorContract = useSelector((state) => state.doctorViewContractReducer.contract);

  if (localStorage) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
    doctorId = userInfo.data.user._id;
  }

  
  useEffect(() => {
    dispatch(doctorViewContract(doctorId));
  }, [dispatch, doctorContract]);
  
  console.log(doctorId)
  console.log(doctorContract)

  const handleAccept = (e) =>{
    e.preventDefault();
    dispatch(doctorAcceptContract(doctorId))
    console.log('accepted')
  }

  const handleReject = (e) =>{
    e.preventDefault();
    dispatch(removeUser(doctorId));
    console.log('rejected')
    window.history.pushState({},"",`/guest/Login`)
  }

  return (
    <div className='w-100'>
      <div className="page-div container justify-content-center align-items-center m-5 mx-auto">
        <h1 className="text-primary text-center"><strong>Employment Contract</strong></h1>
        <h3 className='text-center'>XClinics Clinic</h3>
        <div className='d-flex justify-content-center align-items-center'><hr className='w-50'/></div>
        <div className="card bg-light rounded shadow p-5 m-5 border-0 align-self-center mx-auto">
          <h4 className='text-primary'>Contract Overview</h4>
          <p>
            This employment contract outlines the terms and conditions of employment for doctors at XClinics. It includes details on job responsibilities, work hours, compensation, and the terms of employment termination.
          </p>
          <br />

          <h4 className='text-primary'>Responsibilities</h4>
          <p>
            Doctors are expected to provide the <strong>highest standard</strong> of medical care to our patients and adhere to the medical and <strong>ethical guidelines</strong> set forth by the clinic which include:
            <br />
            <strong>Providing </strong>direct patient care & administering medications and treatments, <strong>Maintaining</strong> accurate patient records, <strong>Assisting</strong> with patient education and support,
            and <strong>Collaborating</strong> with other healthcare professionals.
          </p>
          <br />

          <h4 className='text-primary'>Compensation and Benefits</h4>
          <p>
            Employee will be compensated an <strong>hourly rate of {doctorContract?.data.hourlyRate}</strong> which will be subject to a <strong>{doctorContract?.data.clinicMarkUp * 100}% clinic markup</strong>.
            <br />
            Our employees will have access to <strong>healthcare benefits</strong>, including medical, dental, and vision insurance, as per the Employee Benefits Package provided.
          </p>
          <br />

          <h4 className='text-primary'>Work Hours and Vacation</h4>
          <p>
          Regular work hours will be <strong>Sunday through Thursday, 10:00 AM to 7:00 PM.</strong>
          <br />
          Employees are entitled to <strong>15 paid vacation days per year</strong>, subject to the clinic's vacation policy.
          </p>
          <br />

          <h4 className='text-primary'>Confidentiality and Non-Compete</h4>
          <p>
          Employee agrees to maintain the <strong>confidentiality</strong> of all patient records and clinic-related information <strong>during and after employment</strong>.
          <br />
          Employee <strong>shall not engage in any activities</strong> that directly compete with the services offered by any other Medical Clinic <strong>during the term of employment and for 12 months after termination</strong>.
          </p>
          <br />

          <h4 className='text-primary'>Termination</h4>
          <p>
          Either party may terminate this Contract with written <strong>notice of 30 days</strong>.
          <br />
          Grounds for termination may include but are not limited to violation of clinic policies, unsatisfactory performance, or any breach of this Contract.
          </p>
          <br />

          <h4 className='text-primary'>Acceptance</h4>
          <p>
            By signing this contract, both parties acknowledge and agree to the terms and conditions outlined above.
          </p>
          <br />

          <p className='text-center mt-5 text-primary'>
            <strong>
            This contract is valid as of November 2023.
            </strong>
          </p>
        <hr />
        <div className='row mt-5'>
          <Button onClick={(e)=>handleAccept(e)} variant='md' className='col-md-3 px-3 btn btn-primary mx-auto' color='primary'>Accept</Button>
          <Button onClick={(e)=>handleReject(e)} variant='md' className='col-md-3 px-3 btn btn-dark mx-auto' color='dark'>Reject</Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPage;
