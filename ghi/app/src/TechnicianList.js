import { useEffect, useState } from 'react';

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    const fetchData = async () => {
      const url = 'http://localhost:8080/api/technicians'
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
        console.log(data);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);

    const handleDelete = async (event) => {
      const technicianUrl = `http://localhost:8080/api/technicians/${event}/`
      const fetchConfig = {
        method: "delete",
      }
      const response = await fetch(technicianUrl, fetchConfig);
      if (response.ok) {
        console.log(response.deleted, response.breakdown)
        fetchData();
      }
    }

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody >
          {technicians.map((technician) => {
            return (
              <tr key={technician.id}>
                <td className="fs-3">{ technician.employee_id }</td>
                <td className="fs-3">{ technician.first_name }</td>
                <td className="fs-3">{ technician.last_name }</td>
                <td>
                  <button onClick={() => handleDelete(technician.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </>
    );
  }

  export default TechnicianList;
