import { isValidDate, translateDate } from "@/util";
import React, { useState } from "react";

function AppointmentTable(props) {
  const { headers, data, className } = props;
  console.log(props);

  let borderColor;

  const currentItems = data;
  function splitDateTime(dateTimeStr) {
    const [date, time] = dateTimeStr.split(",").map((s) => s.trim());
    return { date, time };
  }

  return (
    <div>
      <div className="bg-white p-3 w-100 border-bottom d-flex justify-content-around">
        <div>Date</div>
        <div>Time</div>
        <div>Doctor's Name</div>
        <div>Status</div>
      </div>
      {currentItems?.map((row, index) => {
        return (
          <div
            key={`row${index}`}
            className={`bg-white p-4 px-5 w-100 border-1 border-bottom d-flex justify-content-around align-items-center `}
          >
            {Object.keys(row).map((key, index) => {
              if (key == "doctorname") {
                return (
                  <>
                    <div key={`col${index}`} className=" fw-bold w-25">
                      Dr. {row[key]}
                    </div>
                  </>
                );
              }
              if (key == "date") {
                const { date, time } = splitDateTime(row[key]);
                return (
                  <>
                    <td
                      key={`col${index}`}
                      className="w-50 d-flex align-items-center"
                    >
                      <div className="w-50 ">{date}</div>
                      <div className="w-50">{time}</div>
                    </td>
                  </>
                );
              }
              if (key == "status") {
                if (row[key] == "Upcoming") {
                  borderColor = "border-primary";
                  return (
                    <>
                      <td
                        key={`col${index}`}
                        className="bg-primary text-light p-2 rounded bg-opacity-50"
                      >
                        {row[key]}
                      </td>
                    </>
                  );
                }
                if (row[key] == "Completed") {
                  return (
                    <>
                      <td
                        key={`col${index}`}
                        className="bg-success text-light p-2 rounded bg-opacity-50"
                      >
                        {row[key]}
                      </td>
                    </>
                  );
                }
                if (row[key] == "Missed") {
                  return (
                    <>
                      <td
                        key={`col${index}`}
                        className="bg-danger text-light p-2 rounded bg-opacity-50"
                      >
                        {row[key]}
                      </td>
                    </>
                  );
                }
                if (row[key] == "Canelled") {
                  return (
                    <>
                      <td
                        key={`col${index}`}
                        className="text-bg-warning  p-2 rounded bg-opacity-50 "
                      >
                        {row[key]}
                      </td>
                    </>
                  );
                }
                if (row[key] == "Rescheduled") {
                  return (
                    <>
                      <td
                        key={`col${index}`}
                        className="text-bg-light  p-2 rounded "
                      >
                        {row[key]}
                      </td>
                    </>
                  );
                }
              }
            })}
          </div>
        );
      })}
    </div>
  );
}

module.exports = {
  AppointmentTable,
};
