"use client";
import React from "react";
import { AppointmentTable } from "../../../../components/AppointmentsTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPatientAppointments } from "@/app/redux/actions/patientActions";
import { useEffect } from "react";
import { useMemo } from "react";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Spinner from "../../../../components/Spinner";

function appointments() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const headers = ["Date", "Doctor Name", "Status"];

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setSelectedDate(e.target.value);
  };
  const handleStatusChange = (value) => {
    setSelectedStatus(event.target.value);
  };

  const appointmentsData = useSelector(
    (state) => state.viewPatientsAppointmentsReducer.appointments
  );
  const isLoading = useSelector(
    (state) => state.viewPatientsAppointmentsReducer.loading
  );

  async function fetchData() {
    const queryObj = {
      date: selectedDate,
      status: selectedStatus,
    };

    const filteredQueryObj = Object.keys(queryObj).reduce((acc, key) => {
      if (queryObj[key] !== "") {
        acc[key] = queryObj[key];
      }
      return acc;
    }, {});

    dispatch(getPatientAppointments(filteredQueryObj));
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, selectedDate, selectedStatus]);

  const apps = useMemo(() => {
    if (appointmentsData && appointmentsData.data) {
      return appointmentsData.data.map((value) => ({
        date: new Date(value.date).toLocaleString(),
        doctorname: value.doctorId.name,
        status: value.status,
      }));
    }
    return [];
  }, [appointmentsData]);

  const handleClearFilters = () => {
    setSelectedDate(null);
    setSelectedStatus(null);
  };

  return (
    <div className="m-2">
      <div className="container my-3">
        <h3 className="my-1 mt-0 text-center text-title">My Appointments</h3>
        <div className="underline-Bold mx-auto mb-5"></div>

        {!isLoading && apps && apps.length > 0 && (
          <>
            <div>
              <div className="bg-white p-3 w-100 border-bottom d-flex justify-content-between">
                <div className="">
                  <Image
                    src="/filter.svg"
                    height={30}
                    width={30}
                    className=""
                  />
                </div>
                <div className="status-filter ">
                  <select
                    onChange={handleStatusChange}
                    className="w-100 form-control text-muted p-2"
                  >
                    <option value="">Filter by status</option>
                    <option value="Completed">Completed</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Missed">Missed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Rescheduled">Rescheduled</option>
                  </select>
                </div>
                <div className=" text-muted p-2">
                  <input
                    type="datetime-local"
                    value={selectedDate}
                    onChange={handleDateChange}
                    placeholder="Filter by date/time"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #dee2e6",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />
                </div>
                <div className="">
                  <Button className="w-60 ms-5" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>

            <AppointmentTable headers={headers} data={apps ? apps : []} />
          </>
        )}
        {!isLoading && apps && apps.length === 0 && (
          <div className="w-100 text-center text-muted fs-3">
            No appointments available at this time!
          </div>
        )}

        {isLoading && <Spinner />}
      </div>
    </div>
  );
}

export default appointments;
