'use client'
import React, { useState } from 'react';

const NavbarDoc = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container d-flex flex-row justify-content-between align-items-center w-100">
        <div className="title col-md-6">
        <div className="logo"></div>
        <h1>
        <a className="navbar-brand" href="/">
        XClinics
        </a>
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
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                My Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Appointments</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Patients</a>
            </li>
            <li className="nav-item rounded ms-2">
              <a className="btn btn-primary text-light mx-1" href="/">
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