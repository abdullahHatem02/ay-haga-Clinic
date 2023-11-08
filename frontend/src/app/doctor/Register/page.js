"use client";
import React, { useEffect } from "react";

import { useState } from "react";
import { Button } from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "@/app/redux/actions/authActions";
import Image from "next/image";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    educationalBackground: "",
    affiliation: "",
    hourlyRate: "",
    dateOfbirth: "",
    gender: "",
    mobileNumber: "",
    speciality: "",
    workingHours: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const useEffect()
  const { isAuthenticated, error, isLoading } = useSelector(
    (state) => state.registerReducer
  );

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    }
  };

  useEffect(() => {
    if (isAuthenticated === true) {
      window.alert("Successfully applied");
    } else if (error) window.alert("error");
  }, [isLoading, error, isAuthenticated]);

  const handleSignUp = () => {
    dispatch(
      registerAction({
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.password,
        DateOfbirth: formData.dateOfbirth,
        gender: formData.gender,
        phoneNumber: formData.mobileNumber,
        HourlyRate: formData.hourlyRate,
        educationalbackground: formData.educationalBackground,
        speciality: formData.affiliation,
        role: "doctor",
        affiliation: formData.affiliation,
        workingHours: formData.workingHours,
      })
    );
    // window.alert("Application submitted")
  };

  const [action] = useState("Sign up");

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7 mx-auto rounded shadow p-5">
            <div className="text-center mt-3">
              <h1 className="text-primary fw-bold text-size-50">Sign Up</h1>
              <h6 className="text-global text-center mb-3">
                Join us as a Doctor!
              </h6>
              <div className="underline mx-auto mb-5"></div>
            </div>
            <div className="px-4 p-3">
              <div className="personal-section">
                <h4 className="text-global mb-1">
                  Personal Details
                </h4>
                <h6 className="text-primary mb-3 text-muted">
                  Let us know more about you.
                </h6>
                <div className="p-2">
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <label htmlFor="name" className="text-semibold form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-1">
                      <label htmlFor="email" className="text-semibold form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        id="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <label htmlFor="username" className="text-semibold form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-1">
                      <label htmlFor="password" className="text-semibold form-label">
                        Password
                      </label>
                      <div className="row">
                        <div className="col-md-10">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="********"
                            className="form-control m-0"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-2 d-flex align-items-center bg-white rounded mx-auto">
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility('password')}
                            className="border-0 bg-white rounded mx-auto "
                          >
                            <Image src={showPassword ? "/hide.svg" : "/show.svg"} width={25} height={25} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-1">
                    <label htmlFor="mobileNumber" className="text-semibold form-label">
                      Mobile Number
                    </label>
                    <div className="mb-1 position-relative d-flex align-items-center"> 
                    <span className="px-2 position-absolute start-0 text-global fw-bold">(+2)</span>
                    <input
                      type="tel"
                      id="mobileNumber"
                      placeholder="01234567890"
                      className="px-5 form-control py-2"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                    />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <label htmlFor="gender" className="text-semibold form-label">
                        Gender
                      </label>
                      <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-1">
                      <label htmlFor="dateOfBirth" className="text-semibold form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfbirth"
                        className="form-control"
                        name="dateOfbirth"
                        value={formData.dateOfbirth}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr className="w-50 mx-auto mb-5"/>
              <div className="proffesional-section">
              <h4 className="text-global mb-1">
                  Professional Details
                </h4>
                <h6 className="text-primary mb-3 text-muted">
                  Let us know more about your work experience.
                </h6>
                <div className="p-2">
                  <div className="mb-1">
                  <label htmlFor="educationalBackground" className="text-semibold form-label">
                    Educational Background
                  </label>
                  <input
                    type="text"
                    id="educationalBackground"
                    className="form-control"
                    name="educationalBackground"
                    value={formData.educationalBackground}
                    onChange={handleInputChange}
                  />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <label htmlFor="affiliation" className="text-semibold form-label">
                        Affiliation
                      </label>
                      <input
                        type="text"
                        id="affiliation"
                        className="form-control"
                        name="affiliation"
                        value={formData.affiliation}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-1">
                      <label htmlFor="speciality" className="text-semibold form-label">
                        Speciality
                      </label>
                      <input
                        type="text"
                        id="speciality"
                        className="form-control"
                        name="speciality"
                        value={formData.speciality}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <label htmlFor="hourlyRate" className="text-semibold form-label">
                        Hourly Rate
                      </label>
                      <input
                        type="number"
                        id="hourlyRate"
                        className="form-control"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-1">
                      <label htmlFor="workingHours" className="text-semibold form-label">
                        Working Hours
                      </label>
                      <input
                        type="number"
                        id="workingHours"
                        className="form-control"
                        name="workingHours"
                        value={formData.workingHours}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button text="Sign Up" onClick={handleSignUp} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
