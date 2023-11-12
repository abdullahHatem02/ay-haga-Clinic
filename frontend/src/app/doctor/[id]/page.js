"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Image } from "react-bootstrap"; // Assuming you are using react-bootstrap
import NavbarDoc from "../../../../components/NavbarDoc";
import FooterDoc from "../../../../components/FooterDoc";
import ChangePassword from "../../../../components/ChangePassword";
import ContractPage from "../Contract/page";
import {
  viewDoctorDetails,
  doctorAddAvailableDate,
  updateDoctor,
  doctorViewContract,
} from "../../redux/actions/doctorActions";



export default function DoctorProfile({ params }) {
  const dispatch = useDispatch();

  let date;
  let permission;
  let userInfo;
  const id = params.id;

  const [edit, setEdit] = useState(false); // Updated variable name
  const [newEmail, setNewEmail] = useState("");
  const [newHourlyRate, setNewHourlyRate] = useState("");
  const [newAffiliation, setNewAffiliation] = useState("");
  const [newdoctor, setNewDoctor] = useState({});
  const [newDate, setNewDate] = useState("");
  const isLoading = useSelector(
    (state) => state.doctorAddAvailableDateReducer.loading
  );

  useEffect(() => {
    dispatch(viewDoctorDetails(params.id));
    dispatch(doctorViewContract(params.id));
  }, [dispatch, id, newEmail, newdoctor, isLoading]);

  const doctor = useSelector((state) => state.doctorReducer.doctor);
  const doctorContract = useSelector(
    (state) => state.doctorViewContractReducer.contract
  );
  const docStatus = doctorContract?.data.status;

  if (localStorage) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }
  if (userInfo) {
    permission = userInfo.data.user.role;
  }
  if (doctor) {
    date = formatDateToDDMMYYYY(doctor.DateOfbirth);
  }

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const handleDateChange = (e) => {
    setNewDate(e.target.value);
  };

  const handleAddDate = () => {
    dispatch(doctorAddAvailableDate({ availableDate: newDate }));
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleHourlyRateChange = (e) => {
    setNewHourlyRate(e.target.value);
  };

  const handleAffiliationChange = (e) => {
    setNewAffiliation(e.target.value);
  };

  const handleSubmit = () => {
    let updatedDoctor = { ...newdoctor };
    if (newEmail) {
      updatedDoctor.email = newEmail;
    }

    if (newHourlyRate) {
      updatedDoctor.HourlyRate = newHourlyRate;
    }

    if (newAffiliation) {
      updatedDoctor.affiliation = newAffiliation;
    }
    setNewDoctor(updatedDoctor);
    dispatch(updateDoctor(updatedDoctor));
    dispatch(viewDoctorDetails(params.id));
    setNewEmail("");
    setNewHourlyRate("");
    setNewAffiliation("");
  };

  function DateCardList() {
    return (
      <div className="card-list d-flex">
        {doctor.availableDates.map((date, index) => (
          <div className="w-25 p-2" key={index}>
            <Card
              title={date}
              subtitle=""
              text=""
              onClick={() => alert("Card Clicked")}
              onClickButton={() => alert("Button Clicked")}
              headerText={index + 1}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
    {docStatus==="accepted" && (<div>
    <NavbarDoc/>
      {doctor ? (
        <div className="m-5">
          <div className=" d-flex mx-auto rounded shadow col-md-9 m-5">
          <div className=" w-25 border-end ">
            <div className="p-3 border-bottom mx-auto">
              <div>
                <Image src="/profile.svg" height={200} width={200} />
              </div>
            </div>
            <div className="mx-auto">
              <ChangePassword className='h-100 '/>
            </div>
          </div>
          <div className="p-5 w-75">
            <div className="border-bottom d-flex">
              <div className="w-75">
                <h1>{doctor.name}</h1>
                <p className="px-3 text-secondary">{doctor.speciality}</p>
              </div>
              <div className="w-25">
                {permission == "doctor" && (
                  <Button
                    text="Edit Information"
                    variant="small"
                    onClick={() => {
                      setedit(true);
                      console.log("new doctor", newdoctor);
                    }}
                  ></Button>
                )}
              </div>
            </div>
            <div className="p-2 border-bottom row">
              <div className="p-3 col-md-6">
              <div className="text-body-secondary fw-bold small p-3 ">
                Doctor Information
              </div>
                <div className="py-3 d-flex">
                  <span className="fw-bold w-25">
                    <Image src="/mail-dark.svg" height={25} width={25} />
                  </span>
                  {edit || <span className="w-50">{doctor.email}</span>}
                  <span className="w-50">
                    {!edit || (
                      <input
                        type="email"
                        className="form-control"
                        placeholder={doctor.email}
                        value={newEmail}
                        onChange={handleEmailChange}
                      />
                    )}
                  </span>
                </div>
                <div className="py-2 d-flex ">
                  <span className="fw-bold w-25 ">
                    <Image src="/birthday.svg" height={25} width={25} />
                  </span>
                  <span className="w-50">{date}</span>
                  <span className="w-50"></span>
                </div>
                <div className="py-2 d-flex ">
                  <span className="fw-bold w-25 ">
                    <Image src="/cart.svg" height={25} width={25} />
                  </span>
                  {edit || <span className="w-50">{doctor.HourlyRate}</span>}
                  <span className="w-50">
                    {!edit || (
                      <input
                        type="email"
                        className="form-control"
                        placeholder={doctor.HourlyRate}
                        value={newHourlyRate}
                        onChange={handleHourlyRateChange}
                      />
                    )}
                  </span>
                </div>
                <div className="py-2 d-flex ">
                  <span className="fw-bold w-25 ">
                    <Image src="/affiliation.svg" height={25} width={25} />
                  </span>
                  {edit || <span className="w-50">{doctor.affiliation}</span>}
                  <span className="w-50">
                    {!edit || (
                      <input
                        type="email"
                        className="form-control"
                        placeholder={doctor.affiliation}
                        value={newAffiliation}
                        onChange={handleAffiliationChange}
                      />
                    )}
                  </span>
                </div>
                <div className="py-2 d-flex">
                  <span className="fw-bold w-25">
                    <Image src="/education.svg" height={25} width={25} />
                  </span>
                  <span className="w-50">{doctor.educationalbackground}</span>
                  <span className="w-50"></span>
                </div>
              </div>

              <div>
                <div className="text-body-secondary fw-bold small p-3 ">
                  Available Dates
                </div>
                <div className='col-md-3'>
          <input type="datetime-local" id="appointmentdate" name="appointmentdate" 
             className='search-input'onChange={(e) => {handleDateChange(e)}}/>
        </div>
        <br></br>
        <Button text="Add Available Date" variant="xs" onClick={()=>handleAddDate()}></Button>
                <DateCardList />
              </div>
            </div>
            {!edit || (
              <div className="col-md-4 mx-auto">
                <Button
                  text="Cancel"
                  variant="small"
                  color="danger"
                  onClick={() => {
                    setedit(false);
                  }}
                  className='mx-1 my-2'
                ></Button>
                <Button
                  text="Submit"
                  variant="small"
                  onClick={() => {
                    handleSubmit();
                    setedit(false);
                  }}
                  className='mx-1 my-2'
                ></Button>
              </div>
            )}
              <div>
                <div className="text-body-secondary fw-bold small p-3 ">
                  Available Dates
                </div>
                <DateCardList />
              </div>
            
          </div>
        </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <FooterDoc/>
    </div>)}
    {(docStatus==='pending' || docStatus==='waitingadmin') && <ContractPage/>}
    </div>

  );
}


