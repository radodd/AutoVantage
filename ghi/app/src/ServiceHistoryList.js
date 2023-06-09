import { useEffect, useState } from 'react';

function ServiceHistorytList() {
    const [appointments, setAppointments] = useState([]);
    const [appointment, setAppointment] = useState('');


    const fetchData = async () => {
      const url = 'http://localhost:8080/api/appointments'
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);

    const handleAppointmentChange = (event) => {
      const selectedAppointmentId = event.target.value
      let updatedAppointments;
      if (selectedAppointmentId === 'all') {
        updatedAppointments = appointments;
      } else {
        updatedAppointments = appointments.filter((appt) => appt.id === parseInt(selectedAppointmentId));
      }
      setAppointments(updatedAppointments);
      setAppointment(selectedAppointmentId);
    }

    const formatDate = (date) => {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        const hour = newDate.getHours();
        const minute = newDate.getMinutes();
        const formattedDate = `${month}/${day}/${year} @ ${hour}:${minute}`;
        return formattedDate;
    };

    const isVIP = async (vin) => {
        const vinStatusUrl = `http://localhost:8100/api/automobiles/${vin}`;
        const response = await fetch(vinStatusUrl);
        if (response.ok) {
          const data = await response.json();
          return data.sold;
        } else {
          return 'Error';
        }
      };

    return (
      <>
      <h1>Service History</h1>
        <div className="mb-3">
          <select onChange={handleAppointmentChange} value={appointment} required name="appointment" id="appointment" className="form-select">
              <option value={"all"} key={"all"}>Choose a VIN</option>
              {appointments && appointments.map(appointment => {
                  return (
                      <option key={appointment.id} value={appointment.id}>
                          {appointment.vin}
                      </option>
                  );
              })}
          </select>
                </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>VIP?</th>
              <th>Customer</th>
              <th>Date/Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {appointments.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td className="fs-3">{ appointment.vin }</td>
                <td className="fs-3">{ isVIP(appointment.vin) ? 'Is VIP' : 'Not VIP' }</td>
                <td className="fs-3">{ appointment.customer }</td>
                <td className="fs-3">{ formatDate(appointment.date_time) }</td>
                <td className="fs-3">{ appointment.technician.first_name }</td>
                <td className="fs-3">{ appointment.reason }</td>
                <td className="fs-3">{ appointment.status ? 'Finished' : 'Canceled' }</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </>
    );
  }

export default ServiceHistorytList;
