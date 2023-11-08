"use client"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewPatients } from '@/app/redux/actions/patientsActions';
import { removeUser } from '@/app/redux/actions/userActions';

import { Table } from '../../../../components/Table';
import { Button } from '../../../../components/Button';

export default function Patients() {
  const dispatch = useDispatch();
  const patients = useSelector(state => state.patientsReducer.patients);
  const isLoading = useSelector(state => state.removeUserReducer.loading);

  useEffect(() => {
    dispatch(viewPatients());
  }, [dispatch, isLoading]);

  const onRemoveHandler = (id) => {
    dispatch(removeUser(id));
  };

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const tableHeaders = [
    'Name',
    'Email',
    'Username',
    'Birth Date',
    'Mobile Number',
    'Gender',
    'Emergency Contact Name',
    'Emergency Contact Number',
    'Actions'
  ];

  const tableData = patients?.data?.map((person) => ({
    Name: person.name,
    Email: person.email,
    Username: person.user?.username,
    'Birth Date': formatDateToDDMMYYYY(person.dateOfBirth),
    'Mobile Number': person.mobileNumber,
    Gender: person.gender,
    'Emergency Contact Name': person.emergencyContact.fullName,
    'Emergency Contact Number': person.emergencyContact.mobileNumber,
    Actions: (
      <Button
        text="Remove"
        onClick={() => {
          onRemoveHandler(person.user._id);
        }}
      />
    ),
  }));

  return (
    <>
      <h3 className="my-1 mt-0 text-center text-title">Patients</h3>
      <div className="underline-Bold mx-auto mb-5"></div>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="row">
          <Table headers={tableHeaders} data={tableData} itemsPerPageOptions={[5, 10, 15]} />
        </div>
      </div>
    </>
  );
}
