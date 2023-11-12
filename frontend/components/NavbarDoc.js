'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { logout } from '@/app/redux/actions/authActions';

const NavbarDoc = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch=useDispatch()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goBack = () => {
    history.back()
  }
  const handleLogout= ()=>{
    dispatch(logout)
    
    }
  const id = JSON.parse(localStorage.getItem('userInfo')).data.user.doctor._id;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container d-flex flex-row justify-content-between align-items-center w-100">
      <Image src="/chevron.svg" width={20} height={20} className='mx-3 rotate-90 pt-2 pointer-cursor' onClick={goBack} ></Image>
        <div className="title col-md-6">
        <div className="logo"></div>
        <h1>
        <label className="navbar-brand">
        XClinics
        </label>
        </h1>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className={`links&buttons collapse navbar-collapse col-md-6 ${isMenuOpen ? 'show' : ''}`}
        >
          <ul className=" navbar-nav container d-flex justify-content-end me-auto">
            <li className="nav-item">
              <a className="nav-link" href={`/doctor/${id}`}>
                My Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={`/doctor/Appointments`}>Appointments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/doctor/patients">Patients</a>
            </li>
            <li className="nav-item rounded ms-2">
              <a className="btn btn-primary text-light mx-1"  onClick={handleLogout}>
              Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDoc;
