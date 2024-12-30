import React from 'react'



const columns = [
    {
      header: "Info",
      key: "name",
    },
    {
      header: "Date",
      key: "appointment_date",
      className: "hidden md:table-cell",
    },
    {
      header: "Time",
      key: "time",
      className: "hidden md:table-cell",
    },
    {
      header: "Doctor",
      key: "doctor",
      className: "hidden md:table-cell",
    },
    {
      header: "Status",
      key: "status",
      className: "hidden xl:table-cell",
    },
    {
      header: "Actions",
      key: "action",
    },
  ];
  

const Appointments = () => {
  return (
    <div>Appointments</div>
  )
}

export default Appointments