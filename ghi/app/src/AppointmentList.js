import { useEffect, useState } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    // const [cancel, setCancel] = useState('');
    // const [finish, setFinish] = useState('');
    const [automobiles, setAutomobiles] = useState([]);

    // const handleCancelChange = (event) => {
    //   const value = event.target.value;
    //     setCancel(value);
    // }

    // const handleFinishChange = (event) => {
    //   const value = event.target.value;
    //   setFinish(value);
    // }

    const fetchData = async () => {
      const url = 'http://localhost:8080/api/appointments'
      const automobilesUrl = "http://localhost:8100/api/automobiles/"
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
      }
      const automobileResponse = await fetch(automobilesUrl)
      if (automobileResponse.ok) {
          const data = await automobileResponse.json()
          const autosAvailable = data.autos.filter(auto => !auto.sold)
          setAutomobiles(autosAvailable)
      }
    }
    useEffect(() => {
      fetchData();


    }, []);

    const handleCancel = async (id) => {
      const appointmentUrl = `http://localhost:8080/api/appointments/${id}/canceled/`;
      const fetchConfig = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: false }),
      };

      const response = await fetch(appointmentUrl, fetchConfig);
      if (response.ok) {
        const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
        setAppointments(updatedAppointments);
      } else {
        console.error('Failed to cancel appointment:', response.statusText);
      }
    }

    const handleFinish = async (id) => {
      const appointmentUrl = `http://localhost:8080/api/appointments/${id}/finished/`;
      const fetchConfig = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: true }),
      };

      const response = await fetch(appointmentUrl, fetchConfig);
      if (response.ok) {
        const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
        setAppointments(updatedAppointments);
      } else {
        console.error('Failed to finish appointment:', response.statusText);
      }
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

    // const isVIP = async (vin) => {
    //   const vinStatusUrl = `http://localhost:8100/api/automobiles/${vin}`;
    //   const response = await fetch(vinStatusUrl);
    //   if (response.ok) {
    //     const data = await response.json();
    //     return data.sold;
    //   } else {
    //     return 'Error';
    //   }
    // };

    // useEffect(() => {
    //   const fetchVIPStatus = async () => {
    //     const updatedAppointments = await Promise.all(
    //       appointments.map(async (appt) => {
    //         const vipStatus = await isVIP(appt.vin);
    //         return { ...appt, vip: vipStatus };
    //       })
    //     );
    //     setAppointments(updatedAppointments);
    //   };
    //   fetchVIPStatus();
    // }, [appointments]);

    return (
      <>
      <h1>List of Service Appointments</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>VIP?</th>
              <th>Customer</th>
              <th>Date/Time</th>
              <th>Technician</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
          {appointments.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td className="fs-3">{ appointment.vin }</td>
                <td className="fs-3">{ (appointment.vin) }</td>
                <td className="fs-3">{ appointment.customer }</td>
                <td className="fs-3">{ formatDate(appointment.date_time) }</td>
                <td className="fs-3">{ appointment.technician.first_name + " " + appointment.technician.last_name }</td>
                <td className="fs-3">{ appointment.reason }</td>
                <td>
                  <button onClick={() => handleCancel(appointment.id)} className="btn btn-danger">Cancel</button>
                  <button onClick={() => handleFinish(appointment.id)} className="btn btn-success">Finish</button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </>
    );
  }

export default AppointmentList;
