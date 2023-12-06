"use client";
import {
  doctorFollowUpAction,
  getDoctorAppointments,
} from "@/app/redux/actions/doctorActions";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Modal, ModalBody, ModalHeader , Alert } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components/Button";
import FooterDoc from "../../../../components/FooterDoc";
import NavbarDoc from "../../../../components/NavbarDoc";
import Spinner from "../../../../components/Spinner";
import { Table } from "../../../../components/Table";

function docappointments() {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [modal, setModal] = useState(false);
  const [appt, setAppt] = useState(null);

  const handleDateChange = (e) => {
    console.log(e);
    const date = new Date(e.target.value);
    setSelectedDate(e.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const appointmentsData = useSelector(
    (state) => state.viewDoctorsAppointmentsReducer.appointments
  );

  const appointmentsLoading = useSelector(
    (state) => state.viewDoctorsAppointmentsReducer.loading
  )

  const isLoading = useSelector(
    (state) => state.doctorFollowUpReducer.loading
  );

  const followupSuccess = useSelector(
    (state) => state.doctorFollowUpReducer.appointment
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

    dispatch(getDoctorAppointments(filteredQueryObj));
  }

  useEffect(() => {
    fetchData();
  }, [dispatch, selectedDate, selectedStatus, isLoading]);

  const handleFollowupDate = (e) => {
    setNewDate(e.target.value);
  };

  const handleFollowup = (id) => {
    setModal(true);
    setAppt(id);
  };

  const [ShowfollowupAlert, setShowfollowupAlert] = useState(false);

  const handleFollowupSubmit = (id) => {
    dispatch(doctorFollowUpAction(id, newDate));
    setModal(false);
    if(followupSuccess){
    setShowfollowupAlert(true);
    setTimeout(() => {
      setShowfollowupAlert(false); // Hide the alert after 3000 milliseconds
    }, 3000); }
  };

  function FollowupModal(show, onHide) {

    
    
    return (
      <Modal centered show={show.show} onHide={show.onHide} size="md" className="rounded">
        <ModalHeader closeButton className="bg-primary"></ModalHeader>
        <ModalBody className="bg-light">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="px-2 text-global text-bold text-center"
          >
            Schedule A followup
          </Modal.Title>
          <hr />
          <div className=" row col-md-12 my-5">
            <div className="col-md-8">
              <input
                type="datetime-local"
                className="form-control py-2"
                name="appointmentdate"
                value={newDate}
                onChange={(e) => { handleFollowupDate(e) }}
              />
            </div>
            


            <Button
              text="Schedule Followup"
              id={`btn`}
              variant="sm"
              onClick={() => {
                handleFollowupSubmit(appt);
              }}
              className="col-md-4 "
              disabled={newDate === null ? true : false}
            ></Button>


          </div>
        </ModalBody>
      </Modal>
    );
  }

  const generateButton = (id, status) => {
    return (
      status !== 'Upcoming' && status !== 'Cancelled' && status !== 'Rescheduled' &&
      <Button
        text="Schedule Followup"
        id={`btn`}
        variant="md"
        onClick={() => {
          handleFollowup(id);
        }}
        className="col-md-6"
      ></Button>
    );
  };

  const handleClearFilters = () => {
    setSelectedDate(null);
    setSelectedStatus(null);
  };

  const headers = ["Date", "Patient Name", "Status", "Actions"];

  const apps = useMemo(() => {
    if (appointmentsData && appointmentsData.data) {
      return appointmentsData.data.map((value) => ({
        date: new Date(value.date).toLocaleString(),
        patientname: value.patientId?.name,
        status: value.status,
        action: generateButton(value._id, value.status),
      }));
    }
    return [];
  }, [appointmentsData]);

  const { loading, appointment, error } = useSelector(
    (state) => state.followUpReducer
  );
   
  
  return (
    <div className="global-text min-vh-100 d-flex flex-column">
      <NavbarDoc />
      <div className="container">
        <div className="rows">
          <h3 className="my-3 text-center text-title">My Appointments</h3>
          <div className="underline-Bold mx-auto mb-5"></div>

          {!appointmentsLoading &&
            (
              <>
                {apps && apps.length > 0 &&
                  <div className="row flex align-items-center justify-content-start bg-light p-2 pe-0 m-3 rounded border">
                    <div className="col-md-1">
                      <Image src="/filter.svg" height={30} width={30} className="" />
                    </div>
                    <div className="status-filter col-md-3">
                      <select
                        onChange={handleStatusChange}
                        className="w-100 form-control text-muted px-2"
                      >
                        <option value="">Filter by status</option>
                        <option value="Completed">Completed</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Missed">Missed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Rescheduled">Rescheduled</option>
                      </select>
                    </div>
                    <div className="col-md-4 text-muted p-2">
                      <input type="datetime-local" value={selectedDate} onChange={handleDateChange} placeholder="Filter by date/time" />
                    </div>
                    <div className="col-md-3 ms-auto">
                      <Button
                        text="Clear Filters"
                        className="w-60 ms-5"
                        onClick={handleClearFilters}
                        variant={"md"}
                      ></Button>
                    </div>
                  </div>
                }
              </>
            )
          }

          {appointmentsLoading &&
            <>
              <Spinner />
            </>
          }
        </div>
        <FollowupModal
          show={modal}
          onHide={() => {
            setModal(false);
            setAppt(null);
          }}
        />
              {ShowfollowupAlert && followupSuccess &&
              ( 
              <><Alert   id="myAlert" variant="success"  className="px-2">
                  <strong>Success! </strong> Follow up scheduled successfully.
                  </Alert> </>)}
              {error && <Alert variant="danger">{error}</Alert>}
        {apps && apps.length > 0 &&
          <Table headers={headers} data={apps ? apps : []} className="col-md-10" />
        }

        {(!appointmentsLoading && apps && apps.length === 0) &&
          <div className="w-100 text-center">
            <h1>No scheduled appointments at this time!</h1>
          </div>
        }
      </div>
      <FooterDoc />
    </div>
  );
}

export default docappointments;
