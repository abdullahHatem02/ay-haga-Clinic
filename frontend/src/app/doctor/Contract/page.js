import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const ContractPage = () => {
  return (
    <div className='w-100'>
      <Navbar />
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
            Doctors are expected to provide the highest standard of medical care to our patients and adhere to the medical and ethical guidelines set forth by the clinic.
          </p>
          <br />

          <h4 className='text-primary'>Compensation and Benefits</h4>
          <p>
            Compensation details, including salary, bonuses, and benefits such as health insurance and paid leave, are described within this section.
          </p>
          <br />

          <h4 className='text-primary'>Work Hours and Vacation</h4>
          <p>
            The regular work hours, on-call expectations, and vacation policy are covered under this section to ensure a clear understanding of work-life balance at XClinics.
          </p>
          <br />

          <h4 className='text-primary'>Confidentiality and Non-Compete</h4>
          <p>
            Doctors are required to maintain confidentiality regarding patient information and clinic operations. A non-compete clause is also included to protect the clinic's interests.
          </p>
          <br />

          <h4 className='text-primary'>Termination</h4>
          <p>
            The conditions under which the employment contract can be terminated by either party are clearly outlined to avoid any misunderstandings.
          </p>
          <br />

          <h4 className='text-primary'>Acceptance</h4>
          <p>
            By signing this contract, the doctor agrees to all terms and conditions stated and commits to upholding the standards of XClinics.
          </p>
          <br />

          <p className='text-center mt-5 text-primary'>
            <strong>
            This contract is valid as of [Effective Date].
            </strong>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContractPage;
