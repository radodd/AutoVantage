import { useEffect, useState } from 'react';

function ServiceHistorytList() {
    const [serviceHistory, setServiceHistory] = useState([]);


    const fetchData = async () => {
      const url = 'http://localhost:8080/api/appointments'
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setServiceHistory(data.appointments);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);


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
          console.log(data);
          const checkVIP =data.sold;
          return checkVIP
        } else {
          return 'Error';
        }
      };

    return (
      <>
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
          {serviceHistory.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td className="fs-3">{ appointment.vin }</td>
                <td className="fs-3">{ isVIP(appointment.vin) ? 'Not VIP' : 'Is VIP' }</td>
                <td className="fs-3">{ appointment.customer }</td>
                <td className="fs-3">{ formatDate(appointment.date_time) }</td>
                <td className="fs-3">{ appointment.technician.first_name }</td>
                <td className="fs-3">{ appointment.reason }</td>
                <td className="fs-3">{ appointment.status ? 'Finished' : 'Canceled' }</td>
                {/* <td className="fs-3">{ appointment.sold ? 'Sold' : 'Available' }</td> */}

              </tr>
            )
          })}
          </tbody>
        </table>
      </>
    );
  }

export default ServiceHistorytList;
